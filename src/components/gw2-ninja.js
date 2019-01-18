import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import { afterNextRender } from "@polymer/polymer/lib/utils/render-status.js";
import {
  setPassiveTouchGestures,
  setRootPath
} from "@polymer/polymer/lib/utils/settings.js";
import { GestureEventListeners } from "@polymer/polymer/lib/mixins/gesture-event-listeners.js";
import "@polymer/app-layout/app-drawer/app-drawer.js";
import "@polymer/app-layout/app-drawer-layout/app-drawer-layout.js";
import "@polymer/app-layout/app-header/app-header.js";
import "@polymer/app-layout/app-header-layout/app-header-layout.js";
import "@polymer/app-layout/app-scroll-effects/app-scroll-effects.js";
import "@polymer/app-layout/app-toolbar/app-toolbar.js";
import "@polymer/app-route/app-location.js";
import "@polymer/app-route/app-route.js";
import "@polymer/iron-pages/iron-pages.js";
import "@polymer/iron-selector/iron-selector.js";
import "@polymer/iron-icon/iron-icon.js";
import "@polymer/paper-icon-button/paper-icon-button.js";
import "@polymer/paper-item/paper-item.js";
import "@polymer/paper-toast/paper-toast.js";
import "./page-metadata.js";
import "./my-icons.js";
import "./online-status.js";
import "./drawer-top";
import "./settings/gwn-settings.js";
import "./collections/collection-modal.js";

import { connect } from "pwa-helpers/connect-mixin.js";

// Load redux store
import { store } from "../store.js";

// Lazy load reducers
import settings from "../reducers/settings.js";
store.addReducers({
  settings
});

import { SharedStyles } from "./shared-styles.js";

// Gesture events like tap and track generated from touch will not be
// preventable, allowing for better scrolling performance.
setPassiveTouchGestures(true);

// Set Polymer's root path to the same value we passed to our service worker
// in `index.html`.
setRootPath(MyAppGlobals.rootPath);

class GW2Ninja extends connect(store)(GestureEventListeners(PolymerElement)) {
  static get properties() {
    return {
      page: {
        type: String,
        reflectToAttribute: true,
        observer: "_pageChanged"
      },
      drawer: {
        type: Boolean,
        value: false
      },
      onlineStatus: {
        type: Boolean
      },
      settingsOpen: {
        type: Boolean,
        value: false
      },
      theme: {
        type: String,
        reflectToAttribute: true
      }
    };
  }

  static get template() {
    return html`
      ${SharedStyles}
      <style>
        :host {
          display: block;
          background-color: var(--gwn-background);
          min-height: 100vh;

          /* Colors */
          --color-guild-wars-2: #c62828;
          --color-guild-wars-2-dark: #b71c1c;

          --color-heart-of-thorns: #2e7d32;
          --color-heart-of-thorns-dark: #1b5e20;

          --color-path-of-fire: #9c27b0;
          --color-path-of-fire-dark: #6a1b9a;

          --team-green: #4caf50;
          --team-blue: #1976d2;
          --team-red: #e53935;

          /* Main variables */
          /* --app-primary-color: var(--color-path-of-fire);
          --app-primary-color-dark: var(--color-path-of-fire-dark); */
          --app-text-color: #212121;
          --app-text-color-light: #ffffff;
          --app-background-color: #e0f2f1;

          --gwn-primary: var(--color-path-of-fire);
          --gwn-on-primary: var(--app-text-color-light);

          --gwn-primary-variant: var(--color-path-of-fire-dark);
          --gwn-on-primary-variant: var(--app-text-color-light);

          --gwn-background: #e0f2f1;
          --gwn-on-background: var(--app-text-color);

          --gwn-surface: #ffffff;
          --gwn-on-surface: var(--app-text-color);

          --app-font-stack: -apple-system, BlinkMacSystemFont, "Segoe UI",
            Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
            sans-serif;

          /* Generic styles */
          --app-box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.12);
          --app-box-shadow-reverse: 0 -1px 4px rgba(0, 0, 0, 0.12);
          --app-box-shadow-right: 1px 0 4px rgba(0, 0, 0, 0.12);
          --app-box-shadow-left: -1px 0 4px rgba(0, 0, 0, 0.12);
          --app-border-radius: 0.125rem;
          --spacer-none: 0;
          --spacer-xsmall: 0.25rem;
          --spacer-small: 0.5rem;
          --spacer-medium: 1rem;
          --spacer-large: 1.5rem;

          --app-text-color: #333333;
          --app-text-color-inverted: #ffffff;
        }

        :host([theme="core"]) {
          --gwn-primary: var(--color-guild-wars-2);
          --gwn-primary-variant: var(--color-guild-wars-2-dark);
        }

        :host([theme="hot"]) {
          --gwn-primary: var(--color-heart-of-thorns);
          --gwn-primary-variant: var(--color-heart-of-thorns-dark);
        }

        :host([theme="dark"]) {
          --gwn-primary: #181818;
          --gwn-background: #222222;
          --gwn-on-background: var(--app-text-color-light);
          --gwn-surface: #333333;
          --gwn-on-surface: var(--app-text-color-light);
          --app-box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
        }

        app-toolbar {
          font-weight: 800;
        }

        app-drawer {
          z-index: 99999;
          box-shadow: 1px 0 4px rgba(0, 0, 0, 0.12);
        }

        app-header {
          color: var(--gwn-on-primary);
          background-color: var(--gwn-primary);
        }

        app-header paper-icon-button {
          --paper-icon-button-ink-color: var(--gwn-on-primary);
        }

        app-toolbar [main-title] {
          text-transform: capitalize;
          display: flex;
          align-items: center;
          padding: 0 var(--spacer-medium);
        }

        app-toolbar [main-title] iron-icon {
          margin-right: var(--spacer-small);
        }

        .drawer-scroll {
          height: calc(100% - 256px * 0.5625);
          overflow-y: auto;
          position: relative;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          background-color: var(--gwn-background);
        }

        .drawer-list {
          display: flex;
          flex-direction: column;
          margin: 0;
          box-sizing: border-box;
          min-height: 100%;
          padding: 0 var(--spacer-small);
        }

        .drawer-list a {
          color: var(--gwn-on-background);
          text-decoration: none;
        }

        .drawer-list > a {
          display: block;
          line-height: 40px;
          margin-bottom: 0.5rem;
          padding: 0 var(--spacer-medium);
          border-radius: var(--app-border-radius);
        }

        .drawer-list > :first-child {
          margin-top: var(--spacer-small);
        }

        .drawer-list > a.iron-selected {
          background-color: rgba(0, 0, 0, 0.2);
        }

        .drawer-list > a:hover,
        .drawer-list > a:focus {
          background-color: var(--gwn-primary);
          color: var(--gwn-on-primary);
        }

        .drawer-list > a + hr {
          margin-top: var(--spacer-small);
        }

        .drawer-list > a.last-before-auto {
          margin-bottom: var(--spacer-medium);
        }

        .bottom-links {
          margin-bottom: var(--spacer-medium);
          padding: 0 var(--spacer-small);
        }

        .bottom-links a {
          font-weight: 500;
          margin-right: var(--spacer-small);
          white-space: nowrap;
        }

        #onlineStatusToast {
          bottom: 0;
          top: auto !important;
        }

        @media screen and (min-width: 641px) {
          #onlineStatusToast {
            left: 256px !important;
            width: calc(100% - 256px);
          }
        }
      </style>

      <app-location route="{{route}}"></app-location>
      <app-route
        route="{{route}}"
        pattern="/:page"
        data="{{routeData}}"
        tail="{{subroute}}"
      ></app-route>

      <!-- Main content -->

      <online-status online-status="{{ onlineStatus }}"></online-status>
      <paper-toast
        id="onlineStatusToast"
        class="fit-bottom"
        opened="[[ !onlineStatus ]]"
        duration="0"
        text="You appear to be offline. Some tools might not work correctly."
      ></paper-toast>

      <app-header-layout>
        <app-header slot="header" fixed>
          <app-toolbar>
            <paper-icon-button
              icon="my-icons:menu"
              on-tap="_openDrawer"
              aria-label="Open Menu"
            ></paper-icon-button>
            <div main-title>[[ _pageTitle(page) ]]</div>
            <paper-icon-button
              icon="my-icons:settings"
              aria-label="Open Settings"
              on-tap="_toggleSettings"
            ></paper-icon-button>
          </app-toolbar>
        </app-header>

        <iron-pages
          selected="[[page]]"
          attr-for-selected="name"
          fallback-selection="view404"
          role="main"
        >
          <page-index name="index"></page-index>
          <page-directory name="directory"></page-directory>
          <page-collections name="collections"></page-collections>
          <page-tickets name="tickets"></page-tickets>
          <page-chatcodes name="chatcodes"></page-chatcodes>
          <page-timer name="timer"></page-timer>
          <page-calc name="calc"></page-calc>
          <page-wvw name="wvw"></page-wvw>
          <page-about name="about"></page-about>
          <page-precursors name="precursors" page="[[page]]"></page-precursors>
          <page-stream-tools name="stream"></page-stream-tools>
          <page-view404 name="view404"></page-view404>
        </iron-pages>
      </app-header-layout>

      <!-- Drawer content -->
      <app-drawer id="drawer" swipe-open opened="{{drawer}}">
        <drawer-top on-close-drawer="_closeDrawer"></drawer-top>
        <div class="drawer-scroll">
          <iron-selector
            selected="[[page]]"
            attr-for-selected="name"
            class="drawer-list"
            role="navigation"
          >
            <a name="index" href="/">Home</a>
            <a name="directory" href="/directory/websites">Directory</a>
            <a name="timer" href="/timer/all">Meta Timer</a>
            <a name="wvw" href="/wvw/overview">World vs World (Beta)</a>
            <hr />
            <a name="collections" href="/collections/basic">Collections</a>
            <a name="tickets" href="/tickets">Tickets</a>
            <a name="calc" href="/calc">TP Calc</a>
            <hr />
            <a name="chatcodes" href="/chatcodes">Chatcodes</a>
            <a name="stream" href="/stream" class="last-before-auto">
              Stream Tools
            </a>
            <hr style="margin-top:auto" />
            <div class="bottom-links">
              <a name="about" href="/about">About</a>
              <a
                href="https://github.com/rediche/gw2-ninja"
                target="_blank"
                rel="noopener noreferrer"
                >Code on Github</a
              >
              <a
                href="https://github.com/rediche/gw2-ninja/issues"
                target="_blank"
                rel="noopener noreferrer"
                >Report an issue</a
              >
            </div>
          </iron-selector>
        </div>
      </app-drawer>

      <page-metadata
        base-title="GW2 Ninja"
        fallback-description="A collection of Guild Wars 2 Tools."
        direction="reversed"
        page="[[ page ]]"
      ></page-metadata>
      <gwn-settings open="{{settingsOpen}}"></gwn-settings>

      <collection-modal></collection-modal>
    `;
  }

  static get observers() {
    return ["_routePageChanged(routeData.page)"];
  }

  ready() {
    super.ready();

    afterNextRender(this, function() {
      this.$.onlineStatusToast.fitInto = this.$.appHeaderLayout;
    });
  }

  _routePageChanged(page) {
    // Show the corresponding page according to the route.
    //
    // If no page was found in the route data, page will be an empty string.
    // Show 'index' in that case. And if the page doesn't exist, show 'view404'.
    if (!page) {
      this.page = "index";
    } else if (
      [
        "index",
        "about",
        "calc",
        "chatcodes",
        "collections",
        "directory",
        "tickets",
        "timer",
        "wvw",
        "precursors",
        "stream"
      ].indexOf(page) !== -1
    ) {
      this.page = page;
    } else {
      this.page = "view404";
    }

    // Close a non-persistent drawer when the page & route are changed.
    if (!this.$.drawer.persistent) {
      this.$.drawer.close();
    }
  }

  _pageChanged(page) {
    // Import the page component on demand.
    //
    // Note: `polymer build` doesn't like string concatenation in the import
    // statement, so break it up.
    switch (page) {
      case "index":
        import("./pages/page-index.js");
        break;
      case "about":
        import("./pages/page-about.js");
        break;
      case "calc":
        import("./pages/page-calc.js");
        break;
      case "chatcodes":
        import("./pages/page-chatcodes.js");
        break;
      case "collections":
        import("./pages/page-collections.js");
        break;
      case "directory":
        import("./pages/page-directory.js");
        break;
      case "tickets":
        import("./pages/page-tickets.js");
        break;
      case "timer":
        import("./pages/page-timer.js");
        break;
      case "wvw":
        import("./pages/page-wvw.js");
        break;
      case "precursors":
        import("./pages/page-precursors.js");
        break;
      case "stream":
        import("./pages/page-stream-tools.js");
        break;
      case "view404":
        import("./pages/page-view404.js");
        break;
    }
  }

  _showPage404() {
    this.page = "view404";
  }

  _pageTitle(activePage) {
    if (!activePage) return;

    if (activePage == "index") return "Home";
    if (activePage == "directory") return "Directory";
    if (activePage == "collections") return "Collections";
    if (activePage == "tickets") return "Tickets";
    if (activePage == "chatcodes") return "Chatcode Generator";
    if (activePage == "timer") return "Meta Timer";
    if (activePage == "calc") return "Trading Post Calculator";
    if (activePage == "wvw") return "World vs World (Beta)";
    if (activePage == "about") return "About GW2 Ninja";
    if (activePage == "precursors") return "Precursor Rain. HALLELUJAH!";
    if (activePage == "stream") return "Stream Tools";
    if (activePage == "view404") return "Page not found";

    return activePage;
  }

  _toggleSettings() {
    this.set("settingsOpen", !this.settingsOpen);
  }

  _openDrawer() {
    this.set("drawer", true);
  }

  _closeDrawer() {
    this.set("drawer", false);
  }

  _stateChanged(state) {
    if (!state || !state.settings) return;
    this.set("theme", state.settings.theme);
  }
}

window.customElements.define("gw2-ninja", GW2Ninja);
