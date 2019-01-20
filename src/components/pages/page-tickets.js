import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import { afterNextRender } from "@polymer/polymer/lib/utils/render-status.js";
import "@polymer/paper-spinner/paper-spinner.js";
import "@polymer/paper-toast/paper-toast.js";
import "gw2-coin-output/gw2-coin-output.js";
import { SharedStyles } from "../shared-styles.js";

class PageTickets extends PolymerElement {
  static get properties() {
    return {
      collectionData: {
        type: Array,
        observer: "_calculateAverage"
      },
      averageBuy: {
        type: Number
      },
      averageSell: {
        type: Number
      },
      averageBuyLoading: {
        type: Boolean,
        value: true
      },
      averageSellLoading: {
        type: Boolean,
        value: true
      }
    };
  }

  static get template() {
    return html`
      ${SharedStyles}
      <style>
        :host {
          display: block;
        }

        .title {
          margin-bottom: 0;
        }

        .card {
          margin: var(--spacer-large);
          max-width: 30rem;
        }

        gw2-coin-output {
          display: block;
        }

        paper-spinner {
          margin: 1.75rem 0;
          display: block;
        }
      </style>

      <p class="description">
        Ever wondered what it would cost to buy a Black Lion Claim Ticket with
        gold?<br />
        This tool does the math for you, so you don't have to.
      </p>

      <div class="card">
        <p class="title">Average Listing Price</p>
        <paper-spinner
          active="[[averageSellLoading]]"
          hidden$="[[!averageSellLoading]]"
        ></paper-spinner>
        <gw2-coin-output
          class="display-3"
          prepend-zeroes
          coin-string="[[averageSell]]"
          hidden$="[[averageSellLoading]]"
        ></gw2-coin-output>
      </div>
      <div class="card">
        <p class="title">Average Order Price</p>
        <paper-spinner
          active="[[averageBuyLoading]]"
          hidden$="[[!averageBuyLoading]]"
        ></paper-spinner>
        <gw2-coin-output
          class="display-3"
          prepend-zeroes
          coin-string="[[averageBuy]]"
          hidden$="[[averageBuyLoading]]"
        ></gw2-coin-output>
      </div>

      <paper-toast
        id="toast"
        duration="0"
        text="An error occured."
      ></paper-toast>
    `;
  }

  ready() {
    super.ready();

    afterNextRender(this, function() {
      this._loadCollectionData();
    });
  }

  _calculateAverage(collectionData) {
    let totalWeapons = 0;
    let totalTickets = 0;
    let totalBuy = 0;
    let totalSell = 0;

    collectionData.forEach(collection => {
      let tempTotals = this._calcTotalPrices(collection.items);
      totalBuy += tempTotals.buys;
      totalSell += tempTotals.sells;
      totalWeapons += collection.items.length;
      totalTickets += collection.tickets * collection.items.length;
    });

    let averageBuy = totalBuy / totalWeapons / (totalTickets / totalWeapons);
    this.set("averageBuy", averageBuy);
    this.set("averageBuyLoading", false);

    let averageSell = totalSell / totalWeapons / (totalTickets / totalWeapons);
    this.set("averageSell", averageSell);
    this.set("averageSellLoading", false);
  }

  _calcTotalPrices(items) {
    let totals = {
      buys: 0,
      sells: 0
    };

    items.forEach(item => {
      totals.sells += item.sells.unit_price;
      totals.buys += item.buys.unit_price;
    });

    return totals;
  }

  async _loadCollectionData() {
    const collectionMeta = await fetch("./src/data/collections.json");

    if (collectionMeta.status !== 200) {
      console.log(collectionMeta.status, collectionMeta.statusText);
      this.$.toast.fitInto = this;
      this.$.toast.open();
    }

    const collectionJson = await collectionMeta.json();
    const collectionData = this._filterEntries(collectionJson, "blacklion");
    const collectionDataWithPrices = await Promise.all(
      collectionData.map(async collection => {
        return Object.assign({}, collection, {
          items: await this._loadItemData(collection.ids)
        });
      }, this)
    );

    this.set("collectionData", collectionDataWithPrices);
  }

  async _loadItemData(ids) {
    const pricesData = await fetch(
      "https://api.guildwars2.com/v2/commerce/prices?ids=" + ids + "&lang=en"
    );
    const pricesJson = await pricesData.json();
    return pricesJson;
  }

  _filterEntries(collections, category) {
    if (!collections) return;
    return collections.filter(collection => {
      return collection.category == category;
    });
  }
}

window.customElements.define("page-tickets", PageTickets);
