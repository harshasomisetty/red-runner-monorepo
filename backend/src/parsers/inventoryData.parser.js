// Define the DataParser class
const Currency = require('./currency.model');
const UniqueAsset = require('./uniqueAsset.model');

class DataParser {
  constructor(jsonData) {
    this.data = jsonData.data.map((item) => this.createInstance(item));
    this.meta = jsonData.meta;
  }

  createInstance(data) {
    switch (data.type) {
      case 'Currency':
        return new Currency(data);
      case 'UniqueAsset':
        return new UniqueAsset(data);
      default:
        throw new Error(`Unknown type: ${data.type}`);
    }
  }

  GetClientModel() {
    return {
      data: this.data.map((item) => item.GetClientModel()),
      meta: this.meta,
    };
  }

  displayAllData() {
    this.data.forEach((item) => {
      if (item instanceof Currency) {
        item.displayCurrencyInfo();
      } else if (item instanceof UniqueAsset) {
        item.displayAssetInfo();
      }
      console.log('---');
    });
  }

  displayMeta() {
    console.log(`Page: ${this.meta.page}, Per Page: ${this.meta.perPage}`);
    console.log(`Total Pages: ${this.meta.totalPages}, Total Results: ${this.meta.totalResults}`);
  }
}

module.exports = DataParser;
