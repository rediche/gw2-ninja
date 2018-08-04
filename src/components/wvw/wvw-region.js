import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "@polymer/polymer/lib/elements/dom-repeat.js";

import { SharedStyles } from "../shared-styles.js";
import { SharedTableStyles } from "../shared-table-styles.js";

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
    <style>
      :host {
        display: block;
        padding: var(--spacer-large);
      }

      .card {
        margin-bottom: var(--spacer-medium);
        padding: 0;
      }

      .title {
        padding: var(--spacer-medium) var(--spacer-medium) 0;
      }
    </style>

    <div class="card">
      <h2 class="title">Europe</h2>
      <div class="table-scroll">
        <table>
          <thead>
            <th>#</th>
            <th>Server</th>
            <th>Victory Points</th>
            <th>Total Score</th>
          </thead>
          <tbody>
            <template is="dom-repeat" items="{{euMatches}}">
              <tr>
                <td></td>
                <td>
                  <div>[[ _generateWorldLinkNames(item.all_worlds.green, item.worlds.green, worlds) ]]</div>
                  <div>[[ _generateWorldLinkNames(item.all_worlds.blue, item.worlds.blue, worlds) ]]</div>
                  <div>[[ _generateWorldLinkNames(item.all_worlds.red, item.worlds.red, worlds) ]]</div>
                </td>
                <td>
                  <div>[[ item.victory_points.green ]]</div>
                  <div>[[ item.victory_points.blue ]]</div>
                  <div>[[ item.victory_points.red ]]</div>
                </td>
                <td>
                  <div>[[ item.scores.green ]]</div>
                  <div>[[ item.scores.blue ]]</div>
                  <div>[[ item.scores.red ]]</div>
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
            <th>#</th>
            <th>Server</th>
            <th>Victory Points</th>
            <th>Total Score</th>
          </thead>
          <tbody>
            <template is="dom-repeat" items="{{naMatches}}">
              <tr>
                <td></td>
                <td>
                  <div>[[ _generateWorldLinkNames(item.all_worlds.green, item.worlds.green, worlds) ]]</div>
                  <div>[[ _generateWorldLinkNames(item.all_worlds.blue, item.worlds.blue, worlds) ]]</div>
                  <div>[[ _generateWorldLinkNames(item.all_worlds.red, item.worlds.red, worlds) ]]</div>
                </td>
                <td>
                  <div>[[ item.victory_points.green ]]</div>
                  <div>[[ item.victory_points.blue ]]</div>
                  <div>[[ item.victory_points.red ]]</div>
                </td>
                <td>
                  <div>[[ item.scores.green ]]</div>
                  <div>[[ item.scores.blue ]]</div>
                  <div>[[ item.scores.red ]]</div>
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
}

window.customElements.define("wvw-region", WvwRegion);
