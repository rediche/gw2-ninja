import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import { connect } from "pwa-helpers/connect-mixin.js";

// Load redux store
import { store } from "../../store.js";

// These are the actions needed by this element.
import {
  CHANGE_API_KEY,
  CHANGE_API_PERMISSIONS
} from "../../actions/settings.js";

import { CHANGE_ACCOUNT_NAME } from "../../actions/account.js";

// Lazy load reducers
import settings from "../../reducers/settings.js";
import account from "../../reducers/account.js";
store.addReducers({
  settings,
  account
});

import "@polymer/paper-input/paper-input.js";
import "@polymer/paper-item/paper-item.js";
import "../utilities/gwn-api-permissions-list.js";

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
      apiPermissions: Array,
      /* Prevent changes from being sent to redux store */
      noSave: {
        type: Boolean,
        value: false
      },
      invalid: {
        type: Boolean,
        value: false
      },
      showPermissions: {
        type: Boolean,
        value: false
      },
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
        placeholder="XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXXXXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
        error-message="API Key is not valid."
        char-counter
        invalid="[[ invalid ]]"
        maxlength="72"
        minlength="72"></paper-input>

      <gwn-api-permissions-list permissions="[[ apiPermissions ]]" hidden$="[[ !showPermissions ]]"></gwn-api-permissions-list>
    `;
  }

  async _apiKeyChanged(apiKey) {
    if (!apiKey) return;

    if (!this.apiPatternValidation(apiKey)) return this.set("invalid", true);

    const tokenInfo = await this.fetchTokenInfo(apiKey);

    if (!tokenInfo) return this.set("invalid", true);

    this.set("invalid", false);

    if (this.noSave) return;

    store.dispatch({
      type: CHANGE_API_KEY,
      apiKey: apiKey
    });

    store.dispatch({
      type: CHANGE_API_PERMISSIONS,
      apiPermissions: tokenInfo.permissions
    });

    const accountInfo = await this.fetchAccountInfo(apiKey);
    
    if (!accountInfo) return;

    store.dispatch({
      type: CHANGE_ACCOUNT_NAME,
      name: accountInfo.name
    });
  }

  _stateChanged(state) {
    if (!state || !state.settings) return;
    this.set("apiKey", state.settings.apiKey);
    this.set("apiPermissions", state.settings.apiPermissions);
  }

  apiPatternValidation(apiKey) {
    if (!apiKey) return false;
    const apiKeyPattern = /^[^\W_]{8}-[^\W_]{4}-[^\W_]{4}-[^\W_]{4}-[^\W_]{20}-[^\W_]{4}-[^\W_]{4}-[^\W_]{4}-[^\W_]{12}$/;
    return apiKeyPattern.test(apiKey);
  }

  async fetchTokenInfo(apiKey) {
    const url = `https://api.guildwars2.com/v2/tokeninfo?access_token=${apiKey}`;
    const response = await fetch(url);

    if (response.status !== 200) return false;

    const json = await response.json();

    return json;
  }

  async fetchAccountInfo(apiKey) {
    const url = `https://api.guildwars2.com/v2/account?access_token=${apiKey}`;
    const response = await fetch(url);

    if (response.status !== 200) return false;

    const json = await response.json();

    return json;
  }
}

window.customElements.define("gwn-setting-api-key", GWNSettingApiKey);
