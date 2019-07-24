import { LitElement, html } from "lit-element";
import "../links/links-form";

/**
 * `page-links`
 *
 * @customElement
 * @polymer
 * @demo
 *
 */
class PageLinks extends LitElement {
  static get properties() {
    return {};
  }

  render() {
    return html`
      <style>
        :host {
          display: block;
          padding: 0 var(--spacer-large);
        }
      </style>

      <h2>Guild Wars 2 Link Shortener</h2>

      <links-form></links-form>
    `;
  }

  constructor() {
    super();
  }
}

customElements.define("page-links", PageLinks);
