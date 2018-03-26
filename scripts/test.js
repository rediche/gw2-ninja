const puppeteer = require('puppeteer');

const BASE_URL = "https://wiki.guildwars2.com";

async function run() {
  const browser = await puppeteer.launch({
    headless: false
  });
  const page = await browser.newPage();
  const START_URL = `${BASE_URL}/wiki/Black_Lion_Claim_Ticket`;
  const COLLECTIONS_SELECTOR = "#mw-content-text > div > table.mech1.table > tbody > tr.line-top.achievement-row > th:first-child > a > span";
  const COLLECTIONS_URL_SELECTOR = "#mw-content-text > div > table.mech1.table > tbody > tr.line-top.achievement-row > th:first-child > a";
  
  // Go to BL Claim Tickets page
  await page.goto(START_URL);

  // Find total amount of collections
  let listLength = await page.evaluate((sel) => {
    return document.querySelectorAll(sel).length;
  }, COLLECTIONS_SELECTOR);

  //console.log('Collection Count:', listLength);

  let collections = [];
  // Get information on each collection
  for (let i = 0; i < listLength; i++) {
    let collection = {
      name: null,
      tickets: null,
      ids: [],
      category: "blacklion"
    };

    // Get collection Name
    collection.name = await page.evaluate((sel, i) => {
      return document.querySelectorAll(sel)[i].innerHTML;
    }, COLLECTIONS_SELECTOR, i);

    // Get collection URL
    let url = await page.evaluate((sel, i) => {
      return document.querySelectorAll(sel)[i].getAttribute('href');
    }, COLLECTIONS_URL_SELECTOR, i);

    //console.log(url);
    //console.log("Checking out:", collection.name);
    collection.ids = await getSkins(url, browser);

    collections.push(collection);
  }

  console.log("Collections:", await Promise.all(collections));
  
  browser.close();
}

async function getSkins(url, browser) {
  const page = await browser.newPage();
  const SKIN_SELECTOR = "ul > li > span.item-icon a:not([title*=Chest])";

  await page.goto(BASE_URL + url);

  let listLength = await page.evaluate((sel) => {
    return document.querySelectorAll(sel).length;
  }, SKIN_SELECTOR);

  let ids = [];
  for (let i = 0; i < listLength; i++) {
    let url = await page.evaluate((sel, i) => {
      return document.querySelectorAll(sel)[i].getAttribute('href');
    }, SKIN_SELECTOR, i);

    let skinId = await getSkinId(url, browser);

    if (skinId != false) {
      ids.push(skinId);
    }
  }

  //console.log("Ids:", await Promise.all(ids));

  await page.close();

  return ids;
}

async function getSkinId(url, browser) {
  const page = await browser.newPage();
  const FIND_ID_SELECTOR = "dl > dd > a[rel='nofollow'][class*='external']";

  await page.goto(BASE_URL + url);

  // Find skin ID
  let idUrl = await page.evaluate((sel) => {
    return document.querySelector(sel).getAttribute('href');
  }, FIND_ID_SELECTOR);

  //console.log(idUrl);
  await page.close();
  
  if (idUrl.includes('https://api.guildwars2.com/v2/skins')) {
    return false;
  } else if (idUrl.includes('https://api.guildwars2.com/v2/items')) {
    let idUrlArray = idUrl.replace('&lang=en', '').split('=');
    return idUrlArray[idUrlArray.length - 1];
    //https://api.guildwars2.com/v2/items?ids=86907&lang=en
  } else {
    let idUrlArray = idUrl.split('/');
    return idUrlArray[idUrlArray.length - 1];
  }
}

async function createCollection(url, browser) {
  const page = await browser.newPage();
  const COLLECTION_NAME_SELECTOR = "#firstHeading";
  const COLLECTION_ITEMS_SELECTOR = "#mw-content-text > div > ul:nth-child(6) > li > a";

  // Don't use yet, use on the individual weapons page
  /* const PRICE_SELECTOR = '#mw-content-text > div > table > tbody > tr:nth-child(2) > td:nth-child(1) > dl > dd';
  const PRICE_STRIP_PRE = '<b>Reward:</b>'; */
  
  // How final collection object needs to look
  let collection = {
    name: null,
    tickets: null,
    ids: [],
    category: "blacklion"
  };

  // Go to collection page
  await page.goto(BASE_URL + url);

  // Get name of collection
  collection.name = await page.evaluate((sel) => {
    return document.querySelector(sel).innerHTML;
  }, COLLECTION_NAME_SELECTOR);

  // Get collection IDs
  

  //console.log(collection);

  /* let ticketPrice = await page.evaluate((sel, strip_pre) => {
    return document.querySelector(sel).innerHTML.replace(' ', '').split(strip_pre)[1][0];
  }, PRICE_SELECTOR, PRICE_STRIP_PRE);

  console.log(ticketPrice); */

  await page.close();

  return collection;
}

run();