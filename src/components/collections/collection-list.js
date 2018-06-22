import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import { GestureEventListeners } from "@polymer/polymer/lib/mixins/gesture-event-listeners.js";
import "@polymer/polymer/lib/elements/dom-repeat.js";
import "gw2-coin-output/gw2-coin-output.js";
import { SharedStyles } from "../shared-styles.js";

/**
 * `collection-list` Description
 *
 * @summary ShortDescription.
 * @customElement
 * @polymer
 * @extends {PolymerElement}
 */
class CollectionList extends GestureEventListeners(PolymerElement) {
  static get template() {
    return html`
    ${SharedStyles}
    <style>
      :host {
        display: block;
        margin: var(--spacer-large);
      }

      .card {
        padding: 0;
      }

      .category-name {
        font-weight: 800;
      }

      .category,
      .category-item {
        padding: var(--spacer-medium);
        border-bottom: 1px solid rgba(0,0,0,.12);
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        justify-content: flex-end;
      }

      .category {
        cursor: pointer;
        border-bottom: none;
      }

      .category-item {
        background-color: rgba(0,0,0,.025);
        display: none;
      }

      :host([expanded]) .category-item {
        display: flex;
      }

      :host([expanded]) .category {
        box-shadow: 0 2px 4px rgba(0,0,0,.12);
      }

      .category-name,
      .category-item-name {
        margin: 0 0 var(--spacer-small);
        width: 100%;
      }

      gw2-coin-output {
        text-align: right;
        width: 50%;
      }

      @media screen and (min-width: 900px) {
        .category,
        .category-item {
          flex-wrap: nowrap;
        }

        .category-name,
        .category-item-name {
          margin: 0;
          width: 40%;
        }

        gw2-coin-output {
          width: 30%;
        }
      }
    </style>

    <div class="card">
      <div class="category" on-tap="triggerOpenEvent">
        <p class="category-name">[[categoryName]]</p>
        <gw2-coin-output prepend-zeroes="" coin-string="[[_calcTotalPrices(categoryItems, 'buys')]]"></gw2-coin-output>
        <gw2-coin-output prepend-zeroes="" coin-string="[[_calcTotalPrices(categoryItems, 'sells')]]"></gw2-coin-output>
      </div>
      
      <template is="dom-repeat" items="{{categoryItems}}" initial-count="5" target-framerate="60">
        <div class="category-item">
          <p class="category-item-name">[[item.name]]</p>
          <gw2-coin-output prepend-zeroes="" coin-string="[[item.buys.unit_price]]"></gw2-coin-output>
          <gw2-coin-output prepend-zeroes="" coin-string="[[item.sells.unit_price]]"></gw2-coin-output>
        </div>
      </template>
    </div>`;
  }

  /**
   * Object describing property-related metadata used by Polymer features
   */
  static get properties() {
    return {
      categoryName: {
        type: String
      },
      categoryItems: {
        type: Array
      },
      expanded: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      }
    };
  }

  _calcTotalPrices(items, buysOrSells) {
    let totalPrices = 0;

    switch (buysOrSells) {
      case "sells":
        items.forEach(item => {
          totalPrices += item.sells.unit_price;
        });
        break;
      case "buys":
      default:
        items.forEach(item => {
          totalPrices += item.buys.unit_price;
        });
        break;
    }

    return totalPrices;
  }

  toggleExpanded(e) {
    this.set("expanded", !this.expanded);
  }

  triggerOpenEvent(e) {
    this.dispatchEvent(new CustomEvent("collection-selected", {
      detail: {
        name: this.categoryName,
        items: this.categoryItems
      }
    }))
  }
}

window.customElements.define("collection-list", CollectionList);
