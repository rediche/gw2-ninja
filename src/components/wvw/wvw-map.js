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
        type: Object
      },
      icons: {
        type: Object
      },
      objectives: {
        type: Array
      }
    };
  }

  static get observers() {
    return ["_mapUpdated(map, icons)"]
  }

  /**
   * Use for one-time configuration of your component after local DOM is initialized.
   */
  ready() {
    super.ready();

    afterNextRender(this, function() {
      this._initMap();
      this.set('icons', this._generateIcons());
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

    this.set("map", map);
  }

  _generateIcons() {
    return {
      ruins: {
        neutral: this._newIcon("https://render.guildwars2.com/file/52B43242E55961770D78B80ED77BC764F0E57BF2/1635237.png")
      },
      camp: {
        neutral: this._newIcon("https://render.guildwars2.com/file/015D365A08AAE105287A100AAE04529FDAE14155/102532.png")
      },
      tower: {
        neutral: this._newIcon("https://render.guildwars2.com/file/ABEC80C79576A103EA33EC66FCB99B77291A2F0D/102531.png")
      },
      keep: {
        neutral: this._newIcon("https://render.guildwars2.com/file/DB580419C8AD9449309A96C8E7C3D61631020EBB/102535.png")
      },
      castle: {
        neutral: this._newIcon("https://render.guildwars2.com/file/F0F1DA1C807444F4DF53090343F43BED02E50523/102608.png")
      }
    };
  }

  _newIcon(iconUrl) {
    return new Icon({
      iconUrl: iconUrl,
      iconSize: [32, 32]
    });
  }

  async _mapUpdated(map, icons) {
    if (!map || !icons) return;

    const objectives = await this.getObjectives();

    const objectivesFiltered = objectives.filter((objective) => {
      if (!objective.marker || !objective.coord || !objective.type || objective.map_type == "EdgeOfTheMists") return false;
      return true;
    });
    
    const addedObjectives = objectivesFiltered.map((objective) => {
      return this.addObjective(objective, map);
    });

    this.set('objectives', addedObjectives);
  }

  async getObjectives() {
    const response = await fetch("https://api.guildwars2.com/v2/wvw/objectives?ids=all");
    const objectives = await response.json();
    return objectives;
  }

  addObjective(objective, map) {
    if (!objective.type || !map) return; 

    const marker = {
      mapMarker: new Marker(this.unproject([objective.coord[0], objective.coord[1]], map), {
        icon: this.icons[objective.type.toLowerCase()].neutral
      }).addTo(map)
    };

    return Object.assign({}, objective, marker);
  }

  unproject(coord, map) {
    return map.unproject(coord, map.getMaxZoom());
  }
}

window.customElements.define("wvw-map", WvwMap);
