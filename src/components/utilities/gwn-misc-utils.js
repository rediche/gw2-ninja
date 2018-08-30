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