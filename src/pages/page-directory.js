import {
  PolymerElement,
  html
} from "../../../node_modules/@polymer/polymer/polymer-element.js";
import { GestureEventListeners } from "../../../node_modules/@polymer/polymer/lib/mixins/gesture-event-listeners.js";
import { afterNextRender } from "../../../node_modules/@polymer/polymer/lib/utils/render-status.js";
import "../../../node_modules/@polymer/polymer/lib/elements/dom-repeat.js";
import "../../../node_modules/@polymer/app-route/app-location.js";
import "../../../node_modules/@polymer/app-route/app-route.js";
import "../../../node_modules/@polymer/paper-tabs/paper-tabs.js";
import "../../../node_modules/@polymer/paper-button/paper-button.js";
import "../../../node_modules/@polymer/paper-icon-button/paper-icon-button.js";
import "../../../node_modules/@polymer/paper-toast/paper-toast.js";
import "../../../node_modules/@polymer/iron-pages/iron-pages.js";
import "../../../node_modules/@polymer/iron-icons/iron-icons.js";
import "../shared-styles.js";
import "../directory/directory-entry.js";

class PageDirectory extends GestureEventListeners(PolymerElement) {
  static get is() {
    return "page-directory";
  }

  static get template() {
    return html`
    <style include="shared-styles">
      :host {
        display: block;
      }
      paper-tabs {
        background-color: var(--app-primary-color);
        --paper-tabs-selection-bar-color: var(--app-text-color-light);
      }
      paper-tab {
        color: var(--app-text-color-light);
      }
      .search {
        margin: var(--spacer-large);
        position: relative;
      }
      .search-field {
        padding: .9375rem 3rem .9375rem var(--spacer-medium);
        font-size: 1rem;
        display: block;
        box-sizing: border-box;
        width: 100%;
        border: 0;
        border-radius: var(--app-border-radius);
        box-shadow: 0 1px 4px rgba(0,0,0,.12);
      }
      .search-clear {
        position: absolute;
        right: .25rem;
        top: .25rem;
        color: #BDBDBD;
      }
      .directory-list {
        display: flex;
        justify-content: space-between;
        align-items: stretch;
        flex-wrap: wrap;
        margin: var(--spacer-large);
      }
      directory-entry {
        flex-basis: 100%;
        margin-bottom: var(--spacer-large);
      }
      @media screen and (min-width: 768px) {
        directory-entry {
          flex-basis: calc(100% / 2 - var(--spacer-large) / 2);
        }
      }
    </style>

    <app-location route="{{route}}"></app-location>
    <app-route route="{{route}}" pattern="/directory/:subview" data="{{subviewData}}"></app-route>

    <paper-tabs class="sticky-tabs" selected="{{subviewData.subview}}" attr-for-selected="name" fallback-selection="websites">
      <paper-tab name="websites">Websites</paper-tab>
      <paper-tab name="streamers">Streamers</paper-tab>
      <paper-tab name="youtubers">YouTubers</paper-tab>
    </paper-tabs>

    <div class="search">
      <input class="search-field" type="text" value="{{searchValue::input}}" placeholder$="Search for [[searchForText]]">
      <paper-icon-button class="search-clear" icon="icons:cancel" hidden$="[[ _hideClearSearch(searchValue) ]]" on-tap="_clearSearchValue"></paper-icon-button>
    </div>

    <iron-pages selected="{{subviewData.subview}}" attr-for-selected="name" fallback-selection="websites">
      <div name="websites" class="directory-list">
        <template is="dom-repeat" items="{{websites}}">
          <directory-entry name="[[item.name]]" url="[[item.url]]" description="[[item.description]]" inactive="[[item.inactive]]"></directory-entry>
        </template>
      </div>
      <div name="streamers" class="directory-list">
        <template is="dom-repeat" items="{{streamers}}">
          <directory-entry name="[[item.name]]" url="[[item.url]]" description="[[item.description]]" inactive="[[item.inactive]]"></directory-entry>
        </template>
      </div>
      <div name="youtubers" class="directory-list">
        <template is="dom-repeat" items="{{youtube}}">
          <directory-entry name="[[item.name]]" url="[[item.url]]" description="[[item.description]]" inactive="[[item.inactive]]"></directory-entry>
        </template>
      </div>
    </iron-pages>

    <paper-toast id="toast" duration="0" text="An error occured."></paper-toast>
    `;
  }

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
      websites: {
        type: Array
      },
      streamers: {
        type: Array
      },
      youtube: {
        type: Array
      }
    };
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

window.customElements.define(PageDirectory.is, PageDirectory);
