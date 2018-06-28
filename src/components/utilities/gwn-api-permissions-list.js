import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "@polymer/polymer/lib/elements/dom-repeat.js";

import "@polymer/iron-icon/iron-icon.js";

import { SharedStyles } from "../shared-styles.js";
import { SettingsStyles } from "../settings/gwn-settings-styles.js";

class GWNApiPermissionsList extends PolymerElement {
  static get properties() {
    return {
      permissions: Array,
      possiblePermissions: {
        type: Array,
        value: [
          {
            name: "Trading Post",
            value: "tradingpost",
            description: "Your Trading Post transactions."
          },
          {
            name: "Characters",
            value: "characters",
            description: "Basic information about your characters."
          },
          {
            name: "Player vs Player",
            value: "pvp",
            description:
              "Your PvP stats, match history, reward track progression, and custom arena details."
          },
          {
            name: "Progression",
            value: "progression",
            description:
              "Your achievements, dungeon unlock status, mastery point assignments, and general PvE progress."
          },
          {
            name: "Wallet",
            value: "wallet",
            description: "Your account's wallet."
          },
          {
            name: "Guilds",
            value: "guilds",
            description:
              "Guilds' rosters, history, and MOTDs for all guilds you are a member of."
          },
          {
            name: "Builds",
            value: "builds",
            description:
              "Your currently equipped specializations, traits, skills, and equipment for all game modes."
          },
          {
            name: "Account",
            value: "account",
            description:
              "Your account display name, ID, home world, and list of guilds. Required permission."
          },
          {
            name: "Inventories",
            value: "inventories",
            description:
              "Your account bank, material storage, recipe unlocks, and character inventories."
          },
          {
            name: "Unlocks",
            value: "unlocks",
            description:
              "Your wardrobe unlocks—skins, dyes, minipets, finishers, etc.—and currently equipped skins."
          }
        ]
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
          margin-top: var(--spacer-large);
          font-size: .85rem;
        }

        :host([hidden]) {
          display: none;
        }

        dom-repeat {
          display: none;
        }

        .permissions-list {
          list-style-type: none;
          padding: 0;
          display: flex;
          flex-wrap: wrap;
        }

        li {
          margin-right: var(--spacer-medium);
          cursor: help;
        }

        [missing-permission] {
          opacity: 0.25;
        }
      </style>

      <hr>
      <p class="subsection">API Permissions</p>
      <ul class="permissions-list">
        <dom-repeat items="[[possiblePermissions]]" as="permission">
          <template>
            <li 
              title="[[ permission.description ]]" 
              missing-permission$="[[!_hasPermission(permission.value, permissions)]]">
              <iron-icon icon="my-icons:close" hidden$="[[_hasPermission(permission.value, permissions)]]"></iron-icon>
              <iron-icon icon="my-icons:check" hidden$="[[!_hasPermission(permission.value, permissions)]]"></iron-icon>
              [[ permission.name ]]
            </li>
          </template>
        </dom-repeat>
      </ul>
    `;
  }

  _hasPermission(permission, permissions) {
    return permissions.includes(permission);
  }
}

window.customElements.define("gwn-api-permissions-list", GWNApiPermissionsList);
