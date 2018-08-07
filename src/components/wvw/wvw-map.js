import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import { afterNextRender } from "@polymer/polymer/lib/utils/render-status.js";

import { Map } from "leaflet/src/map";
import { Tooltip } from "leaflet/src/layer";
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
      },
      mapData: {
        type: Array
      },
      active: {
        type: Boolean,
        value: false
      }
    };
  }

  static get observers() {
    return [
      "_invalidateMap(active, map)",
      "_mapUpdated(map, icons)",
      "_mapDataChanged(mapData, objectives, icons)"
    ];
  }

  /**
   * Use for one-time configuration of your component after local DOM is initialized.
   */
  ready() {
    super.ready();

    afterNextRender(this, function() {
      this._initMap();
      this.set("icons", this._generateIcons());
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

  _newIcon(iconUrl) {
    const iconPrefix = "src/images/map-icons/";

    return new Icon({
      iconUrl: iconPrefix + iconUrl + ".png",
      iconSize: [32, 32]
    });
  }

  async _mapUpdated(map, icons) {
    if (!map || !icons) return;

    const objectives = await this.getObjectives();

    const objectivesFiltered = objectives.filter(objective => {
      if (
        !objective.marker ||
        !objective.coord ||
        !objective.type ||
        objective.map_type == "EdgeOfTheMists"
      )
        return false;
      return true;
    });

    const addedObjectives = objectivesFiltered.map(objective => {
      return this.addObjective(objective, map);
    });

    this.set("objectives", addedObjectives);
  }

  async getObjectives() {
    const response = await fetch(
      "https://api.guildwars2.com/v2/wvw/objectives?ids=all"
    );
    const objectives = await response.json();
    return objectives;
  }

  addObjective(objective, map) {
    if (!objective.type || !map) return;

    const newMarker = new Marker(
      this.unproject([objective.coord[0], objective.coord[1]], map),
      {
        icon: this.icons[objective.type.toLowerCase()].neutral,
        title: objective.name || "",
        alt: objective.name || ""
      }
    ).addTo(map);

    const newTooltip = newMarker.bindTooltip("", {
      direction: "bottom",
      permanent: true,
      offset: [0, 12]
    }).closeTooltip();

    const marker = {
      mapMarker: newMarker,
      tooltip: newTooltip
    };

    return Object.assign({}, objective, marker);
  }

  _generateIcons() {
    return {
      ruins: {
        neutral: this._newIcon("ruins_neutral"),
        red: this._newIcon("ruins_red"),
        blue: this._newIcon("ruins_blue"),
        green: this._newIcon("ruins_green")
      },
      camp: {
        neutral: this._newIcon("camp_neutral"),
        red: this._newIcon("camp_red"),
        blue: this._newIcon("camp_blue"),
        green: this._newIcon("camp_green")
      },
      tower: {
        neutral: this._newIcon("tower_neutral"),
        red: this._newIcon("tower_red"),
        blue: this._newIcon("tower_blue"),
        green: this._newIcon("tower_green")
      },
      keep: {
        neutral: this._newIcon("keep_neutral"),
        red: this._newIcon("keep_red"),
        blue: this._newIcon("keep_blue"),
        green: this._newIcon("keep_green")
      },
      castle: {
        neutral: this._newIcon("castle_neutral"),
        red: this._newIcon("castle_red"),
        blue: this._newIcon("castle_blue"),
        green: this._newIcon("castle_green")
      }
    };
  }

  unproject(coord, map) {
    return map.unproject(coord, map.getMaxZoom());
  }

  _mapDataChanged(mapData, objectives, icons) {
    if (!mapData || !objectives || !icons) return;

    const currentMapObjectives = mapData.reduce((objectives, map) => {
      return objectives.concat(map.objectives);
    }, []);

    currentMapObjectives.forEach(mapObjective => {
      const index = objectives.findIndex(
        objective => mapObjective.id == objective.id
      );

      if (index !== -1) {
        const icon =
          icons[mapObjective.type.toLowerCase()][
            mapObjective.owner.toLowerCase()
          ];
        objectives[index].mapMarker.setIcon(icon);
        if (objectives[index].type !== "Ruins") this.updateTooltip(mapObjective, objectives[index]);
      }
    });
  }

  _invalidateMap(active, map) {
    if (!active || !map) return;
    
    afterNextRender(this, function() {
      map.invalidateSize();
    });
  }

  updateTooltip(objectiveData, objective) {
    const lastFlipped = new Date(objectiveData.last_flipped);
    const currentTime = new Date();
    const maxDiff = 300000; // 5 minutes
    const timeDiff = currentTime - lastFlipped;
    
    if (timeDiff < maxDiff) {
      if (!objective.interval) {
        objective.interval = setInterval(() => {
          const now = new Date().getTime();
          const countdownDate = new Date(lastFlipped.getTime() + maxDiff).getTime();
          const diff = countdownDate - now;
    
          if (diff < 0) {
            clearInterval(objective.interval);
            objective.interval = null;
            objective.tooltip.closeTooltip();
          }
    
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
          objective.tooltip.setTooltipContent(`${minutes}m ${seconds < 10 ? "0" + seconds : seconds}s`);
        }, 1000);
      }

      objective.tooltip.openTooltip();
    } else {
      objective.tooltip.closeTooltip();
    }
  }
}

window.customElements.define("wvw-map", WvwMap);
