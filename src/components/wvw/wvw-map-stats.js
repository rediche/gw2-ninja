import { LitElement, html } from "@polymer/lit-element";
import { formatDistance } from "date-fns";

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
    console.log(selectedObjective);
    return html`
      ${ SharedStyles.content.firstElementChild }
      ${ SharedWvwStyles.content.firstElementChild }
      <style>
        :host {
          display: block;
          box-shadow: var(--app-box-shadow-reverse);
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
          font-weight: 600;
          display: flex;
          justify-content: space-between;
        }

        .card-body {
          padding: 0 var(--spacer-medium);
        }

        .card-body.top-bottom-padding {
          padding: var(--spacer-small) var(--spacer-medium);
        }

        .tiers {
          margin-top: .5rem;
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

        @media screen and (min-width: 1024px) {
          :host {
            width: 25rem;
            box-shadow: var(--app-box-shadow-right);
          }
        }

      </style>

      ${ (selectedObjective) ? this._renderSelectedObjective(selectedObjective) : "" }
      
    `;
  }

  /**
   * Render an objective based on an objective object.
   * @param {Object} selectedObjective 
   */
  _renderSelectedObjective(selectedObjective) {
    const upgradeTiers = this._getUpgradeTiers(selectedObjective.upgrade_id) || [];
    console.log(upgradeTiers);

    return html`
      <div class="card">
        <div class$="card-header team-${ selectedObjective.owner.toLowerCase() }-bg">
          <span>${ selectedObjective.name }</span>
          <span title="Points per tick">+${ selectedObjective.points_tick }</span>
        </div>

        <div class="card-body top-bottom-padding">
          <div>Claimed by: ${ (selectedObjective.claimed_by) ? this._getGuildName(selectedObjective.claimed_by) : "None" }</div>
          <div>Claimed ${ (selectedObjective.claimed_at) ? this._getFormatDistance(selectedObjective.claimed_at) : "Not claimed" } ago</div>
          <div>Last flipped ${ (selectedObjective.last_flipped) ? this._getFormatDistance(selectedObjective.last_flipped) : "" } ago</div>
        </div>

        <hr>
        <div class="guild-upgrades card-body">
          <h3 class="tier-title">Guild upgrades</h3>
          <div class="upgrade-list">
          ${ selectedObjective.guild_upgrades.map((upgradeId) => this._renderGuildUpgrade(upgradeId)) }
          </div>
        </div>

        ${ (upgradeTiers && selectedObjective.yaks_delivered) ? upgradeTiers.map((tier) => this._renderUpgradeTier(tier, selectedObjective.yaks_delivered)) : "" }
      </div>
    `;
  }

  _renderUpgradeTier(tier, yaksDelivered) {
    if (!tier || !yaksDelivered) return;
    if (tier > yaksDelivered) return;

    return html`
      <hr>
      <div class="card-body">
        <h3 class="tier-title">${ tier.name }</h3>
        <div class$="tier upgrade-list ${ (tier.yaks_required > yaksDelivered) ? "not-upgraded" : "" }">
          ${ tier.upgrades.map((upgrade) => html`<img class="upgrade-icon" src="${ upgrade.icon }" alt="${ upgrade.name }" title="${ upgrade.name }">`) }
        </div>
      </div>
    `;
  }

  _getUpgradeTiers(upgradeId) {
    if (!upgradeId || !this.upgrades) return;
    const upgrade = this.upgrades.find((upgrade) => upgrade.id == upgradeId);
    return upgrade.tiers;
  }

  _renderGuildUpgrade(upgradeId) {
    if (!upgradeId) return;
    const upgrade = this._getGuildUpgrade(upgradeId);

    return html`
      <img class="upgrade-icon" src="${ upgrade.icon }" alt="${ upgrade.name }" title="${ upgrade.name }">
    `;
  }

  _getGuildUpgrade(upgradeId) {
    if (!upgradeId || !this.guildUpgrades) return;
    const upgrade = this.guildUpgrades.find((upgrade) => upgrade.id == upgradeId);
    return upgrade;
  }

  _getFormatDistance(date) {
    return formatDistance(
      new Date(date),
      Date.now()
    );
  }

  /** 
   * TODO: 
   * Make a Guild Data handler that is global. 
   * If guild ID is not found in guild data already there,
   * then load the guilds info and update array.
   */
  _getGuildName(guildId) {
    if (!guildId) return;
    return this._getGuild(guildId)
      .then((guild) => {
        return `${ guild.name } [${ guild.tag }]`;
      });
  }

  async _getGuild(guildId) {
    if (!guildId) return;

    const response = await fetch(
      `https://api.guildwars2.com/v2/guild/${ guildId }`
    );
    const guild = await response.json();
    return guild;
  }

  /**
   * TODO: Should be put into redux setup.
   */
  async _getUpgrades() {
    const response = await fetch("https://api.guildwars2.com/v2/wvw/upgrades?ids=all");
    const upgrades = await response.json();
    return upgrades;
  }

  /**
   * TODO: Should be put into redux setup.
   */
  async _getGuildUpgrades() {
    const response = await fetch("https://api.guildwars2.com/v2/guild/upgrades?ids=all");
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
      guildUpgrades: Array
    };
  }

  constructor() {
    super();

    this._getUpgrades()
      .then((upgrades) => {
        this.upgrades = upgrades;
      });

    this._getGuildUpgrades()
      .then((upgrades) => {
        this.guildUpgrades = upgrades;
      });
  }
}

window.customElements.define("wvw-map-stats", WvwMapStats);