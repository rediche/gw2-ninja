import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import { afterNextRender } from "@polymer/polymer/lib/utils/render-status.js";

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
          "gwn-lang": "en"
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

  saveSetting(value, setting) {
    if (!value || !setting) return;
    localStorage.setItem(setting, value);
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
