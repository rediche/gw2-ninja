import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import { GestureEventListeners } from "@polymer/polymer/lib/mixins/gesture-event-listeners.js";
import "@polymer/polymer/lib/elements/dom-repeat.js";

import { connect } from "pwa-helpers/connect-mixin.js";

// Load redux store
import { store } from "../../store.js";

// These are the actions needed by this element.
import {
  OPEN_COLLECTION_MODAL,
  SELECT_COLLECTION
} from "../../actions/collections.js";

// Lazy load reducers
import collections from "../../reducers/collections.js";
store.addReducers({
  collections
});

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
class CollectionList extends connect(store)(
  GestureEventListeners(PolymerElement)
) {
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

      .category {
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

      :host([expanded]) .category {
        box-shadow: 0 2px 4px rgba(0,0,0,.12);
      }

      .category-name {
        margin: 0 0 var(--spacer-small);
        width: 100%;
      }

      gw2-coin-output {
        text-align: right;
        width: 50%;
      }

      @media screen and (min-width: 900px) {
        .category {
          flex-wrap: nowrap;
        }

        .category-name {
          margin: 0;
          width: 40%;
        }

        gw2-coin-output {
          width: 30%;
        }
      }
    </style>

    <div class="card">
      <div class="category" on-tap="openModal">
        <p class="category-name">[[categoryName]]</p>
        <gw2-coin-output prepend-zeroes="" coin-string="[[_calcTotalPrices(categoryItems, 'buys')]]"></gw2-coin-output>
        <gw2-coin-output prepend-zeroes="" coin-string="[[_calcTotalPrices(categoryItems, 'sells')]]"></gw2-coin-output>
      </div>
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

  openModal(e) {
    store.dispatch({ 
      type: SELECT_COLLECTION, 
      selectedCollection: {
        name: this.categoryName,
        items: this.categoryItems,
        totalBuy: this._calcTotalPrices(this.categoryItems, "buys"),
        totalSell: this._calcTotalPrices(this.categoryItems, "sells")
      } 
    });
    store.dispatch({ type: OPEN_COLLECTION_MODAL });
  }

  // This is called every time something is updated in the store.
  _stateChanged(state) {
    if (!state) return;
    //this.set('open', state.collections.collectionModalOpened);
  }
}

window.customElements.define("collection-list", CollectionList);
