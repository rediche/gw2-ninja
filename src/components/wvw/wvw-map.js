import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import { connect } from "pwa-helpers/connect-mixin";
import { afterNextRender } from "@polymer/polymer/lib/utils/render-status.js";

// Load redux store
import { store } from "../../store.js";

// Lazy load reducers
import settings from "../../reducers/settings.js";
store.addReducers({
  settings
});

import { Map } from "leaflet/src/map";
import { Tooltip } from "leaflet/src/layer";
import { TileLayer } from "leaflet/src/layer/tile";
import { Marker, Icon } from "leaflet/src/layer/marker";
import { LatLngBounds, CRS } from "leaflet/src/geo";

import { getObjectives } from "../utilities/gwn-wvw-utils";

import { SharedStyles } from "../shared-styles.js";

/**
 * `wvw-map`
 *
 * @summary
 * @customElement
 * @extends {Polymer.Element}
 */
class WvwMap extends connect(store)(PolymerElement) {
  static get template() {
    return html`
    <link rel="stylesheet" href="../../../node_modules/leaflet/dist/leaflet.css">
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
      map: Object,
      icons: Object,
      addedObjectives: {
        type: Array,
        notify: true,
        value: []
      },
      objectives: Array,
      mapData: Array,
      active: {
        type: Boolean,
        value: false
      },
      hidden: Boolean
    };
  }

  static get observers() {
    return [
      "_invalidateMap(active, hidden, map)",
      "_mapUpdated(map, icons, objectives)",
      "_mapDataChanged(mapData, addedObjectives, icons)"
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
    }).setView([-193, 167], 3);

    const southWest = this.unproject([5000, 16384], map);
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

  async _mapUpdated(map, icons, objectives) {
    if (!map || !icons || !objectives) return;

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

    // Remove old layers before adding new ones to map.
    this.addedObjectives.map((layer) => {
      map.removeLayer(layer.mapMarker);
    });

    const addedObjectives = objectivesFiltered.map(objective => {
      return this.addObjective(objective, map);
    });

    this.set("addedObjectives", addedObjectives);
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

    newMarker.addEventListener("click", this._markerClicked.bind(this));

    const newTooltip = newMarker
      .bindTooltip("", {
        direction: "bottom",
        permanent: true,
        offset: [0, 12]
      })
      .closeTooltip();

    const marker = {
      mapMarker: newMarker,
      tooltip: newTooltip
    };

    return Object.assign({}, objective, marker);
  }

  _markerClicked(e) {
    this.dispatchEvent(
      new CustomEvent("objective-clicked", {
        detail: {
          objectiveTitle: e.target.options.title
        }
      })
    );
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

  _mapDataChanged(mapData, addedObjectives, icons) {
    if (!mapData || !addedObjectives || !icons) return;

    const currentMapObjectives = mapData.reduce((addedObjectives, map) => {
      return addedObjectives.concat(map.objectives);
    }, []);

    currentMapObjectives.forEach(mapObjective => {
      const index = addedObjectives.findIndex(
        objective => mapObjective.id == objective.id
      );

      if (index !== -1) {
        const icon =
          icons[mapObjective.type.toLowerCase()][
            mapObjective.owner.toLowerCase()
          ];
        //objectives[index].mapMarker.options.name = mapObjective.o
        addedObjectives[index].mapMarker.setIcon(icon);
        if (addedObjectives[index].type !== "Ruins")
          this.updateTooltip(mapObjective, addedObjectives[index]);
      }
    });
  }

  _invalidateMap(active, hidden, map) {
    if (!map) return;

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
          const countdownDate = new Date(
            lastFlipped.getTime() + maxDiff
          ).getTime();
          const diff = countdownDate - now;

          if (diff < 0) {
            clearInterval(objective.interval);
            objective.interval = null;
            objective.tooltip.closeTooltip();
          }

          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);

          objective.tooltip.setTooltipContent(
            `${minutes}m ${seconds < 10 ? "0" + seconds : seconds}s`
          );
        }, 1000);
      }

      objective.tooltip.openTooltip();
    } else {
      objective.tooltip.closeTooltip();
    }
  }

  _stateChanged({ settings }) {
    if (!settings.language) {
      getObjectives().then(objectives => this.set('objectives', objectives));
      return;
    } else if (this.language != settings.language) {
      getObjectives(settings.language).then(objectives => this.set('objectives', objectives));
    }

    this.language = settings.language;
  }
}

window.customElements.define("wvw-map", WvwMap);
