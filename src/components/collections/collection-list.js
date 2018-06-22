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
      }

      table {
        width: calc(100% - var(--spacer-large) * 2);
        text-align: left;
      }

      th {
        padding: .5rem 4px;
      }

      td {
        padding: .5rem 4px;
        cursor: pointer;
      }

      tbody tr:hover {
        background-color: rgba(0, 0, 0, .1);
      }

      tr td:first-child, tr th:first-child {
        padding-left: 1rem;
      }

      tr td:last-child, tr th:last-child {
        padding-right: 1rem;
      }

      tr:nth-child(2n) {
        background-color: rgba(0, 0, 0, .04);
      }

      .card {
        padding: .5rem 0;
      }

      .align-right {
        text-align: right;
      }

      .category-name {
        width: 100%;
      } 

      gw2-coin-output {
        text-align: right;
        width: 50%;
      }

      @media screen and (min-width: 900px) {
        .category-name {
          width: 40%;
        }

        gw2-coin-output {
          width: 30%;
        }
      }
    </style>

    <table class="card row" cellspacing="0">
      <thead>
        <tr>
          <th>Collection</th>
          <th class="align-right">Buy Order</th>
          <th class="align-right">Sell Listing</th>
        </tr>
      </thead>
      <tbody>
        <template is="dom-repeat" items="[[collectionData]]" as="collection" initial-count="5" target-framerate="60">
          <tr on-tap="openModal">
            <td>[[ collection.name ]]</td>
            <td class="align-right">
              <gw2-coin-output prepend-zeroes coin-string="[[_calcTotalPrices(collection.items, 'buys')]]"></gw2-coin-output>
            </td>
            <td class="align-right">
              <gw2-coin-output prepend-zeroes="" coin-string="[[_calcTotalPrices(collection.items, 'sells')]]"></gw2-coin-output>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
    `;
  }

  /**
   * Object describing property-related metadata used by Polymer features
   */
  static get properties() {
    return {
      collectionData: Array
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
    if (!e.model.collection) return;

    store.dispatch({
      type: SELECT_COLLECTION,
      selectedCollection: {
        name: e.model.collection.name,
        items: e.model.collection.items,
        totalBuy: this._calcTotalPrices(e.model.collection.items, "buys"),
        totalSell: this._calcTotalPrices(e.model.collection.items, "sells")
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
