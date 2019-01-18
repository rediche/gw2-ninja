import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "gw2-tpcalc/gw2-tpcalc.js";
import { SharedStyles } from "../shared-styles.js";

class PageCalc extends PolymerElement {
  static get is() {
    return "page-calc";
  }

  static get template() {
    return html`
    ${SharedStyles}
    <style>
      :host {
        padding: var(--spacer-large);

        /* gw2-tpcalc */
        --gw2-tpcalc-card-background-color: var(--gwn-surface);
        --gw2-tpcalc-card-color: var(--gwn-on-surface);
        --paper-input-container-input-color: var(--gwn-on-surface);
        --paper-font-subhead: {
          font-family: var(--gwn-font-family);
        }
      }

      gw2-tpcalc {
        max-width: 800px;
        margin-left: auto;
        margin-right: auto;
      }
    </style>

    <gw2-tpcalc></gw2-tpcalc>
    `;
  }
}

window.customElements.define(PageCalc.is, PageCalc);
