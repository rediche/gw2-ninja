import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "@polymer/paper-dropdown-menu/paper-dropdown-menu.js";
import "@polymer/paper-listbox/paper-listbox.js";
import "@polymer/paper-item/paper-item.js";
import "@polymer/paper-item/paper-item-body.js";
import "@polymer/iron-pages/iron-pages.js";
import { SharedStyles } from "../shared-styles.js";

/**
 * `command-selector`
 *
 * @summary
 * @customElement
 * @extends {Polymer.Element}
 */
class CommandSelector extends PolymerElement {
  static get template() {
    return html`
      ${SharedStyles}
      <style>
        iron-pages,
        paper-dropdown-menu {
          width: 100%;
        }

        paper-item {
          width: 200px;
          max-width: 100%;
        }
      </style>

      <iron-pages
        attr-for-selected="type"
        selected="[[ selectedType ]]"
        fallback-selection="fallback"
      >
        <!-- ACCOUNT -->
        <paper-dropdown-menu type="account" label="[[commandLabel]]">
          <paper-listbox
            slot="dropdown-content"
            attr-for-selected="name"
            selected="{{ selectedCommand }}"
          >
            <paper-item name="age" disabled>
              <paper-item-body two-line>
                <div>Age</div>
                <div secondary>Not yet implemented.</div>
              </paper-item-body>
            </paper-item>
            <paper-item name="name">Name</paper-item>
            <paper-item name="server">Server</paper-item>
          </paper-listbox>
        </paper-dropdown-menu>

        <!-- PVE -->
        <paper-dropdown-menu type="pve" label="[[commandLabel]]">
          <paper-listbox
            slot="dropdown-content"
            attr-for-selected="name"
            selected="{{ selectedCommand }}"
          >
            <paper-item name="mastery-points">Mastery Points</paper-item>
            <paper-item name="mastery-points-tyria"
              >Mastery Points (Tyria)</paper-item
            >
            <paper-item name="mastery-points-maguuma"
              >Mastery Points (Maguuma)</paper-item
            >
            <paper-item name="fractal-level">Fractal Level</paper-item>
          </paper-listbox>
        </paper-dropdown-menu>

        <!-- PVP -->
        <paper-dropdown-menu type="pvp" label="[[commandLabel]]">
          <paper-listbox
            slot="dropdown-content"
            attr-for-selected="name"
            selected="{{ selectedCommand }}"
          >
            <paper-item name="rank">Rank</paper-item>
            <paper-item name="rating" disabled>
              <paper-item-body two-line>
                <div>Rating</div>
                <div secondary>Not yet implemented.</div>
              </paper-item-body>
            </paper-item>
          </paper-listbox>
        </paper-dropdown-menu>

        <!-- Trading Post -->
        <!--<paper-dropdown-menu type="tp" label="[[commandLabel]]">
          <paper-listbox slot="dropdown-content" attr-for-selected="name" selected="{{ selectedCommand }}">
            <paper-item name="rank">Rank</paper-item>
            <paper-item name="rating" disabled>Rating</paper-item>
          </paper-listbox>
        </paper-dropdown-menu>-->

        <!-- Wallet -->
        <paper-dropdown-menu type="wallet" label="[[commandLabel]]">
          <paper-listbox
            slot="dropdown-content"
            attr-for-selected="name"
            selected="{{ selectedCommand }}"
          >
            <paper-item name="gold">Gold</paper-item>
            <paper-item name="karma">Karma</paper-item>
            <paper-item name="laurels">Laurels</paper-item>
            <paper-item name="gems">Gems</paper-item>
            <paper-item name="badges-of-honor">Badges of Honor</paper-item>
          </paper-listbox>
        </paper-dropdown-menu>

        <!-- WVW -->
        <paper-dropdown-menu type="wvw" label="[[commandLabel]]">
          <paper-listbox
            slot="dropdown-content"
            attr-for-selected="name"
            selected="{{ selectedCommand }}"
          >
            <paper-item name="rank">Rank</paper-item>
            <paper-item name="kills">Kills</paper-item>
            <paper-item name="matchup">Matchup</paper-item>
          </paper-listbox>
        </paper-dropdown-menu>

        <!-- FALLBACK -->
        <paper-dropdown-menu type="fallback" label="[[commandLabel]]">
          <paper-listbox
            slot="dropdown-content"
            attr-for-selected="name"
            selected="{{ selectedCommand }}"
          >
            <paper-item name="select-a-type" disabled
              >Select a type first</paper-item
            >
          </paper-listbox>
        </paper-dropdown-menu>
        <iron-pages> </iron-pages
      ></iron-pages>
    `;
  }

  /**
   * Object describing property-related metadata used by Polymer features
   */
  static get properties() {
    return {
      selectedCommand: {
        type: String,
        notify: true
      },
      selectedType: {
        type: String
      },
      commandLabel: {
        type: String,
        value: "Command"
      }
    };
  }
}

window.customElements.define("command-selector", CommandSelector);
