onmessage = async function(e) {
  const data = e.data;
  const filtered = await _filterAndSort(data.collections, data.category);
  postMessage({ 'collections': filtered, 'catgory': data.category });
}

const _filterAndSort = async (json, categoryName) => {
  const category = _filterEntries(json, categoryName);
  const categoryWithPrices = await Promise.all(category.map(async collection => {
    return Object.assign({}, collection, { items: await _loadItemData(collection.ids) });
  }, this));
  const categorySortedAlphabetically = categoryWithPrices.slice().sort((a, b) => {
    const aName = a.name.toLowerCase();
    const bName = b.name.toLowerCase();
    if (aName < bName) return -1;
    if (aName > bName) return 1;
    return 0;
  });

  return categorySortedAlphabetically;
};

_loadItemData = async (ids) => {
  const itemsData = await fetch('https://api.guildwars2.com/v2/items?ids=' + ids);
  const pricesData = await fetch('https://api.guildwars2.com/v2/commerce/prices?ids=' + ids);
  const itemsJson = await itemsData.json();
  const pricesJson = await pricesData.json();

  return itemsJson.map(item => {
    return Object.assign({}, item, pricesJson.find(price => price.id === item.id));
  });
}

_filterEntries = (collections, category) => {
  if (!collections) return;
  return collections.filter((collection) => {
    return collection.category == category;
  });
}