import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "@polymer/paper-dropdown-menu/paper-dropdown-menu.js";
import "@polymer/paper-listbox/paper-listbox.js";
import "@polymer/paper-item/paper-item.js";
import "../utilities/gwn-modal.js";
import "../utilities/gwn-sync-settings.js";

class GWNSettings extends PolymerElement {
  static get properties() {
    return {
      open: {
        type: Boolean,
        notify: true
      },
      language: {
        type: String
      }
    };
  }

  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }

        :host([hidden]) {
          display: none;
        }

        paper-dropdown-menu {
          display: block;
        }
      </style>
      <gwn-modal hidden="{{!open}}">
        <h3 slot="title">Settings</h3>
        <div slot="content">
          <paper-dropdown-menu label="API Language">
            <paper-listbox slot="dropdown-content" class="dropdown-content" selected="{{language}}" attr-for-selected="value">
              <paper-item value="en">English</paper-item>
              <paper-item value="es">Español</paper-item>
              <paper-item value="de">Deutsch</paper-item>
              <paper-item value="fr">Français</paper-item>
            </paper-listbox>
          </paper-dropdown-menu>
        </div>
      </gwn-modal>

      <gwn-sync-settings 
        value="{{language}}"
        setting="gwn-lang"></gwn-sync-settings>
    `;
  }
}

window.customElements.define("gwn-settings", GWNSettings);