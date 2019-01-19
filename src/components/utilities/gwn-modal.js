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

  static get observers() {
    return ["_hiddenChanged(hidden)"];
  }

  static get template() {
    return html`
      <style>
        :host {
          --gwn-modal-margin: 1.5rem;
          --gwn-modal-padding: 0.5rem;

          display: block;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 9999;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          box-sizing: border-box;
          padding: var(--gwn-modal-margin);
        }

        :host([hidden]) {
          display: none !important;
        }

        .backdrop {
          top: 0;
          left: 0;
          position: fixed;
          height: 100%;
          width: 100%;
          background-color: rgba(0, 0, 0, 0.5);
        }

        .modal {
          position: relative;
          display: flex;
          flex-direction: column;
          width: var(--gwn-modal-width, 500px);
          max-width: var(--gwn-modal-max-width, 100%);
          max-height: var(
            --gwn-modal-max-height,
            calc(100vh - var(--gwn-modal-margin) * 2)
          );
          background-color: var(--gwn-surface);
          color: var(--gwn-on-surface);
          border-radius: var(--gwn-border-radius);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
          box-sizing: border-box;
          overflow: hidden;
        }

        header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
          flex: 1 0 auto;
          padding: var(--gwn-modal-padding) var(--gwn-modal-padding) 0
            calc(var(--gwn-modal-padding) * 2);
        }

        paper-icon-button {
          flex: none;
        }

        ::slotted([slot="content"]) {
          padding: var(
            --gwn-modal-content-padding,
            0 calc(var(--gwn-modal-padding) * 2)
              calc(var(--gwn-modal-padding) * 2)
          );
          overflow-y: var(--gwn-modal-content-overflow-y, auto);
        }
      </style>

      <div class="backdrop" on-tap="close"></div>

      <div class="modal">
        <header>
          <slot name="title"></slot>
          <paper-icon-button icon="my-icons:close" on-tap="close"
            >Close</paper-icon-button
          >
        </header>
        <slot name="content"></slot>
      </div>
    `;
  }

  close() {
    this.set("hidden", true);
  }

  _hiddenChanged(hidden) {
    if (hidden) {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }
  }
}

window.customElements.define("gwn-modal", GWNModal);
