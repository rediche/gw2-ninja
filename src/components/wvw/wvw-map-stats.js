import { LitElement, html } from "@polymer/lit-element";
import { formatDistance } from "date-fns";

import "@polymer/paper-ripple/paper-ripple.js";

import { SharedStyles } from "../shared-styles";
import { SharedWvwStyles } from "../shared-wvw-styles";

/**
 * `wvw-map-stats`
 *
 * @summary
 * @customElement
 * @extends {LitElement}
 */
class WvwMapStats extends LitElement {
  _render({ selectedObjective }) {
    return html`
      ${SharedStyles.content.firstElementChild}
      ${SharedWvwStyles.content.firstElementChild}
      <style>
        :host {
          display: block;
          z-index: 1000;
          position: relative;
          padding: var(--spacer-medium);
        }

        .card {
          padding: 0 0 var(--spacer-small) 0;
        }

        .card-header {
          padding: var(--spacer-small) var(--spacer-medium);
          box-shadow: var(--app-box-shadow);
          color: var(--app-text-color-light);
        }

        .card-header .space-between {
          font-weight: 600;
          display: flex;
          justify-content: space-between;
          line-height: 1;
          margin-bottom: .25rem;
        }

        .card-body {
          padding: 0 var(--spacer-medium);
        }

        .claimed-by {
          padding-top: var(--spacer-small);
          display: grid;
          grid-column-gap: .5rem;
          grid-template-columns: 2.625rem 1fr;
        }

        .claimed-by .guild-emblem {
          grid-row: 1 / 3;
          max-width: 100%;
        }

        .guild-name {
          font-weight: 500;
        }

        .claimed-at,
        .last-flipped {
          font-size: .75rem;
        }

        .tier-title {
          font-size: .75rem;
          font-weight: 800;
          margin-bottom: .5rem;
          line-height: 1;
        }

        .upgrade-list {
          display: flex;
        }

        .upgrade-icon {
          width: 32px;
          height: 32px;
          flex: none;
          margin-right: .5rem;
        }

        hr {
          margin: .5rem 0;
        }

        .button {
          margin: 1rem 0 .5rem;
          background-color: transparent;
          color: var(--app-primary-color);
          border: 1px solid var(--app-primary-color);
          padding: .5rem 1rem;
          text-align: center;
          border-radius: var(--app-border-radius);
          text-decoration: none;
          margin-right: 1rem;
          font-size: .85rem;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          position: relative;
        }

        @media screen and (min-width: 1024px) {
          :host {
            width: 25rem;
          }
        }

      </style>

      ${
        selectedObjective
          ? this._renderSelectedObjective(selectedObjective)
          : ""
      }
      
    `;
  }

  /**
   * Render an objective based on an objective object.
   * @param {Object} selectedObjective
   */
  _renderSelectedObjective(selectedObjective) {
    const upgradeTiers =
      this._getUpgradeTiers(selectedObjective.upgrade_id) || [];

    return html`
      <div class="card">
        <div class$="card-header team-${selectedObjective.owner.toLowerCase()}-bg">
          <div class="space-between">
            <span>${selectedObjective.name}</span>
            <span title="Points per tick">+${
              selectedObjective.points_tick
            }</span>
          </div>
          <div class="last-flipped">Last flipped ${
            selectedObjective.last_flipped
              ? this._getFormatDistance(selectedObjective.last_flipped)
              : ""
          } ago</div>
        </div>

        ${
          selectedObjective.claimed_by && selectedObjective.claimed_at
            ? this._renderClaimedBy(
                selectedObjective
              )
            : ""
        }

        <hr hidden="${ selectedObjective.guild_upgrades ? true : false }">
        <div class="guild-upgrades card-body" hidden="${ selectedObjective.guild_upgrades ? true : false }">
          <h3 class="tier-title">Guild upgrades</h3>
          <div class="upgrade-list">
          ${
            selectedObjective.guild_upgrades
              ? selectedObjective.guild_upgrades.map(upgradeId =>
                  this._renderGuildUpgrade(upgradeId)
                )
              : ""
          }
          </div>
        </div>

        ${
          upgradeTiers && selectedObjective.yaks_delivered
            ? upgradeTiers.map(tier =>
                this._renderUpgradeTier(tier, selectedObjective.yaks_delivered)
              )
            : ""
        }

        <div class="card-body">
          <button class="button" on-click="${() => this._onClose()}">
            Close
            <paper-ripple></paper-ripple>  
          </button>
        </div>
      </div>
    `;
  }

  /**
   * Render a claimed by guild layout
   * 
   * @param {Object} objective
   * @param {String} objective.claimed_by
   * @param {Time} objective.claimed_at
   */
  _renderClaimedBy({ claimed_by, claimed_at }) {
    if (!claimed_by || !claimed_at) return;

    return this._getGuild(claimed_by).then(guild => {
      const guildName = this._getGuildName(guild)
      return html`
        <div class="claimed-by card-body">
          <img class="guild-emblem" src="${this._getGuildEmblemURL(guild)}" alt="${guildName}">
          <div class="guild-name">${guildName}</div>
          <div class="claimed-at">Claimed ${this._getFormatDistance(
            claimed_at
          )} ago</div>
        </div>
      `;
    });
  }

  _renderUpgradeTier(tier, yaksDelivered) {
    if (!tier || !yaksDelivered) return;
    if (tier > yaksDelivered) return;

    return html`
      <hr>
      <div class="card-body">
        <h3 class="tier-title">${tier.name}</h3>
        <div class$="tier upgrade-list ${
          tier.yaks_required > yaksDelivered ? "not-upgraded" : ""
        }">
          ${tier.upgrades.map(
            upgrade =>
              html`<img class="upgrade-icon" src="${upgrade.icon}" alt="${
                upgrade.name
              }" title="${upgrade.name}">`
          )}
        </div>
      </div>
    `;
  }

  _getUpgradeTiers(upgradeId) {
    if (!upgradeId || !this.upgrades) return;
    const upgrade = this.upgrades.find(upgrade => upgrade.id == upgradeId);
    return upgrade.tiers;
  }

  _renderGuildUpgrade(upgradeId) {
    if (!upgradeId) return;
    const upgrade = this._getGuildUpgrade(upgradeId);

    return html`
      <img class="upgrade-icon" src="${upgrade.icon}" alt="${
      upgrade.name
    }" title="${upgrade.name}">
    `;
  }

  _getGuildUpgrade(upgradeId) {
    if (!upgradeId || !this.guildUpgrades) return;
    const upgrade = this.guildUpgrades.find(upgrade => upgrade.id == upgradeId);
    return upgrade;
  }

  _getFormatDistance(date) {
    return formatDistance(new Date(date), Date.now());
  }

  _getGuildEmblemURL({ name }) {
    if (!name) return;
    return `https://guilds.gw2w2w.com/guilds/${name.replace(' ', '-').toLowerCase()}/256.svg`;
  }

  _getGuildName({ name, tag}) {
    if (!name || !tag) return;
    return `${name} [${tag}]`;
  }

  /**
   * TODO:
   * Make a Guild Data handler that is global.
   * If guild ID is not found in guild data already there,
   * then load the guilds info and update array.
   */
  async _getGuild(guildId) {
    if (!guildId) return;

    const foundGuild = this.guilds.find((guild) => guild.id == guildId);
    if (foundGuild) return foundGuild;

    const response = await fetch(
      `https://api.guildwars2.com/v2/guild/${guildId}`
    );
    const guild = await response.json();
    this.guilds = this.guilds.concat(guild);

    return guild;
  }

  /**
   * TODO: Should be put into redux setup.
   */
  async _getUpgrades() {
    const response = await fetch(
      "https://api.guildwars2.com/v2/wvw/upgrades?ids=all"
    );
    const upgrades = await response.json();
    return upgrades;
  }

  /**
   * TODO: Should be put into redux setup.
   */
  async _getGuildUpgrades() {
    const response = await fetch(
      "https://api.guildwars2.com/v2/guild/upgrades?ids=all"
    );
    const upgrades = await response.json();
    return upgrades;
  }

  /**
   * Object describing property-related metadata used by Polymer features
   */
  static get properties() {
    return {
      selectedObjective: Object,
      upgrades: Array,
      guildUpgrades: Array,
      guilds: Array
    };
  }

  constructor() {
    super();

    this.guilds = [];

    this._getUpgrades().then(upgrades => {
      this.upgrades = upgrades;
    });

    this._getGuildUpgrades().then(upgrades => {
      this.guildUpgrades = upgrades;
    });
  }

  _onClose(e) {
    this.dispatchEvent(new CustomEvent("objective-close"));
  }
}

window.customElements.define("wvw-map-stats", WvwMapStats);
