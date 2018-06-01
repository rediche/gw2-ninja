import {
  PolymerElement,
  html
} from "../../../node_modules/@polymer/polymer/polymer-element.js";
import "../../../node_modules/gw2-tpcalc/gw2-tpcalc.js";
import "../shared-styles.js";

class PageCalc extends PolymerElement {
  static get is() {
    return "page-calc";
  }

  static get template() {
    return html`
    <style include="shared-styles">
      :host {
        display: block;

        padding: var(--spacer-large);

        /* gw2-tpcalc */
        --gw2-tpcalc-card-background-color: #fff;
        --gw2-tpcalc-card-color: #000;
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
