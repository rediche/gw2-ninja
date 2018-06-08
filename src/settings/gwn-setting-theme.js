import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "@polymer/paper-dropdown-menu/paper-dropdown-menu.js";
import "@polymer/paper-listbox/paper-listbox.js";
import "@polymer/paper-item/paper-item.js";
import "../utilities/gwn-sync-settings.js";
import { SharedStyles } from "../shared-styles.js";
import { SettingsStyles } from "./gwn-settings-styles.js";

class GWNSettingTheme extends PolymerElement {
  static get properties() {
    return {
      theme: {
        type: String
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
        <paper-listbox slot="dropdown-content" class="dropdown-content" selected="{{theme}}" attr-for-selected="value">
          <paper-item value="core">Guild Wars 2 (Red)</paper-item>
          <paper-item value="hot">Heart of Thorns (Green)</paper-item>
          <paper-item value="pof">Path of Fire (Purple)</paper-item>
        </paper-listbox>
      </paper-dropdown-menu>

      <gwn-sync-settings 
        value="{{theme}}"
        setting="gwn-theme"></gwn-sync-settings>
    `;
  }
}

window.customElements.define("gwn-setting-theme", GWNSettingTheme);
