import { LitElement, html } from "@polymer/lit-element";

import config from "../../../config";
import "./directory-entry";

/**
 * `directory-streamers` handles special logic that needs to be injected into `directory-entry` per streamer.
 *
 * @customElement
 * @polymer
 * @demo
 *
 */
class DirectoryStreamers extends LitElement {
  static get properties() {
    return {
      streamers: Array
    };
  }

  _render({ theme, streamers }) {
    //console.log(config.clientId);
    return html`
      <style>
        :host {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          width: 100%;
        }

        directory-entry {
          flex-basis: 100%;
          margin-bottom: var(--spacer-medium);
        }

        @media screen and (min-width: 768px) {
          directory-entry {
            flex-basis: calc(100% / 2 - var(--spacer-large) / 2);
            margin-bottom: var(--spacer-large);
          }
        }
      </style>

      ${this._renderStreamerList(streamers, theme)}
    `;
  }

  constructor() {
    super();

    this.streamers = [];
  }

  _renderStreamerList(streamers, theme) {
    return html`
      ${
        streamers &&
          streamers.map(streamer => {
            return html`
              <directory-entry
                name="${streamer.name}"
                url="${this._resolvePlatformSpecificUrl(streamer)}"
                description="${streamer.description}"
                inactive="${streamer.inactive}"
              ></directory-entry>
            `;
          })
      }
    `;
  }

  _resolvePlatformSpecificUrl({ url, platform }) {
    if (!url) return;

    switch (platform) {
      case "twitch":
        return `https://www.twitch.tv/${url}`;
      default:
        return url;
    }
  }
}

customElements.define("directory-streamers", DirectoryStreamers);
