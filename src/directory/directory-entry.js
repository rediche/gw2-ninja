import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "@polymer/paper-ripple/paper-ripple.js";
import "../shared-styles.js";

class DirectoryEntry extends PolymerElement {
  static get template() {
    return html`
    <style include="shared-styles">
      :host {
        display: block;
        box-sizing: border-box;
      }
      
      a {
        display: block;
        text-decoration: none;
        color: var(--app-text-color);
        height: 100%;
        box-sizing: border-box;
        position: relative;
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
      }
    </style>

    <a href="[[ url ]]" target="_blank" rel="nofollow">
      <div class="card">
        <h6>[[ name ]] <span hidden\$="[[ !inactive ]]">- Inactive</span></h6>
        <p>[[ description ]]</p>
      </div>
      <paper-ripple></paper-ripple>
    </a>
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
      }
    };
  }
}

window.customElements.define(DirectoryEntry.is, DirectoryEntry);
