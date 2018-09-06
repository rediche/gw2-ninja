import {LitElement, html} from '@polymer/lit-element';

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
      textToCopy: String
    }
  }

  _render({}) {
    return html`
      <style>
        :host {
          display: flex;
          align-items: center;
          max-width: 100%;
        }

        paper-icon-button {
          flex: none;
        }
      </style>

      <slot></slot>

      <paper-icon-button 
        icon="my-icons:content-copy" 
        hidden?="${ !this._supportsClipboardApi() }"
        on-click="${ () => this._attemptCopy() }"></paper-icon-button>
    `;
  }

  _supportsClipboardApi() {
    return navigator.clipboard ? true : false;
  }

  _attemptCopy(e) {
    if (!navigator.clipboard) return console.log("No clipboard support");
    if (!this.textToCopy) return console.log("No text to copy found");

    navigator.clipboard.writeText(this.textToCopy)
      .then(() => {
        //console.log("Copied to clipboard!", this.textToCopy);
      })
      .catch(err => {
        console.log("Could not copy to clipboard", err);
      });
  }

  /**
   * Instance of the element is created/upgraded. Use: initializing state,
   * set up event listeners, create shadow dom.
   * @constructor
   */
  constructor() {
    super();

    this.textToCopy = "";
  }

}

customElements.define('gwn-copy-clipboard', GWNCopyClipboard);