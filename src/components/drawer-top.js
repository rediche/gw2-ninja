import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import { connect } from "pwa-helpers/connect-mixin.js";

// Load redux store
import { store } from "../store.js";

// Lazy load reducers
import account from "../reducers/account.js";
store.addReducers({
  account
});

import "@polymer/paper-icon-button/paper-icon-button.js";
import "./my-icons.js";

import { SharedStyles } from "./shared-styles.js";

/**
 * `drawer-top`
 *
 * @customElement
 * @polymer
 * @demo
 *
 */
class DrawerTop extends connect(store)(PolymerElement) {
  static get template() {
    return html`
      ${SharedStyles}
      <style>
        :host {
          padding-top: 56.25%;
          position: relative;
          background-color: var(--app-primary-color);
          color: var(--app-text-color-light);
          box-shadow: var(--app-box-shadow);
        }

        .inner {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .top {
          padding: var(--spacer-small);
          display: flex;
          justify-content: flex-end;
        }

        .bottom {
          padding: var(--spacer-medium);
        }

        span {
          font-weight: 600;
        }
      </style>

      <div class="inner">
        <div class="top">
          <paper-icon-button icon="my-icons:close" on-tap="_closeDrawer" aria-label="Close menu"></paper-icon-button>
        </div>
        <div class="bottom">
          Welcome<span hidden$="[[ !accountName ]]">&nbsp;[[ accountName ]]</span>!
        </div>
      </div>
    `;
  }

  static get properties() {
    return {
      accountName: String
    };
  }

  _stateChanged(state) {
    this.set("accountName", state.account.name);
  }

  _closeDrawer() {
    this.dispatchEvent(new CustomEvent("close-drawer"));
  }
}

customElements.define("drawer-top", DrawerTop);
