import { API_BASE_V2 } from "./gwn-api-utils";

/**
 * Load all worlds from the Guild Wars 2 API.
 * 
 * @param {String} language 
 * @returns {Promise}
 */
export async function getWorlds(language = "en") {
  const response = await fetch(
    `${API_BASE_V2}/worlds?ids=all&lang=${language}`
  );
  const worlds = await response.json();
  return worlds;
}

/**
 * Load all WvW matches from the Guild Wars 2 API.
 * 
 * @returns {Promise}
 */
export async function getMatches() {
  const response = await fetch(
    `${API_BASE_V2}/wvw/matches?ids=all`
  );
  const matches = await response.json();
  return matches;
}

/**
 * Load all WvW Upgrades from the Guild Wars 2 API.
 * 
 * @param {String} language 
 * @returns {Promise}
 */
export async function getWvwUpgrades(language = "en") {
  const response = await fetch(
    `${API_BASE_V2}/wvw/upgrades?ids=all&lang=${language}`
  );
  const upgrades = await response.json();
  return upgrades;
}

/**
 * Load all WvW Objectives from the Guild Wars 2 API.
 * 
 * @param {String} language 
 * @returns {Promise}
 */
export async function getObjectives(language = "en") {
  const response = await fetch(
    `${API_BASE_V2}/wvw/objectives?ids=all&lang=${language}`
  );
  const objectives = await response.json();
  return objectives;
}