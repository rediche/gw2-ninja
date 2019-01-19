import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "@polymer/paper-dropdown-menu/paper-dropdown-menu.js";
import "@polymer/paper-listbox/paper-listbox.js";
import "@polymer/paper-item/paper-item.js";

import { connect } from "pwa-helpers/connect-mixin.js";

// Load redux store
import { store } from "../../store.js";

// These are the actions needed by this element.
import { changeTimer } from "../../actions/settings.js";

// Lazy load reducers
import settings from "../../reducers/settings.js";
store.addReducers({
  settings
});

import { SharedStyles } from "../shared-styles.js";
import { SettingsStyles } from "./gwn-settings-styles.js";

class GWNSettingTimer extends connect(store)(PolymerElement) {
  static get properties() {
    return {
      timer: {
        type: String,
        value: "normal",
        observer: "_timerChanged"
      }
    };
  }

  static get template() {
    return html`
      ${SharedStyles} ${SettingsStyles}

      <paper-dropdown-menu label="Timer size">
        <paper-listbox
          slot="dropdown-content"
          class="dropdown-content"
          selected="{{timer}}"
          attr-for-selected="value"
        >
          <paper-item value="normal">Normal</paper-item>
          <paper-item value="compact">Compact</paper-item>
        </paper-listbox>
      </paper-dropdown-menu>
    `;
  }

  _timerChanged(timer) {
    if (!timer) return;
    store.dispatch(changeTimer(timer));
  }

  _stateChanged(state) {
    if (!state || !state.settings) return;
    this.set("timer", state.settings.timer);
  }
}

window.customElements.define("gwn-setting-timer", GWNSettingTimer);
