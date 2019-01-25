import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "@vaadin/vaadin-grid/vaadin-grid";
import "../utilities/gwn-progress";
import { hasWorld } from "../utilities/gwn-misc-utils";
import { SharedStyles } from "../shared-styles.js";
import { connect } from "pwa-helpers/connect-mixin.js";
import { store } from "../../store.js";
import settings from "../../reducers/settings.js";
store.addReducers({
  settings
});

/**
 * `wvw-region-table` renders a table of matches.
 *
 * @customElement
 * @polymer
 * @demo
 *
 */
class WvwRegionTable extends connect(store)(PolymerElement) {
  static get properties() {
    return {
      matches: Array,
      worlds: Array,
      ownWorld: Number,
      theme: String
    };
  }

  static get template() {
    return html`
      ${SharedStyles}
      <style>
        :host {
          display: block;
        }

        .own-world {
          font-weight: 600;
        }

        gwn-progress {
          font-size: 0.75rem;
          line-height: initial;
        }

        gwn-progress:nth-child(2n) {
          margin: 6px 0;
        }

        gwn-progress.green {
          --gwn-progress-color: var(--team-green);
        }

        gwn-progress.blue {
          --gwn-progress-color: var(--team-blue);
        }

        gwn-progress.red {
          --gwn-progress-color: var(--team-red);
        }

        vaadin-grid-cell-content {
          line-height: 24px;
        }
      </style>

      <vaadin-grid
        theme$="no-border row-stripes [[theme]]"
        height-by-rows
        items="[[matches]]"
      >
        <vaadin-grid-column width="56px" flex-grow="0">
          <template class="header"></template>
          <template>
            <div>
              <iron-icon
                icon$="[[_isWinningOrLoosingMatchup(item, 'green')]]"
              ></iron-icon>
            </div>
            <div>
              <iron-icon
                icon$="[[_isWinningOrLoosingMatchup(item, 'blue')]]"
              ></iron-icon>
            </div>
            <div>
              <iron-icon
                icon$="[[_isWinningOrLoosingMatchup(item, 'red')]]"
              ></iron-icon>
            </div>
          </template>
          <template class="footer"></template>
        </vaadin-grid-column>

        <vaadin-grid-column>
          <template class="header"
            >World</template
          >
          <template>
            <div
              class$="no-text-overflow [[_addOwnWorldClass(ownWorld, item.all_worlds, 'green')]]"
            >
              [[ _generateWorldLinkNames(item.all_worlds.green,
              item.worlds.green, worlds) ]]
            </div>
            <div
              class$="no-text-overflow [[_addOwnWorldClass(ownWorld, item.all_worlds, 'blue')]]"
            >
              [[ _generateWorldLinkNames(item.all_worlds.blue, item.worlds.blue,
              worlds) ]]
            </div>
            <div
              class$="no-text-overflow [[_addOwnWorldClass(ownWorld, item.all_worlds, 'red')]]"
            >
              [[ _generateWorldLinkNames(item.all_worlds.red, item.worlds.red,
              worlds) ]]
            </div>
          </template>
          <template class="footer"
            >World</template
          >
        </vaadin-grid-column>

        <vaadin-grid-column>
          <template class="header"
            >Skirmish Score</template
          >
          <template>
            <gwn-progress
              class="green"
              progress="[[_latestSkirmishScore(item, 'green')]]"
              max="[[_highestSkirmishScoreInMatchup(item)]]"
              >[[_latestSkirmishScore(item, 'green')]]</gwn-progress
            >
            <gwn-progress
              class="blue"
              progress="[[_latestSkirmishScore(item, 'blue')]]"
              max="[[_highestSkirmishScoreInMatchup(item)]]"
              >[[_latestSkirmishScore(item, 'blue')]]</gwn-progress
            >
            <gwn-progress
              class="red"
              progress="[[_latestSkirmishScore(item, 'red')]]"
              max="[[_highestSkirmishScoreInMatchup(item)]]"
              >[[_latestSkirmishScore(item, 'red')]]</gwn-progress
            >
          </template>
          <template class="footer"
            >Skirmish Score</template
          >
        </vaadin-grid-column>

        <vaadin-grid-column>
          <template class="header"
            >Victory Points</template
          >
          <template>
            <gwn-progress
              class="green"
              progress="[[item.victory_points.green]]"
              max="[[_highestVictoryPointsInMatchup(item)]]"
              >[[item.victory_points.green]]</gwn-progress
            >
            <gwn-progress
              class="blue"
              progress="[[item.victory_points.blue]]"
              max="[[_highestVictoryPointsInMatchup(item)]]"
              >[[item.victory_points.blue]]</gwn-progress
            >
            <gwn-progress
              class="red"
              progress="[[item.victory_points.red]]"
              max="[[_highestVictoryPointsInMatchup(item)]]"
              >[[item.victory_points.red]]</gwn-progress
            >
          </template>
          <template class="footer"
            >Victory Points</template
          >
        </vaadin-grid-column>

        <vaadin-grid-column>
          <template class="header"
            >Total Score</template
          >
          <template>
            <gwn-progress
              class="green"
              progress="[[item.scores.green]]"
              max="[[_highestScoreInMatchup(item)]]"
              >[[item.scores.green]]</gwn-progress
            >
            <gwn-progress
              class="blue"
              progress="[[item.scores.blue]]"
              max="[[_highestScoreInMatchup(item)]]"
              >[[item.scores.blue]]</gwn-progress
            >
            <gwn-progress
              class="red"
              progress="[[item.scores.red]]"
              max="[[_highestScoreInMatchup(item)]]"
              >[[item.scores.red]]</gwn-progress
            >
          </template>
          <template class="footer"
            >Total Score</template
          >
        </vaadin-grid-column>
      </vaadin-grid>
    `;
  }

  _addOwnWorldClass(ownWorld, allWorlds, color) {
    if (!ownWorld || !allWorlds || !color) return "";
    if (hasWorld(ownWorld, allWorlds[color])) return "own-world";
    return "";
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

  _stateChanged({ settings }) {
    if (!settings) return;
    this.set("theme", settings.theme);
  }
}

customElements.define("wvw-region-table", WvwRegionTable);
