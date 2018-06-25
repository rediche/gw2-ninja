import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "../utilities/gwn-item-icon.js";
import { SharedStyles } from "../shared-styles.js";

class PagePrecursors extends PolymerElement {
  static get template() {
    return html`
    ${SharedStyles}
    <style>
      :host {
        display: block;
        height: calc(100vh - 4rem);
        background-image: url("/src/images/precursors/precursors_bg.png");
        background-size: cover;
        background-position: right center;
        overflow: hidden;
        max-width: 100%;
        position: relative;
      }
      
      :host([hidden]) {
        display: none;
      }

      .prepare {
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        text-align: center;
        justify-content: center;
        color: white;
        font-size: 64px;
        font-weight: 800;
      }

      [hidden] {
        display: none;
      }

      gwn-item-icon {
        width: 40px;
        position: absolute;
      }
    </style>

    <div class="prepare" hidden$="[[rainReady]]">
      PLEASE PREPARE YOUR EXOTICS
    </div>

    <div id="items"></div>

    <audio id="audio" on-canplaythrough="_audioReady">
      <source src="/src/sounds/gaben.ogg" type="audio/ogg">
      <source src="/src/sounds/gaben.mp3" type="audio/mp3">
      Your browser does not support the audio tag.
    </audio>
    `;
  }

  static get properties() {
    return {
      rainReady: {
        type: Boolean,
        computed: "_ready(audio)"
      },
      audio: {
        type: Boolean,
        value: false
      },
      precursors: {
        type: Array,
        value: [
          "Tooth_of_Frostfang",
          "Spark",
          "The_Energizer",
          "Chaos_Gun",
          "Tsunami",
          "Zap",
          "The_Bard",
          "The_Chosen",
          "Rodgorts_Flame",
          "Howl",
          "Dawn",
          "Dusk",
          "The_Colossus",
          "Leaf_of_Kudzu",
          "The_Hunter",
          "The_Lover",
          "The_Legend",
          "Dragonfury",
          "Rage",
          "Venom"
        ]
      }
    };
  }

  static get observers() {
    return ["_startRain(rainReady)"];
  }

  /* TODO: Turn off audio when navigating away from the page */
  _startRain(rainReady) {
    this.$.audio.play();
  }

  _ready(audio) {
    if (!audio) return false;
    console.log("ready");
    return true;
  }

  _audioReady(e) {
    this.set("audio", true);
  }

  _createItem() {
    const precursorChoice = this.precursors[this.randomInt(0, this.precursors.length - 1)];
    const item = document.createElement('gwn-item-icon');

    item.icon = `/src/images/precursors/icons/${precursorChoice}.png`;
    item.rarity = "Exotic";
    item.style.left = `calc(${this.randomInt(0, 100)}% - 20px)`;

    this.$.items.appendChild(item);
  }

  randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

window.customElements.define("page-precursors", PagePrecursors);
