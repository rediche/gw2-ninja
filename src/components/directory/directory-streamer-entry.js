import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "@polymer/paper-ripple/paper-ripple.js";
import "@polymer/iron-icon/iron-icon.js";
import "@polymer/iron-icons/av-icons.js";
import { SharedStyles } from "../shared-styles.js";

class DirectoryEntry extends PolymerElement {
  static get properties() {
    return {
      name: String,
      url: String,
      live: String,
      description: String,
      thumbnail: String
    };
  }

  static get template() {
    return html`
      ${SharedStyles}
      <style>
        :host {
          box-sizing: border-box;
        }

        h6 {
          margin: 0;
        }

        h6 span {
          color: rgba(0, 0, 0, 0.4);
        }

        p {
          margin-top: 0.375rem;
        }

        p:last-child {
          margin-bottom: 0;
        }

        .card {
          height: 100%;
          display: flex;
          flex-direction: column;
          padding: 0;
        }

        .inner {
          height: 100%;
          display: flex;
          flex-direction: column;
          padding: var(--spacer-medium);
        }

        .title {
          flex: none;
        }

        .entry-description {
          flex: 1;
        }

        .embed-container {
          position: relative;
          padding-bottom: 56.25%;
          height: 0;
          overflow: hidden;
          max-width: 100%;
        }

        .embed-container .play {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 3rem;
          height: 3rem;
          color: var(--gwn-on-primary);
          background-color: var(--gwn-primary);
          box-shadow: var(--gwn-box-shadow);
          border-radius: 100%;
        }

        .embed-container img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      </style>

      <div class="card">
        <a href="[[ url ]]" target="_blank" rel="noopener noreferrer">
          <div class="embed-container">
            <img src="[[ thumbnail ]]" alt="[[ name ]]" />
            <iron-icon class="play" icon="av:play-arrow"></iron-icon>
          </div>
        </a>
        <div class="inner">
          <h6 class="title">[[ name ]]</h6>
          <p class="entry-description">[[ description ]]</p>
        </div>
      </div>
    `;
  }
}

window.customElements.define("directory-streamer-entry", DirectoryEntry);
