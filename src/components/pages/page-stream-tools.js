import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import { GestureEventListeners } from "@polymer/polymer/lib/mixins/gesture-event-listeners.js";
import "@polymer/paper-input/paper-input.js";
import "@polymer/paper-radio-group/paper-radio-group.js";
import "@polymer/paper-radio-button/paper-radio-button.js";
import "@polymer/paper-icon-button/paper-icon-button.js";
import { SharedStyles } from "../shared-styles.js";
import "../my-icons.js";
import "../stream-tools/type-selector.js";
import "../stream-tools/command-selector.js";
import "../settings/gwn-setting-api-key.js";

/**
 * `page-stream-tools`
 *
 * @summary
 * @customElement
 * @extends {Polymer.Element}
 */
class PageStreamTools extends GestureEventListeners(PolymerElement) {
  static get template() {
    return html`
      ${SharedStyles}
      <style>
        :host {
          display: block;
          padding: var(--spacer-large);
        }

        :host([hidden]) {
          display: none;
        }

        .title {
          margin: 0;
        }

        .card {
          padding: 0;
        }

        .inner {
          padding: var(--spacer-large);
        }

        .max-width {
          max-width: 40rem;
          margin: 0 auto;
        }

        label {
          font-size: .85rem;
        }

        pre {
          overflow-y: auto;
          margin: 0;
        }

        .apikey-helper-text {
          margin-top: 1rem;
          text-align: center;
          font-size: .85rem;
        }

        .horisontal-spacer {
          display: flex;
          justify-content: space-between;
        }

        .horisontal-spacer type-selector,
        .horisontal-spacer command-selector {
          flex-basis: calc(50% - .5rem);
        }

        gwn-setting-api-key {
          margin-bottom: 1rem;
        }

        .bottom {
          border-top: 1px solid #eeeeee;
          display: flex;
          min-height: 49px;
          align-items: center;
          justify-content: space-between;
          padding: var(--spacer-xsmall) var(--spacer-xsmall) var(--spacer-xsmall) var(--spacer-medium);
        }

        paper-icon-button {
          flex: none;
          margin-left: var(--spacer-small);
        }
      </style>

      <div class="card max-width">
        <div class="inner">
          <h1 class="title">Generate API Commands</h1>

          <div class="horisontal-spacer">
            <type-selector selected="{{ selectedType }}"></type-selector>
            <command-selector 
              selected-command="{{ selectedCommand }}"
              selected-type="[[ selectedType ]]"></command-selector>
          </div>

          <gwn-setting-api-key no-save api-key="{{ apiKey }}"></gwn-setting-api-key>

          <label id="chatbot-label">Chatbot:</label>
          <paper-radio-group aria-labelledby="chatbot-label" selected="{{ selectedChatbot }}">
            <paper-radio-button name="streamlabs-chatbot">Streamlabs Chatbot</paper-radio-button>
            <paper-radio-button name="nightbot">Nightbot</paper-radio-button>
          </paper-radio-group>
        </div>

        <div class="bottom inner">
          <pre class="result" hidden$="[[!_hasResult(result)]]">[[ result ]]</pre>
          <pre class="placeholder-result" hidden$="[[_hasResult(result)]]">Fill out the form, to get your command.</pre>
          <span hidden$="[[!_hasResult(result)]]">
            <paper-icon-button 
              icon="my-icons:content-copy" 
              hidden$="[[!_supportsClipboardApi()]]"
              on-tap="_attemptCopy"></paper-icon-button>
          </span>
        </div>
      </div>

      <div class="max-width">
        <p class="apikey-helper-text">Don't have an API Key? <a href="https://account.arena.net/applications" target="_blank">Make an API Key here</a>.
      </div>
    `;
  }

  /**
   * Object describing property-related metadata used by Polymer features
   */
  static get properties() {
    return {
      selectedChatbot: {
        type: String,
        value: "streamlabs-chatbot"
      },
      selectedType: String,
      selectedCommand: String,
      apiKey: String,
      result: {
        type: String,
        computed: "_computeResult(selectedChatbot, selectedType, selectedCommand, apiKey)"
      }
    };
  }

  _computeResult(selectedChatbot, selectedType, selectedCommand, apiKey) {
    if (!selectedChatbot || !selectedType || !selectedCommand || !apiKey) return "";

    const url = `https://nightbot.gw2.ninja/command/${selectedType}-${selectedCommand}/${apiKey}`;

    switch (selectedChatbot) {
      case "nightbot":
        return `$(urlfetch ${url})`;
      case "streamlabs-chatbot":
        return `$readapi(${url})`;
    }

    return "";
  }
  
  _hasResult(result) {
    return result !== "" ? true : false;
  }

  _supportsClipboardApi() {
    return navigator.clipboard ? true : false;
  }

  _attemptCopy(e) {
    if (!navigator.clipboard) return console.log("No clipboard support");
    if (!this.result) return console.log("No result generated");

    navigator.clipboard.writeText(this.result)
      .then(() => {
        console.log("Copied to clipboard!");
      })
      .catch(err => {
        console.log("Could not copy to clipboard", err);
      });
  }
}

window.customElements.define("page-stream-tools", PageStreamTools);
