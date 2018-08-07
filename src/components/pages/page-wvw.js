import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import { afterNextRender } from "@polymer/polymer/lib/utils/render-status.js";
import "@polymer/polymer/lib/elements/dom-repeat.js";

import "@polymer/app-route/app-location.js";
import "@polymer/app-route/app-route.js";
import "@polymer/iron-pages/iron-pages.js";
import "@polymer/paper-tabs/paper-tabs.js";
import "@polymer/paper-dropdown-menu/paper-dropdown-menu.js";
import "@polymer/paper-listbox/paper-listbox.js";
import "@polymer/paper-item/paper-item.js";

import { SharedStyles } from "../shared-styles.js";

import "../wvw/wvw-map";
import "../wvw/wvw-map-stats";
import "../wvw/wvw-region";

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

      .sticky-tabs {
        display: flex;
        align-items: flex-end;
        background-color: var(--app-primary-color);
        padding: 0 var(--spacer-large);
      }

      paper-dropdown-menu {
        flex: none;
        margin-right: var(--spacer-large);
        --iron-icon-fill-color: var(--app-text-color-light);
        --paper-input-container-color: var(--app-text-color-light);
        --paper-input-container-focus-color: var(--app-text-color-light);;
        --paper-input-container-input: {
          color: var(--app-text-color-light);
        };
        --paper-input-container-label: {
          color: var(--app-text-color-light);
        };
      }

      paper-tabs {
        flex: auto;
        --paper-tabs-selection-bar-color: #ffffff;
      }

      paper-tab {
        color: white;
      }

      wvw-map {
        height: calc(100vh - 8rem);
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

    <div class="sticky-tabs">
      <paper-dropdown-menu label="World">
        <paper-listbox slot="dropdown-content" selected="{{serverId}}" class="dropdown-content" attr-for-selected="value">
          <template is="dom-repeat" items="[[worlds]]" as="world">
            <paper-item value="[[world.id]]">[[world.name]]</paper-item>
          </template>
        </paper-listbox>
      </paper-dropdown-menu>

      <paper-tabs selected="{{subviewData.subview}}" attr-for-selected="name">
        <paper-tab name="overview">Region Overview</paper-tab>
        <paper-tab name="map">Live Map</paper-tab>
        <paper-tab name="stats">Matchup Stats</paper-tab>
        <paper-tab name="leaderboards">Leaderboards</paper-tab>
      </paper-tabs>
    </div>

    <iron-pages selected="{{subviewData.subview}}" attr-for-selected="name" fallback-selection="map">
      <div name="map">
        <wvw-map map-data="[[currentMatchup.maps]]" active="[[mapActive]]"></wvw-map>
        <!--<wvw-map-stats></wvw-map-stats>-->
      </div>
      <div name="overview">
        <wvw-region matches="[[matches]]" worlds="[[worlds]]"></wvw-region>
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
      mapActive: {
        type: Boolean,
        computed: "_checkActiveMap(subviewData)"
      },
      matches: {
        type: Array
      },
      worlds: {
        type: Array
      },
      serverId: {
        type: Number,
        value: 2011
      },
      currentMatch: {
        type: Object
      }
    };
  }

  static get observers() {
    return ["_selectedServerChanged(serverId, matches)"];
  }

  ready() {
    super.ready();

    afterNextRender(this, function() {
      const that = this;
      this._getWorlds();
      this._getMatches();
      setInterval(that._getMatches.bind(that), 5000);
    });
  }

  async _getMatches() {
    const response = await fetch(
      "https://api.guildwars2.com/v2/wvw/matches?ids=all"
    );
    const matches = await response.json();
    this.set("matches", matches);
  }

  _selectedServerChanged(serverId, matches) {
    if (!serverId || !matches) return;

    const foundMatchup = matches.filter(
      match =>
        match.all_worlds.blue.includes(serverId) ||
        match.all_worlds.red.includes(serverId) ||
        match.all_worlds.green.includes(serverId)
          ? true
          : false
    )[0];

    if (!foundMatchup)
      return console.log("No matchup was found for the server provided.");

    this.set("currentMatchup", foundMatchup);
  }

  async _getWorlds() {
    const response = await fetch(
      "https://api.guildwars2.com/v2/worlds?ids=all"
    );
    const worlds = await response.json();
    this.set("worlds", worlds);
  }

  _checkActiveMap(route) {
    return route.subview == "map" ? true : false;
  }
}

window.customElements.define("page-wvw", PageWvw);
