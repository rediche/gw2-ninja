import { API_BASE_V2 } from "./gwn-api-utils";

/**
 * Load information about a guild using a guild ID.
 * 
 * @param {Number} guildId 
 * @returns {Promise}
 */
export async function getGuild(guildId) {
  const response = await fetch(
    `${API_BASE_V2}/guild/${guildId}`
  );
  const guild = await response.json();
  return guild;
}

/**
 * Load all guild upgrades from the Guild Wars 2 API.
 * 
 * @param {String} language
 * @returns {Promise}
 */
export async function getGuildUpgrades(language = "en") {
  const response = await fetch(
    `${API_BASE_V2}/guild/upgrades?ids=all&lang=${language}`
  );
  const upgrades = await response.json();
  return upgrades;
}

/**
 * Return a URL for SVG version of guild emblem.
 * 
 * @param {Object} guild
 * @param {String} guild.name 
 * @returns {String}
 */
export function getGuildEmblemURL({ name }) {
  if (!name) return;
  return `https://guilds.gw2w2w.com/guilds/${name.replace(' ', '-').toLowerCase()}/256.svg`;
}

/**
 * Returns `Guild Name [TAG]`
 * 
 * @param {Object} guild
 * @param {String} guild.name
 * @param {String} guild.tag 
 * @returns {String}
 */
export function getGuildNameWithTag({ name, tag}) {
  if (!name || !tag) return;
  return `${name} [${tag}]`;
}