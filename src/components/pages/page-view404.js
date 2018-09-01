import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import { SharedStyles } from "../shared-styles.js";

class PageView404 extends PolymerElement {
  static get is() {
    return "page-view404";
  }

  static get template() {
    return html`
      ${SharedStyles}
      <style>
      :host {
        display: block;
        padding: var(--spacer-large);
      }

      span {
        font-weight: 600;
      }

      .link {
        cursor: pointer;
      }
    </style>

    <div class="text-center">
      <h1 class="display-1">Page not found</h1>
      <p>A new version of this page might have been downloaded in the background.<br><span class="link" onclick="location.reload();">Please try to refresh.</span></p>
    </div>
  `;
  }
}

window.customElements.define(PageView404.is, PageView404);
