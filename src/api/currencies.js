const BASE_URL = 'https://api.guildwars2.com/v2';

export const getCurrencies = async (ids = []) => {
    const params = new URLSearchParams();

    if ( ids.length ) {
        params.append('ids', ids.join(','));
    } else {
        params.append('ids', 'all');
    }

    const url = `${BASE_URL}/currencies?${params.toString()}`;
    const response = await fetch(url);

    if (!response.ok) return false;

    const json = await response.json();

    return json;
}