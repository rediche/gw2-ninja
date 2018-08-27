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
import "../wvw/wvw-matchup";

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

      .map {
        height: calc(100vh - 8rem);
        position: relative;
      }

      wvw-map {
        height: 100%;
        width: 100%;
      }

      wvw-map-stats {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        max-height: calc(100vh - 8rem);
        overflow: auto;
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

    <iron-pages selected="{{ subviewData.subview }}" attr-for-selected="name" fallback-selection="map">
      <div name="map" class="map">
        <wvw-map-stats selected-objective="[[ selectedObjective ]]" on-objective-close="_objectiveClose"></wvw-map-stats>
        <wvw-map map-data="[[ currentMatchup.maps ]]" active="[[ mapActive ]]" objectives="{{ objectives }}" on-objective-clicked="_objectiveClicked"></wvw-map>
      </div>
      <div name="overview">
        <wvw-region matches="[[ matches ]]" worlds="[[ worlds ]]"></wvw-region>
      </div>
      <div name="stats">
        <wvw-matchup matchup="[[ currentMatchup ]]" worlds="[[ worlds ]]"></wvw-matchup>
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
      subviewData: Object,
      theme: String,
      mapActive: {
        type: Boolean,
        computed: "_checkActiveMap(subviewData)"
      },
      matches: Array,
      worlds: Array,
      serverId: {
        type: Number,
        value: 2010
      },
      currentMatch: Object,
      objectives: Array,
      selectedObjective: Object
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
      setInterval(that._getMatches.bind(that), 10000);
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

  _objectiveClicked(e) {
    const mapStatus = this.currentMatchup.maps;
    const foundObjective = this._resolveObjectiveByName(
      e.detail.objectiveTitle
    );
    const mapContainingObjective = mapStatus.find(
      map => map.type == foundObjective.map_type
    );
    const objectiveStatus = mapContainingObjective.objectives.find(
      objective => objective.id == foundObjective.id
    );
    const selectedObjective = Object.assign(
      {},
      foundObjective,
      objectiveStatus
    );
    this.set("selectedObjective", selectedObjective);
  }

  _objectiveClose(e) {
    this.set("selectedObjective", null);
  }

  _resolveObjectiveByName(objectiveName) {
    if (!objectiveName) return;
    const objectives = this.objectives || [];
    return objectives.find(objective => objective.name == objectiveName);
  }
}

window.customElements.define("page-wvw", PageWvw);
