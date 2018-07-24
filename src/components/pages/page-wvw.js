import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "@polymer/app-route/app-location.js";
import "@polymer/app-route/app-route.js";
import "@polymer/iron-pages/iron-pages.js";
import "@polymer/paper-tabs/paper-tabs.js";

import { SharedStyles } from "../shared-styles.js";

import "../wvw/wvw-map";
import "../wvw/wvw-map-stats";

/**
 * `page-wvw`
 *
 * @summary
 * @customElement
 * @extends {Polymer.Element}
 */
class PageWvw extends PolymerElement {
  static get template() {
    return html`
    ${SharedStyles}
    <style>
      :host {
        display: block;
        position: relative;
      }

      paper-tabs {
        background-color: var(--app-primary-color);
        --paper-tabs-selection-bar-color: #ffffff;
      }

      paper-tab {
        color: white;
      }

      wvw-map {
        height: calc(100vh - 7rem);
      }

      wvw-map-stats {
        z-index: 1000;
        position: absolute;
        top: calc(3rem + var(--spacer-large));
        left: var(--spacer-large);
      }
    </style>

    <app-location route="{{route}}"></app-location>
    <app-route route="{{route}}" pattern="/wvw/:subview" data="{{subviewData}}"></app-route>

    <paper-tabs class="sticky-tabs" selected="{{subviewData.subview}}" attr-for-selected="name">
      <paper-tab name="overview">Region Overview</paper-tab>
      <paper-tab name="map">Live Map</paper-tab>
      <paper-tab name="stats">Matchup Stats</paper-tab>
      <paper-tab name="leaderboards">Leaderboards</paper-tab>
    </paper-tabs>

    <iron-pages selected="{{subviewData.subview}}" attr-for-selected="name" fallback-selection="map">
      <div name="map">
        <wvw-map></wvw-map>
        <!--<wvw-map-stats></wvw-map-stats>-->
      </div>
      <div name="overview">
        Region Overview, overview of the different matches in your region (EU or NA)
      </div>
      <div name="stats">
        Matchup Stats, tables, graphs etc of your current matchup
      </div>
      <div name="leaderboards">
        Leaderboards. Compare stats between all servers on all regions.
      </div>
    </iron-pages>
    `;
  }

  /**
   * Object describing property-related metadata used by Polymer features
   */
  static get properties() {
    return {
      subviewData: {
        type: Object
      },
      theme: {
        type: String
      }
    };
  }

  /**
   * Instance of the element is created/upgraded. Use: initializing state,
   * set up event listeners, create shadow dom.
   * @constructor
   */
  constructor() {
    super();
  }

  /**
   * Use for one-time configuration of your component after local DOM is initialized.
   */
  ready() {
    super.ready();
  }
}

window.customElements.define("page-wvw", PageWvw);
