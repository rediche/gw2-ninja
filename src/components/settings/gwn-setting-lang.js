import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "@polymer/paper-dropdown-menu/paper-dropdown-menu.js";
import "@polymer/paper-listbox/paper-listbox.js";
import "@polymer/paper-item/paper-item.js";

import { connect } from 'pwa-helpers/connect-mixin.js';

// Load redux store
import { store } from '../../store.js';

// These are the actions needed by this element.
import { changeLanguage } from '../../actions/settings.js';

// Lazy load reducers
import settings from '../../reducers/settings.js';
store.addReducers({
  settings
});

import { SharedStyles } from "../shared-styles.js";
import { SettingsStyles } from "./gwn-settings-styles.js";

class GWNSettingLang extends connect(store)(PolymerElement) {
  static get properties() {
    return {
      language: {
        type: String,
        value: "en",
        observer: "_languageChanged"
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
      </style>

      <paper-dropdown-menu label="API Language">
        <paper-listbox slot="dropdown-content" class="dropdown-content" selected="{{language}}" attr-for-selected="value">
          <paper-item value="en">English</paper-item>
          <paper-item value="es">Español</paper-item>
          <paper-item value="de">Deutsch</paper-item>
          <paper-item value="fr">Français</paper-item>
        </paper-listbox>
      </paper-dropdown-menu>
    `;
  }

  _languageChanged(language) {
    if (!language) return;
    store.dispatch(changeLanguage(language));
  }

  _stateChanged(state) {
    if (!state || !state.settings) return;
    this.set('language', state.settings.language);
  }
}

window.customElements.define("gwn-setting-lang", GWNSettingLang);
