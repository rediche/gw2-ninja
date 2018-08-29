import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "@polymer/polymer/lib/elements/dom-repeat.js";

import "@vaadin/vaadin-grid/vaadin-grid";
import "@vaadin/vaadin-grid/vaadin-grid-sorter";

import { SharedStyles } from "../shared-styles";

/**
 * `wvw-leaderboards` render a leaderboard table for WvW.
 *
 * @customElement
 * @polymer
 * @demo
 *
 */
class WvwLeaderboards extends PolymerElement {
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
      }
    };
  }

  static get observers() {
    return ["_constructLinks(matches, worlds)"]
  }

  static get template() {
    return html`
      ${SharedStyles}
      <style>
        :host {
          display: block;
          padding: var(--spacer-large);
        }

        .card {
          padding: 0;
        }

        .column-ranking {
          width: 3rem;
        }

        .column-servername {
          width: 20rem;
        }

        vaadin-grid-cell-content {
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      </style>

      <h1 class="title">Weekly Leaderboards</h1>
      <p>Compare stats between all links on all regions.</p>

      <vaadin-grid class="card" theme="no-border" aria-label="World vs. World weekly server leaderboard" items="[[links]]" height-by-rows>
        <vaadin-grid-column width="68px" flex-grow="0">
          <template class="header">Rank</template>
          <template>[[ _baseIndexOne(index) ]]</template>
          <template class="footer">Rank</template>
        </vaadin-grid-column>

        <vaadin-grid-column>
          <template class="header">
            <vaadin-grid-sorter path="link_name">Server</vaadin-grid-sorter>
          </template>
          <template>[[ item.link_name ]]</template>
          <template class="footer">Server</template>
        </vaadin-grid-column>

        <vaadin-grid-column width="96px" flex-grow="0">
          <template class="header">
            <vaadin-grid-sorter path="region">Region</vaadin-grid-sorter>
          </template>
          <template>[[ item.region ]]</template>
          <template class="footer">Region</template>
        </vaadin-grid-column>

        <vaadin-grid-column width="68px" flex-grow="0">
          <template class="header">
            <vaadin-grid-sorter path="tier">Tier</vaadin-grid-sorter>
          </template>
          <template>[[ item.tier ]]</template>
          <template class="footer">Tier</template>
        </vaadin-grid-column>

        <vaadin-grid-column width="140px" flex-grow="0">
          <template class="header">
            <vaadin-grid-sorter path="victory_points">Victory Points</vaadin-grid-sorter>
          </template>
          <template>[[ item.victory_points ]]</template>
          <template class="footer">Victory Points</template>
        </vaadin-grid-column>

        <vaadin-grid-column width="96px" flex-grow="0">
          <template class="header">
            <vaadin-grid-sorter path="score">Score</vaadin-grid-sorter>
          </template>
          <template>[[ item.score ]]</template>
          <template class="footer">Score</template>
        </vaadin-grid-column>

        <vaadin-grid-column width="96px" flex-grow="0">
          <template class="header">
            <vaadin-grid-sorter path="kills">Kills</vaadin-grid-sorter>
          </template>
          <template>[[ item.kills ]]</template>
          <template class="footer">Kills</template>
        </vaadin-grid-column>

        <vaadin-grid-column width="96px" flex-grow="0">
          <template class="header">
            <vaadin-grid-sorter path="deaths">Deaths</vaadin-grid-sorter>
          </template>
          <template>[[ item.deaths ]]</template>
          <template class="footer">Deaths</template>
        </vaadin-grid-column>

        <vaadin-grid-column width="80px" flex-grow="0">
          <template class="header">
            <vaadin-grid-sorter path="kdr">KDR</vaadin-grid-sorter>
          </template>
          <template>[[ item.kdr ]]</template>
          <template class="footer">KDR</template>
        </vaadin-grid-column>
      </vaadin-grid>
    `;
  }

  _baseIndexOne(index) {
    return index + 1;
  }

  _constructLinks(matches, worlds) {
    if (matches.length == 0 || worlds == 0) return;
    this.set('links', matches.reduce(this._worldDataFromMatch.bind(this), []));
  }

  _worldDataFromMatch(accumulator, match) {
    const that = this;
    const colors = ["red", "blue", "green"];
    const region = match.id.split('-')[0] == 1 ? "NA" : "EU";
    const tier = match.id.split('-')[1];

    const worldData = colors.map((color) => {
      return {
        region: region,
        tier: tier,
        score: match.scores[color],
        worlds: match.all_worlds[color],
        hosting_world: match.worlds[color],
        link_name: that._generateWorldLinkNames(match.all_worlds[color], match.worlds[color], that.worlds),
        deaths: match.deaths[color],
        kills: match.kills[color],
        victory_points: match.victory_points[color],
        kdr: that._calcKDR(match.kills[color], match.deaths[color])
      }
    });

    return accumulator.concat(worldData);
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

    return linkedWorlds.length > 0 ? `${hostWorldName} (${linkedWorldsWithNames.join(', ')})` : hostWorldName;
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
}

customElements.define("wvw-leaderboards", WvwLeaderboards);
