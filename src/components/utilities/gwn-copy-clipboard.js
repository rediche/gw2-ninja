import { LitElement, html } from "lit-element";
import "@polymer/paper-icon-button/paper-icon-button.js";
import "../my-icons.js";

/**
 * `gwn-copy-clipboard` renders a copy-to-clipboard element.
 *
 * @customElement
 * @polymer
 * @demo
 *
 */
class GWNCopyClipboard extends LitElement {
  static get properties() {
    return {
      textToCopy: { type: String }
    };
  }

  constructor() {
    super();
    this.textToCopy = "";
  }

  render() {
    return html`
      <style>
        :host {
          display: flex;
          align-items: center;
          max-width: 100%;
        }

        ::slotted(*) {
          overflow-y: auto;
        }

        paper-icon-button {
          flex: none;
        }
      </style>

      <slot></slot>

      <paper-icon-button
        icon="my-icons:content-copy"
        ?hidden="${!this._supportsClipboardApi()}"
        @click="${() => this._attemptCopy()}"
      ></paper-icon-button>
    `;
  }

  _supportsClipboardApi() {
    return navigator.clipboard ? true : false;
  }

  _attemptCopy(e) {
    if (!navigator.clipboard) return console.log("No clipboard support");
    if (!this.textToCopy) return console.log("No text to copy found");

    navigator.clipboard
      .writeText(this.textToCopy)
      .then(() => {
        //console.log("Copied to clipboard!", this.textToCopy);
      })
      .catch(err => {
        console.log("Could not copy to clipboard", err);
      });
  }
}

customElements.define("gwn-copy-clipboard", GWNCopyClipboard);
