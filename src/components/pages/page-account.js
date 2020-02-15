import {LitElement, html, css} from 'lit-element';

import { connect } from "pwa-helpers/connect-mixin.js";

// Load redux store
import { store } from "../../store.js";

// Lazy load reducers
import account from "../../reducers/account.js";
store.addReducers({
  account
});

import { getAccount } from "../../api/account.js";
import { getWorld } from '../../api/worlds.js';

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
            world: Object
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
        this.world = {};
    }

    static get styles() {
        return [
            css`
                .container {
                    max-width: 1100px;
                    margin: var(--spacer-large) auto 0;
                }

                .card {
                    padding: var(--spacer-medium);
                    border-radius: var(--gwn-border-radius);
                    background-color: var(--gwn-surface);
                    color: var(--gwn-on-surface);
                    box-shadow: var(--gwn-box-shadow);
                    box-sizing: border-box;
                    overflow: hidden;
                }

                .bold {
                    font-weight: bold;
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
                    <div>Welcome back <span class="bold">${ this.account.name }</span></div>
                    <ul>
                        <li>${ this._getAccountAge() }</li>
                        <li>${ this.world.name }</li>
                        <li>${ this.account.created }</li>
                        <li>${ this.account.fractal_level }</li>
                        <li>${ this.account.wvw_rank }</li>
                        <li>${ this.account.daily_ap }</li>
                        <li>${ this.account.monthly_ap }</li>
                    </ul>
                </div>
            </div>
        `;
    }

    _getAccountAge() {
        return this.account.age;//humanizeDuration(this.account.age || 0);
    }

    _stateChanged(state) {
        if (!state || !state.settings) return;

        this.apikey = state.settings.apiKey;

        this._loadAccount();
    }

    async _loadAccount() {
        this.account = await getAccount(this.apikey);
        this.world = await getWorld(this.account.world);
        console.log(this.account);
    }
}

customElements.define('page-account', PageAccount);