const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../files/assets.config.json');

let shopData = {};

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('There was an error reading the file!', err);
    return;
  }
  try {
    shopData = JSON.parse(data);
  }catch (e) {
    console.error('There was an error parsing the file!', e);
  }
});

//TODO: Please make this better later on this is silly//
module.exports.GetItemByKey = (key) => {
  // Iterate through all top-level keys in the shop JSON (like "boosters", "skins")
  for (const topLevelKey in shopData) {
    if (shopData.hasOwnProperty(topLevelKey)) {
      const category = shopData[topLevelKey];
      for (const secondLevelKey in category) {
        const items = category[secondLevelKey];
        if (items.hasOwnProperty(key)) {
          return items[key];
        }
      }
    }
  }

  // Return null if the key is not found
  return null;
};

module.exports.GetItemMintableByKey = (key) => {
  if (!shopData) {
    throw new Error("shopData is not defined");
  }

  // Iterate through all top-level keys in the shop JSON (like "boosters", "skins")
  for (const topLevelKey in shopData) {
    if (shopData.hasOwnProperty(topLevelKey)) {
      const secondLevelData = shopData[topLevelKey];

      // Check if the secondLevelData contains the key directly (for cases like "skins")
      if (secondLevelData.hasOwnProperty(key)) {
        return secondLevelData[key];
      }

      // If not found directly, iterate over the second level for nested objects (like in "boosters")
      for (const secondLevelKey in secondLevelData) {
        if (secondLevelData.hasOwnProperty(secondLevelKey)) {
          const items = secondLevelData[secondLevelKey];
          if (items.hasOwnProperty(key)) {
            return items[key];
          }
        }
      }
    }
  }

  // Return null if the key is not found
  return null;
};



module.exports.GetShopStaticData = ()=>shopData;


