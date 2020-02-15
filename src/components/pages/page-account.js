import {LitElement, html, css} from 'lit-element';

import { connect } from "pwa-helpers/connect-mixin.js";

// Load redux store
import { store } from "../../store.js";

// Lazy load reducers
import account from "../../reducers/account.js";
store.addReducers({
  account
});

import { getAccount, getAccountWallet } from "../../api/account.js";
import { getCurrencies } from "../../api/currencies.js";
import { getWorld } from '../../api/worlds.js';

import "../utilities/gwn-item-icon.js";

/**
 * `page-account` is a page that shows basic information about your GW2 account.
 *
 * @customElement
 * @polymer
 * @demo
 * 
 */
class PageAccount extends connect(store)(LitElement) {
    static get properties() {
        return {
            apikey: String,
            account: Object,
            world: Object,
            wallet: Array
        }
    }

    /**
     * Instance of the element is created/upgraded. Use: initializing state,
     * set up event listeners, create shadow dom.
     * @constructor
     */
    constructor() {
        super();
        this.apikey = "";
        this.account = {};
        this.wallet = [];
        this.world = {};
    }

    static get styles() {
        return [
            css`
                .container {
                    max-width: 1100px;
                    margin: var(--spacer-large) auto 0;
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    grid-gap: var(--spacer-large);
                    align-items: flex-start;
                }

                .card {
                    border-radius: var(--gwn-border-radius);
                    background-color: var(--gwn-surface);
                    color: var(--gwn-on-surface);
                    box-shadow: var(--gwn-box-shadow);
                    box-sizing: border-box;
                    overflow: hidden;
                }

                .card__header {
                    padding: var(--spacer-medium) var(--spacer-medium) 0;
                }

                .bold {
                    font-weight: bold;
                }

                ul {
                    list-style: none;
                    padding: 0;
                }

                .currencies {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                }

                li {
                    padding: var(--spacer-small) var(--spacer-medium);
                }

                li:nth-child(even) {
                    background: rgba(0, 0, 0, 0.1);
                }

                gwn-item-icon {
                    width: 24px;
                    height: 24px;
                }
            `,
        ];
    }

    /**
     * Implement to describe the element's DOM using lit-html.
     * Use the element current props to return a lit-html template result
     * to render into the element.
     */
    render() {
        return html`            
            <div class="container">
                <div class="card">
                    <div class="card__header">Welcome back <span class="bold">${ this.account.name }</span></div>
                    <ul>
                        <li>${ this._getAccountAge() }</li>
                        <li>World: ${ this.world.name }</li>
                        <li>${ this.account.created }</li>
                        <li>${ this.account.fractal_level }</li>
                        <li>${ this.account.wvw_rank }</li>
                        <li>${ this.account.daily_ap }</li>
                        <li>${ this.account.monthly_ap }</li>
                    </ul>
                </div>

                <div class="card">
                    <div class="bold card__header">Wallet</div>
                    <ul class="currencies">
                        ${ this.wallet.map(entry => this._renderWalletItem( entry )) }
                    </ul>
                </div>
            </div>
        `;
    }

    _renderWalletItem( item ) {
        return html`
            <li>
                <gwn-item-icon icon="${ item.icon }" name="${ item.name }"></gwn-item-icon> 
                ${ item.value || 0 } 
            </li>
        `;
    }

    _getAccountAge() {
        return this.account.age;//humanizeDuration(this.account.age || 0);
    }

    _stateChanged(state) {
        if (!state || !state.settings) return;

        if (this.apikey !== state.settings.apiKey) {
            this.apikey = state.settings.apiKey;
            this._loadAccount();
        }
    }

    async _loadAccount() {
        this.account = await getAccount(this.apikey);
        this.world = await getWorld(this.account.world);
        this._loadWallet();
    }

    async _loadWallet() {
        const [ currencies, wallet ] = await Promise.all([ getCurrencies(), getAccountWallet(this.apikey) ]);
        this.wallet = currencies
            .filter(currency => currency.name !== '')
            .map(currency => {
                return { ...currency, ...wallet.find(entry => entry.id === currency.id) }
            });
        console.log(this.wallet);
    }
}

customElements.define('page-account', PageAccount);