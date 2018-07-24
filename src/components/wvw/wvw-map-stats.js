import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";

import { SharedStyles } from "../shared-styles.js";

/**
 * `wvw-map-stats`
 *
 * @summary
 * @customElement
 * @extends {Polymer.Element}
 */
class WvwMapStats extends PolymerElement {
  static get template() {
    return html`
    ${SharedStyles}
    <style>
      :host {
        display: block;
        max-width: 20rem;
      }

      .card {
        width: 100vw;
        max-width: 20rem;
      }

      .card:not(:last-child) {
        margin-bottom: var(--spacer-medium);
      }

    </style>

    <div class="card">
      <h2 class="title">Eternal Battlegrounds</h2>
    </div>

    <div class="card">
      <h2 class="title">Red Borderland</h2>
    </div>

    <div class="card">
      <h2 class="title">Green Borderland</h2>
    </div>

    <div class="card">
      <h2 class="title">Blue Borderland</h2>
    </div>
    
    `;
  }

  /**
   * Object describing property-related metadata used by Polymer features
   */
  static get properties() {
    return {};
  }

  /**
   * Use for one-time configuration of your component after local DOM is initialized.
   */
  ready() {
    super.ready();
  }
}

window.customElements.define("wvw-map-stats", WvwMapStats);
