import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import { GestureEventListeners } from "@polymer/polymer/lib/mixins/gesture-event-listeners.js";

import "@vaadin/vaadin-grid/vaadin-grid";
import "@vaadin/vaadin-grid/vaadin-grid-sorter";

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
        max-width: 1100px;
        margin: var(--spacer-large) auto;
      }

      .card {
        padding: 0;
        margin: 0 var(--spacer-large);
      }

      .align-right {
        text-align: right;
      }

      gw2-coin-output {
        text-align: right;
        display: block;
      }
    </style>

    <vaadin-grid class="card" theme="no-border row-stripes" height-by-rows items="[[collectionData]]">
      <vaadin-grid-column>
        <template class="header">
          <vaadin-grid-sorter path="name">Collection</vaadin-grid-sorter>
        </template>
        <template>
          <div>[[ item.name ]]</div>
        </template>
        <template class="footer">Collection</template>
      </vaadin-grid-column>

      <vaadin-grid-column>
        <template class="header">
          <div class="align-right">Buy Order</div>
        </template>
        <template>
          <gw2-coin-output prepend-zeroes coin-string="[[_calcTotalPrices(item.items, 'buys')]]"></gw2-coin-output>
        </template>
        <template class="footer">
          <div class="align-right">Buy Order</div>
        </template>
      </vaadin-grid-column>

      <vaadin-grid-column>
        <template class="header">
          <div class="align-right">Sell Listing</div>
        </template>
        <template>
          <gw2-coin-output prepend-zeroes coin-string="[[_calcTotalPrices(item.items, 'sells')]]"></gw2-coin-output>
        </template>
        <template class="footer">
          <div class="align-right">Sell Listing</div>
        </template>
      </vaadin-grid-column>
    </vaadin-grid>
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
