import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "@polymer/polymer/lib/elements/dom-repeat.js";
import { connect } from 'pwa-helpers/connect-mixin.js';

// Load redux store
import { store } from '../../store.js';

// These are the actions needed by this element.
import { UPDATE_COLLECTION_MODAL } from '../../actions/collections.js';

// Lazy load reducers
import collections from '../../reducers/collections.js';
store.addReducers({
  collections
});

import "../utilities/gwn-modal.js";
import { SharedStyles } from "../shared-styles.js";

class CollectionModal extends connect(store)(PolymerElement) {
  static get template() {
    return html`
      ${SharedStyles}
      <style>
        :host {
          display: block;
        }

        :host([hidden]) {
          display: none;
        }

        .headline {
          margin-bottom: 0;
          font-weight: bold;
        }

        .table-scroll {
          margin-top: .5rem;
          overflow-x: auto;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          border-spacing: 0;
          min-width: 600px;
        }

        th {
          text-align: left;
          font-size: .9rem;
          font-weight: 800;
        }

        td, th {
          padding: 4px;
        }

        tr:nth-child(2n) {
          background-color: rgba(0, 0, 0, .025);
        }

        gwn-modal {
          --gwn-modal-width: 800px;
          /* --gwn-modal-padding: 0; */
        }
/*
        [slot="title"] {
          margin: .5rem 1rem;
        }

        [slot="content"] {
          margin: 0;
        } */

        .align-right {
          text-align: right;
        }
        
        .icon {
          width: 32px;
          height: auto;
          margin-right: .5rem;
          vertical-align: middle;
        }
      </style>

      <gwn-modal hidden="[[!open]]" on-hidden-changed="_hiddenChanged">
        <h3 class="headline" slot="title">[[collectionName]]</h3>
        <div slot="content">
          <div class="table-scroll">
            <table cellspacing="0">
              <thead>
                <tr>
                  <th>Item</th>
                  <th class="align-right">Buy Order</th>
                  <th class="align-right">Sell Listing</th>
                </tr>
              </thead>

              <tbody>
                <template is="dom-repeat" items="[[collectionItems]]" initial-count="5" target-framerate="60">
                  <tr>
                    <td>
                      <img class="icon" src="[[item.icon]]" alt="[[item.name]]"> 
                      <span>[[item.name]]</span>
                    </td>
                    <td class="align-right">
                      <gw2-coin-output prepend-zeroes coin-string="[[item.buys.unit_price]]"></gw2-coin-output>
                    </td>
                    <td class="align-right">
                      <gw2-coin-output prepend-zeroes coin-string="[[item.sells.unit_price]]"></gw2-coin-output>
                    </td>
                  </tr>
                </template>
              </tbody>

              <tfoot>
                <tr>
                  <th>Total</th>
                  <th class="align-right">
                    <gw2-coin-output prepend-zeroes coin-string="[[totalBuy]]"></gw2-coin-output>
                  </th>
                  <th class="align-right">
                    <gw2-coin-output prepend-zeroes coin-string="[[totalSell]]"></gw2-coin-output>
                  </th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </gwn-modal>
    `;
  }

  static get properties() {
    return {
      open: {
        type: Boolean,
        value: false
      },
      collectionName: String,
      collectionItems: String,
      totalBuy: Number,
      totalSell: Number
    };
  }

  _hiddenChanged(e) {
    if (!e) return;

    store.dispatch({
      type: UPDATE_COLLECTION_MODAL,
      collectionModalOpened: !e.detail.value
    });
  }

  // This is called every time something is updated in the store.
  _stateChanged(state) {
    if (!state) return;
    this.set('open', state.collections.collectionModalOpened);
    this.set('collectionName', state.collections.selectedCollection.name);
    this.set('collectionItems', state.collections.selectedCollection.items);
    this.set('totalBuy', state.collections.selectedCollection.totalBuy);
    this.set('totalSell', state.collections.selectedCollection.totalSell);
  }
}

window.customElements.define("collection-modal", CollectionModal);
