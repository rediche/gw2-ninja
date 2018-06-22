import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "../utilities/gwn-modal.js";
import { SharedStyles } from "../shared-styles.js";

class CollectionModal extends PolymerElement {
  static get properties() {
    return {
      open: {
        type: Boolean,
        notify: true
      }
    };
  }

  static get template() {
    return html`
      ${SharedStyles}
      <style>
        :host {
          display: block;
        }

        :host([hidden]) {
          display: none;
        }

        .headline {
          margin-bottom: 0;
          font-weight: bold;
        }
      </style>
      <gwn-modal hidden="{{!open}}">
        <h3 class="headline" slot="title">Collection name</h3>
        <div slot="content">
          This is a test modal
        </div>
      </gwn-modal>
    `;
  }
}

window.customElements.define("collection-modal", CollectionModal);
