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
import "./page-title.js";
import "./my-icons.js";
import "./online-status.js";
import "./settings/gwn-settings.js";
import "./utilities/gwn-sync-settings.js";

import { SharedStyles } from "./shared-styles.js";

// Gesture events like tap and track generated from touch will not be
// preventable, allowing for better scrolling performance.
setPassiveTouchGestures(true);

// Set Polymer's root path to the same value we passed to our service worker
// in `index.html`.
setRootPath(MyAppGlobals.rootPath);

class GW2Ninja extends GestureEventListeners(PolymerElement) {
  static get template() {
    return html`
    ${SharedStyles}
    <style>
      :host {
        display: block;
        min-height: 100vh;

        --app-text-color: #333333;
        --app-text-color-inverted: #ffffff;
      }

      app-toolbar {
        font-weight: 800;
        padding-left: .675rem;
      }

      app-header app-toolbar paper-icon-button:first-of-type {
        margin-right: .675rem;
      }

      app-drawer-layout:not([narrow]) [drawer-toggle] {
        display: none;
      }

      app-drawer {
        box-shadow: 1px 0 4px rgba(0,0,0,.12);
      }

      app-header {
        color: var(--app-text-color-light);
        background-color: var(--app-primary-color);
      }

      app-header paper-icon-button {
        --paper-icon-button-ink-color: white;
      }

      app-toolbar [main-title] {
        text-transform: capitalize;
        display: flex;
        align-items: center;
      }

      app-toolbar [main-title] iron-icon {
        margin-right: var(--spacer-small);
      }

      .drawer-list {
        display: flex;
        flex-direction: column;
        margin: 0;
        box-sizing: border-box;
        min-height: 100%;
      }

      .drawer-list a {
        display: block;
        color: var(--app-text-color);
        text-decoration: none;
        line-height: 40px;
      }

      .drawer-list a:last-child {
        margin-bottom: 1rem;
      }

      .drawer-list a.iron-selected paper-item {
        font-weight: 800;
        background-color: rgba(0,0,0,.08);
        --paper-item-focused-before: {
          background: rgba(0,0,0,.08);
        };
      }

      app-drawer app-toolbar {
        padding-left: var(--spacer-xsmall);
        position: fixed;
        top: 7.5rem;
        width: 100%;
        z-index: 1;
        background-color: var(--app-background-color);
      }

      app-drawer app-toolbar [main-title] {
        margin-left: var(--spacer-small);
      }

      .drawer-scroll {
        height: 100%;
        overflow-y: auto;
        position: relative;
        padding-top: 5rem;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
      }

      #onlineStatusToast {
        bottom: 0;
        top: auto !important;
      }

      @media screen and (min-width: 641px) {
        app-toolbar {
          padding-left: var(--spacer-large);
        }

        #onlineStatusToast {
          left: 256px !important;
          width: calc(100% - 256px);
        }
      }
    </style>

    <app-location route="{{route}}"></app-location>
    <app-route route="{{route}}" pattern="/:page" data="{{routeData}}" tail="{{subroute}}"></app-route>

    <app-drawer-layout>
      <!-- Drawer content -->
      <app-drawer id="drawer" slot="drawer">
        <div class="drawer-scroll">
          <app-toolbar>
            <paper-icon-button icon="my-icons:close" drawer-toggle="" aria-label="Close menu"></paper-icon-button>
            <div main-title="">
              <iron-icon icon="my-icons:logo"></iron-icon>
              GW2 Ninja
            </div>
          </app-toolbar>
          <iron-selector selected="[[page]]" attr-for-selected="name" class="drawer-list" role="navigation">
            <a name="index" href="/" tabindex="-1">
              <paper-item>Home</paper-item>
            </a>
            <hr>
            <a name="directory" href="/directory/websites" tabindex="-1">
              <paper-item>Directory</paper-item>
            </a>
            <hr>
            <a name="collections" href="/collections/basic" tabindex="-1">
              <paper-item>Collections</paper-item>
            </a>
            <a name="tickets" href="/tickets" tabindex="-1">
              <paper-item>Tickets</paper-item>
            </a>
            <hr>
            <a name="chatcodes" href="/chatcodes" tabindex="-1">
              <paper-item>Chatcodes</paper-item>
            </a>
            <a name="timer" href="/timer/all" tabindex="-1">
              <paper-item>Meta Timer</paper-item>
            </a>
            <a name="calc" href="/calc" tabindex="-1">
              <paper-item>TP Calc</paper-item>
            </a>
            <hr style="margin-top:auto">
            <a name="about" href="/about" tabindex="-1">
              <paper-item>About</paper-item>
            </a>
          </iron-selector>
        </div>
      </app-drawer>

      <!-- Main content -->
      <app-header-layout id="appHeaderLayout">

        <online-status online-status="{{ onlineStatus }}"></online-status>
        <paper-toast id="onlineStatusToast" class="fit-bottom" opened="[[ !onlineStatus ]]" duration="0" text="You appear to be offline. Some tools might not work correctly."></paper-toast>

        <app-header slot="header" fixed="">
          <app-toolbar>
            <paper-icon-button icon="my-icons:menu" drawer-toggle="" aria-label="Open Menu"></paper-icon-button>
            <div main-title>[[ _pageTitle(page) ]]</div>
            <paper-icon-button icon="my-icons:settings" aria-label="Open Settings" on-tap="_toggleSettings"></paper-icon-button>
          </app-toolbar>
        </app-header>

        <iron-pages selected="[[page]]" attr-for-selected="name" fallback-selection="view404" role="main">
          <page-index name="index"></page-index>
          <page-directory theme$="[[theme]]" name="directory"></page-directory>
          <page-collections theme$="[[theme]]" name="collections"></page-collections>
          <page-tickets theme$="[[theme]]" name="tickets"></page-tickets>
          <page-chatcodes name="chatcodes"></page-chatcodes>
          <page-timer theme$="[[theme]]" name="timer"></page-timer>
          <page-calc name="calc"></page-calc>
          <page-about name="about"></page-about>
          <page-view404 name="view404"></page-view404>
        </iron-pages>
      </app-header-layout>
    </app-drawer-layout>

    <page-title base-title="GW2 Ninja" direction="reversed" page-title="[[ _pageTitle(page) ]]"></page-title>
    <gwn-settings open="{{settingsOpen}}"></gwn-settings>

    <gwn-sync-settings 
      value="{{theme}}"
      setting="gwn-theme"></gwn-sync-settings>
    `;
  }

  static get is() {
    return "gw2-ninja";
  }

  static get properties() {
    return {
      page: {
        type: String,
        reflectToAttribute: true,
        observer: "_pageChanged"
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

  static get observers() {
    return ["_routePageChanged(routeData.page)"];
  }

  ready() {
    super.ready();

    afterNextRender(this, function() {
      /* console.log(this.$.onlineStatusToast, this.$.appHeaderLayout, this); */
      this.$.onlineStatusToast.fitInto = this.$.appHeaderLayout;
      /* this.addEventListener('themechange', this._themeChange); */
    });
  }

  /* _themeChange(e) {
    this.set('theme', e.detail.theme);
  } */

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
        "timer"
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
    if (activePage == "about") return "About GW2 Ninja";
    if (activePage == "view404") return "Page not found";

    return activePage;
  }

  _toggleSettings() {
    this.set("settingsOpen", !this.settingsOpen);
  }
}

window.customElements.define(GW2Ninja.is, GW2Ninja);
