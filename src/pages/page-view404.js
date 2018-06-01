import { PolymerElement, html } from '../../../@polymer/polymer/polymer-element.js';
import '../shared-styles.js';

class PageView404 extends PolymerElement {
  static get is() { return 'page-view404'; }

  static get template() {
    return html`
    <style include="shared-styles">
    :host {
      display: block;
      padding: var(--spacer-large);
    }

    span {
      font-weight: 800;
    }
  </style>

  <!-- 
    If deploying in a folder replace href="/" with the full path to your site.
    Such as: href=="http://polymerelements.github.io/polymer-starter-kit"
  -->
  <h1 class="display-1"><span>Error 404:</span> Page not found</h1>
    `;
  }
}

window.customElements.define(PageView404.is, PageView404);