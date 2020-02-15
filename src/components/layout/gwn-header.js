import { LitElement, html, css } from "lit-element";

/**
 * `gwn-header`
 *
 * @customElement
 * @polymer
 * @demo
 *
 */
class GWNHeader extends LitElement {
  static get properties() {
    return {
      page: { type: String }
    };
  }

  static get styles() {
    return css`
      header {
        position: sticky;
        top: 0;
        font-weight: 800;
        color: var(--gwn-on-primary);
        background-color: var(--gwn-primary);
        display: flex;
        padding: 0 1rem;
        height: 4rem;
        align-items: center;
        z-index: 999;
      }

      paper-icon-button {
        --paper-icon-button-ink-color: var(--gwn-on-primary);
      }

      .title {
        text-transform: capitalize;
        display: flex;
        align-items: center;
        padding: 0 var(--spacer-medium);
        font-size: 1.25rem;
      }

      iron-icon {
        margin-right: var(--spacer-small);
      }

      .settings {
        margin-left: auto;
      }
    `
  }

  /**
   * Implement to describe the element's DOM using lit-html.
   * Use the element current props to return a lit-html template result
   * to render into the element.
   */
  render() {
    return html`
      <header>
        <paper-icon-button
          icon="my-icons:menu"
          @click="${ this._openDrawer }"
          aria-label="Open Menu"
        ></paper-icon-button>
        <div class="title">${ this._pageTitle(this.page) }</div>
        <paper-icon-button
          class="settings"
          icon="my-icons:settings"
          aria-label="Open Settings"
          @click="${ this._openSettings }"
        ></paper-icon-button>
      </header>
    `;
  }

  /**
   * Instance of the element is created/upgraded. Use: initializing state,
   * set up event listeners, create shadow dom.
   * @constructor
   */
  constructor() {
    super();
    this.title = "";
  }

  _pageTitle(activePage) {
    if (!activePage) return;

    if (activePage == "index") return "Home";
    if (activePage == "account") return "Account";
    if (activePage == "directory") return "Directory";
    if (activePage == "collections") return "Collections";
    if (activePage == "tickets") return "Tickets";
    if (activePage == "chatcodes") return "Chatcode Generator";
    if (activePage == "timer") return "Meta Timer";
    if (activePage == "calc") return "Trading Post Calculator";
    if (activePage == "wvw") return "World vs World";
    if (activePage == "about") return "About GW2 Ninja";
    if (activePage == "precursors") return "Precursor Rain. HALLELUJAH!";
    if (activePage == "stream") return "Stream Tools";
    if (activePage == "view404") return "Page not found";

    return activePage;
  }

  _openDrawer() {
    this.dispatchEvent(new CustomEvent('open-drawer'));
  }

  _openSettings() {
    this.dispatchEvent(new CustomEvent('open-settings'));
  }
}

customElements.define("gwn-header", GWNHeader);
