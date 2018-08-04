import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import { afterNextRender } from "@polymer/polymer/lib/utils/render-status.js";

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
        <wvw-map map-data="[[currentMatchup.maps]]"></wvw-map>
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
      },
      matches: {
        type: Array
      },
      serverId: {
        type: Number,
        value: 2010
      },
      currentMatch: {
        type: Object
      }
    };
  }

  static get observers() {
    return [
      "_selectedServerChanged(serverId, matches)"
    ]
  }

  ready() {
    super.ready();

    afterNextRender(this, function() {
      const that = this;
      this._getMatches();
      setInterval(that._getMatches.bind(that), 5000);
    });
  }

  async _getMatches() {
    const response = await fetch("https://api.guildwars2.com/v2/wvw/matches?ids=all");
    const matches = await response.json();
    this.set('matches', matches);
  }

  _selectedServerChanged(serverId, matches) {
    if (!serverId || !matches) return;

    const foundMatchup = matches.filter(match => (match.all_worlds.blue.includes(serverId) || match.all_worlds.red.includes(serverId) || match.all_worlds.green.includes(serverId)) ? true : false)[0];

    if (!foundMatchup) return console.log("No matchup was found for the server provided.");

    this.set('currentMatchup', foundMatchup);

  }
}

window.customElements.define("page-wvw", PageWvw);
