import {LitElement, html, css} from 'lit-element';

import { connect } from "pwa-helpers/connect-mixin.js";

// Load redux store
import { store } from "../../store.js";

// Lazy load reducers
import account from "../../reducers/account.js";
store.addReducers({
  account
});

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
            name: String
        }
    }

    /**
     * Instance of the element is created/upgraded. Use: initializing state,
     * set up event listeners, create shadow dom.
     * @constructor
     */
    constructor() {
        super();
        this.name = "";
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
                    <div class="bold">Account</div>
                    <ul>
                        <li>${ this.name }</li>
                    </ul>
                </div>
            </div>
        `;
    }

    _stateChanged(state) {
        if (!state) return;
    
        
        if ( state.account ) {
            console.log(state.account);
            this.name = state.account.name;
            // TODO: Redirect to frontpage if no account available
          //this.set("hasAccount", !!state.account.name);
        }
      }

}

customElements.define('page-account', PageAccount);