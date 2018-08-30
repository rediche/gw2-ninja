import { LitElement, html } from "@polymer/lit-element";
import { connect } from 'pwa-helpers/connect-mixin.js';
import { formatDistance } from "date-fns";

import "@polymer/paper-ripple/paper-ripple.js";

// Load redux store
import { store } from '../../store.js';

// Lazy load reducers
import settings from '../../reducers/settings.js';
store.addReducers({
  settings
});

import {
  getGuild,
  getGuildUpgrades,
  getGuildEmblemURL,
  getGuildNameWithTag
} from "../utilities/gwn-guild-utils";
import { getWvwUpgrades } from "../utilities/gwn-wvw-utils";

import { SharedWvwStyles } from "../shared-wvw-styles";

/**
 * `wvw-map-stats`
 *
 * @summary
 * @customElement
 * @extends {LitElement}
 */
class WvwMapStats extends connect(store)(LitElement) {
  _render({ selectedObjective }) {
    return html`
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
          border-radius: var(--app-border-radius);
          background-color: var(--app-background-color);
          box-shadow: var(--app-box-shadow);
          box-sizing: border-box;
          overflow: hidden;
        }

        hr {
          display: block;
          height: 1px;
          border: 0;
          border-top: 1px solid var(--paper-grey-300);
          margin: var(--spacer-medium) var(--spacer-none);
          padding: var(--spacer-none);
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

        .not-upgraded {
          opacity: .5;
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
            ? this._renderClaimedBy(selectedObjective)
            : ""
        }

        <div hidden="${
          !selectedObjective.guild_upgrades ||
          selectedObjective.guild_upgrades.length < 1
            ? true
            : false
        }">
          <hr>
          <div class="guild-upgrades card-body">
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
        </div>

        ${
          upgradeTiers && selectedObjective.yaks_delivered
            ? upgradeTiers.map((tier, index, tiers) =>
                this._renderUpgradeTier(
                  tier,
                  index,
                  tiers,
                  selectedObjective.yaks_delivered
                )
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
      const guildName = getGuildNameWithTag(guild);
      return html`
        <div class="claimed-by card-body">
          <img class="guild-emblem" src="${getGuildEmblemURL(
            guild
          )}" alt="${guildName}">
          <div class="guild-name">${guildName}</div>
          <div class="claimed-at">Claimed ${this._getFormatDistance(
            claimed_at
          )} ago</div>
        </div>
      `;
    });
  }

  _renderUpgradeTier(tier, index, tiers, yaksDelivered) {
    if (!tier || !tiers || !yaksDelivered) return;

    let yaksRequiredForThisTier = 0;
    for (let i = 0; i <= index; i++) {
      yaksRequiredForThisTier += tiers[i].yaks_required;
    }

    return html`
      <hr>
      <div class$="card-body ${
        yaksRequiredForThisTier > yaksDelivered ? "not-upgraded" : ""
      }">
        <h3 class="tier-title">${tier.name} ${
      yaksRequiredForThisTier > yaksDelivered
        ? `(${yaksRequiredForThisTier - yaksDelivered} Dolyaks remaining)`
        : ""
    }</h3>
        <div class="tier upgrade-list">
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

  /**
   * TODO:
   * Make a Guild Data handler that is global.
   * If guild ID is not found in guild data already there,
   * then load the guilds info and update array.
   */
  async _getGuild(guildId) {
    if (!guildId) return;

    const foundGuild = this.guilds.find(guild => guild.id == guildId);
    if (foundGuild) return foundGuild;

    return getGuild(guildId).then(guild => {
      this.guilds = this.guilds.concat(guild);
      return guild;
    });
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

    this._loadUpgrades();
  }
  
  _loadUpgrades(language = "en") {
    getGuildUpgrades(language).then(upgrades => (this.guildUpgrades = upgrades));
    getWvwUpgrades(language).then(upgrades => (this.upgrades = upgrades));
  }

  _stateChanged({ settings }) {
    if (!settings || !settings.language) return;
    this._loadUpgrades(settings.language);
  }

  _onClose(e) {
    this.dispatchEvent(new CustomEvent("objective-close"));
  }
}

window.customElements.define("wvw-map-stats", WvwMapStats);
