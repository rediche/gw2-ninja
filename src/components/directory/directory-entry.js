import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "@polymer/paper-ripple/paper-ripple.js";
import { SharedStyles } from "../shared-styles.js";

class DirectoryEntry extends PolymerElement {
  static get properties() {
    return {
      name: String,
      url: String,
      description: String,
      approval: {
        type: String,
        value: null
      }
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
        }

        .title,
        .links {
          flex: none;
        }

        .entry-description {
          flex: 1;
        }
      </style>

      <div class="card">
        <h6 class="title">
          [[ name ]]
        </h6>
        <p class="entry-description">[[ description ]]</p>

        <div class="links">
          <a
            class="secondary"
            hidden$="[[ !approval ]]"
            href="[[ approval ]]"
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            Official Approval
            <paper-ripple></paper-ripple>
          </a>
          <a
            href="[[ url ]]"
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            Visit [[ name ]]
            <paper-ripple></paper-ripple>
          </a>
        </div>
      </div>
    `;
  }
}

window.customElements.define("directory-entry", DirectoryEntry);
