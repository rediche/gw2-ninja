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

        .pointer {
          cursor: pointer;
        }
      </style>

      <div class="card">
        <vaadin-grid
          theme="no-border row-stripes"
          height-by-rows
          items="[[collectionData]]"
        >
          <vaadin-grid-column>
            <template class="header">
              <vaadin-grid-sorter path="name">Collection</vaadin-grid-sorter>
            </template>
            <template>
              <div on-tap="openModal" class="pointer">[[ item.name ]]</div>
            </template>
            <template class="footer"
              >Collection</template
            >
          </vaadin-grid-column>

          <vaadin-grid-column>
            <template class="header">
              <div class="align-right">
                <vaadin-grid-sorter path="total_buy"
                  >Buy Order</vaadin-grid-sorter
                >
              </div>
            </template>
            <template>
              <gw2-coin-output
                class="pointer"
                on-tap="openModal"
                prepend-zeroes
                coin-string="[[item.total_buy]]"
              ></gw2-coin-output>
            </template>
            <template class="footer">
              <div class="align-right">Buy Order</div>
            </template>
          </vaadin-grid-column>

          <vaadin-grid-column>
            <template class="header">
              <div class="align-right">
                <vaadin-grid-sorter path="total_sell"
                  >Sell Listing</vaadin-grid-sorter
                >
              </div>
            </template>
            <template>
              <gw2-coin-output
                class="pointer"
                on-tap="openModal"
                prepend-zeroes
                coin-string="[[item.total_sell]]"
              ></gw2-coin-output>
            </template>
            <template class="footer">
              <div class="align-right">Sell Listing</div>
            </template>
          </vaadin-grid-column>
        </vaadin-grid>
      </div>
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

  openModal(e) {
    if (!e.model.item) return;

    store.dispatch({
      type: SELECT_COLLECTION,
      selectedCollection: {
        name: e.model.item.name,
        items: e.model.item.items,
        totalBuy: e.model.item.total_buy,
        totalSell: e.model.item.total_sell
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
