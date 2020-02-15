const BASE_URL = 'https://api.guildwars2.com/v2';

export const getWorld = async ( worldId ) => {
    const url = `${BASE_URL}/worlds/${worldId}`;
    const response = await fetch(url);
    
    if (!response.ok) return false;
    
    const json = await response.json();
    
    return json;
}