import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import { GestureEventListeners } from "@polymer/polymer/lib/mixins/gesture-event-listeners.js";
import "@polymer/paper-icon-button/paper-icon-button.js";
import "../my-icons.js";

class GWNModal extends GestureEventListeners(PolymerElement) {
  static get properties() {
    return {
      hidden: {
        type: Boolean,
        notify: true,
        reflectToAttribute: true
      }
    };
  }

  static get template() {
    return html`
      <style>
        :host {
          --gwn-modal-padding: 1.5rem;

          display: block;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          z-index: 9999;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          box-sizing: border-box;
          padding: var(--gwn-modal-padding);
        }
        
        :host([hidden]) {
          display: none !important;
        }

        .backdrop {
          top: 0;
          left: 0;
          position: absolute;
          height: 100%;
          width: 100%;
          background-color: rgba(0, 0, 0, .2);
        }

        .modal {
          position: relative;
          display: flex;
          flex-direction: column;
          width: var(--gwn-modal-width, 500px);
          max-width: var(--gwn-modal-max-width, 100%);
          max-height: calc(100vh - var(--gwn-modal-padding) * 2);
          background-color: white; 
          border-radius: 2px;
          box-shadow: 0 2px 4px rgba(0,0,0,.12);
          box-sizing: border-box;
          padding: .5rem .5rem 1rem .5rem;
        }

        ::slotted(:not(.backdrop)) {
          margin: 0 .5rem;
        }

        ::slotted([slot="content"]) {
          overflow-y: auto;
        }

        header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: .5rem;
          flex: 1 0 auto;
        }
      </style>

      <div class="backdrop" on-tap="close"></div>

      <div class="modal">
        <header>
          <slot name="title"></slot>
          <paper-icon-button icon="my-icons:close" on-tap="close">Close</paper-icon-button>
        </header>
        <slot name="content"></slot>
      </div>
    `;
  }

  close() {
    this.set('hidden', true);
  }
}

window.customElements.define("gwn-modal", GWNModal);
