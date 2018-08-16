import {PolymerElement, html} from "@polymer/polymer/polymer-element.js";
import "@polymer/polymer/lib/elements/dom-repeat.js";

import { SharedStyles } from "../shared-styles";
import { SharedTableStyles } from "../shared-table-styles";
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
      ${SharedTableStyles}
      ${SharedWvwStyles}
      <style>
        :host {
          display: block;
          padding: var(--spacer-large);
        }

        :host([hidden]) {
          display: none;
        }

        .container {
          max-width: 1100px;
          margin: 0 auto;
        }

        .title:not(:first-child) {
          margin-top: var(--spacer-large);
        }

        .cards {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .card {
          padding: 0;
          margin-bottom: var(--spacer-medium);
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

        .table-scroll {
          margin-bottom: var(--spacer-large);
        }

        thead {
          box-shadow: var(--app-box-shadow);
        }

        gwn-progress {
          font-size: .75rem;
        }

        .skirmish-id {
          width: 4rem;
        }

        @media screen and (min-width: 768px) {
          .cards {
            flex-direction: row;
          }

          .worlds .card {
            width: calc(100% / 3 - 1rem);
            margin-bottom: 0;
          }
        }
      </style>

      <div class="container">
        <h2 class="title">Worlds</h2>
        <div class="worlds cards">
          <div class="card">
            <div class="world-header team-green-bg">[[ _generateWorldLinkNames(matchup.all_worlds.green, matchup.worlds.green, worlds) ]]</div>
            <div class="world-body">
              <div>Victory Points: [[ matchup.victory_points.green ]]</div>
              <div>Score: [[ matchup.scores.green ]]</div>
              <div>Kills: [[ matchup.kills.green ]]</div>
              <div>Deaths: [[ matchup.deaths.green ]]</div>
              <div>KDR: [[ _calcKDR(matchup.kills.green, matchup.deaths.green) ]]</div>
            </div>
          </div>
          <div class="card">
            <div class="world-header team-blue-bg">[[ _generateWorldLinkNames(matchup.all_worlds.blue, matchup.worlds.blue, worlds) ]]</div>
            <div class="world-body">
              <div>Victory Points: [[ matchup.victory_points.blue ]]</div>
              <div>Score: [[ matchup.scores.blue ]]</div>
              <div>Kills: [[ matchup.kills.blue ]]</div>
              <div>Deaths: [[ matchup.deaths.blue ]]</div>
              <div>KDR: [[ _calcKDR(matchup.kills.blue, matchup.deaths.blue) ]]</div>
            </div>
          </div>
          <div class="card">
            <div class="world-header team-red-bg">[[ _generateWorldLinkNames(matchup.all_worlds.red, matchup.worlds.red, worlds) ]]</div>
            <div class="world-body">
              <div>Victory Points: [[ matchup.victory_points.red ]]</div>
              <div>Score: [[ matchup.scores.red ]]</div>
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

        <div class="table-scroll card">
          <table>
            <thead>
              <th class="skirmish-id">#</th>
              <th>Matchup Score</th>
              <th>Skirmish Score</th>
              <th>Eternal Battlegrounds</th>
              <th>Red Borderlands</th>
              <th>Blue Borderlands</th>
              <th>Green Borderlands</th>
            </thead>
            <tbody>
              <template is="dom-repeat" items="{{ skirmishesDesc }}" as="skirmish">
                <tr>
                  <td class="skirmish-id">[[ skirmish.id ]]</td>
                  <td>
                    <gwn-progress class="green" progress="[[ _accumulatedScore(skirmishesDesc, index, 'green') ]]" max="[[ _highestScore(matchup.scores) ]]">[[ _accumulatedScore(skirmishesDesc, index, 'green') ]]</gwn-progress>
                    <gwn-progress class="blue" progress="[[ _accumulatedScore(skirmishesDesc, index, 'blue') ]]" max="[[ _highestScore(matchup.scores) ]]">[[ _accumulatedScore(skirmishesDesc, index, 'blue') ]]</gwn-progress>
                    <gwn-progress class="red" progress="[[ _accumulatedScore(skirmishesDesc, index, 'red') ]]" max="[[ _highestScore(matchup.scores) ]]">[[ _accumulatedScore(skirmishesDesc, index, 'red') ]]</gwn-progress>
                  </td>
                  <td>
                    <gwn-progress class="green" progress="[[ skirmish.scores.green ]]" max="[[ _highestScore(skirmish.scores) ]]">[[ skirmish.scores.green ]]</gwn-progress>
                    <gwn-progress class="blue" progress="[[ skirmish.scores.blue ]]" max="[[ _highestScore(skirmish.scores) ]]">[[ skirmish.scores.blue ]]</gwn-progress>
                    <gwn-progress class="red" progress="[[ skirmish.scores.red ]]" max="[[ _highestScore(skirmish.scores) ]]">[[ skirmish.scores.red ]]</gwn-progress>
                  </td>
                  <template is="dom-repeat" items="{{ skirmish.map_scores }}">
                    <td>
                      <gwn-progress class="green" progress="[[ item.scores.green ]]" max="[[ _highestScore(item.scores) ]]">[[ item.scores.green ]]</gwn-progress>
                      <gwn-progress class="blue" progress="[[ item.scores.blue ]]" max="[[ _highestScore(item.scores) ]]">[[ item.scores.blue ]]</gwn-progress>
                      <gwn-progress class="red" progress="[[ item.scores.red ]]" max="[[ _highestScore(item.scores) ]]">[[ item.scores.red ]]</gwn-progress>
                    </td>
                  </template>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  static get properties() {
    return {
      matchup: Object,
      worlds: Array,
      skirmishesDesc: {
        type: Array,
        computed: "_reverseSkirmishes(matchup.skirmishes)"
      }
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

  _highestScore(scores) {
    if (!scores) return;
    return Math.max(scores.green, scores.blue, scores.red);
  }

  _accumulatedScore(skirmishes, index, team) {
    if (!skirmishes || index < 0 || !team) return;

    let accumulatedScores = 0;

    for (let i = index; i < skirmishes.length; i++) {
      accumulatedScores += skirmishes[i].scores[team];
    }

    return accumulatedScores;
  }

  _reverseSkirmishes(skirmishes) {
    return skirmishes.reverse();
  }

}

customElements.define('wvw-matchup', WvWMatchup);