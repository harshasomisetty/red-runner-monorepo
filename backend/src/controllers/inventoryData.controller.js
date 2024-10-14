// Sample JSON data
const DataParser = require('../parsers/inventoryData.parser');
const jsonData = {
  "data": [
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
    },
    {
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
    },
    {
      "type": "UniqueAsset",
      "item": {
        "id": "f0ba4121-5daa-4f0b-8266-90070e19a428",
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
        "created": 1723059013104,
        "attributes": [
          {
            "value": "10",
            "traitType": "UsesLeft"
          }
        ],
        "name": "10 Speed Boosters",
        "description": "10 Speed Boosters",
        "environment": "Development",
        "escrow": false,
        "imageUrl": "https://buckets.clvtechnologies.com/solana-gameshift/collections/thumbs/speed-booster.png",
        "imported": false,
        "priceCents": null,
        "status": "Committed",
        "mintAddress": "Dst7Cz3mf9mqqLAAmWMBf16HBrAhD5kdhVWxaGPdR8tz",
        "owner": {
          "address": "3txK46YGNHi4WLah9DUfXsg16tixYBzXgk1noifqYqEj",
          "referenceId": "OjGkzAEpeRUSN2uJ0oGAYsx2hug2"
        }
      }
    },
    {
      "type": "UniqueAsset",
      "item": {
        "id": "1725d7a0-12a8-4e85-b876-1d3726dc0ffa",
        "collection": {
          "id": "36399a18-941c-4c18-bb0d-8cc2aaaa8b06",
          "name": "Skins",
          "description": "All Skins",
          "environment": "Development",
          "imageUrl": "https://crossmint.myfilebase.com/ipfs/Qmbt6U7346A16VFJh8rkEhWKUDaPmgznASX4ueLscGPYyA",
          "imported": false,
          "mintAddress": "",
          "created": 1723043942257
        },
        "created": 1723049530976,
        "attributes": [
          {
            "value": "3",
            "traitType": "SkinId"
          }
        ],
        "name": "Holloween Skin",
        "description": "Spoooky",
        "environment": "Development",
        "escrow": false,
        "imageUrl": "https://buckets.clvtechnologies.com/solana-gameshift/collections/thumbs/halloweenSkin.png",
        "imported": false,
        "priceCents": null,
        "status": "Committed",
        "mintAddress": "6LFTsa7nymtiYJxxeC36wJM3iTHCaesUkytpW9rcoMN4",
        "owner": {
          "address": "3txK46YGNHi4WLah9DUfXsg16tixYBzXgk1noifqYqEj",
          "referenceId": "OjGkzAEpeRUSN2uJ0oGAYsx2hug2"
        }
      }
    },
    {
      "type": "UniqueAsset",
      "item": {
        "id": "ce795396-dfc8-4a35-9daa-7ac6e2e7794e",
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
        "created": 1723049387179,
        "attributes": [
          {
            "value": "10",
            "traitType": "UsesLeft"
          }
        ],
        "name": "Chest of Speed Boosters",
        "description": "6 Speed Boosters",
        "environment": "Development",
        "escrow": false,
        "imageUrl": "https://buckets.clvtechnologies.com/solana-gameshift/collections/thumbs/speed-booster.png",
        "imported": false,
        "priceCents": null,
        "status": "Committed",
        "mintAddress": "AMXJkXuqqZ1P7pS3HfTLFv2AzEQLs6MPtaGGCx9k92Xe",
        "owner": {
          "address": "3txK46YGNHi4WLah9DUfXsg16tixYBzXgk1noifqYqEj",
          "referenceId": "OjGkzAEpeRUSN2uJ0oGAYsx2hug2"
        }
      }
    },
    {
      "type": "UniqueAsset",
      "item": {
        "id": "cde1bb39-73de-4c47-ad64-0c884fc8c0c7",
        "collection": {
          "id": "36399a18-941c-4c18-bb0d-8cc2aaaa8b06",
          "name": "Skins",
          "description": "All Skins",
          "environment": "Development",
          "imageUrl": "https://crossmint.myfilebase.com/ipfs/Qmbt6U7346A16VFJh8rkEhWKUDaPmgznASX4ueLscGPYyA",
          "imported": false,
          "mintAddress": "",
          "created": 1723043942257
        },
        "created": 1723049368978,
        "attributes": [
          {
            "value": "9",
            "traitType": "SkinId"
          }
        ],
        "name": "Wrestler Skin",
        "description": "The wrestler",
        "environment": "Development",
        "escrow": false,
        "imageUrl": "https://buckets.clvtechnologies.com/solana-gameshift/collections/thumbs/wrestlerSkin.png",
        "imported": false,
        "priceCents": null,
        "status": "Committed",
        "mintAddress": "GRMZyy7Th6xxCnw832gqHXJZJjpPEMQNhghTG1LNBKTo",
        "owner": {
          "address": "3txK46YGNHi4WLah9DUfXsg16tixYBzXgk1noifqYqEj",
          "referenceId": "OjGkzAEpeRUSN2uJ0oGAYsx2hug2"
        }
      }
    },
    {
      "type": "UniqueAsset",
      "item": {
        "id": "1d524a3c-f84d-48a6-8918-36ad667504c2",
        "collection": {
          "id": "36399a18-941c-4c18-bb0d-8cc2aaaa8b06",
          "name": "Skins",
          "description": "All Skins",
          "environment": "Development",
          "imageUrl": "https://crossmint.myfilebase.com/ipfs/Qmbt6U7346A16VFJh8rkEhWKUDaPmgznASX4ueLscGPYyA",
          "imported": false,
          "mintAddress": "",
          "created": 1723043942257
        },
        "created": 1723049355761,
        "attributes": [
          {
            "value": "3",
            "traitType": "SkinId"
          }
        ],
        "name": "Holloween Skin",
        "description": "Spoooky",
        "environment": "Development",
        "escrow": false,
        "imageUrl": "https://buckets.clvtechnologies.com/solana-gameshift/collections/thumbs/halloweenSkin.png",
        "imported": false,
        "priceCents": null,
        "status": "Committed",
        "mintAddress": "5UujmoHU4xugTfGEEE1b6eJeCFGwRyvcdHDpbjDxbfCs",
        "owner": {
          "address": "3txK46YGNHi4WLah9DUfXsg16tixYBzXgk1noifqYqEj",
          "referenceId": "OjGkzAEpeRUSN2uJ0oGAYsx2hug2"
        }
      }
    },
    {
      "type": "UniqueAsset",
      "item": {
        "id": "5e378bb7-9bcd-410d-a6f2-029acf9311bb",
        "collection": {
          "id": "0b9d2116-b3a2-4452-affb-03282313ab77",
          "name": "Double Jump Boosters",
          "description": "All double jump booster packs",
          "environment": "Development",
          "imageUrl": "https://crossmint.myfilebase.com/ipfs/QmNMFpwdLYNKLMUprLDnqDumEmXqVV2UxKiJ5LeQgpv3hJ",
          "imported": false,
          "mintAddress": "",
          "created": 1723041524395
        },
        "created": 1723041790002,
        "attributes": [
          {
            "value": "10",
            "traitType": "Jumps"
          }
        ],
        "name": "Chest of Double Jumps",
        "description": "10 Double Jumps",
        "environment": "Development",
        "escrow": false,
        "imageUrl": "https://buckets.clvtechnologies.com/solana-gameshift/collections/thumbs/double-jump.png",
        "imported": false,
        "priceCents": null,
        "status": "Committed",
        "mintAddress": "7EdEhLWP3SFAQtp3NgLBhagwcx9snPaUXck5HMonx7xD",
        "owner": {
          "address": "3txK46YGNHi4WLah9DUfXsg16tixYBzXgk1noifqYqEj",
          "referenceId": "OjGkzAEpeRUSN2uJ0oGAYsx2hug2"
        }
      }
    },
    {
      "type": "UniqueAsset",
      "item": {
        "id": "a1597ed9-6aa6-451b-8c94-ec351e56184f",
        "collection": {
          "id": "0b9d2116-b3a2-4452-affb-03282313ab77",
          "name": "Double Jump Boosters",
          "description": "All double jump booster packs",
          "environment": "Development",
          "imageUrl": "https://crossmint.myfilebase.com/ipfs/QmNMFpwdLYNKLMUprLDnqDumEmXqVV2UxKiJ5LeQgpv3hJ",
          "imported": false,
          "mintAddress": "",
          "created": 1723041524395
        },
        "created": 1723041772322,
        "attributes": [
          {
            "value": "999",
            "traitType": "Jumps"
          }
        ],
        "name": "Boatload of Double Jumps",
        "description": "999 Double Jumps",
        "environment": "Development",
        "escrow": false,
        "imageUrl": "https://buckets.clvtechnologies.com/solana-gameshift/collections/thumbs/double-jump.png",
        "imported": false,
        "priceCents": null,
        "status": "Committed",
        "mintAddress": "94moZjERsE3Anv77gQaTXzHPsgJkCvd89sgyPcg5F9fK",
        "owner": {
          "address": "3txK46YGNHi4WLah9DUfXsg16tixYBzXgk1noifqYqEj",
          "referenceId": "OjGkzAEpeRUSN2uJ0oGAYsx2hug2"
        }
      }
    }
  ],
  "meta": {
    "page": 1,
    "perPage": 10,
    "totalPages": 2,
    "totalResults": 12
  }
};

// Create a DataParser instance
const dataParser = new DataParser(jsonData);

// Display all data and metadata
dataParser.displayAllData();
dataParser.displayMeta();
