import { LitElement, html } from "@polymer/lit-element";

/**
 * `gwn-progress`
 *
 * @customElement
 * @polymer
 * @demo
 *
 */
class GWNProgress extends LitElement {
  static get properties() {
    return {
      progress: Number,
      max: Number
    };
  }

  _render({ progress, max }) {
    return html`
      <style>
        :host {
          display: block;
          background-color: var(--gwn-progress-background, rgba(0, 0, 0, 0.2));
          margin: 4px 0;
        }

        :host([hidden]) {
          display: none;
        }

        .progress {
          height: 100%;
          box-sizing: border-box;
          background-color: var(--gwn-progress-color, #9c27b0);
          padding: var(--gwn-progress-padding, 1px 4px);
          color: var(--gwn-progress-label-color, #ffffff);
          font-weight: var(--gwn-progress-label-weight, 600);
        }
      </style>

      <div class="progress" style$="width: ${(progress / max) * 100}%;">
        <slot></slot>
      </div>
    `;
  }

  constructor() {
    super();

    this.progress = 50;
    this.max = 100;
  }
}

customElements.define("gwn-progress", GWNProgress);
