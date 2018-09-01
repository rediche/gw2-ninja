import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import { connect } from "pwa-helpers/connect-mixin.js";
import { afterNextRender } from "@polymer/polymer/lib/utils/render-status.js";
import "@polymer/polymer/lib/elements/dom-repeat.js";

// Load redux store
import { store } from "../../store.js";

// Lazy load reducers
import settings from "../../reducers/settings.js";
import account from "../../reducers/account.js";
store.addReducers({
  settings,
  account
});

import "@polymer/app-route/app-location.js";
import "@polymer/app-route/app-route.js";
import "@polymer/iron-pages/iron-pages.js";
import "@polymer/paper-tabs/paper-tabs.js";
import "@polymer/paper-dropdown-menu/paper-dropdown-menu.js";
import "@polymer/paper-listbox/paper-listbox.js";
import "@polymer/paper-item/paper-item.js";

import { SharedStyles } from "../shared-styles.js";

import { getMatches } from "../utilities/gwn-wvw-utils";
import { getWorlds } from "../utilities/gwn-misc-utils";

import "../wvw/wvw-map";
import "../wvw/wvw-map-stats";
import "../wvw/wvw-region";
import "../wvw/wvw-matchup";
import "../wvw/wvw-leaderboards";

/**
 * `page-wvw`
 *
 * @summary
 * @customElement
 * @extends {Polymer.Element}
 */
class PageWvw extends connect(store)(PolymerElement) {
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
        flex-direction: column;
        align-items: flex-end;
        background-color: var(--app-primary-color);
      }

      paper-dropdown-menu {
        width: 100%;
        padding: 0 var(--spacer-large);
        --iron-icon-fill-color: var(--app-text-color-light);
        --paper-input-container-color: var(--app-text-color-light);
        --paper-input-container-focus-color: var(--app-text-color-light);;
        --paper-input-container-input: {
          color: var(--app-text-color-light);
        };
        --paper-input-container-label: {
          color: var(--app-text-color-light);
        };
        --paper-font-caption: {
          font-family: var(--app-font-stack);
        }
        --paper-input-container-shared-input-style: {
          font-family: var(--app-font-stack);
        }
        --paper-font-subhead: {
          font-family: var(--app-font-stack);
        }
      }

      paper-tabs {
        width: 100%;
        flex: auto;
        --paper-tabs-selection-bar-color: #ffffff;
      }

      paper-tab {
        font-family: var(--app-font-stack);
        color: white;
      }

      paper-tab.iron-selected,
      paper-tab[focused] {
        font-weight: 600;
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

      .error-msg {
        margin: var(--spacer-medium);
        font-weight: 600;
      }

      @media screen and (min-width: 768px) {
        .sticky-tabs {
          flex-direction: row;
          padding: 0 var(--spacer-large);
        }

        paper-dropdown-menu {
          padding: 0;
          width: auto;
          flex: none;
          margin-right: var(--spacer-large);
        }

        paper-tabs {
          width: auto;
        }
      }
    </style>

    <app-location route="{{route}}"></app-location>
    <app-route route="{{route}}" pattern="/wvw/:subview" data="{{subviewData}}"></app-route>

    <div class="sticky-tabs">
      <paper-dropdown-menu label="Select World">
        <paper-listbox slot="dropdown-content" selected="{{serverId}}" class="dropdown-content" attr-for-selected="value">
          <template is="dom-repeat" items="[[worlds]]" as="world">
            <paper-item value="[[world.id]]">[[world.name]]</paper-item>
          </template>
        </paper-listbox>
      </paper-dropdown-menu>

      <paper-tabs selected="{{subviewData.subview}}" attr-for-selected="name">
        <paper-tab name="overview">Region Overview</paper-tab>
        <paper-tab name="map" disable="[[_serverSelected(serverId)]]">Live Map</paper-tab>
        <paper-tab name="stats" disable="[[_serverSelected(serverId)]]">Matchup Stats</paper-tab>
        <paper-tab name="leaderboards">Leaderboards</paper-tab>
      </paper-tabs>
    </div>

    <iron-pages selected="{{ subviewData.subview }}" attr-for-selected="name" fallback-selection="map">
      <div name="map" class="map">
        <div class="error-msg text-center" hidden$="[[serverId]]">Please select a server in the dropdown above.</div>
        <wvw-map-stats selected-objective="[[ selectedObjective ]]" on-objective-close="_objectiveClose"></wvw-map-stats>
        <wvw-map map-data="[[ currentMatchup.maps ]]" active="[[ mapActive ]]" added-objectives="{{ objectives }}" on-objective-clicked="_objectiveClicked"></wvw-map>
      </div>
      <div name="overview">
        <wvw-region matches="[[ matches ]]" worlds="[[ worlds ]]" own-world="[[serverId]]"></wvw-region>
      </div>
      <div name="stats">
        <div class="error-msg text-center" hidden$="[[serverId]]">Please select a server in the dropdown above.</div>
        <wvw-matchup matchup="[[ currentMatchup ]]" worlds="[[ worlds ]]" hidden$="[[!serverId]]"></wvw-matchup>
      </div>
      <div name="leaderboards">
        <wvw-leaderboards matches="[[ matches ]]" worlds="[[ worlds ]]" own-world="[[serverId]]"></wvw-leaderboards>
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
        type: Number
      },
      currentMatch: Object,
      objectives: Array,
      selectedObjective: Object,
      matchesInterval: Object
    };
  }

  static get observers() {
    return ["_selectedServerChanged(serverId, matches)"];
  }

  ready() {
    super.ready();

    afterNextRender(this, function() {
      const that = this;

      getMatches().then(matches => this.set("matches", matches));
      setInterval(() => {
        getMatches().then(matches => that.set("matches", matches));
      }, 10000);
    });
  }

  _serverSelected(serverId) {
    return !serverId ? false : true;
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

  _stateChanged({ settings, account }) {
    if (!settings.language) {
      getWorlds().then(worlds => this.set("worlds", worlds));
    } else {
      getWorlds(settings.language).then(worlds => this.set("worlds", worlds));
    }

    if (!account.world) return;
    this.set("serverId", account.world);
  }
}

window.customElements.define("page-wvw", PageWvw);
