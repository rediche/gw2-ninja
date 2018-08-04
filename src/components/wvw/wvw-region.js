import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "@polymer/polymer/lib/elements/dom-repeat.js";

import { SharedStyles } from "../shared-styles.js";

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
    <style>
      :host {
        display: block;
        padding: var(--spacer-large);
      }

      .card {
        margin-bottom: var(--spacer-medium);
      }

      table {
        width: 100%;
      }

      th {
        text-align: left;
      }
    </style>

    <div class="card">
      <h2 class="title">Europe</h2>
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
              <td>[[ _generateWorldLinkNames(item.all_worlds.green, item.worlds.green, worlds) ]]</td>
            </tr>
            <tr>
              <td></td>
              <td>[[ _generateWorldLinkNames(item.all_worlds.blue, item.worlds.blue, worlds) ]]</td>
            </tr>
            <tr>
              <td></td>
              <td>[[ _generateWorldLinkNames(item.all_worlds.red, item.worlds.red, worlds) ]]</td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>

    <div class="card">
      <h2 class="title">North America</h2>
      <p>Region Overview, overview of the different matches in your region (EU or NA)</p>
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
