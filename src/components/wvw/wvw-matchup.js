import {PolymerElement, html} from "@polymer/polymer/polymer-element.js";

import { SharedStyles } from "../shared-styles";
import { SharedWvwStyles } from "../shared-wvw-styles";

/**
 * `wvw-matchup`
 *
 * @customElement
 * @polymer
 * @demo
 * 
 */
class WvWMatchup extends PolymerElement {
  static get template() {
    return html`
      ${SharedStyles}
      ${SharedWvwStyles}
      <style>
        :host {
          display: block;
          max-width: 1100px;
          margin: 0 auto;
        }

        :host([hidden]) {
          display: none;
        }

        .title {
          margin-top: var(--spacer-large);
        }

        .cards {
          display: flex;
          justify-content: space-between;
        }

        .card {
          padding: 0;
        }

        .worlds .card {
          width: calc(100% / 3 - 1rem);
        }

        .world-header {
          padding: var(--spacer-medium) var(--spacer-medium) var(--spacer-small);
          color: var(--app-text-color-light);
          font-weight: 600;
          box-shadow: var(--app-box-shadow);
        }

        .world-body {
          padding: var(--spacer-small) var(--spacer-medium);
        }
      </style>

      <h2 class="title">Worlds</h2>
      <div class="worlds cards">
        <div class="card">
          <div class="world-header team-green-bg">[[ _generateWorldLinkNames(matchup.all_worlds.green, matchup.worlds.green, worlds) ]]</div>
          <div class="world-body">
            <div>Kills: [[ matchup.kills.green ]]</div>
            <div>Deaths: [[ matchup.deaths.green ]]</div>
            <div>KDR: [[ _calcKDR(matchup.kills.green, matchup.deaths.green) ]]</div>
          </div>
        </div>
        <div class="card">
          <div class="world-header team-blue-bg">[[ _generateWorldLinkNames(matchup.all_worlds.blue, matchup.worlds.blue, worlds) ]]</div>
          <div class="world-body">
            <div>Kills: [[ matchup.kills.blue ]]</div>
            <div>Deaths: [[ matchup.deaths.blue ]]</div>
            <div>KDR: [[ _calcKDR(matchup.kills.blue, matchup.deaths.blue) ]]</div>
          </div>
        </div>
        <div class="card">
          <div class="world-header team-red-bg">[[ _generateWorldLinkNames(matchup.all_worlds.red, matchup.worlds.red, worlds) ]]</div>
          <div class="world-body">
            <div>Kills: [[ matchup.kills.red ]]</div>
            <div>Deaths: [[ matchup.deaths.red ]]</div>
            <div>KDR: [[ _calcKDR(matchup.kills.red, matchup.deaths.red) ]]</div>
          </div>
        </div>
      </div>

      <h2 class="title">Maps</h2>
      <p>Show 4 cards with kills, deaths, KDR etc for each server.</p>

      <h2 class="title">Skirmishes</h2>
      <p>Show a table with all skimishes with the newest on top</p>
    `;
  }

  static get properties() {
    return {
      matchup: Object,
      worlds: Array
    }
  }

  _generateWorldLinkNames(allWorldsInLink, hostWorld, worlds) {
    if (!allWorldsInLink || !hostWorld || !worlds) return;

    const linkedWorlds = allWorldsInLink.filter(world => {
      return world !== hostWorld;
    });

    const linkedWorldsWithNames = linkedWorlds.map(worldId => {
      return this._resolveWorldName(worldId, worlds);
    });

    const hostWorldName = this._resolveWorldName(hostWorld, worlds);

    return linkedWorlds.length > 0 ? `${hostWorldName} (${linkedWorldsWithNames.join(', ')})` : hostWorldName;
  }

  _resolveWorldName(worldId, worlds) {
    if (!worldId || !worlds) return;

    const foundWorld = worlds.find(world => {
      return world.id == worldId;
    });

    return foundWorld.name;
  }

  _calcKDR(kills, deaths) {
    if (!kills || !deaths) return;

    return parseFloat(Math.round(kills / deaths * 100) / 100).toFixed(2);
  }

}

customElements.define('wvw-matchup', WvWMatchup);