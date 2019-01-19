import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "@polymer/paper-dropdown-menu/paper-dropdown-menu.js";
import "@polymer/paper-listbox/paper-listbox.js";
import "@polymer/paper-item/paper-item.js";
import "@polymer/paper-item/paper-item-body.js";
import { SharedStyles } from "../shared-styles.js";

/**
 * `type-selector`
 *
 * @summary
 * @customElement
 * @extends {Polymer.Element}
 */
class TypeSelector extends PolymerElement {
  static get template() {
    return html`
      ${SharedStyles}
      <style>
        paper-dropdown-menu {
          width: 100%;
        }

        paper-item {
          width: 200px;
          max-width: 100%;
        }
      </style>

      <paper-dropdown-menu label="Type">
        <paper-listbox
          slot="dropdown-content"
          attr-for-selected="name"
          selected="{{ selected }}"
        >
          <paper-item name="account">Account</paper-item>
          <paper-item name="pve">PvE</paper-item>
          <paper-item name="pvp">PvP</paper-item>
          <paper-item name="tp" disabled>
            <paper-item-body two-line>
              <div>Trading Post</div>
              <div secondary>Not yet implemented.</div>
            </paper-item-body>
          </paper-item>
          <paper-item name="wallet">Wallet</paper-item>
          <paper-item name="wvw">WvW</paper-item>
        </paper-listbox>
      </paper-dropdown-menu>
    `;
  }

  /**
   * Object describing property-related metadata used by Polymer features
   */
  static get properties() {
    return {
      selected: {
        type: String,
        notify: true
      }
    };
  }
}

window.customElements.define("type-selector", TypeSelector);
