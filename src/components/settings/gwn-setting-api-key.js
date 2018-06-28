import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "@polymer/paper-input/paper-input.js";
import "@polymer/paper-item/paper-item.js";

import { connect } from 'pwa-helpers/connect-mixin.js';

// Load redux store
import { store } from '../../store.js';

// These are the actions needed by this element.
import { CHANGE_API_KEY } from '../../actions/settings.js';

// Lazy load reducers
import settings from '../../reducers/settings.js';
store.addReducers({
  settings
});

import { SharedStyles } from "../shared-styles.js";
import { SettingsStyles } from "./gwn-settings-styles.js";

class GWNSettingApiKey extends connect(store)(PolymerElement) {
  static get properties() {
    return {
      apiKey: {
        type: String,
        notify: true,
        observer: "_apiKeyChanged"
      },
      /* Prevent changes from being sent to redux store */
      noSave: {
        type: Boolean,
        value: false
      }
    };
  }

  static get template() {
    return html`
      ${SharedStyles}
      ${SettingsStyles}
      <style>
        :host {
          display: block;
        }

        :host([hidden]) {
          display: none;
        }

        paper-input {
          width: 100%;
        }
      </style>

      <paper-input 
        label="Guild Wars 2 API Key" 
        value="{{ apiKey }}"
        placeholder="XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXXXXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"></paper-input>
    `;
  }

  _apiKeyChanged(apiKey) {
    if (!apiKey || this.noSave) return;
    store.dispatch({
      type: CHANGE_API_KEY,
      apiKey: apiKey
    });
  }

  _stateChanged(state) {
    if (!state || !state.settings) return;
    this.set('apiKey', state.settings.apiKey);
  }
}

window.customElements.define("gwn-setting-api-key", GWNSettingApiKey);
