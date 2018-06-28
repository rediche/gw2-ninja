import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "@polymer/paper-input/paper-input.js";
import "@polymer/paper-radio-group/paper-radio-group.js";
import "@polymer/paper-radio-button/paper-radio-button.js";
import { SharedStyles } from "../shared-styles.js";
import "../stream-tools/type-selector.js";
import "../stream-tools/command-selector.js";

/**
 * `page-stream-tools`
 *
 * @summary
 * @customElement
 * @extends {Polymer.Element}
 */
class PageStreamTools extends PolymerElement {
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

        .card {
          padding: 0;
        }

        .inner {
          padding: var(--spacer-large);
        }

        .max-width {
          max-width: 40rem;
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

        paper-input {
          margin-bottom: 1rem;
        }

        .bottom {
          border-top: 1px solid #eeeeee;
        }
      </style>

      <div class="card max-width">
        <div class="inner">
          <div class="horisontal-spacer">
            <type-selector selected="{{ selectedType }}"></type-selector>
            <command-selector 
              selected-command="{{ selectedCommand }}"
              selected-type="[[ selectedType ]]"></command-selector>
          </div>

          <paper-input label="Guild Wars 2 API Key" value="{{ apiKey }}"></paper-input>

          <label id="chatbot-label">Chatbot:</label>
          <paper-radio-group aria-labelledby="chatbot-label" selected="{{ selectedChatbot }}">
            <paper-radio-button name="streamlabs-chatbot">Streamlabs Chatbot</paper-radio-button>
            <paper-radio-button name="nightbot">Nightbot</paper-radio-button>
          </paper-radio-group>
        </div>

        <div class="bottom inner">
          <pre class="result" hidden$="[[!_hasResult(result)]]">[[ result ]]</pre>
          <pre class="placeholder-result" hidden$="[[_hasResult(result)]]">Please fill out the form, to get your command.</pre>
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
}

window.customElements.define("page-stream-tools", PageStreamTools);
