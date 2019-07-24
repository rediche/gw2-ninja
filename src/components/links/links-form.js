import { LitElement, html } from "lit-element";
import { Checkbox } from "@material/mwc-checkbox";
import config from "../../../config";

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
      url: { type: String },
      humanReadable: { type: Boolean },
      success: { type: Boolean },
      error: { type: Boolean }
    };
  }

  render() {
    const {
      url,
      humanReadable,
      success,
      error,
      _inputChanged,
      _onSubmit
    } = this;
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
          cursor: pointer;
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
          color: #ffffff;
        }

        .error {
          background-color: red;
          color: #ffffff;
        }
      </style>

      <form class="search" @submit="${_onSubmit}">
        <input
          type="url"
          placeholder="https://example.com/super/long/url"
          .value="${url}"
          @input="${_inputChanged}"
        />
        <button>Shorten</button>
      </form>

      <!-- <div class="checkbox-container">
        <mwc-checkbox id="checkbox"></mwc-checkbox>
        <label for="checkbox">Readable</label>
      </div> -->

      ${
        success
          ? html`
              <div class="message success">Your shortlink was created.</div>
            `
          : ""
      }
      ${
        error
          ? html`
              <div class="message error">
                Something went wrong when creating your shortlink.
              </div>
            `
          : ""
      }
    `;
  }

  constructor() {
    super();
    this.url = "";
    this.humanReadable = false;
    this.success = false;
    this.error = false;
  }

  _inputChanged(e) {
    this.url = e.target.value;
  }

  _onSubmit(e) {
    e.preventDefault();
    console.log("click", this.url);
    console.log("is human readable", this.humanReadable);
    this._createLink();
  }

  _createLink() {
    const body = {
      "url": "https://www.guildwars2.com/en/the-game/",
      "readable": true
    };

    fetch(config.linksApi + '/links', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(resp => console.log(resp));
  }
}

customElements.define("links-form", LinksForm);
