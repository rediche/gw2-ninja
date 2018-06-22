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

        table {
          width: 100%;
          border-collapse: collapse
          border-spacing: 0;
        }

        td {
          padding: 4px;
        }

        tr:nth-child(2n) {
          background-color: rgba(0, 0, 0, .025);
        }

        gwn-modal {
          --gwn-modal-width: 800px;
        }

        .align-right {
          text-align: right;
        }
        
        .icon {
          height: 32px;
          width: 32px;
          vertical-align: middle;
        }
      </style>
      <gwn-modal hidden="[[!open]]" on-hidden-changed="_hiddenChanged">
        <h3 class="headline" slot="title">[[collectionName]]</h3>
        <div slot="content">
          <table>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Buy Order</th>
              <th>Sell Listing</th>
            </tr>

            <template is="dom-repeat" items="[[collectionItems]]" initial-count="5" target-framerate="60">
              <tr>
                <td>
                  <img class="icon" src="[[item.icon]]" alt="[[item.name]]"> 
                </td>
                <td>[[item.name]]</td>
                <td class="align-right">
                  <gw2-coin-output prepend-zeroes coin-string="[[item.buys.unit_price]]"></gw2-coin-output>
                </td>
                <td class="align-right">
                  <gw2-coin-output prepend-zeroes coin-string="[[item.sells.unit_price]]"></gw2-coin-output>
                </td>
              </tr>
            </template>
          </table>
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
      collectionItems: String
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
    console.log(state.collections.selectedCollection.items);
  }
}

window.customElements.define("collection-modal", CollectionModal);
