import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";

import "@vaadin/vaadin-grid/vaadin-grid";

import "../utilities/gwn-progress";
import "./wvw-region-table";

import { hasWorld } from "../utilities/gwn-misc-utils";

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

      .card,
      .title {
        padding: 0;
        max-width: 1100px;
        margin: 0 auto var(--spacer-large);
      }

      .title {
        margin-bottom: var(--spacer-small);
      }
    </style>

    <h2 class="title">Europe</h2>
    <wvw-region-table class="card" matches="[[_regionalMatches(matches, 2)]]" worlds="[[worlds]]" own-world="[[ownWorld]]"></wvw-region-table>

    <h2 class="title">North America</h2>
    <wvw-region-table class="card" matches="[[_regionalMatches(matches, 1)]]" worlds="[[worlds]]" own-world="[[ownWorld]]"></wvw-region-table>
   
    `;
  }

  /**
   * Object describing property-related metadata used by Polymer features
   */
  static get properties() {
    return {
      worlds: Array,
      matches: Array,
      ownWorld: Number
    };
  }

  _regionalMatches(matches, regionalNumber) {
    return matches.filter(match => {
      return match.id.charAt() == regionalNumber;
    });
  }
}

window.customElements.define("wvw-region", WvwRegion);
