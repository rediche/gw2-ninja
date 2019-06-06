import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import { afterNextRender } from "@polymer/polymer/lib/utils/render-status.js";
import "@polymer/polymer/lib/elements/dom-repeat.js";
import moment from "moment/src/moment.js";
import "@polymer/app-route/app-location.js";
import "@polymer/app-route/app-route.js";
import "@polymer/paper-tabs/paper-tabs.js";
import '@polymer/paper-button/paper-button.js';
import { SharedStyles } from "../shared-styles.js";

import { connect } from 'pwa-helpers/connect-mixin.js';

// Load redux store
import { store } from '../../store.js';

// Lazy load reducers
import settings from '../../reducers/settings.js';
store.addReducers({
  settings
});

class PageTimer extends connect(store)(PolymerElement) {
  static get template() {
    return html`
      ${SharedStyles}
      <style>
        :host {
          display: block;
        }

        paper-tabs {
          margin-bottom: var(--spacer-large);
          background-color: var(--gwn-primary);
          --paper-tabs-selection-bar-color: var(--gwn-on-primary);
        }

        paper-tab {
          color: white;
        }

        .meta-container {
          overflow: hidden;
          position: relative;
          font-size: 0.75rem;
          padding: 3.75rem 0 0.25rem;
        }

        .pointer {
          position: absolute;
          height: 100%;
          border-left: 2px solid var(--color-guild-wars-2);
          z-index: 400;
          top: 0;
          transition: left 1s ease-in-out;
          color: #ffffff;
        }

        .pointer > span {
          position: absolute;
          padding: 0.25rem 0.375rem;
        }

        .pointer > span strong {
          position: absolute;
          top: 1.75rem;
          font-weight: 800;
          color: var(--gwn-on-background);
          width: 10rem;
        }

        .pointer > span.server {
          left: 0;
          background-color: var(--color-guild-wars-2);
          border-top-right-radius: var(--gwn-border-radius);
          border-bottom-right-radius: var(--gwn-border-radius);
        }

        .pointer > span.server strong {
          left: 0.375rem;
        }

        .pointer > span.local {
          right: 0.125rem;
          background-color: #efefef;
          color: var(--gwn-text-dark);
          border-top-left-radius: var(--gwn-border-radius);
          border-bottom-left-radius: var(--gwn-border-radius);
        }

        .pointer > span.local strong {
          right: 0.375rem;
          text-align: right;
        }

        .bar {
          display: flex;
          flex-wrap: nowrap;
          margin-bottom: var(--spacer-medium);
        }

        .meta-name {
          font-weight: 800;
          margin: 0 0 0.25rem;
          margin-left: var(--spacer-medium);
          color: var(--gwn-on-background);
        }

        .phase {
          padding: 0.5rem;
          margin: 0 .125rem;
          border-radius: var(--gwn-border-radius);
          box-shadow: var(--gwn-box-shadow);
          overflow: hidden;
        }

        .phase-name {
          font-weight: 800;
        }

        :host([size="compact"]) .phase-name {
          display: inline;
        }

        :host([size="compact"]) .bar {
          margin-bottom: .75rem;
        }
      </style>

      <app-location route="{{route}}"></app-location>
      <app-route
        route="{{route}}"
        pattern="/timer/:subview"
        data="{{subviewData}}"
      ></app-route>

      <paper-tabs
        class="sticky-tabs"
        selected="{{ subviewData.subview }}"
        attr-for-selected="name"
        fallback-selection="all"
      >
        <paper-tab name="all">All</paper-tab>
        <paper-tab name="core">Core</paper-tab>
        <paper-tab name="heart-of-thorns">Heart of Thorns</paper-tab>
        <paper-tab name="path-of-fire">Path of Fire</paper-tab>
        <paper-tab name="other">Other</paper-tab>
      </paper-tabs>

      <div class="meta-container">
        <div class="pointer" style$="left: [[ pointerPosition ]]%;">
          <span class="server"
            ><strong>Server time</strong><span>[[ pointerTime ]]</span></span
          >
          <span class="local"
            ><strong>Your time</strong><span>[[ pointerLocalTime ]]</span></span
          >
        </div>

        <template is="dom-repeat" items="[[ metas ]]" as="meta">
          <div
            class="meta"
            hidden$="[[ _metaCategoryMatchesSelected(meta.category, subviewData.subview) ]]"
          >
            <p class="meta-name">[[ meta.name ]]</p>
            <div class="bar">
              <template is="dom-repeat" items="[[ meta.phases ]]" as="phase">
                <div
                  class="phase"
                  style$="background: [[ phase.color ]]; color: [[ _textColor(phase.text) ]]; width:calc([[ _calcPhaseWidth(phase.duration) ]]% - .25rem);"
                >
                  <div class="phase-time" hidden$="[[ _isCompact(size) ]]">
                    [[ phase.hour ]]:[[ phase.minute ]]
                  </div>
                  <div class="phase-name">[[ phase.name ]]</div>
                </div>
              </template>
            </div>
          </div>
        </template>
      </div>
    `;
  }

  static get properties() {
    return {
      metas: {
        type: Array,
        observer: "_updateTimes"
      },
      pointerTime: {
        type: String
      },
      pointerLocalTime: {
        type: String
      },
      pointerPosition: {
        type: Number
      },
      size: {
        type: String,
        reflectToAttribute: true
      }
    };
  }

  ready() {
    super.ready();

    afterNextRender(this, function() {
      this._loadMetas();
      this._movePointer();
    });
  }

  _isCompact(size) {
    return size === "compact";
  }

  _textColor(textColor) {
    return textColor === "light" ? "white" : "black";
  }

  _metaCategoryMatchesSelected(category, selectedMeta) {
    if (selectedMeta == "all") return false;
    return category == selectedMeta ? false : true;
  }

  async _loadMetas() {
    const metasData = await fetch("/src/data/metas.json");
    const metasJson = await metasData.json();

    this.set("metas", metasJson);

    setInterval(this._updateTimes, 10000);

    // Make sure reference to this is kept when calling _movePointer()
    let that = this;
    setInterval(function() {
      that._movePointer();
    }, 10000);
  }

  _calcPhaseWidth(duration) {
    return (100 * duration) / 120;
  }

  _updateTimes(latestMetas) {
    if (!latestMetas && !this.metas) return;

    let that = this;
    let metas = latestMetas || this.metas;
    let currentTime = moment.utc();
    let startHour = Math.floor(currentTime.hour() / 2) * 2;

    metas.forEach(function(meta, index) {
      let offset = 0;

      meta.phases.forEach(function(phase, phaseIndex) {
        let correctedTime = "" + (startHour + (offset > 59 ? 1 : 0));
        phase.hour = ("00" + correctedTime).slice(-2);
        phase.minute = ("00" + (offset % 60)).slice(-2);
        offset += phase.duration;
      });

      that.set(`metas.${index}`, meta);
    });
  }

  _movePointer() {
    // Get the time (server time = UTC time)
    let currentTime = moment.utc();
    let localTime = moment();

    // Format with leading 0s so 09:08 doesn't end up as 9:8
    let hour = ("00" + currentTime.hour()).slice(-2);
    let minute = ("00" + currentTime.minute()).slice(-2);

    let localHour = ("00" + localTime.hour()).slice(-2);
    let localMinute = ("00" + localTime.minute()).slice(-2);

    // How far along are we (in  % ) of the current 2 hour event cycles?
    let percentOfTwoHours = ((hour % 2) + minute / 60) * 50;

    // Set the text and move the pointer to that %
    this.set("pointerTime", hour + ":" + minute);
    this.set("pointerLocalTime", localHour + ":" + localMinute);
    this.set("pointerPosition", percentOfTwoHours);
  }

  _stateChanged(state) {
    if (!state || !state.settings) return;
    this.set('size', state.settings.timer);
  }
}

window.customElements.define("page-timer", PageTimer);
