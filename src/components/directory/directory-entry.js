import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "@polymer/paper-ripple/paper-ripple.js";
import { SharedStyles } from "../shared-styles.js";

class DirectoryEntry extends PolymerElement {
  static get template() {
    return html`
    ${SharedStyles}
    <style>
      :host {
        display: block;
        box-sizing: border-box;
      }

      .links {
        display: flex;
      }

      a {
        position: relative;
        flex: 1;
        padding: .5rem 1rem;
        text-align: center;
        border-radius: var(--app-border-radius);
        background-color: var(--app-primary-color);
        color: var(--app-text-color-light);
        text-decoration: none;
        margin-right: 1rem;
        font-size: .85rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      a:last-of-type {
        margin-right: 0;
      }

      h6 {
        margin: 0;
      }

      h6 span {
        color: rgba(0, 0, 0, .4);
      }

      p {
        margin-top: .375rem;
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
        <h6 class="title">[[ name ]] <span hidden$="[[ !inactive ]]">- Inactive</span></h6>
        <p class="entry-description">[[ description ]]</p>

        <div class="links">
          <a hidden$="[[ !approval ]]" href="[[ approval ]]" target="_blank" rel="noopener noreferrer nofollow">
            Official Approval
            <paper-ripple></paper-ripple>
          </a>
          <a href="[[ url ]]" target="_blank" rel="noopener noreferrer nofollow">
            Visit [[ name ]]
            <paper-ripple></paper-ripple>
          </a>
        </div>
      </div>
`;
  }

  static get is() {
    return "directory-entry";
  }

  static get properties() {
    return {
      name: {
        type: String
      },
      url: {
        type: String
      },
      description: {
        type: String
      },
      inactive: {
        type: Boolean,
        value: false
      },
      approval: {
        type: String,
        value: null
      }
    };
  }
}

window.customElements.define(DirectoryEntry.is, DirectoryEntry);
