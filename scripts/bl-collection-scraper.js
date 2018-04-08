const rp = require('request-promise');
const cheerio = require('cheerio');

const BASE_URL = "https://wiki.guildwars2.com";

rp({
    uri: `${BASE_URL}/wiki/Black_Lion_Claim_Ticket`,
    transform: cheerioTransform
  })
  .then(getCollections)
  .catch((err) => {
    console.log(err);
  });

function cheerioTransform(body) {
  return cheerio.load(body);
}

async function getCollections($) {
  console.log("Starting scraping...");

  const COLLECTIONS_SELECTOR = "#mw-content-text > div > table.mech1.table > tbody > tr.line-top.achievement-row > th:first-child > a > span";

  let collections = $(COLLECTIONS_SELECTOR).map(async (i, name) => {
    console.log("Getting information on:", $(name).text());

    // Collection Object
    let collection = {
      name: null,
      tickets: 5,
      ids: [],
      category: "blacklion"
    };

    // Add name to collection object
    collection.name = $(name).text();

    // Get item IDs in the collection
    collection.ids = await getSkinsAsync(name.parent.attribs.href);

    // Check if collection is available, if so, update it's ticket value
    //await getSkinPriceAsync(collectionUrl)

    //console.log(collection);
    return collection;
  });

  Promise.all(collections.get()).then((result) => {
    console.log(result);
    console.log("Scraping done.");
  });
}

async function getSkinsAsync(url) {
  return rp({
      uri: BASE_URL + url,
      transform: cheerioTransform
    })
    .then(($) => {
      const SKIN_SELECTOR = "ul > li > span.item-icon a:not([title*=Chest])";

      let skinIds = $(SKIN_SELECTOR).map(async (i, skin) => {
        let skinId = await getSkinIdAsync(skin.attribs.href);
        return (skinId) ? Number(skinId) : skinId;
      });

      return Promise.all(skinIds.get()).then((result) => {
        // Only return arrays without skinIds where value is false
        return result.filter((skinId) => skinId !== false);
      });
    })
    .catch((err) => {
      console.log(err);
      return;
    });
}

async function getSkinIdAsync(url) {
  return rp({
    uri: BASE_URL + url,
    transform: cheerioTransform
  })
  .then(($) => {
    const FIND_ID_SELECTOR = "dl > dd > a[rel='nofollow'][class*='external']";
    const idUrl = $(FIND_ID_SELECTOR).get(0).attribs.href;

    if (idUrl.includes('https://api.guildwars2.com/v2/skins')) {
      return false;
    } else if (idUrl.includes('https://api.guildwars2.com/v2/items')) {
      let idUrlArray = idUrl.replace('&lang=en', '').split('=');
      return idUrlArray[idUrlArray.length - 1];
    } else {
      let idUrlArray = idUrl.split('/');
      return idUrlArray[idUrlArray.length - 1];
    }
  })
  .catch((err) => {
    console.log(err);
    return;
  });
}

async function getSkinPriceAsync(url) {
  return rp({
      url: BASE_URL + url,
      transform: cheerioTransform 
    })
    .then(($) => {

    })
    .catch((err) => {
      console.log(err);
      return;
    });
}