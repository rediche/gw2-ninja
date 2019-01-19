import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "@polymer/paper-ripple/paper-ripple.js";
import { SharedStyles } from "../shared-styles.js";

class DirectoryEntry extends PolymerElement {
  static get properties() {
    return {
      name: String,
      url: String,
      live: String,
      description: String
    };
  }

  static get template() {
    return html`
      ${SharedStyles}
      <style>
        :host {
          box-sizing: border-box;
        }

        .links {
          display: flex;
        }

        a {
          position: relative;
          flex: 1;
          padding: 0.5rem 1rem;
          text-align: center;
          border-radius: var(--gwn-border-radius);
          background-color: var(--gwn-primary);
          color: var(--gwn-on-primary);
          text-decoration: none;
          margin-right: 1rem;
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        a:last-of-type {
          margin-right: 0;
        }

        a.secondary {
          background-color: transparent;
          color: var(--gwn-on-surface);
          border: 1px solid var(--gwn-on-surface);
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

        .embed-container iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
      </style>

      <div class="card">
        <div class="embed-container">
          <iframe
            src="https://player.twitch.tv/?channel=[[ name ]]&autoplay=false"
            frameborder=0"
            scrolling="no"
            allowfullscreen="false"
          >
          </iframe>
        </div>
        <div class="inner">
          <h6 class="title">[[ name ]]</h6>
          <p class="entry-description">[[ description ]]</p>
        </div>
      </div>
    `;
  }
}

window.customElements.define("directory-streamer-entry", DirectoryEntry);
