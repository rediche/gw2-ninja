import { LitElement, html } from "@polymer/lit-element";
import "@polymer/paper-button";

/**
 * `page-links`
 *
 * @customElement
 * @polymer
 * @demo
 *
 */
class PageLinks extends LitElement {
  _render({ url }) {
    return html`
      <style>
        :host {
          display: block;
          padding: 0 var(--spacer-large);
        }

        .search {
          display: flex;
        }

        .search input {
          flex: 1;
          box-shadow: 0 1px 4px rgba(0,0,0,.12);
          border-radius: .125rem;
          border: 0;
        }

        .search button {
          flex: 0;
        }
      </style>

      <h2>Shortlink generator</h2>

      <div class="search">
        <input type="url" placeholder="https://example.com/super/long/url">
        <paper-button on-click="${this._onClick}">Shorten</paper-button>
      </div>
    `;
  }

  _onClick() {
    console.log("click");
  }

  static get properties() {
    return {
      url: String
    };
  }

  constructor() {
    super();
  }
}

customElements.define("page-links", PageLinks);
