import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "@polymer/iron-image/iron-image.js";
import "../shared-styles.js";

class PageIndex extends PolymerElement {
  static get is() {
    return "page-index";
  }

  static get template() {
    return html`
    <style include="shared-styles">
      :host {
        display: block;
        padding: var(--spacer-large) var(--spacer-large) 0;
      }

      .sections {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
      }

      .section {
        width: 100%;
        height: calc((100vh - 4rem - var(--spacer-large) * 4) / 3);
        margin-bottom: var(--spacer-large);
        position: relative;
        padding: 0;
        overflow: hidden;
      }

      .section-fade {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 50%;
        width: 100%;
        opacity: .65;
        background-image: linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1));        
      }

      iron-image {
        width: 100%;
        height: 100%;
      }

      .title {
        box-sizing: border-box;
        position: absolute;
        bottom: 0;
        left: 0;
        margin: 0;
        padding: 0 var(--spacer-medium) var(--spacer-medium);
        width: 100%;
        color: var(--app-text-color-light);
      }

      @media screen and (min-width: 950px) {
        .section {
          width: calc(50% - var(--spacer-large) / 2);
        }
      }
    </style>

    <div class="sections">
      <a class="section card" href="/directory/websites">
        <iron-image sizing="cover" preload fade src="src/images/Concept01.jpg" placeholder="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAECAYAAACzzX7wAAAAiklEQVQYVwXBsQ7BQACA4f96qfZILzq0kqaaWA1egFVMvIwnMltNViMTTyAsQknaBk1PzveJnlbWd8AISxJ4vF2FJyF/FNQ/g8hCZZUvcaVkNl9wOh5wsFwvObdngRimoQ1ViyiJydI+292e6tsQa0X5qRHL6cB2As1oMuZ8N6zWGxojiLptXmXFH2oOLBHinIfPAAAAAElFTkSuQmCC" alt="Directory"></iron-image>
        <div class="section-fade"></div>
        <p class="title">Directory</p>
      </a>
      <a class="section card" href="/collections/basic">
        <iron-image sizing="cover" preload fade src="src/images/Concept02.jpg" placeholder="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAECAYAAACzzX7wAAAAi0lEQVQYVwXBsQ7BUBSA4f+4Uk201UiqMditWDqxiFhI7LyCl/AOnsJs63sQYhCDSIhBari3ju+T3TZXIw4RZTr/kO9DVMG6HxURZJhNNO60uV9OrGYjmq2UOlUKJxhbIP1uokEU43sJ9vtmud7wPF853I5kvQUyHqRaixqUzmJ8CL0AWyqhqfB4Wf7wIS1UQEgWSgAAAABJRU5ErkJggg==" alt="Collections"></iron-image>
        <div class="section-fade"></div>
        <p class="title">Collections</p>
      </a>
      <a class="section card" href="/tickets">
        <iron-image sizing="cover" preload fade src="src/images/Concept06.jpg" placeholder="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAADCAYAAACuyE5IAAAAbklEQVQYVwFjAJz/AWZWV/8aCwgAtL2yABINEQCocf0ABPz7APzl8gAki/oAAS4UCv+Kax4A5ughAKjD3ADw9fIApWIKAFOU7QD3+vwAAScNCf8ABwQAXDoQAAEABQDB4AYA2eXpABkNCQD3Af4AeMokxo4jrpIAAAAASUVORK5CYII=" alt="Tickets"></iron-image>
        <div class="section-fade"></div>
        <p class="title">Tickets</p>
      </a>
      <a class="section card" href="/chatcodes">
        <iron-image sizing="cover" preload fade src="src/images/Concept14.jpg" placeholder="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAECAYAAACzzX7wAAAAj0lEQVQYVwGEAHv/Ab+kk//2AwkAs6GXACk5MACkqcQAiqCnAI9yYABjf48AAY54Y//r4tsAKTQ8ACEG8QCMlqsAABMZAPX18AB4YFsAAa2Jcf8dFRIAuLy8ACglHQCjscMAg3NlAMjR1gCpusUAAYFMKP8MBwgACfv4AFllVgD7/wUArLnIAO/8AQA7LiYAlQQzR2yvFfQAAAAASUVORK5CYII=" alt="Chatcodes"></iron-image>
        <div class="section-fade"></div>
        <p class="title">Chatcodes</p>
      </a>
      <a class="section card" href="/timer">
        <iron-image sizing="cover" preload fade src="src/images/Concept19.jpg" placeholder="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAECAYAAACzzX7wAAAAj0lEQVQYVwGEAHv/AeDEqv8JGCIACxcjAPz9AQDZ4+0Azt/mAAz9/QAGBwcAAfvjxP/j5ewA79nuAA8YDwAWOkEA/Pb3AOTYzAD68/cAAfPqyP/CmpMAHDI4AP3+BgDt5QEAMjkmAMnG2gDw8PYAAYpgPf8fCO8AHktiADRBPwADCiMAz5+HABEnJQAXIxwAnto2ofgUcDEAAAAASUVORK5CYII=" alt="Timer"></iron-image>
        <div class="section-fade"></div>
        <p class="title">Timer</p>
      </a>
      <a class="section card" href="/calc">
        <iron-image sizing="cover" preload fade src="src/images/Concept22.jpg" placeholder="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAECAYAAACzzX7wAAAAj0lEQVQYVwGEAHv/AS8rKv////0A9/b2APb29gAhHRcAvcKoAMaZlgDN7AwAAV1YVf8dHR0ABwMEAD87NACSjo8AVVJLACgpIwDj6/IAAXxycP/6+voA9/f3APj4+QAaGhEACAQDAFhWUgD9AP8AAYF+ef8D/P8A/Pz8AAAAAQApHREA+QAGAEI/MQD6+gEAOBYzP5a8k6UAAAAASUVORK5CYII=" alt="TP Calculator"></iron-image>
        <div class="section-fade"></div>
        <p class="title">TP Calculator</p>
      </a>
    </div>
    `;
  }
}

window.customElements.define(PageIndex.is, PageIndex);
