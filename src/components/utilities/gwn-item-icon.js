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

        :host([hidden]) {
          display: none !important;
        }

        :host([rarity]) {
          border: 1px solid black;
        }

        :host([rarity="Junk"]) {
          border-color: #AAA;
        }

        :host([rarity="Fine"]) {
          border-color: #62A4DA;
        }

        :host([rarity="Masterwork"]) {
          border-color: #1A9306;
        }
        
        :host([rarity="Rare"]) {
          border-color: #FCD00B;
        }
        
        :host([rarity="Exotic"]) {
          border-color: #FFA405;
        }
        
        :host([rarity="Ascended"]) {
          border-color: #FB3E8D;
        }
        
        :host([rarity="Legendary"]) {
          border-color: #4C139D;
        }

        img {
          width: inherit;
          height: inherit;
          max-width: 100%;
          vertical-align: middle;
        }
      </style>

      <img src="[[icon]]" alt="[[name]]">
    `;
  }
}

window.customElements.define("gwn-item-icon", GWNItemIcon);
