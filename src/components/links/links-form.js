import { LitElement, html } from "lit-element";
import { Checkbox } from "@material/mwc-checkbox";

/**
 * `links-form` Description
 *
 * @customElement
 * @polymer
 * @demo
 *
 */
class LinksForm extends LitElement {
  static get properties() {
    return {
      url: { type: String }
    };
  }

  render() {
    const { url, _inputChanged, _onClick } = this;
    return html`
      <style>
        :host {
          display: block;
          --mdc-theme-secondary: var(--gwn-on-background);
        }

        .search {
          display: flex;
          border-radius: var(--gwn-border-radius);
          background-color: var(--gwn-surface);
          box-shadow: var(--gwn-box-shadow);
          overflow: hidden;
        }

        .search input {
          flex: auto;
          padding: 0.9375rem var(--spacer-medium);
          font-size: 0.85rem;
          display: block;
          box-sizing: border-box;
          width: 100%;
          border: 0;
          color: var(--gwn-on-surface);
        }

        .search input:focus {
          outline: 0;
        }

        .search button {
          flex: none;
          padding: 0.5rem 1rem;
          text-align: center;
          border-radius: var(--gwn-border-radius);
          background-color: var(--gwn-primary);
          color: var(--gwn-on-primary);
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 0;
          margin: var(--spacer-xsmall);
        }

        .search button:focus {
          outline: 0;
          opacity: 0.85;
        }

        .checkbox-container {
          display: flex;
          align-items: center;
          margin-top: var(--spacer-xsmall);
        }

        #checkbox {
          margin-left: -0.7rem;
        }

        .message {
          padding: var(--spacer-medium);
          background-color: var(--gwn-surface);
          border-radius: var(--gwn-border-radius);
          box-shadow: var(--gwn-box-shadow);
          margin-top: var(--spacer-medium);
          color: var(--gwn-on-surface);
        }

        .success {
          background-color: green;
        }

        .error {
          background-color: red;
        }
      </style>

      <div class="search">
        <input
          type="url"
          placeholder="https://example.com/super/long/url"
          .value="${url}"
          @input="${_inputChanged}"
        />
        <button @click="${_onClick}">Shorten</button>
      </div>

      <div class="checkbox-container">
        <mwc-checkbox id="checkbox"></mwc-checkbox>
        <label for="checkbox">Human readable</label>
      </div>

      <div class="message success">
        Your shortlink was created.
      </div>

      <div class="message error">
        Something went wrong when creating your shortlink.
      </div>
    `;
  }

  constructor() {
    super();
    this.url = "";
  }

  _inputChanged(e) {
    this.url = e.target.value;
  }

  _onClick() {
    console.log("click", this.url);
  }
}

customElements.define("links-form", LinksForm);
