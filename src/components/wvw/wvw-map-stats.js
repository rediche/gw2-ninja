import { LitElement, html } from "@polymer/lit-element";

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
          padding: 0;
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
          padding: var(--spacer-medium);
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

  _renderSelectedObjective(selectedObjective) {
    return html`
      <div class="card">
        <div class$="card-header team-${ selectedObjective.owner.toLowerCase() }-bg">
          <span>${ selectedObjective.name }</span>
          <span title="Points per tick">+${ selectedObjective.points_tick }</span>
        </div>
        <div class="card-body">
          <div>Claimed by: ${ (selectedObjective.claimed_by) ? this._getGuildName(selectedObjective.claimed_by) : "None" }</div>
          <div>Claimed at: ${ (selectedObjective.claimed_at) ? selectedObjective.claimed_at : "Not claimed" }</div>
          <div>Last flipped: ${ (selectedObjective.last_flipped) ? selectedObjective.last_flipped : "" }</div>
        </div>
      </div>
    `;
  }

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
   * Object describing property-related metadata used by Polymer features
   */
  static get properties() {
    return {
      selectedObjective: Object
    };
  }

  /**
   * Use for one-time configuration of your component after local DOM is initialized.
   */
  ready() {
    super.ready();
  }
}

window.customElements.define("wvw-map-stats", WvwMapStats);
