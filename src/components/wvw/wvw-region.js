import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "@polymer/polymer/lib/elements/dom-repeat.js";

import "./wvw-region-tier";

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

      .card,
      .title {
        padding: 0;
        max-width: 1100px;
        margin: 0 auto var(--spacer-large);
      }

      .title {
        margin-bottom: var(--spacer-small);
      }

      thead th {
        padding-bottom: 0;
      }

      .prediction {
        width: 2.5rem;
      }
    </style>

    <h2 class="title">Europe</h2>
    <div class="card">
      <div class="table-scroll">
        <table>
          <thead>
            <th class="prediction"></th>
            <th>Server</th>
            <th>Victory Points</th>
            <th>Total Score</th>
          </thead>
          <tbody>
            <template is="dom-repeat" items="{{euMatches}}">
              <wvw-region-tier match="[[ item ]]" worlds="[[ worlds ]]"></wvw-region-tier>
            </template>
          </tbody>
        </table>
      </div>
    </div>

    <h2 class="title">North America</h2>
    <div class="card">
      <div class="table-scroll">
        <table>
          <thead>
            <th class="prediction"></th>
            <th>Server</th>
            <th>Victory Points</th>
            <th>Total Score</th>
          </thead>
          <tbody>
            <template is="dom-repeat" items="{{naMatches}}">
              <wvw-region-tier match="[[ item ]]" worlds="[[ worlds ]]"></wvw-region-tier>
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
    return id.split("-")[1];
  }
}

window.customElements.define("wvw-region", WvwRegion);
