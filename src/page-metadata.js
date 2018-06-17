import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import { afterNextRender } from "@polymer/polymer/lib/utils/render-status.js";
import { updateMetadata } from "pwa-helpers/metadata.js";

/* Inspired by https://github.com/zacharytamas/page-title */

/**
 * @group utility
 * @element page-metadata
 */
class PageMetadata extends PolymerElement {
  static get properties() {
    return {
      /**
       * The base title of your webpage which never changes. Possibly the
       * name of your application.
       *
       * @type String
       * @default ""
       */
      baseTitle: {
        type: String,
        value: ""
      },

      /**
       * The fallback description of your webpage, in case a page has no
       * description set.
       * 
       * @type String
       * @default ""
       */
      fallbackDescription: {
        type: String,
        value: ""
      },

      /**
       * The divider to be used between your base title and title, if a
       * base title is supplied. Optional.
       *
       * @type String
       * @default " - "
       */
      divider: {
        type: String,
        value: " - "
      },

      /**
       * The current title of your webpage.
       *
       * @type String
       */
      page: {
        type: String
      },

      /**
       * The metadata for all the pages on the website.
       * 
       * @type Array
       */
      pageMetadata: {
        type: Array
      }
    };
  }

  static get observers() {
    return [
      "_updatePageTitle(baseTitle, fallbackDescription, divider, page, pageMetadata)"
    ];
  }

  ready() {
    super.ready();

    afterNextRender(this, async function() {
      const pageMetadataResponse = await fetch("/src/data/pageMetadata.json");
      const pageMetadata = await pageMetadataResponse.json();
      this.set("pageMetadata", pageMetadata);
    });
  }

  /**
   * Resolves the metadata for the current page.
   * 
   * @param {string} baseTitle 
   * @param {string} fallbackDescription 
   * @param {string} divider 
   * @param {string} page 
   * @param {array} pageMetadata 
   */
  _updatePageTitle(baseTitle, fallbackDescription, divider, page, pageMetadata) {
    if (!baseTitle || !fallbackDescription || !divider || !page || !pageMetadata)
      return;

    const currentPageMetadata = pageMetadata.find(p => {
      return p.page == page;
    });

    if (!currentPageMetadata) {
      updateMetadata({
        title: baseTitle,
        description: fallbackDescription
      });

      return;
    }

    updateMetadata({
      title: `${currentPageMetadata.title} ${divider} ${baseTitle}`,
      description: currentPageMetadata.description
    });
  }
}

window.customElements.define("page-metadata", PageMetadata);
