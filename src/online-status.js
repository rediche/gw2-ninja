import { PolymerElement, html } from '../../@polymer/polymer/polymer-element.js';
import { afterNextRender } from '../../@polymer/polymer/lib/utils/render-status.js';
import './shared-styles.js';

/**
 * `online-status` Description
 *
 * @summary ShortDescription.
 * @customElement
 * @polymer
 * @extends {PolymerElement}
 */
class OnlineStatus extends PolymerElement {
  static get template() {
    return html`
    <style include="shared-styles">
      :host {
        display: block;
      }
    </style>
    `;
  }

  /**
   * String providing the tag name to register the element under.
   */
  static get is() {
    return 'online-status';
  }

  /**
   * Object describing property-related metadata used by Polymer features
   */
  static get properties() {
    return {
      onlineStatus: {
        type: Boolean,
        notify: true
      }
    };
  }

  /**
   * Instance of the element is created/upgraded. Use: initializing state,
   * set up event listeners, create shadow dom.
   * @constructor
   */
  constructor() {
    super();
    this._boundStatusChangeListener = this.statusChange.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('online', this._boundStatusChangeListener);
    window.addEventListener('offline', this._boundStatusChangeListener);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('online', this._boundStatusChangeListener);
    window.removeEventListener('offline', this._boundStatusChangeListener);
  }

  ready() {
    super.ready();

    afterNextRender(this, function() {
      this.statusChange();
    });
  }

  statusChange() {
    this.set('onlineStatus', navigator.onLine);
  }
}

window.customElements.define(OnlineStatus.is, OnlineStatus);
