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
          z-index: 401;
          box-shadow: 0 4px 6px rgba(0,0,0,.2);
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
