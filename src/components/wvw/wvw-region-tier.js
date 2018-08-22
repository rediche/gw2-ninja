import { LitElement, html } from '@polymer/lit-element';
import "@polymer/iron-icon";

import "../utilities/gwn-progress";

import "../my-icons.js";
import { SharedTableStyles } from "../shared-table-styles";
import { SharedWvwStyles } from "../shared-wvw-styles";

/**
 * `wvw-region-tier` renders a table-row that displays the server names, victory points and scores of a matchup.
 *
 * @customElement
 * @polymer
 * @demo
 * 
 */
class WvwRegionTier extends LitElement {
  _render({ match, worlds }) {
    const highestVictoryPointsInMatchup = this._highestVictoryPointsInMatchup(match);
    const lowestVictoryPointsInMatchup = this._lowestVictoryPointsInMatchup(match);
    const highestScoreInMatchup = this._highestScoreInMatchup(match);

    return html`
      ${ SharedTableStyles.content.firstElementChild }
      ${ SharedWvwStyles.content.firstElementChild }
      <style>
        :host {
          display: table;
          width: 100%;
          table-layout: fixed;
        }

        :host([hidden]) {
          display: none;
        }

        :host(:nth-child(2n)) {
          background-color: rgba(0, 0, 0, .04);
        }

        .no-text-overflow {
          text-overflow: ellipsis;
          overflow: hidden; 
          white-space: nowrap;
        }

        gwn-progress {
          font-size: .75rem;
        }
        
        td:first-of-type {
          padding-left: 1rem;
        }

        td:last-of-type {
          padding-right: 1rem;
        }

        .prediction {
          width: 1.5rem;
          padding-right: 0;
        }

        iron-icon {
          --iron-icon-fill-color: var(--app-primary-color);
          vertical-align: top;
        }
      </style>

      <td class="prediction">
        <div><iron-icon icon="my-icons:${ this._isWinningOrLoosingMatchup(match.victory_points.green, highestVictoryPointsInMatchup, lowestVictoryPointsInMatchup) }"></iron-icon></div>
        <div><iron-icon icon="my-icons:${ this._isWinningOrLoosingMatchup(match.victory_points.blue, highestVictoryPointsInMatchup, lowestVictoryPointsInMatchup) }"></iron-icon></div>
        <div><iron-icon icon="my-icons:${ this._isWinningOrLoosingMatchup(match.victory_points.red, highestVictoryPointsInMatchup, lowestVictoryPointsInMatchup) }"></iron-icon></div>
      </td>
      <td>
        <div class="no-text-overflow">${ this._generateWorldLinkNames(match.all_worlds.green, match.worlds.green, worlds) }</div>
        <div class="no-text-overflow">${ this._generateWorldLinkNames(match.all_worlds.blue, match.worlds.blue, worlds) }</div>
        <div class="no-text-overflow">${ this._generateWorldLinkNames(match.all_worlds.red, match.worlds.red, worlds) }</div>
      </td>
      <td>
        <gwn-progress class="green" progress="${ match.victory_points.green }" max="${ highestVictoryPointsInMatchup }">${ match.victory_points.green }</gwn-progress>
        <gwn-progress class="blue" progress="${ match.victory_points.blue }" max="${ highestVictoryPointsInMatchup }">${ match.victory_points.blue }</gwn-progress>
        <gwn-progress class="red" progress="${ match.victory_points.red }" max="${ highestVictoryPointsInMatchup }">${ match.victory_points.red }</gwn-progress>
      </td>
      <td>
        <gwn-progress class="green" progress="${ match.scores.green }" max="${ highestScoreInMatchup }">${ match.scores.green }</gwn-progress>
        <gwn-progress class="blue" progress="${ match.scores.blue }" max="${ highestScoreInMatchup }">${ match.scores.blue }</gwn-progress>
        <gwn-progress class="red" progress="${ match.scores.red }" max="${ highestScoreInMatchup }">${ match.scores.red }</gwn-progress>
      </td>
    `;
  }

  _isWinningOrLoosingMatchup(victoryPoints, highestVictoryPointsInMatchup, lowestVictoryPointsInMatchup) {
    if (victoryPoints == highestVictoryPointsInMatchup) return "chevron-up";
    if (victoryPoints == lowestVictoryPointsInMatchup) return "chevron-down";
    return "minus";
  }

  static get properties() {
    return {
      match: Object,
      worlds: Object
    }
  }

  /**
   * Instance of the element is created/upgraded. Use: initializing state,
   * set up event listeners, create shadow dom.
   * @constructor
   */
  constructor() {
    super();
  }

  _generateWorldLinkNames(allWorldsInLink, hostWorld, worlds) {
    if (!allWorldsInLink || !hostWorld || !worlds) return;

    const linkedWorlds = allWorldsInLink.filter(world => {
      return world !== hostWorld;
    });

    const linkedWorldsWithNames = linkedWorlds.map(worldId => {
      return this._resolveWorldName(worldId, worlds);
    });

    const hostWorldName = this._resolveWorldName(hostWorld, worlds);

    return linkedWorlds.length > 0 ? `${hostWorldName} (${linkedWorldsWithNames.join(', ')})` : hostWorldName;
  }

  _resolveWorldName(worldId, worlds) {
    if (!worldId || !worlds) return;
    const foundWorld = worlds.find(world => world.id == worldId);
    return foundWorld.name;
  }

  _highestVictoryPointsInMatchup(matchup) {
    return Math.max(matchup.victory_points.green, matchup.victory_points.red, matchup.victory_points.blue);
  }

  _lowestVictoryPointsInMatchup(matchup) {
    return Math.min(matchup.victory_points.green, matchup.victory_points.red, matchup.victory_points.blue);
  }

  _highestScoreInMatchup(matchup) {
    return Math.max(matchup.scores.green, matchup.scores.red, matchup.scores.blue);
  }
}

customElements.define('wvw-region-tier', WvwRegionTier);