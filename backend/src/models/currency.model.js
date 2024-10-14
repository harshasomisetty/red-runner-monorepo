// Define the CurrencyItem class
class CurrencyItem {
  constructor({ id, mintAddress, name, symbol }) {
    this.id = id;
    this.mintAddress = mintAddress;
    this.name = name;
    this.symbol = symbol;
  }

  GetClientModel() {
    return this;
  }

  displayItemInfo() {
    console.log(`ID: ${this.id}, Name: ${this.name}, Symbol: ${this.symbol}, Mint Address: ${this.mintAddress}`);
  }
}

// Define the Currency class
class Currency {
  constructor({ type, item, quantity }) {
    this.type = type;
    this.item = new CurrencyItem(item); // Create CurrencyItem instance
    this.quantity = quantity;
  }

  GetClientModel() {
    return {
      type: this.type,
      item: this.item.GetClientModel(),
      quantity: this.quantity
    }
  }

  displayCurrencyInfo() {
    console.log(`Type: ${this.type}, Quantity: ${this.quantity}`);
    this.item.displayItemInfo();
  }
}

// Sample JSON data
const jsonData = [
  {
    "type": "Currency",
    "item": {
      "id": "USDC",
      "mintAddress": "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU",
      "name": "USD Coin",
      "symbol": "USDC"
    },
    "quantity": "0"
  },
  {
    "type": "Currency",
    "item": {
      "id": "SOL",
      "mintAddress": "11111111111111111111111111111111",
      "name": "SOL",
      "symbol": "SOL"
    },
    "quantity": "0"
  }
];

// Create instances of Currency from JSON data
const currencies = jsonData.map(data => new Currency(data));

// Display information for each currency
currencies.forEach(currency => currency.displayCurrencyInfo());
module.exports = Currency;
