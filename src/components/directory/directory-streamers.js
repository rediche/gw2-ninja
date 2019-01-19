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
      theme: String,
      streamers: Array,
      loadedStreamerData: Array,
      loadedStreamersLive: Array
    };
  }

/*   _render({ theme, streamers, loadedStreamers }) {
    const twitchStreamers = this._filterTwitchStreamers(streamers);
    this._loadStreamersAndLiveChannelsFromTwitch(config.clientId, twitchStreamers);
    
      streamers: Array
    };
  }
 */
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

  _loadStreamersAndLiveChannelsFromTwitch(clientId, streamers) {
    const loadedStreamers = this._loadStreamersFromTwitch(clientId, streamers);
    const liveStreamers = this._loadLiveStreamersFromTwitch(clientId, streamers);

    Promise.all([loadedStreamers, liveStreamers])
      .then(values => {
        console.log("Streamers and live channels loaded");
        console.log(values);
      });
  }

  _loadStreamersFromTwitch(clientId, streamers) {
    if (!clientId || !streamers) return;

    const streamerNameList = streamers.map(streamer => {
      return `user_login=${streamer.url}`;
    }).join("&");

    return fetch(`https://api.twitch.tv/helix/users?login=deroir`, {
      method: "GET",
      headers: {
        "Client-ID": clientId
      }
    }).then(resp => {
      return resp.json();
    }).then(json => {
      return json.data;
    }).catch(error => {
      console.log(error);
    });
  }

  _loadLiveStreamersFromTwitch(clientId, streamers) {
    if (!clientId || !streamers) return;

    return fetch(`https://api.twitch.tv/helix/streams?game_id=19357`, {
      method: "GET",
      headers: {
        "Client-ID": clientId
      }
    }).then(resp => {
      return resp.json();
    }).then(json => {
      return json.data;
    }).catch(error => {
      console.log(error);
    });
  }

  _filterTwitchStreamers(streamers) {
    return streamers.filter(streamer => streamer.platform == "twitch");
  }
}

customElements.define("directory-streamers", DirectoryStreamers);
