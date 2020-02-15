const BASE_URL = 'https://api.guildwars2.com/v2';

export const getAccount = async apiKey => {
    const url = `${BASE_URL}/account?access_token=${apiKey}`;
    const response = await fetch(url);

    if (!response.ok) return false;

    const json = await response.json();

    return json;
}

export const getAccountWallet = async apiKey => {
    const url = `${BASE_URL}/account/wallet?access_token=${apiKey}`;
    const response = await fetch(url);

    if (!response.ok) return false;

    const json = await response.json();

    return json;
}