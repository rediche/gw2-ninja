import {LitElement, html, css} from 'lit-element';

/**
 * `page-account` is a page that shows basic information about your GW2 account.
 *
 * @customElement
 * @polymer
 * @demo
 * 
 */
class PageAccount extends LitElement {
    static get properties() {
        return {

        }
    }

    /**
     * Instance of the element is created/upgraded. Use: initializing state,
     * set up event listeners, create shadow dom.
     * @constructor
     */
    constructor() {
        super();
    }

    static get styles() {
        return [
            css``,
        ];
    }

    /**
     * Implement to describe the element's DOM using lit-html.
     * Use the element current props to return a lit-html template result
     * to render into the element.
     */
    render() {
        return html`
            <h1>Account</h1>
        `;
    }

}

customElements.define('page-account', PageAccount);