import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "@polymer/app-route/app-location.js";
import "@polymer/app-route/app-route.js";
import "@polymer/iron-pages/iron-pages.js";
import "@polymer/paper-tabs/paper-tabs.js";
import { SharedStyles } from "../shared-styles.js";
import "../wvw/wvw-map";

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
    </style>

    <app-location route="{{route}}"></app-location>
    <app-route route="{{route}}" pattern="/wvw/:subview" data="{{subviewData}}"></app-route>

    <paper-tabs class="sticky-tabs" selected="{{subviewData.subview}}" attr-for-selected="name">
      <paper-tab name="map">Live Map</paper-tab>
      <paper-tab name="test1">Test 1</paper-tab>
      <paper-tab name="test2">Test 2</paper-tab>
    </paper-tabs>

    <iron-pages selected="{{subviewData.subview}}" attr-for-selected="name" fallback-selection="map">
      <wvw-map name="map"></wvw-map>
      <div name="test1">Test 1</div>
      <div name="test2">Test 2</div>
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
