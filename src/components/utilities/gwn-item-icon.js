import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";

class GWNItemIcon extends PolymerElement {
  static get properties() {
    return {
      icon: String,
      name: String,
      rarity: {
        type: String,
        reflectToAttribute: true
      }
    };
  }

  static get template() {
    return html`
      <style>
        :host {
          display: inline-block;
        }

        :host([rarity]) {
          border: 1px solid black;
        }

        :host([rarity="Junk"]) {
          border-color: #aaa;
        }

        :host([rarity="Fine"]) {
          border-color: #62a4da;
        }

        :host([rarity="Masterwork"]) {
          border-color: #1a9306;
        }

        :host([rarity="Rare"]) {
          border-color: #fcd00b;
        }

        :host([rarity="Exotic"]) {
          border-color: #ffa405;
        }

        :host([rarity="Ascended"]) {
          border-color: #fb3e8d;
        }

        :host([rarity="Legendary"]) {
          border-color: #4c139d;
        }

        img {
          max-width: 100%;
          vertical-align: middle;
        }
      </style>

      <img src="[[icon]]" alt="[[name]]" />
    `;
  }
}

window.customElements.define("gwn-item-icon", GWNItemIcon);
