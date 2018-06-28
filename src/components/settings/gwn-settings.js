import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "@polymer/paper-dropdown-menu/paper-dropdown-menu.js";
import "@polymer/paper-listbox/paper-listbox.js";
import "@polymer/paper-item/paper-item.js";
import "../utilities/gwn-modal.js";
import "./gwn-setting-theme.js";
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
      ${SharedStyles}
      ${SettingsStyles}
      <style>
        :host {
          display: block;
        }

        :host([hidden]) {
          display: none;
        }

        .headline {
          margin-bottom: 0;
          font-weight: bold;
        }
      </style>
      <gwn-modal hidden="{{!open}}">
        <h3 class="headline" slot="title">Settings</h3>
        <div slot="content">
          <gwn-setting-lang></gwn-setting-lang>
          <gwn-setting-theme></gwn-setting-theme>
          <gwn-setting-api-key></gwn-setting-api-key>
        </div>
      </gwn-modal>
    `;
  }
}

window.customElements.define("gwn-settings", GWNSettings);
