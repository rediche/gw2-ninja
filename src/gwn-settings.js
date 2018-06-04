import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "./utilities/gwn-modal.js";

class GWNSettings extends PolymerElement {
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
      <gwn-modal hidden="{{!open}}">
        <h3 slot="title">Settings</h3>
        <div slot="content">Content</div>
      </gwn-modal>
    `;
  }
}

window.customElements.define("gwn-settings", GWNSettings);
