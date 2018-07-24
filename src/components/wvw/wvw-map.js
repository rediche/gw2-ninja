import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import { afterNextRender } from "@polymer/polymer/lib/utils/render-status.js";

import { Map } from "leaflet/src/map";
import { TileLayer } from "leaflet/src/layer/tile";
import { Marker, Icon } from "leaflet/src/layer/marker";
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
      map: {
        type: Object,
        observer: "_mapUpdated"
      }
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

    const camp = new Icon({
      iconUrl: "https://render.guildwars2.com/file/015D365A08AAE105287A100AAE04529FDAE14155/102532.png",
      iconSize: [32, 32],
      className: "blue"
    });

    new Marker(this.unproject([10743.8, 9492.51], map), {
      icon: camp
    }).addTo(map);

    this.set("map", map);
  }

  async _mapUpdated(map) {
    console.log("map was initiated");
    const objectives = await this.getObjectives();

    const addedObjectives = objectives.map((objective) => {
      return this.addObjective(objective, map);
    });

    console.log(addedObjectives);
  }

  async getObjectives() {
    const response = await fetch("https://api.guildwars2.com/v2/wvw/objectives?ids=all");
    const objectives = await response.json();
    return objectives;
  }

  addObjective(objective, map) {
    if (!objective.marker || !objective.coord) return;

    const icon = new Icon({
      iconUrl: objective.marker,
      iconSize: [32, 32]
    });

    const marker = {
      mapMarker: new Marker(this.unproject([objective.coord[0], objective.coord[1]], map), {
        icon: icon
      }).addTo(map)
    };

    return Object.assign({}, objective, marker);
  }

  unproject(coord, map) {
    return map.unproject(coord, map.getMaxZoom());
  }
}

window.customElements.define("wvw-map", WvwMap);
