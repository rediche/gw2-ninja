import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import { afterNextRender } from "@polymer/polymer/lib/utils/render-status.js";
import "../shared-styles.js";

/**
 * `page-about`
 *
 * @summary 
 * @customElement
 * @extends {Polymer.Element}
 */
class PageAbout extends PolymerElement {
  /**
   * String providing the tag name to register the element under.
   */
  static get is() {
    return "page-about";
  }

  static get template() {
    return html`
    <style include="shared-styles">
    :host {
      display: block;
      padding: var(--spacer-large);
    }

    .card {
      max-width: 500px;
      margin-bottom: var(--spacer-large);
    }
  </style>

  <div class="card">
    <h2 class="title">About</h2>
    <p>Guild Wars 2 Ninja is a passion project by <a href="https://twitter.com/thegeil" target="_blank" rel="noopener noreferrer">Rediche</a>, a long time Guild Wars 2 player.</p>
    <p>The project started as a fun way to keep learning about the web platform and constantly try to do things in new ways and provide simple tools to make the life easier for people.</p>
    <p>GW2 Ninja is built with Polymer and open source webcomponents.</p>
    <p>All the code behind the project has been open sourced. If you are a developer or just have suggestions, come participate in the developent process on <a href="https://github.com/rediche/gw2-ninja" target="_blank" rel="noopener noreferrer">Github</a>.</p>
  </div>

  <div class="card">
    <h2 class="title">Related Projects</h2>
    <p>On <a href="https://github.com/rediche/gw2-ninja" target="_blank" rel="noopener noreferrer">Github</a> you will find multiple projects that are some of the webcomponents behind GW2 Ninja.</p>
    <ul>
      <li><a href="https://github.com/rediche/gw2-ninja" target="_blank" rel="noopener noreferrer">GW2 Ninja</a></li>
      <li><a href="https://github.com/rediche/gw2-tpcalc" target="_blank" rel="noopener noreferrer">GW2 TP Calc</a></li>
      <li><a href="https://github.com/rediche/gw2-coin-input" target="_blank" rel="noopener noreferrer">GW2 Coin Input</a></li>
      <li><a href="https://github.com/rediche/gw2-coin-output" target="_blank" rel="noopener noreferrer">GW2 Coin Output</a></li>
    </ul>
  </div>

  <div class="card">
    <small>&copy; 2012 ArenaNet, Inc. All rights reserved. NCsoft, the interlocking NC logo, ArenaNet, Arena.net, Guild Wars, Guild Wars Factions, Factions, Guild Wars Nightfall, Nightfall, Guild Wars: Eye of the North, Eye of the North, Guild Wars 2, and all associated logos and designs are trademarks or registered trademarks of NCsoft Corporation. All other trademarks are the property of their respective owners.</small>
  </div>
    `;
  }

  /**
   * Object describing property-related metadata used by Polymer features
   */
  static get properties() {
    return {};
  }

  /**
   * Instance of the element is created/upgraded. Use: initializing state,
   * set up event listeners, create shadow dom.
   * @constructor
   */
  constructor() {
    super();
  }

  /**
   * Use for one-time configuration of your component after local DOM is initialized.
   */
  ready() {
    super.ready();

    afterNextRender(this, function() {});
  }
}

window.customElements.define(PageAbout.is, PageAbout);
