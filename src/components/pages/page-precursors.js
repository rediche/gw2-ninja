import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import { GestureEventListeners } from "@polymer/polymer/lib/mixins/gesture-event-listeners.js";
import { afterNextRender } from "@polymer/polymer/lib/utils/render-status.js";
import "../utilities/gwn-item-icon.js";
import { SharedStyles } from "../shared-styles.js";

class PagePrecursors extends GestureEventListeners(PolymerElement) {
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
        animation-name: rain;
        animation-duration: 2s;
        animation-timing-function: cubic-bezier(0.600, 0.040, 0.980, 0.335);
        animation-timing-function: ease-in;
        box-shadow: var(--app-box-shadow);
      }

      @keyframes rain {
        0% {
          transform: translateY(-100%);
          opacity: 0;
        }

        2% {
          opacity: 1;
        }

        98% {
          opacity: 1;
        }

        100% {
          opacity: 0;
          transform: translateY(calc(100vh - 4rem + 100%));
        }
      }

      #colin {
        position: absolute;
        left: 0;
        bottom: 0;
        max-width: 100%;
        width: 400px;
        transform: translateY(100%) scale(0.2,0.2);
        transition-duration: 5s;
      }

      #colin.show {
        transform: translateY(0) scale(1,1);
      }

      #mikeo {
        position: absolute;
        right: 0;
        top: 10%;
        opacity: 0;
        transition: 1s opacity;
      }

      #mikeo img {
        width: 100px;
        animation: rotate 2s linear infinite;
      }
      
      #mikeo.show {
        opacity: 1;
        animation: bounce 0.5s;
        animation-direction: alternate;
        animation-timing-function: cubic-bezier(.5,0.05,1,.5);
        animation-iteration-count: infinite;
      }

      @keyframes bounce {
        from { transform: translate3d(-200%, 0, 0); }
        to   { transform: translate3d(0, 0, 0); }
      }

      @keyframes rotate {
        0% {
          transform: rotate(0deg) scale(1);
        }

        50% {
          transform: rotate(180deg) scale(1.5);
        }

        100% {
          transform: rotate(360deg) scale(1);
        }
      }

      .play svg {
        fill: white;
        width: 4rem;
        height: 4rem;
        cursor: pointer;
        filter: drop-shadow(0 1px 3px rgba(0,0,0,.12));
      }
    </style>

    <div class="prepare" hidden$="[[rainReady]]">
      PLEASE PREPARE YOUR EXOTICS
    </div>

    <div class="play prepare" hidden$="[[!requiresInteraction]]" on-tap="_startRain">
      <svg viewBox="0 0 24 24">
        <path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
      </svg>
    </div>

    <div id="items"></div>

    <img id="colin" src="/src/images/precursors/precursors_colin.png" alt="Colin SoHandsome">
    <div id="mikeo">
      <img src="/src/images/precursors/precursors_mikeo.png" alt="Mike Oreos">
    </div>

    <audio id="audio" on-canplaythrough="_audioReady" loop>
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
      requiresInteraction: {
        type: Boolean,
        value: false
      },
      precursors: {
        type: Array,
        value: [
          "3D361A4B187B5747FED095C6D5431EB3E65B01FB/1200349",
          "C90B71ED53030EB7422A9F59F17C492BC9E2DBE7/1202122",
          "4BD07B7E400564DBBF5060611400F2CA1FD874F1/1203189",
          "5B770B9432601D04CFD235E4712B52927EDF734B/1204293",
          "AF3EB0E29F4B25AC3F5BE2B7BA64ABC1A62EB30E/1206078",
          "4C4FDD15CE97DFD1F13F0BA9B7740FB110F00675/1206760",
          "251B42DA1EC4902BB2F50F7B671DEA921DC522A2/1202277",
          "488003DB422EC8A580EA4E16D22DF56B4E90F7CA/1206236",
          "9640FF61723ECC0367B5CC041AC8C50F05C0EC64/1206986",
          "FF282CD37AD618457F6878356739587916E5BF17/1207245",
          "3FFD779A1401D250E6FBAABB1E544DF5FFB3C9DD/1202490",
          "6BE1D2BE3BAE4A9B08CF6EB1AFFFA4F20D7F9091/1202492",
          "15ED060C6B47716174FC6FB9A60118B5553EEB90/1202804",
          "16E4FC0E74FB0174317E380021570AF92D3F1992/1200915",
          "381F0719363580D4172E2A0BDEA978E1F0059D2A/1205943",
          "044C67CBFC9F5151BAFDE625349238DCD19FE248/1200924",
          "DA7AF6E3D970799A7847B3F10801FC1C1E98109E/1206503",
          "51FF0303B8A85468B60BD2D431550CDE0A59B206/1202902",
          "A077090AC85279D351200F77267E060C326BF75B/1206366",
          "6D2C107DA4507DE3F247D15B54794BD31C73532A/1207112",
          "C6C697BAF9D1092F5626CE39016DB0CCA19169C2/1200331",
          "A1F4414914050FFF403603AF9CC1131E5DF4600E/1204305",
          "ABBCE10A62C94F9DA832377DE7D063615E44176C/1206519"
        ]
      }
    };
  }

  static get observers() {
    return ["_startRain(rainReady)"];
  }

  /* TODO: Turn off audio when navigating away from the page */
  _startRain(rainReady) {
    const audioPlayPromise = this.$.audio.play();

    // Autoplay restrictions in browsers. Ugh.
    if (audioPlayPromise === undefined)
      return console.error("Couldn't find audio to play.");

    audioPlayPromise
      .then(_ => {
        this.set("requiresInteraction", false);

        for (let i = 0; i < 30; i++) {
          afterNextRender(this, () => {
            this._createItem();
          });
        }

        // Queue Colin
        afterNextRender(this, () => {
          setTimeout(() => {
            this.$.colin.classList.add("show");
          }, 5000);

          setTimeout(() => {
            this.$.mikeo.classList.add("show");
          }, 20000);
        });
      })
      .catch(error => {
        this.set("requiresInteraction", true);
      });
  }

  _ready(audio) {
    if (!audio) return false;
    return true;
  }

  _audioReady(e) {
    this.set("audio", true);
  }

  _createItem() {
    const that = this;
    const precursorChoice = this.precursors[
      this.randomInt(0, this.precursors.length - 1)
    ];
    const item = document.createElement("gwn-item-icon");

    item.icon = `https://render.guildwars2.com/file/${precursorChoice}.png`;
    item.rarity = "Exotic";
    item.style.left = `calc(${this.randomInt(0, 100)}% - 20px)`;
    item.style.animationDuration = `${this.randomInt(500, 3000)}ms`;

    item.addEventListener("animationend", function(e) {
      e.target.remove();
      afterNextRender(this, () => {
        that._createItem();
      });
    });

    this.$.items.appendChild(item);
  }

  randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

window.customElements.define("page-precursors", PagePrecursors);
