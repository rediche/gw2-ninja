import { LitElement, html, css } from "lit-element";

class GWNHeader extends LitElement {
  static get properties() {
    return {};
  }

  static get styles() {
    return [
      css`
        :host {
          display: block;
          position: sticky;
          top: 0;
        }
        
        header {
          display: flex;
          align-items: center;
          height: 4rem;
          padding: 0 1rem;
        }
      `
    ];
  }

  render() {
    return html`
      <header><slot></slot></header>
    `;
  }
}

window.customElements.define("gwn-header", GWNHeader);
