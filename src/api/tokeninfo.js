const BASE_URL = 'https://api.guildwars2.com/v2';

export const getTokenInfo = async apiKey => {
    const url = `${BASE_URL}/tokeninfo?access_token=${apiKey}`;
    const response = await fetch(url);

    if (!response.ok) return false;

    const json = await response.json();

    return json;
  }