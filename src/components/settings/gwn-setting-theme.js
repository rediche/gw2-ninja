import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "@polymer/paper-dropdown-menu/paper-dropdown-menu.js";
import "@polymer/paper-listbox/paper-listbox.js";
import "@polymer/paper-item/paper-item.js";

import { connect } from "pwa-helpers/connect-mixin.js";

// Load redux store
import { store } from "../../store.js";

// These are the actions needed by this element.
import { changeTheme } from "../../actions/settings.js";

// Lazy load reducers
import settings from "../../reducers/settings.js";
store.addReducers({
  settings
});

import { SharedStyles } from "../shared-styles.js";
import { SettingsStyles } from "./gwn-settings-styles.js";

class GWNSettingTheme extends connect(store)(PolymerElement) {
  static get properties() {
    return {
      theme: {
        type: String,
        value: "pof",
        observer: "_themeChanged"
      }
    };
  }

  static get template() {
    return html`
      ${SharedStyles} ${SettingsStyles}
      <style>
        [value="core"] {
          background-color: var(--color-guild-wars-2);
          color: var(--app-text-color-light);
        }

        [value="core"]:hover {
          background-color: var(--color-guild-wars-2-dark);
        }

        [value="hot"] {
          background-color: var(--color-heart-of-thorns);
          color: var(--app-text-color-light);
        }

        [value="hot"]:hover {
          background-color: var(--color-heart-of-thorns-dark);
        }

        [value="pof"] {
          background-color: var(--color-path-of-fire);
          color: var(--app-text-color-light);
        }

        [value="pof"]:hover {
          background-color: var(--color-path-of-fire-dark);
        }
      </style>

      <paper-dropdown-menu class="theme-selector" label="Theme Color">
        <paper-listbox
          slot="dropdown-content"
          class="dropdown-content"
          selected="{{theme}}"
          attr-for-selected="value"
        >
          <paper-item value="core">Guild Wars 2 (Red)</paper-item>
          <paper-item value="hot">Heart of Thorns (Green)</paper-item>
          <paper-item value="pof">Path of Fire (Purple)</paper-item>
        </paper-listbox>
      </paper-dropdown-menu>
    `;
  }

  _themeChanged(theme) {
    if (!theme) return;
    store.dispatch(changeTheme(theme));
  }

  _stateChanged(state) {
    if (!state || !state.settings) return;
    this.set("theme", state.settings.theme);
  }
}

window.customElements.define("gwn-setting-theme", GWNSettingTheme);
