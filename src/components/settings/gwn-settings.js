import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "@polymer/paper-dropdown-menu/paper-dropdown-menu.js";
import "@polymer/paper-listbox/paper-listbox.js";
import "@polymer/paper-item/paper-item.js";
import "../utilities/gwn-modal.js";
import "./gwn-setting-theme.js";
import "./gwn-setting-timer.js";
import "./gwn-setting-lang.js";
import "./gwn-setting-api-key.js";
import { SharedStyles } from "../shared-styles.js";
import { SettingsStyles } from "./gwn-settings-styles.js";

class GWNSettings extends PolymerElement {
  static get properties() {
    return {
      open: {
        type: Boolean,
        notify: true
      }
    };
  }

  static get template() {
    return html`
      ${SharedStyles} ${SettingsStyles}
      <style>
        .headline {
          margin-bottom: 0;
          font-weight: bold;
        }
      </style>
      <gwn-modal hidden="{{!open}}">
        <h3 class="headline" slot="title">Settings</h3>
        <div slot="content">
          <p class="section">General</p>
          <gwn-setting-theme></gwn-setting-theme>
          <gwn-setting-timer></gwn-setting-timer>

          <p class="section">API</p>
          <gwn-setting-lang></gwn-setting-lang>
          <gwn-setting-api-key show-permissions></gwn-setting-api-key>
        </div>
      </gwn-modal>
    `;
  }
}

window.customElements.define("gwn-settings", GWNSettings);
