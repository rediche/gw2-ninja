import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import { afterNextRender } from "@polymer/polymer/lib/utils/render-status.js";

import { Map } from "leaflet/src/map";
import { TileLayer } from "leaflet/src/layer/tile";
import { LatLngBounds, CRS } from "leaflet/src/geo";

import { SharedStyles } from "../shared-styles.js";

/**
 * `wvw-map`
 *
 * @summary
 * @customElement
 * @extends {Polymer.Element}
 */
class WvwMap extends PolymerElement {
  static get template() {
    return html`
    <link rel="stylesheet" href="node_modules/leaflet/dist/leaflet.css">
    ${SharedStyles}
    <style>
      :host {
        display: block;
      }

      #map {
        width: 100%;
        height: 100%;
        background-color: white;
      }
    </style>

    <div id="map"></div>
    `;
  }

  /**
   * Object describing property-related metadata used by Polymer features
   */
  static get properties() {
    return {
     /*  map: Object,
      southWest: Object,
      northEast: Object */
    };
  }

  /**
   * Use for one-time configuration of your component after local DOM is initialized.
   */
  ready() {
    super.ready();

    afterNextRender(this, function() {
      this._initMap();
    });
  }

  _initMap() {
    const map = new Map(this.$.map, {
      minZoom: 3,
      maxZoom: 6,
      crs: CRS.Simple,
      maxBoundsViscosity: 1
    }).setView([0, 163], 3);

    const southWest = this.unproject([0, 16384], map);
    const northEast = this.unproject([16384, 8192], map);

    map.setMaxBounds(new LatLngBounds(southWest, northEast));

    new TileLayer("https://{s}.guildwars2.com/2/1/{z}/{x}/{y}.jpg", {
      minZoom: 0,
      maxZoom: 6,
      continuousWorld: false,
      subdomains: ["tiles", "tiles1", "tiles2", "tiles3", "tiles4"]
    }).addTo(map);

    map.addEventListener('click', (e) => {
      console.log(map.project(e.latlng));
    });

    //this.set("map", map);
  }

  unproject(coord, map) {
    return map.unproject(coord, map.getMaxZoom());
  }
}

window.customElements.define("wvw-map", WvwMap);
