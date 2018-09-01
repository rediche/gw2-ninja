import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";

import "@vaadin/vaadin-grid/vaadin-grid";

import "../utilities/gwn-progress";

import { hasWorld } from "../utilities/gwn-misc-utils";

import { SharedStyles } from "../shared-styles.js";
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
    ${SharedWvwStyles}
    <style>
      :host {
        display: block;
        padding: var(--spacer-large);
      }

      .card,
      .title {
        padding: 0;
        max-width: 1100px;
        margin: 0 auto var(--spacer-large);
      }

      .title {
        margin-bottom: var(--spacer-small);
      }

      gwn-progress {
        font-size: .75rem;
        line-height: initial;
      }

      gwn-progress:nth-child(2n) {
        margin: 6px 0;
      }

      .own-world {
        font-weight: 600;
      }

      vaadin-grid-cell-content {
        line-height: 24px;
      }
    </style>

    <h2 class="title">Europe</h2>
    <vaadin-grid class="card" theme="no-border row-stripes" height-by-rows items="[[euMatches]]">
      <vaadin-grid-column width="56px" flex-grow="0">
        <template class="header"></template>
        <template>
          <div><iron-icon icon$="[[_isWinningOrLoosingMatchup(item, 'green')]]"></iron-icon></div>
          <div><iron-icon icon$="[[_isWinningOrLoosingMatchup(item, 'blue')]]"></iron-icon></div>
          <div><iron-icon icon$="[[_isWinningOrLoosingMatchup(item, 'red')]]"></iron-icon></div>
        </template>
        <template class="footer"></template>
      </vaadin-grid-column>

      <vaadin-grid-column>
        <template class="header">World</template>
        <template>
          <div class$="no-text-overflow [[_addOwnWorldClass(ownWorld, item.all_worlds, 'green')]]">[[ _generateWorldLinkNames(item.all_worlds.green, item.worlds.green, worlds) ]]</div>
          <div class$="no-text-overflow [[_addOwnWorldClass(ownWorld, item.all_worlds, 'blue')]]">[[ _generateWorldLinkNames(item.all_worlds.blue, item.worlds.blue, worlds) ]]</div>
          <div class$="no-text-overflow [[_addOwnWorldClass(ownWorld, item.all_worlds, 'red')]]">[[ _generateWorldLinkNames(item.all_worlds.red, item.worlds.red, worlds) ]]</div>  
        </template>
        <template class="footer">World</template>
      </vaadin-grid-column>

      <vaadin-grid-column>
        <template class="header">Skirmish Score</template>
        <template>
          <gwn-progress class="green" progress="[[_latestSkirmishScore(item, 'green')]]" max="[[_highestSkirmishScoreInMatchup(item)]]">[[_latestSkirmishScore(item, 'green')]]</gwn-progress>
          <gwn-progress class="blue" progress="[[_latestSkirmishScore(item, 'blue')]]" max="[[_highestSkirmishScoreInMatchup(item)]]">[[_latestSkirmishScore(item, 'blue')]]</gwn-progress>
          <gwn-progress class="red" progress="[[_latestSkirmishScore(item, 'red')]]" max="[[_highestSkirmishScoreInMatchup(item)]]">[[_latestSkirmishScore(item, 'red')]]</gwn-progress>
        </template>
        <template class="footer">Skirmish Score</template>
      </vaadin-grid-column>

      <vaadin-grid-column>
        <template class="header">Victory Points</template>
        <template>
          <gwn-progress class="green" progress="[[item.victory_points.green]]" max="[[_highestVictoryPointsInMatchup(item)]]">[[item.victory_points.green]]</gwn-progress>
          <gwn-progress class="blue" progress="[[item.victory_points.blue]]" max="[[_highestVictoryPointsInMatchup(item)]]">[[item.victory_points.blue]]</gwn-progress>
          <gwn-progress class="red" progress="[[item.victory_points.red]]" max="[[_highestVictoryPointsInMatchup(item)]]">[[item.victory_points.red]]</gwn-progress>
        </template>
        <template class="footer">Victory Points</template>
      </vaadin-grid-column>

      <vaadin-grid-column>
        <template class="header">Total Score</template>
        <template>
          <gwn-progress class="green" progress="[[item.scores.green]]" max="[[_highestScoreInMatchup(item)]]">[[item.scores.green]]</gwn-progress>
          <gwn-progress class="blue" progress="[[item.scores.blue]]" max="[[_highestScoreInMatchup(item)]]">[[item.scores.blue]]</gwn-progress>
          <gwn-progress class="red" progress="[[item.scores.red]]" max="[[_highestScoreInMatchup(item)]]">[[item.scores.red]]</gwn-progress>
        </template>
        <template class="footer">Total Score</template>
      </vaadin-grid-column>
    </vaadin-grid>

    <h2 class="title">North America</h2>
    <vaadin-grid class="card" theme="no-border row-stripes" height-by-rows items="[[naMatches]]">
      <vaadin-grid-column width="56px" flex-grow="0">
        <template class="header"></template>
        <template>
          <div><iron-icon icon$="[[_isWinningOrLoosingMatchup(item, 'green')]]"></iron-icon></div>
          <div><iron-icon icon$="[[_isWinningOrLoosingMatchup(item, 'blue')]]"></iron-icon></div>
          <div><iron-icon icon$="[[_isWinningOrLoosingMatchup(item, 'red')]]"></iron-icon></div>
        </template>
        <template class="footer"></template>
      </vaadin-grid-column>

      <vaadin-grid-column>
        <template class="header">World</template>
        <template>
          <div class$="no-text-overflow [[_addOwnWorldClass(ownWorld, item.all_worlds, 'green')]]">[[ _generateWorldLinkNames(item.all_worlds.green, item.worlds.green, worlds) ]]</div>
          <div class$="no-text-overflow [[_addOwnWorldClass(ownWorld, item.all_worlds, 'blue')]]">[[ _generateWorldLinkNames(item.all_worlds.blue, item.worlds.blue, worlds) ]]</div>
          <div class$="no-text-overflow [[_addOwnWorldClass(ownWorld, item.all_worlds, 'red')]]">[[ _generateWorldLinkNames(item.all_worlds.red, item.worlds.red, worlds) ]]</div>  
        </template>
        <template class="footer">World</template>
      </vaadin-grid-column>

      <vaadin-grid-column>
        <template class="header">Skirmish Score</template>
        <template>
          <gwn-progress class="green" progress="[[_latestSkirmishScore(item, 'green')]]" max="[[_highestSkirmishScoreInMatchup(item)]]">[[_latestSkirmishScore(item, 'green')]]</gwn-progress>
          <gwn-progress class="blue" progress="[[_latestSkirmishScore(item, 'blue')]]" max="[[_highestSkirmishScoreInMatchup(item)]]">[[_latestSkirmishScore(item, 'blue')]]</gwn-progress>
          <gwn-progress class="red" progress="[[_latestSkirmishScore(item, 'red')]]" max="[[_highestSkirmishScoreInMatchup(item)]]">[[_latestSkirmishScore(item, 'red')]]</gwn-progress>
        </template>
        <template class="footer">Skirmish Score</template>
      </vaadin-grid-column>

      <vaadin-grid-column>
        <template class="header">Victory Points</template>
        <template>
          <gwn-progress class="green" progress="[[item.victory_points.green]]" max="[[_highestVictoryPointsInMatchup(item)]]">[[item.victory_points.green]]</gwn-progress>
          <gwn-progress class="blue" progress="[[item.victory_points.blue]]" max="[[_highestVictoryPointsInMatchup(item)]]">[[item.victory_points.blue]]</gwn-progress>
          <gwn-progress class="red" progress="[[item.victory_points.red]]" max="[[_highestVictoryPointsInMatchup(item)]]">[[item.victory_points.red]]</gwn-progress>
        </template>
        <template class="footer">Victory Points</template>
      </vaadin-grid-column>

      <vaadin-grid-column>
        <template class="header">Total Score</template>
        <template>
          <gwn-progress class="green" progress="[[item.scores.green]]" max="[[_highestScoreInMatchup(item)]]">[[item.scores.green]]</gwn-progress>
          <gwn-progress class="blue" progress="[[item.scores.blue]]" max="[[_highestScoreInMatchup(item)]]">[[item.scores.blue]]</gwn-progress>
          <gwn-progress class="red" progress="[[item.scores.red]]" max="[[_highestScoreInMatchup(item)]]">[[item.scores.red]]</gwn-progress>
        </template>
        <template class="footer">Total Score</template>
      </vaadin-grid-column>
    </vaadin-grid>
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
      },
      ownWorld: Number
    };
  }

  _addOwnWorldClass(ownWorld, allWorlds, color) {
    if (!ownWorld || !allWorlds || !color) return "";
    if (hasWorld(ownWorld, allWorlds[color])) return "own-world";
    return "";
  }

  _regionalMatches(matches, regionalNumber) {
    return matches.filter(match => {
      return match.id.charAt() == regionalNumber;
    });
  }

  _getTierFromID(id) {
    return id.split("-")[1];
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

    return linkedWorlds.length > 0
      ? `${hostWorldName} (${linkedWorldsWithNames.join(", ")})`
      : hostWorldName;
  }

  _resolveWorldName(worldId, worlds) {
    if (!worldId || !worlds) return;
    const foundWorld = worlds.find(world => world.id == worldId);
    return foundWorld.name;
  }

  _isWinningOrLoosingMatchup(match, color) {
    if (
      match.victory_points[color] == this._highestVictoryPointsInMatchup(match)
    )
      return "my-icons:chevron-up";
    if (
      match.victory_points[color] == this._lowestVictoryPointsInMatchup(match)
    )
      return "my-icons:chevron-down";
    return "my-icons:minus";
  }

  _highestVictoryPointsInMatchup(matchup) {
    return Math.max(
      matchup.victory_points.green,
      matchup.victory_points.red,
      matchup.victory_points.blue
    );
  }

  _lowestVictoryPointsInMatchup(matchup) {
    return Math.min(
      matchup.victory_points.green,
      matchup.victory_points.red,
      matchup.victory_points.blue
    );
  }

  _highestScoreInMatchup(matchup) {
    return Math.max(
      matchup.scores.green,
      matchup.scores.red,
      matchup.scores.blue
    );
  }

  /**
   * Return the highest skirmish score in a matchup.
   * 
   * @param {Object} match
   * @param {Array} match.skirmishes
   * @returns {Number}
   */
  _highestSkirmishScoreInMatchup({ skirmishes }) {
    if (!skirmishes) return;
    const red = skirmishes[skirmishes.length - 1].scores.red;
    const green = skirmishes[skirmishes.length - 1].scores.green;
    const blue = skirmishes[skirmishes.length - 1].scores.blue;
    return Math.max(red, blue, green);
  }

  /**
   * Return the latest skirmish score for color in match.
   * 
   * @param {Object} match
   * @param {Array} match.skirmishes 
   * @param {String} color 
   * @returns {Number}
   */
  _latestSkirmishScore({ skirmishes }, color) {
    return skirmishes[skirmishes.length - 1].scores[color];
  }
}

window.customElements.define("wvw-region", WvwRegion);
