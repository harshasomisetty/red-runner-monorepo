// Define the Collection class
class Collection {
  constructor({ id, name, description, environment, imageUrl, imported, mintAddress, created }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.environment = environment;
    this.imageUrl = imageUrl;
    this.imported = imported;
    this.mintAddress = mintAddress;
    this.created = created;
  }

  GetClientModel() {
    return {
      id: this.id,
    }
  }

  displayCollectionInfo() {
    console.log(`Collection Name: ${this.name}, Description: ${this.description}, Environment: ${this.environment}`);
  }
}

// Define the Attribute class
class Attribute {
  constructor({ value, traitType }) {
    this.value = value;
    this.traitType = traitType;
  }

  GetClientModel() {
    return this;
  }

  displayAttributeInfo() {
    console.log(`Trait Type: ${this.traitType}, Value: ${this.value}`);
  }
}

// Define the Owner class
class Owner {
  constructor({ address, referenceId }) {
    this.address = address;
    this.referenceId = referenceId;
  }

  GetClientModel() {
    return this;
  }

  displayOwnerInfo() {
    console.log(`Owner Address: ${this.address}, Reference ID: ${this.referenceId}`);
  }
}

// Define the AssetItem class
class AssetItem {
  constructor({ id, collection, created, attributes, name, description, environment, escrow, imageUrl, imported, priceCents, status, mintAddress, owner }) {
    this.id = id;
    this.collection = new Collection(collection);
    this.created = created;
    this.attributes = attributes.map(attr => new Attribute(attr));
    this.name = name;
    this.description = description;
    this.environment = environment;
    this.escrow = escrow;
    this.priceCents = priceCents;
    this.imageUrl = imageUrl;
    this.imported = imported;
    this.priceCents = priceCents;
    this.status = status;
    this.mintAddress = mintAddress;
    this.owner = new Owner(owner);
  }

  displayItemInfo() {
    console.log(`Item Name: ${this.name}, Description: ${this.description}, Status: ${this.status}`);
    this.collection.displayCollectionInfo();
    this.attributes.forEach(attr => attr.displayAttributeInfo());
    this.owner.displayOwnerInfo();
  }

  GetClientModel() {
    return {
      id: this.id,
      escrow: this.escrow,
      collection: this.collection.GetClientModel(),
      created: this.created,
      priceCents: this.priceCents,
      itemId: this.attributes.find(attr => attr.traitType === "ItemId")?.value,
      attributes: this.attributes.map(attr => attr.GetClientModel()),
      name: this.name,
      description: this.description,
      environment: this.environment,
      imageUrl: this.imageUrl,
      status: this.status,
      mintAddress: this.mintAddress,
      owner: this.owner.GetClientModel()
    }
  }
}

// Define the UniqueAsset class
class UniqueAsset {
  constructor({ type, item }) {
    this.type = type;
    this.item = new AssetItem(item);
  }

  GetClientModel() {
    return {
      type: this.type,
      item: this.item.GetClientModel()
    }
  }

  displayAssetInfo() {
    console.log(`Type: ${this.type}`);
    this.item.displayItemInfo();
  }
}

// Sample JSON data
const jsonData = {
  "type": "UniqueAsset",
  "item": {
    "id": "63c21857-98a1-460a-8fc5-4b04881d79e5",
    "collection": {
      "id": "0dfe473e-bbb7-453f-8d3f-ba9af79dfc14",
      "name": "Speed Boosters",
      "description": "All speed boosters",
      "environment": "Development",
      "imageUrl": "https://crossmint.myfilebase.com/ipfs/QmPSEApB3c69s2C2ggFrrHXzZWBgUvZ2UX99DNujcxSNXL",
      "imported": false,
      "mintAddress": "",
      "created": 1723041906766
    },
    "created": 1723126330533,
    "attributes": [
      {
        "value": "2",
        "traitType": "UsesLeft"
      }
    ],
    "name": "3 Speed Boosters",
    "description": "3 Speed Boosters",
    "environment": "Development",
    "escrow": false,
    "imageUrl": "https://buckets.clvtechnologies.com/solana-gameshift/collections/thumbs/speed-booster.png",
    "imported": false,
    "priceCents": null,
    "status": "Committed",
    "mintAddress": "5qNm71MDTWgkysc7w6RAiMobdCXxcBdQ9E1WvuCJ9DbP",
    "owner": {
      "address": "3txK46YGNHi4WLah9DUfXsg16tixYBzXgk1noifqYqEj",
      "referenceId": "OjGkzAEpeRUSN2uJ0oGAYsx2hug2"
    }
  }
};

// Create an instance of UniqueAsset
const uniqueAsset = new UniqueAsset(jsonData);

// Display information
uniqueAsset.displayAssetInfo();
module.exports=UniqueAsset;
