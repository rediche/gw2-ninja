import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import { afterNextRender } from "@polymer/polymer/lib/utils/render-status.js";

let syncSettingObservers = [];

class GWNSyncSettings extends PolymerElement {
  static get properties() {
    return {
      value: {
        type: String,
        notify: true
      },
      setting: {
        type: String
      },
      defaultValues: {
        type: Object,
        value: {
          "gwn-lang": "en",
          "gwn-theme": "pof"
        }
      }
    };
  }

  static get observers() {
    return [
      "saveSetting(value, setting)",
      "loadSetting(setting, defaultValues)"
    ];
  }

  ready() {
    super.ready();
    this._boundStorageSubscription = this._storageSubscription.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('settingchange', this._boundStorageSubscription, false);
  }
  
  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('settingchange', this._boundStorageSubscription, false);
  }

  _storageSubscription(event) {
    if (this.setting == event.detail.setting) {
      this.set("value", event.detail.value);
    }
  }

  saveSetting(value, setting) {
    if (!value || !setting) return;
    localStorage.setItem(setting, value);

    // Dispatch custom event to notify all the `gwn-sync-settings` in the app.
    window.dispatchEvent(new CustomEvent('settingchange', {
      detail: {
        setting: setting,
        value: value
      },
      composed: true
    }));
  }

  loadSetting(setting, defaultValues) {
    if (!setting || !defaultValues) return;

    if (localStorage.getItem(setting) === null) {
      this.saveSetting(defaultValues[setting], setting);
      this.set("value", defaultValues[setting]);
    }

    this.set("value", localStorage.getItem(setting));
  }
}

window.customElements.define("gwn-sync-settings", GWNSyncSettings);
