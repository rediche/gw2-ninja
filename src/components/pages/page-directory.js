import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import { GestureEventListeners } from "@polymer/polymer/lib/mixins/gesture-event-listeners.js";
import { afterNextRender } from "@polymer/polymer/lib/utils/render-status.js";
import "@polymer/polymer/lib/elements/dom-repeat.js";
import "@polymer/app-route/app-location.js";
import "@polymer/app-route/app-route.js";
import "@polymer/paper-tabs/paper-tabs.js";
import "@polymer/paper-button/paper-button.js";
import "@polymer/paper-icon-button/paper-icon-button.js";
import "@polymer/paper-toast/paper-toast.js";
import "@polymer/iron-pages/iron-pages.js";
import "@polymer/iron-icons/iron-icons.js";
import { SharedStyles } from "../shared-styles.js";
import "../directory/directory-entry";
import "../directory/directory-streamers";

class PageDirectory extends GestureEventListeners(PolymerElement) {
  static get properties() {
    return {
      subviewData: {
        observer: "_selectedObserver"
      },
      searchValue: {
        type: String
      },
      searchForText: {
        type: String,
        computed: "_computeSearchForText(subviewData.subview)"
      },
      entries: {
        type: Array
      },
      entriesFiltered: {
        type: Array,
        computed: "_entriesFilteredObserver(entries, searchValue)"
      },
      websites: Array,
      streamers: Array,
      youtube: Array,
      addons: Array
    };
  }

  static get template() {
    return html`
      ${SharedStyles}
      <style>
        :host {
          display: block;
        }

        .sticky-tabs {
          background-color: var(--gwn-primary);
        }

        paper-tabs {
          --paper-tabs-selection-bar-color: var(--gwn-on-primary);
          padding: 0 var(--spacer-large);
        }

        paper-tab {
          color: var(--gwn-on-primary);
        }

        .search {
          margin: var(--spacer-medium) var(--spacer-small);
          position: relative;
        }

        .search-field {
          padding: 0.9375rem 3rem 0.9375rem var(--spacer-medium);
          font-size: 1rem;
          display: block;
          box-sizing: border-box;
          width: 100%;
          border: 0;
          border-radius: var(--app-border-radius);
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.12);
        }

        .search-clear {
          position: absolute;
          right: 0.25rem;
          top: 0.25rem;
          color: #bdbdbd;
        }

        .directory-list {
          display: flex;
          justify-content: space-between;
          align-items: stretch;
          flex-wrap: wrap;
          margin: var(--spacer-medium) var(--spacer-small);
        }

        directory-entry {
          flex-basis: 100%;
          margin-bottom: var(--spacer-medium);
        }

        .container {
          max-width: 1100px;
          margin: 0 auto;
        }

        @media screen and (min-width: 768px) {
          .search {
            margin: var(--spacer-large);
          }

          .directory-list {
            margin: var(--spacer-large);
          }

          directory-entry {
            flex-basis: calc(100% / 2 - var(--spacer-large) / 2);
            margin-bottom: var(--spacer-large);
          }
        }
      </style>

      <app-location route="{{route}}"></app-location>
      <app-route
        route="{{route}}"
        pattern="/directory/:subview"
        data="{{subviewData}}"
      ></app-route>

      <div class="sticky-tabs">
        <paper-tabs
          class="container"
          selected="{{subviewData.subview}}"
          attr-for-selected="name"
          fallback-selection="websites"
        >
          <paper-tab name="websites">Websites</paper-tab>
          <paper-tab name="addons">Add-ons</paper-tab>
          <paper-tab name="streamers">Streamers</paper-tab>
          <paper-tab name="youtubers">YouTubers</paper-tab>
        </paper-tabs>
      </div>

      <div class="container">
        <div class="search">
          <input
            class="search-field"
            type="text"
            value="{{searchValue::input}}"
            placeholder$="Search for [[searchForText]]"
          />
          <paper-icon-button
            class="search-clear"
            icon="icons:cancel"
            hidden$="[[ _hideClearSearch(searchValue) ]]"
            on-tap="_clearSearchValue"
          ></paper-icon-button>
        </div>

        <iron-pages
          selected="{{subviewData.subview}}"
          attr-for-selected="name"
          fallback-selection="websites"
        >
          <div name="websites" class="directory-list">
            <template is="dom-repeat" items="{{websites}}">
              <directory-entry
                name="[[item.name]]"
                url="[[item.url]]"
                description="[[item.description]]"
                inactive="[[item.inactive]]"
              ></directory-entry>
            </template>
          </div>
          <div name="addons" class="directory-list">
            <template is="dom-repeat" items="{{addons}}">
              <directory-entry
                name="[[item.name]]"
                url="[[item.url]]"
                description="[[item.description]]"
                approval="[[item.approval]]"
                inactive="[[item.inactive]]"
              ></directory-entry>
            </template>
          </div>
          <div name="streamers" class="directory-list">
            <directory-streamers
              streamers="[[ streamers ]]"
            ></directory-streamers>
            <!-- <template is="dom-repeat" items="{{streamers}}">
            <directory-entry name="[[item.name]]" url="[[item.url]]" description="[[item.description]]" inactive="[[item.inactive]]"></directory-entry>
          </template> -->
          </div>
          <div name="youtubers" class="directory-list">
            <template is="dom-repeat" items="{{youtube}}">
              <directory-entry
                name="[[item.name]]"
                url="[[item.url]]"
                description="[[item.description]]"
                inactive="[[item.inactive]]"
              ></directory-entry>
            </template>
          </div>
        </iron-pages>
      </div>

      <paper-toast
        id="toast"
        duration="0"
        text="An error occured."
      ></paper-toast>
    `;
  }

  ready() {
    super.ready();
    afterNextRender(this, function() {
      this._loadDirectoryData();
    });
  }

  _loadDirectoryData() {
    fetch("/src/data/directory.json")
      .then(resp => resp.json())
      .then(data => {
        this.set("entries", data);
      })
      .catch(err => {
        console.log(err);
        this.$.toast.fitInto = this;
        this.$.toast.open();
      });
  }

  _selectedObserver(selected) {
    this.set("searchValue", "");
  }

  _entriesFilteredObserver(entries, searchValue) {
    let entriesFiltered = entries;

    if (searchValue !== "") {
      entriesFiltered = entries.filter(entry => {
        return (
          entry.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          entry.description.toLowerCase().includes(searchValue.toLowerCase())
        );
      });
    }

    this.set("websites", this._filterEntries(entriesFiltered, "websites"));
    this.set("streamers", this._filterEntries(entriesFiltered, "streamers"));
    this.set("youtube", this._filterEntries(entriesFiltered, "youtube"));
    this.set("addons", this._filterEntries(entriesFiltered, "addons"));
  }

  _filterEntries(entries, directory) {
    if (!entries) return;
    return entries.filter(entry => {
      return entry.directory == directory;
    });
  }

  _computeSearchForText(selected) {
    switch (selected) {
      case "youtubers":
        return "YouTube Channels";
        break;
      case "streamers":
        return "Streamers";
        break;
      case "addons":
        return "Add-ons";
        break;
      case "websites":
      default:
        return "Websites";
        break;
    }
  }

  _hideClearSearch(value) {
    return value ? false : true;
  }

  _clearSearchValue() {
    this.set("searchValue", "");
  }
}

window.customElements.define("page-directory", PageDirectory);
