import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";

import "@vaadin/vaadin-grid/vaadin-grid";
import "@vaadin/vaadin-grid/vaadin-grid-sorter";

import { hasWorld } from "../utilities/gwn-misc-utils";

import { SharedStyles } from "../shared-styles";

import { connect } from "pwa-helpers/connect-mixin.js";

// Load redux store
import { store } from "../../store.js";

import settings from "../../reducers/settings.js";
store.addReducers({
  settings
});

/**
 * `wvw-leaderboards` render a leaderboard table for WvW.
 *
 * @customElement
 * @polymer
 * @demo
 *
 */
class WvwLeaderboards extends connect(store)(PolymerElement) {
  static get properties() {
    return {
      worlds: {
        type: Array,
        value: []
      },
      matches: {
        type: Array,
        value: []
      },
      links: {
        type: Array,
        value: []
      },
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
          padding: var(--spacer-large);
        }

        .container {
          max-width: 1100px;
          margin: 0 auto var(--spacer-large);
        }

        .title {
          margin-bottom: 0;
          color: var(--gwn-on-background);
        }

        .card {
          padding: 0;
        }

        vaadin-grid-cell-content {
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        p {
          color: var(--gwn-on-background);
        }

        .own-world {
          font-weight: 600;
        }
      </style>

      <div class="container">
        <h1 class="title">Weekly Leaderboards</h1>
        <p>Compare stats between all links on all regions.</p>

        <div class="card">
          <vaadin-grid
            theme$="no-border row-stripes [[theme]]"
            aria-label="World vs. World weekly server leaderboard"
            items="[[links]]"
            height-by-rows
          >
            <vaadin-grid-column>
              <template class="header">
                <vaadin-grid-sorter path="link_name">Worlds</vaadin-grid-sorter>
              </template>
              <template
                ><div class$="[[_addOwnWorldClass(ownWorld, item.worlds)]]">
                  [[ item.link_name ]]
                </div></template
              >
              <template class="footer"
                >Worlds</template
              >
            </vaadin-grid-column>

            <vaadin-grid-column width="96px" flex-grow="0">
              <template class="header">
                <vaadin-grid-sorter path="region">Region</vaadin-grid-sorter>
              </template>
              <template
                ><div class$="[[_addOwnWorldClass(ownWorld, item.worlds)]]">
                  [[ item.region ]]
                </div></template
              >
              <template class="footer"
                >Region</template
              >
            </vaadin-grid-column>

            <vaadin-grid-column width="68px" flex-grow="0">
              <template class="header">
                <vaadin-grid-sorter path="tier">Tier</vaadin-grid-sorter>
              </template>
              <template
                ><div class$="[[_addOwnWorldClass(ownWorld, item.worlds)]]">
                  [[ item.tier ]]
                </div></template
              >
              <template class="footer"
                >Tier</template
              >
            </vaadin-grid-column>

            <vaadin-grid-column width="140px" flex-grow="0">
              <template class="header">
                <vaadin-grid-sorter path="victory_points"
                  >Victory Points</vaadin-grid-sorter
                >
              </template>
              <template
                ><div class$="[[_addOwnWorldClass(ownWorld, item.worlds)]]">
                  [[ item.victory_points ]]
                </div></template
              >
              <template class="footer"
                >Victory Points</template
              >
            </vaadin-grid-column>

            <vaadin-grid-column width="96px" flex-grow="0">
              <template class="header">
                <vaadin-grid-sorter path="score">Score</vaadin-grid-sorter>
              </template>
              <template
                ><div class$="[[_addOwnWorldClass(ownWorld, item.worlds)]]">
                  [[ item.score ]]
                </div></template
              >
              <template class="footer"
                >Score</template
              >
            </vaadin-grid-column>

            <vaadin-grid-column width="96px" flex-grow="0">
              <template class="header">
                <vaadin-grid-sorter path="kills">Kills</vaadin-grid-sorter>
              </template>
              <template
                ><div class$="[[_addOwnWorldClass(ownWorld, item.worlds)]]">
                  [[ item.kills ]]
                </div></template
              >
              <template class="footer"
                >Kills</template
              >
            </vaadin-grid-column>

            <vaadin-grid-column width="96px" flex-grow="0">
              <template class="header">
                <vaadin-grid-sorter path="deaths">Deaths</vaadin-grid-sorter>
              </template>
              <template
                ><div class$="[[_addOwnWorldClass(ownWorld, item.worlds)]]">
                  [[ item.deaths ]]
                </div></template
              >
              <template class="footer"
                >Deaths</template
              >
            </vaadin-grid-column>

            <vaadin-grid-column width="80px" flex-grow="0">
              <template class="header">
                <vaadin-grid-sorter path="kdr">KDR</vaadin-grid-sorter>
              </template>
              <template
                ><div class$="[[_addOwnWorldClass(ownWorld, item.worlds)]]">
                  [[ item.kdr ]]
                </div></template
              >
              <template class="footer"
                >KDR</template
              >
            </vaadin-grid-column>
          </vaadin-grid>
        </div>
      </div>
    `;
  }

  static get observers() {
    return ["_constructLinks(matches, worlds)"];
  }

  _constructLinks(matches, worlds) {
    if (matches.length == 0 || worlds == 0) return;
    this.set("links", matches.reduce(this._worldDataFromMatch.bind(this), []));
  }

  _worldDataFromMatch(accumulator, match) {
    const that = this;
    const colors = ["red", "blue", "green"];
    const region = match.id.split("-")[0] == 1 ? "NA" : "EU";
    const tier = match.id.split("-")[1];

    const worldData = colors.map(color => {
      return {
        region: region,
        tier: tier,
        score: match.scores[color],
        worlds: match.all_worlds[color],
        hosting_world: match.worlds[color],
        link_name: that._generateWorldLinkNames(
          match.all_worlds[color],
          match.worlds[color],
          that.worlds
        ),
        deaths: match.deaths[color],
        kills: match.kills[color],
        victory_points: match.victory_points[color],
        kdr: that._calcKDR(match.kills[color], match.deaths[color])
      };
    });

    return accumulator.concat(worldData);
  }

  _addOwnWorldClass(ownWorld, allWorlds) {
    if (!ownWorld || !allWorlds) return "";
    if (hasWorld(ownWorld, allWorlds)) return "own-world";
    return "";
  }

  /* TODO: Move to a utility file because it's used in multiple components */
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

  /* TODO: Move to a utility file because it's used in multiple components */
  _resolveWorldName(worldId, worlds) {
    if (!worldId || !worlds) return;
    const foundWorld = worlds.find(world => world.id == worldId);
    return foundWorld.name;
  }

  /* TODO: Move to a utility file because it's used in multiple components */
  _calcKDR(kills, deaths) {
    if (!kills || !deaths) return;
    return parseFloat(Math.round((kills / deaths) * 100) / 100).toFixed(2);
  }

  _stateChanged({ settings }) {
    if (!settings) return;
    this.set("theme", settings.theme);
  }
}

customElements.define("wvw-leaderboards", WvwLeaderboards);
