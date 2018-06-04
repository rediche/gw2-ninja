import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import { afterNextRender } from "@polymer/polymer/lib/utils/render-status.js";
import "@polymer/polymer/lib/elements/dom-repeat.js";
import moment from "moment/src/moment.js";
import "@polymer/app-route/app-location.js";
import "@polymer/app-route/app-route.js";
import "@polymer/paper-tabs/paper-tabs.js";
import { SharedStyles } from "../shared-styles.js";

class PageTimer extends PolymerElement {
  static get is() {
    return "page-timer";
  }

  static get template() {
    return html`
    ${SharedStyles}
    <style>
    :host {
      display: block;
    }

    paper-tabs {
      margin-bottom: var(--spacer-large);
      background-color: var(--app-primary-color);
      --paper-tabs-selection-bar-color: #ffffff;
    }

    paper-tab {
      color: white;
    }

    .meta-container {
      overflow: hidden;
      position: relative;
      font-size: .75rem;
      padding: 3.75rem 0 .25rem;
    }

    .pointer {
      position: absolute;
      height: 100%;
      border-left: 2px solid #F44336;
      z-index: 400;
      top: 0;
      transition: left 1s ease-in-out;
      color: white;
    }

    .pointer > span {
      position: absolute;
      padding: .25rem .375rem;
    }
    
    .pointer > span strong {
      position: absolute;
      top: 1.75rem;
      font-weight: 800;
      color: #B9B9B9;
      width: 10rem;
    }

    .pointer > span.server {
      left: 0;
      background: #F44336;
    }

    .pointer > span.server strong {
      left: .375rem;
    }

    .pointer > span.local {
      right: .125rem;
      background: #B6B6B6;
    }

    .pointer > span.local strong {
      right: .375rem;
      text-align: right;
    }

    .bar {
      display: flex;
      flex-wrap: nowrap;
      margin-bottom: 1rem;
      overflow: hidden;
    }

    .meta-name {
      font-weight: 800;
      margin: 0 0 .25rem;
      margin-left: var(--spacer-medium);
    }

    .phase {
      padding: .5rem;
      box-sizing: border-box;
    }

    .phase-name {
      font-weight: 800;
    }

    @media screen and (min-width: 640px) {
      :host {
        padding-bottom: var(--spacer-large);
      }
    }
  </style>

  <app-location route="{{route}}"></app-location>
  <app-route route="{{route}}" pattern="/timer/:subview" data="{{subviewData}}"></app-route>

  <paper-tabs class="sticky-tabs" selected="{{ subviewData.subview }}" attr-for-selected="name" fallback-selection="all">
    <paper-tab name="all">All</paper-tab>
    <paper-tab name="core">Core</paper-tab>
    <paper-tab name="heart-of-thorns">Heart of Thorns</paper-tab>
    <paper-tab name="path-of-fire">Path of Fire</paper-tab>
    <paper-tab name="other">Other</paper-tab>
  </paper-tabs>

  <div class="meta-container">
    <div class="pointer" style$="left: [[ pointerPosition ]]%;">
      <span class="server"><strong>Server time</strong><span>[[ pointerTime ]]</span></span>
      <span class="local"><strong>Your time</strong><span>[[ pointerLocalTime ]]</span></span>
    </div>

    <template is="dom-repeat" items="[[ metas ]]" as="meta">
      <div hidden$="[[ _metaCategoryMatchesSelected(meta.category, subviewData.subview) ]]">
        <p class="meta-name">[[ meta.name ]]</p>
        <div class="bar">

          <template is="dom-repeat" items="[[ meta.phases ]]" as="phase">
            <div class="phase" style$="background: [[ phase.color ]]; width:[[ _calcPhaseWidth(phase.duration) ]]%;">  
              <div class="phase-time">[[ phase.hour ]]:[[ phase.minute ]]</div>
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
    return 100 * duration / 120;
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
        phase.minute = ("00" + offset % 60).slice(-2);
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
    let percentOfTwoHours = (hour % 2 + minute / 60) * 50;

    // Set the text and move the pointer to that %
    this.set("pointerTime", hour + ":" + minute);
    this.set("pointerLocalTime", localHour + ":" + localMinute);
    this.set("pointerPosition", percentOfTwoHours);
  }
}

window.customElements.define(PageTimer.is, PageTimer);
