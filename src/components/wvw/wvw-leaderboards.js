import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "@polymer/polymer/lib/elements/dom-repeat.js";

import { SharedStyles } from "../shared-styles";
import { SharedTableStyles } from "../shared-table-styles";

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
      },
      sortBy: {
        type: String,
        value: "sortByVictoryPointsDesc"
      }
    };
  }

  static get observers() {
    return ["_constructLinks(matches, worlds)"]
  }

  static get template() {
    return html`
      ${SharedStyles}
      ${SharedTableStyles}
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
      </style>
      <h1 class="title">Weekly Leaderboards</h1>
      <p>Compare stats between all links on all regions.</p>
      <div class="table-scroll card">
        <table>
          <thead>
            <th class="column-ranking">#</th>
            <th>Server</th>
            <th>Region</th>
            <th>Tier</th>
            <th>Victory Points</th>
            <th>Score</th>
            <th>Kills</th>
            <th>Deaths</th>
            <th>KDR</th>
          </thead>
          <tbody>
            <template is="dom-repeat" items="[[links]]" as="link" sort="[[sortBy]]">
              <tr>
                <td class="column-ranking">[[ _baseIndexOne(index) ]]</td>
                <td class="no-text-overflow">[[ _generateWorldLinkNames(link.worlds, link.hosting_world, worlds) ]]</td>
                <td>[[ link.region ]]</td>
                <td>[[ link.tier ]]</td>
                <td>[[ link.victory_points ]]</td>
                <td>[[ link.score ]]</td>
                <td>[[ link.kills ]]</td>
                <td>[[ link.deaths ]]</td>
                <td>[[ _calcKDR(link.kills, link.deaths) ]]</td>
              <tr>
            </template>
          </tbody>
        </table>
      </div>
      
    `;
  }

  _baseIndexOne(index) {
    return index + 1;
  }

  sortByVictoryPointsAsc(a, b) {
    return a.victory_points - b.victory_points;
  }

  sortByVictoryPointsDesc(a, b) {
    return b.victory_points - a.victory_points;
  }

  _constructLinks(matches, worlds) {
    if (matches.length == 0 || worlds == 0) return;
    this.set('links', matches.reduce(this._worldDataFromMatch, []))
  }

  _worldDataFromMatch(accumulator, match) {
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
        deaths: match.deaths[color],
        kills: match.kills[color],
        victory_points: match.victory_points[color]
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
