import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "@polymer/polymer/lib/elements/dom-repeat.js";

import "../utilities/gwn-progress";

import { SharedStyles } from "../shared-styles.js";
import { SharedTableStyles } from "../shared-table-styles.js";
import { SharedWvwStyles } from "../shared-wvw-styles.js";

/**
 * `wvw-region`
 *
 * @summary
 * @customElement
 * @extends {Polymer.Element}
 */
class WvwRegion extends PolymerElement {
  static get template() {
    return html`
    ${SharedStyles}
    ${SharedTableStyles}
    ${SharedWvwStyles}
    <style>
      :host {
        display: block;
        padding: var(--spacer-large);
      }

      .card {
        padding: 0;
        max-width: 1100px;
        margin: 0 auto var(--spacer-medium);
      }

      .title {
        padding: var(--spacer-medium) var(--spacer-medium) 0;
      }

      thead th {
        padding-bottom: 0;
      }

      gwn-progress {
        font-size: .75rem;
      }
    </style>

    <div class="card">
      <h2 class="title">Europe</h2>
      <div class="table-scroll">
        <table>
          <thead>
            <th>Server</th>
            <th>Victory Points</th>
            <th>Total Score</th>
          </thead>
          <tbody>
            <template is="dom-repeat" items="{{euMatches}}">
              <tr>
                <td>
                  <div>[[ _generateWorldLinkNames(item.all_worlds.green, item.worlds.green, worlds) ]]</div>
                  <div>[[ _generateWorldLinkNames(item.all_worlds.blue, item.worlds.blue, worlds) ]]</div>
                  <div>[[ _generateWorldLinkNames(item.all_worlds.red, item.worlds.red, worlds) ]]</div>
                </td>
                <td>
                  <gwn-progress class="green" progress="[[ item.victory_points.green ]]" max="[[ _highestVictoryPointsInMatchup(item) ]]">[[ item.victory_points.green ]]</gwn-progress>
                  <gwn-progress class="blue" progress="[[ item.victory_points.blue ]]" max="[[ _highestVictoryPointsInMatchup(item) ]]">[[ item.victory_points.blue ]]</gwn-progress>
                  <gwn-progress class="red" progress="[[ item.victory_points.red ]]" max="[[ _highestVictoryPointsInMatchup(item) ]]">[[ item.victory_points.red ]]</gwn-progress>
                </td>
                <td>
                  <gwn-progress class="green" progress="[[ item.scores.green ]]" max="[[ _highestScoreInMatchup(item) ]]">[[ item.scores.green ]]</gwn-progress>
                  <gwn-progress class="blue" progress="[[ item.scores.blue ]]" max="[[ _highestScoreInMatchup(item) ]]">[[ item.scores.blue ]]</gwn-progress>
                  <gwn-progress class="red" progress="[[ item.scores.red ]]" max="[[ _highestScoreInMatchup(item) ]]">[[ item.scores.red ]]</gwn-progress>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>

    <div class="card">
      <h2 class="title">North America</h2>
      <div class="table-scroll">
        <table>
          <thead>
            <th>Server</th>
            <th>Victory Points</th>
            <th>Total Score</th>
          </thead>
          <tbody>
            <template is="dom-repeat" items="{{naMatches}}">
              <tr>
                <td>
                  <div>[[ _generateWorldLinkNames(item.all_worlds.green, item.worlds.green, worlds) ]]</div>
                  <div>[[ _generateWorldLinkNames(item.all_worlds.blue, item.worlds.blue, worlds) ]]</div>
                  <div>[[ _generateWorldLinkNames(item.all_worlds.red, item.worlds.red, worlds) ]]</div>
                </td>
                <td>
                  <gwn-progress class="green" progress="[[ item.victory_points.green ]]" max="[[ _highestVictoryPointsInMatchup(item) ]]">[[ item.victory_points.green ]]</gwn-progress>
                  <gwn-progress class="blue" progress="[[ item.victory_points.blue ]]" max="[[ _highestVictoryPointsInMatchup(item) ]]">[[ item.victory_points.blue ]]</gwn-progress>
                  <gwn-progress class="red" progress="[[ item.victory_points.red ]]" max="[[ _highestVictoryPointsInMatchup(item) ]]">[[ item.victory_points.red ]]</gwn-progress>
                </td>
                <td>
                  <gwn-progress class="green" progress="[[ item.scores.green ]]" max="[[ _highestScoreInMatchup(item) ]]">[[ item.scores.green ]]</gwn-progress>
                  <gwn-progress class="blue" progress="[[ item.scores.blue ]]" max="[[ _highestScoreInMatchup(item) ]]">[[ item.scores.blue ]]</gwn-progress>
                  <gwn-progress class="red" progress="[[ item.scores.red ]]" max="[[ _highestScoreInMatchup(item) ]]">[[ item.scores.red ]]</gwn-progress>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
    `;
  }

  /**
   * Object describing property-related metadata used by Polymer features
   */
  static get properties() {
    return {
      worlds: {
        type: Array
      },
      matches: {
        type: Array
      },
      euMatches: {
        type: Array,
        computed: "_regionalMatches(matches, 2)"
      },
      naMatches: {
        type: Array,
        computed: "_regionalMatches(matches, 1)"
      }
    };
  }

  _regionalMatches(matches, regionalNumber) {
    return matches.filter(match => {
      return match.id.charAt() == regionalNumber;
    });
  }

  _getTierFromID(id) {
    return id.split('-')[1];
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

  _highestVictoryPointsInMatchup(matchup) {
    return Math.max(matchup.victory_points.green, matchup.victory_points.red, matchup.victory_points.blue);
  }

  _highestScoreInMatchup(matchup) {
    return Math.max(matchup.scores.green, matchup.scores.red, matchup.scores.blue);
  }
}

window.customElements.define("wvw-region", WvwRegion);
