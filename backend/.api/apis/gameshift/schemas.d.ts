declare const AssetControllerBuyAsset: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly buyerId: {
                readonly type: "string";
                readonly minLength: 1;
                readonly description: "Identifies the `User` buying the item";
            };
        };
        readonly required: readonly ["buyerId"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly itemId: {
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Specifies the Unique Asset to buy";
                };
            };
            readonly required: readonly ["itemId"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-api-key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "API key for your game";
                };
            };
            readonly required: readonly ["x-api-key"];
        }];
    };
    readonly response: {
        readonly "201": {
            readonly type: "object";
            readonly properties: {
                readonly transactionId: {
                    readonly type: "string";
                    readonly description: "The id for the transaction. Can be used to get the status of the transaction.";
                };
                readonly consentUrl: {
                    readonly type: "string";
                    readonly description: "The url the user must visit to provide consent for the transaction.";
                };
            };
            readonly required: readonly ["transactionId", "consentUrl"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const AssetControllerCancelListingAsset: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly itemId: {
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Specifies the Unique Asset to cancel listing for.";
                };
            };
            readonly required: readonly ["itemId"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-api-key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "API key for your game";
                };
            };
            readonly required: readonly ["x-api-key"];
        }];
    };
    readonly response: {
        readonly "201": {
            readonly type: "object";
            readonly properties: {
                readonly transactionId: {
                    readonly type: "string";
                    readonly description: "The id for the transaction. Can be used to get the status of the transaction.";
                };
                readonly consentUrl: {
                    readonly type: "string";
                    readonly description: "The url the user must visit to provide consent for the transaction.";
                };
            };
            readonly required: readonly ["transactionId", "consentUrl"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const AssetControllerCreateAsset: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly details: {
                readonly description: "The asset to create";
                readonly type: "object";
                readonly required: readonly ["collectionId", "description", "imageUrl", "name"];
                readonly properties: {
                    readonly attributes: {
                        readonly description: "Specify attributes to your Unique Asset.";
                        readonly type: "array";
                        readonly items: {
                            readonly type: "object";
                            readonly required: readonly ["traitType", "value"];
                            readonly properties: {
                                readonly traitType: {
                                    readonly type: "string";
                                    readonly description: "The name of the trait";
                                };
                                readonly value: {
                                    readonly type: "string";
                                    readonly description: "The value of the trait";
                                };
                            };
                        };
                    };
                    readonly royaltyInfo: {
                        readonly description: "Specify royalties to your Unique Asset.";
                        readonly type: "object";
                        readonly required: readonly ["sellerFeeBasisPoints", "recipients"];
                        readonly properties: {
                            readonly sellerFeeBasisPoints: {
                                readonly type: "number";
                                readonly minimum: 0;
                                readonly maximum: 10000;
                                readonly description: "How much the seller pays the recipients on each sale of the asset when using Gameshift's marketplace in basis points. 0-10000";
                            };
                            readonly recipients: {
                                readonly description: "Recipients of the royalties";
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "object";
                                    readonly required: readonly ["referenceId", "address", "share"];
                                    readonly properties: {
                                        readonly referenceId: {
                                            readonly type: "string";
                                            readonly description: "The recipient's reference id";
                                        };
                                        readonly address: {
                                            readonly type: "string";
                                            readonly description: "The recipient's on-chain address";
                                        };
                                        readonly share: {
                                            readonly type: "number";
                                            readonly minimum: 0;
                                            readonly maximum: 100;
                                            readonly description: "The recipient's share of the royalties, in percentage points. 0-100";
                                        };
                                    };
                                };
                            };
                        };
                    };
                    readonly collectionId: {
                        readonly type: "string";
                        readonly description: "The collection the Unique Asset should belong to.";
                    };
                    readonly description: {
                        readonly type: "string";
                        readonly description: "A description for the Unique Asset.";
                        readonly maxLength: 64;
                    };
                    readonly imageUrl: {
                        readonly type: "string";
                        readonly description: "A url to the image underlying the Asset.";
                    };
                    readonly name: {
                        readonly type: "string";
                        readonly description: "The name of the Asset. Max length: 32 chars.";
                        readonly maxLength: 32;
                    };
                };
            };
            readonly destinationUserReferenceId: {
                readonly type: "string";
                readonly minLength: 1;
                readonly description: "The reference id of the user the asset should be assigned to";
            };
        };
        readonly required: readonly ["details", "destinationUserReferenceId"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly "x-api-key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "API key for your game";
                };
            };
            readonly required: readonly ["x-api-key"];
        }];
    };
    readonly response: {
        readonly "201": {
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly description: "The ID of the Asset";
                };
                readonly attributes: {
                    readonly description: "The attributes of the Asset";
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly traitType: {
                                readonly type: "string";
                                readonly description: "The name of the trait";
                            };
                            readonly value: {
                                readonly type: "string";
                                readonly description: "The value of the trait";
                            };
                        };
                        readonly required: readonly ["traitType", "value"];
                    };
                };
                readonly created: {
                    readonly type: "number";
                    readonly description: "The date the Asset was created";
                };
                readonly name: {
                    readonly type: "string";
                    readonly description: "The name of the Asset";
                };
                readonly collection: {
                    readonly description: "The collection the Asset belongs to";
                    readonly type: "object";
                    readonly required: readonly ["id", "name", "description", "environment", "imported", "created"];
                    readonly properties: {
                        readonly id: {
                            readonly type: "string";
                            readonly description: "The id of the collection. This is not an on-chain address, but instead an ID internal to GameShift";
                        };
                        readonly name: {
                            readonly type: "string";
                            readonly description: "The name given to the collection";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description given to the collection";
                        };
                        readonly environment: {
                            readonly type: "string";
                            readonly description: "The collection's environment\n\n`Development` `Production`";
                            readonly enum: readonly ["Development", "Production"];
                        };
                        readonly imageUrl: {
                            readonly type: readonly ["string", "null"];
                            readonly description: "The url of the image used to represent the collection";
                        };
                        readonly imported: {
                            readonly type: "boolean";
                            readonly description: "Whether the collection was imported";
                        };
                        readonly mintAddress: {
                            readonly type: readonly ["string", "null"];
                            readonly description: "The mint address of the collection on-chain";
                        };
                        readonly created: {
                            readonly type: "number";
                            readonly description: "Timestamp of collection creation";
                        };
                        readonly stats: {
                            readonly description: "Statistics about the collection";
                            readonly type: "object";
                            readonly required: readonly ["numMinted", "floorPrice", "numListed", "numOwners"];
                            readonly properties: {
                                readonly numMinted: {
                                    readonly type: "number";
                                    readonly description: "The number of assets minted for this collection";
                                };
                                readonly floorPrice: {
                                    readonly type: "number";
                                    readonly description: "The floor price of the collection";
                                };
                                readonly numListed: {
                                    readonly type: "number";
                                    readonly description: "The number of assets listed for this collection";
                                };
                                readonly numOwners: {
                                    readonly type: "number";
                                    readonly description: "The number of unique owners of assets in this collection";
                                };
                            };
                        };
                    };
                };
                readonly description: {
                    readonly type: "string";
                    readonly description: "The description provided when the Asset was created";
                };
                readonly environment: {
                    readonly type: "string";
                    readonly description: "The asset's environment\n\n`Development` `Production`";
                    readonly enum: readonly ["Development", "Production"];
                };
                readonly imported: {
                    readonly type: "boolean";
                    readonly description: "Indicates if the asset belongs to an imported collection";
                };
                readonly imageUrl: {
                    readonly type: "string";
                    readonly description: "The URI for the image representing the Asset";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "The current status of the Asset\n\n`Uninitiated` `Unprocessed` `Processing` `Committed` `Failed`";
                    readonly enum: readonly ["Uninitiated", "Unprocessed", "Processing", "Committed", "Failed"];
                };
                readonly forSale: {
                    readonly type: "boolean";
                    readonly description: "Indicates if the asset is currently for sale";
                };
                readonly mintAddress: {
                    readonly type: "string";
                    readonly description: "The address of the Asset on the blockchain";
                };
                readonly owner: {
                    readonly description: "The current owner of the Asset.";
                    readonly type: readonly ["object", "null"];
                    readonly properties: {
                        readonly address: {
                            readonly type: readonly ["string", "null"];
                            readonly description: "The wallet that currently holds this asset";
                        };
                        readonly referenceId: {
                            readonly type: readonly ["string", "null"];
                            readonly description: "The reference id associated with the wallet";
                        };
                    };
                };
                readonly price: {
                    readonly type: readonly ["object", "null"];
                    readonly description: "The price of the asset on the marketplace";
                    readonly additionalProperties: true;
                };
            };
            readonly required: readonly ["id", "created", "name", "description", "environment", "imported", "imageUrl", "status", "forSale", "mintAddress"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const AssetControllerEditAsset: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly imageUrl: {
                readonly type: "string";
                readonly description: "Image url of the Asset";
            };
            readonly attributes: {
                readonly description: "Update attributes on the Asset";
                readonly type: "array";
                readonly items: {
                    readonly type: "object";
                    readonly properties: {
                        readonly traitType: {
                            readonly type: "string";
                            readonly description: "The name of the trait";
                        };
                        readonly value: {
                            readonly type: "string";
                            readonly description: "The value of the trait";
                        };
                    };
                    readonly required: readonly ["traitType", "value"];
                };
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly itemId: {
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Specifies the Unique Asset to update";
                };
            };
            readonly required: readonly ["itemId"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-api-key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "API key for your game";
                };
            };
            readonly required: readonly ["x-api-key"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly description: "The ID of the Asset";
                };
                readonly attributes: {
                    readonly description: "The attributes of the Asset";
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly traitType: {
                                readonly type: "string";
                                readonly description: "The name of the trait";
                            };
                            readonly value: {
                                readonly type: "string";
                                readonly description: "The value of the trait";
                            };
                        };
                        readonly required: readonly ["traitType", "value"];
                    };
                };
                readonly created: {
                    readonly type: "number";
                    readonly description: "The date the Asset was created";
                };
                readonly name: {
                    readonly type: "string";
                    readonly description: "The name of the Asset";
                };
                readonly collection: {
                    readonly description: "The collection the Asset belongs to";
                    readonly type: "object";
                    readonly required: readonly ["id", "name", "description", "environment", "imported", "created"];
                    readonly properties: {
                        readonly id: {
                            readonly type: "string";
                            readonly description: "The id of the collection. This is not an on-chain address, but instead an ID internal to GameShift";
                        };
                        readonly name: {
                            readonly type: "string";
                            readonly description: "The name given to the collection";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description given to the collection";
                        };
                        readonly environment: {
                            readonly type: "string";
                            readonly description: "The collection's environment\n\n`Development` `Production`";
                            readonly enum: readonly ["Development", "Production"];
                        };
                        readonly imageUrl: {
                            readonly type: readonly ["string", "null"];
                            readonly description: "The url of the image used to represent the collection";
                        };
                        readonly imported: {
                            readonly type: "boolean";
                            readonly description: "Whether the collection was imported";
                        };
                        readonly mintAddress: {
                            readonly type: readonly ["string", "null"];
                            readonly description: "The mint address of the collection on-chain";
                        };
                        readonly created: {
                            readonly type: "number";
                            readonly description: "Timestamp of collection creation";
                        };
                        readonly stats: {
                            readonly description: "Statistics about the collection";
                            readonly type: "object";
                            readonly required: readonly ["numMinted", "floorPrice", "numListed", "numOwners"];
                            readonly properties: {
                                readonly numMinted: {
                                    readonly type: "number";
                                    readonly description: "The number of assets minted for this collection";
                                };
                                readonly floorPrice: {
                                    readonly type: "number";
                                    readonly description: "The floor price of the collection";
                                };
                                readonly numListed: {
                                    readonly type: "number";
                                    readonly description: "The number of assets listed for this collection";
                                };
                                readonly numOwners: {
                                    readonly type: "number";
                                    readonly description: "The number of unique owners of assets in this collection";
                                };
                            };
                        };
                    };
                };
                readonly description: {
                    readonly type: "string";
                    readonly description: "The description provided when the Asset was created";
                };
                readonly environment: {
                    readonly type: "string";
                    readonly description: "The asset's environment\n\n`Development` `Production`";
                    readonly enum: readonly ["Development", "Production"];
                };
                readonly imported: {
                    readonly type: "boolean";
                    readonly description: "Indicates if the asset belongs to an imported collection";
                };
                readonly imageUrl: {
                    readonly type: "string";
                    readonly description: "The URI for the image representing the Asset";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "The current status of the Asset\n\n`Uninitiated` `Unprocessed` `Processing` `Committed` `Failed`";
                    readonly enum: readonly ["Uninitiated", "Unprocessed", "Processing", "Committed", "Failed"];
                };
                readonly forSale: {
                    readonly type: "boolean";
                    readonly description: "Indicates if the asset is currently for sale";
                };
                readonly mintAddress: {
                    readonly type: "string";
                    readonly description: "The address of the Asset on the blockchain";
                };
                readonly owner: {
                    readonly description: "The current owner of the Asset.";
                    readonly type: readonly ["object", "null"];
                    readonly properties: {
                        readonly address: {
                            readonly type: readonly ["string", "null"];
                            readonly description: "The wallet that currently holds this asset";
                        };
                        readonly referenceId: {
                            readonly type: readonly ["string", "null"];
                            readonly description: "The reference id associated with the wallet";
                        };
                    };
                };
                readonly price: {
                    readonly type: readonly ["object", "null"];
                    readonly description: "The price of the asset on the marketplace";
                    readonly additionalProperties: true;
                };
            };
            readonly required: readonly ["id", "created", "name", "description", "environment", "imported", "imageUrl", "status", "forSale", "mintAddress"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const AssetControllerListAsset: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly price: {
                readonly description: "Listing price for the asset";
                readonly type: "object";
                readonly required: readonly ["currencyId", "naturalAmount"];
                readonly properties: {
                    readonly currencyId: {
                        readonly minLength: 1;
                        readonly type: "string";
                        readonly description: "The currency identifier";
                    };
                    readonly naturalAmount: {
                        readonly type: "string";
                        readonly minLength: 1;
                        readonly description: "The amount in the human readable format";
                    };
                };
            };
        };
        readonly required: readonly ["price"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly itemId: {
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Specifies the Unique Asset to sell";
                };
            };
            readonly required: readonly ["itemId"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-api-key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "API key for your game";
                };
            };
            readonly required: readonly ["x-api-key"];
        }];
    };
    readonly response: {
        readonly "201": {
            readonly type: "object";
            readonly properties: {
                readonly transactionId: {
                    readonly type: "string";
                    readonly description: "The id for the transaction. Can be used to get the status of the transaction.";
                };
                readonly consentUrl: {
                    readonly type: "string";
                    readonly description: "The url the user must visit to provide consent for the transaction.";
                };
            };
            readonly required: readonly ["transactionId", "consentUrl"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const CollectionControllerCreateCollection: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly name: {
                readonly type: "string";
                readonly description: "Names the Asset Collection";
            };
            readonly description: {
                readonly type: "string";
                readonly description: "Describes the Asset Collection";
            };
            readonly imageUrl: {
                readonly type: "string";
                readonly description: "URL for the Asset Collection's image";
            };
        };
        readonly required: readonly ["name", "description", "imageUrl"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly "x-api-key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "API key for your game";
                };
            };
            readonly required: readonly ["x-api-key"];
        }];
    };
    readonly response: {
        readonly "201": {
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly description: "The id of the collection. This is not an on-chain address, but instead an ID internal to GameShift";
                };
                readonly name: {
                    readonly type: "string";
                    readonly description: "The name given to the collection";
                };
                readonly description: {
                    readonly type: "string";
                    readonly description: "The description given to the collection";
                };
                readonly environment: {
                    readonly type: "string";
                    readonly description: "The collection's environment\n\n`Development` `Production`";
                    readonly enum: readonly ["Development", "Production"];
                };
                readonly imageUrl: {
                    readonly type: readonly ["string", "null"];
                    readonly description: "The url of the image used to represent the collection";
                };
                readonly imported: {
                    readonly type: "boolean";
                    readonly description: "Whether the collection was imported";
                };
                readonly mintAddress: {
                    readonly type: readonly ["string", "null"];
                    readonly description: "The mint address of the collection on-chain";
                };
                readonly created: {
                    readonly type: "number";
                    readonly description: "Timestamp of collection creation";
                };
                readonly stats: {
                    readonly description: "Statistics about the collection";
                    readonly type: "object";
                    readonly required: readonly ["numMinted", "floorPrice", "numListed", "numOwners"];
                    readonly properties: {
                        readonly numMinted: {
                            readonly type: "number";
                            readonly description: "The number of assets minted for this collection";
                        };
                        readonly floorPrice: {
                            readonly type: "number";
                            readonly description: "The floor price of the collection";
                        };
                        readonly numListed: {
                            readonly type: "number";
                            readonly description: "The number of assets listed for this collection";
                        };
                        readonly numOwners: {
                            readonly type: "number";
                            readonly description: "The number of unique owners of assets in this collection";
                        };
                    };
                };
            };
            readonly required: readonly ["id", "name", "description", "environment", "imported", "created"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const CollectionControllerGetAll: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly page: {
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Specifies the page to fetch";
                };
                readonly perPage: {
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of items on each page";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-api-key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "API key for your game";
                };
            };
            readonly required: readonly ["x-api-key"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly description: "A list of Collections";
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly id: {
                                readonly type: "string";
                                readonly description: "The id of the collection. This is not an on-chain address, but instead an ID internal to GameShift";
                            };
                            readonly name: {
                                readonly type: "string";
                                readonly description: "The name given to the collection";
                            };
                            readonly description: {
                                readonly type: "string";
                                readonly description: "The description given to the collection";
                            };
                            readonly environment: {
                                readonly type: "string";
                                readonly description: "The collection's environment\n\n`Development` `Production`";
                                readonly enum: readonly ["Development", "Production"];
                            };
                            readonly imageUrl: {
                                readonly type: readonly ["string", "null"];
                                readonly description: "The url of the image used to represent the collection";
                            };
                            readonly imported: {
                                readonly type: "boolean";
                                readonly description: "Whether the collection was imported";
                            };
                            readonly mintAddress: {
                                readonly type: readonly ["string", "null"];
                                readonly description: "The mint address of the collection on-chain";
                            };
                            readonly created: {
                                readonly type: "number";
                                readonly description: "Timestamp of collection creation";
                            };
                            readonly stats: {
                                readonly description: "Statistics about the collection";
                                readonly type: "object";
                                readonly required: readonly ["numMinted", "floorPrice", "numListed", "numOwners"];
                                readonly properties: {
                                    readonly numMinted: {
                                        readonly type: "number";
                                        readonly description: "The number of assets minted for this collection";
                                    };
                                    readonly floorPrice: {
                                        readonly type: "number";
                                        readonly description: "The floor price of the collection";
                                    };
                                    readonly numListed: {
                                        readonly type: "number";
                                        readonly description: "The number of assets listed for this collection";
                                    };
                                    readonly numOwners: {
                                        readonly type: "number";
                                        readonly description: "The number of unique owners of assets in this collection";
                                    };
                                };
                            };
                        };
                        readonly required: readonly ["id", "name", "description", "environment", "imported", "created"];
                    };
                };
                readonly meta: {
                    readonly description: "Pagination related metadata";
                    readonly type: "object";
                    readonly required: readonly ["page", "perPage", "totalPages", "totalResults"];
                    readonly properties: {
                        readonly page: {
                            readonly type: "number";
                            readonly description: "The page number fetched";
                        };
                        readonly perPage: {
                            readonly type: "number";
                            readonly description: "The number of items in each page";
                        };
                        readonly totalPages: {
                            readonly type: "number";
                            readonly description: "The total number of pages in all results";
                        };
                        readonly totalResults: {
                            readonly type: "number";
                            readonly description: "The total result count";
                        };
                    };
                };
            };
            readonly required: readonly ["data", "meta"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const CollectionControllerGetAssets: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly collectionId: {
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Identifies the Asset Collection.";
                };
            };
            readonly required: readonly ["collectionId"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly page: {
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Specifies the page to fetch";
                };
                readonly perPage: {
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of items on each page";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-api-key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "API key for your game";
                };
            };
            readonly required: readonly ["x-api-key"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "array";
            readonly items: {
                readonly anyOf: readonly [{
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                            readonly enum: readonly ["UniqueAsset"];
                            readonly description: "Indicates that this `Item` is an `UniqueAsset`\n\n`UniqueAsset`";
                            readonly title: "UniqueAsset";
                            readonly examples: readonly ["UniqueAsset"];
                        };
                        readonly item: {
                            readonly description: "The unique asset";
                            readonly type: "object";
                            readonly required: readonly ["id", "created", "name", "description", "environment", "imported", "imageUrl", "status", "forSale", "mintAddress"];
                            readonly properties: {
                                readonly id: {
                                    readonly type: "string";
                                    readonly description: "The ID of the Asset";
                                };
                                readonly attributes: {
                                    readonly description: "The attributes of the Asset";
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "object";
                                        readonly required: readonly ["traitType", "value"];
                                        readonly properties: {
                                            readonly traitType: {
                                                readonly type: "string";
                                                readonly description: "The name of the trait";
                                            };
                                            readonly value: {
                                                readonly type: "string";
                                                readonly description: "The value of the trait";
                                            };
                                        };
                                    };
                                };
                                readonly created: {
                                    readonly type: "number";
                                    readonly description: "The date the Asset was created";
                                };
                                readonly name: {
                                    readonly type: "string";
                                    readonly description: "The name of the Asset";
                                };
                                readonly collection: {
                                    readonly description: "The collection the Asset belongs to";
                                    readonly type: "object";
                                    readonly required: readonly ["id", "name", "description", "environment", "imported", "created"];
                                    readonly properties: {
                                        readonly id: {
                                            readonly type: "string";
                                            readonly description: "The id of the collection. This is not an on-chain address, but instead an ID internal to GameShift";
                                        };
                                        readonly name: {
                                            readonly type: "string";
                                            readonly description: "The name given to the collection";
                                        };
                                        readonly description: {
                                            readonly type: "string";
                                            readonly description: "The description given to the collection";
                                        };
                                        readonly environment: {
                                            readonly type: "string";
                                            readonly description: "The collection's environment\n\n`Development` `Production`";
                                            readonly enum: readonly ["Development", "Production"];
                                        };
                                        readonly imageUrl: {
                                            readonly type: readonly ["string", "null"];
                                            readonly description: "The url of the image used to represent the collection";
                                        };
                                        readonly imported: {
                                            readonly type: "boolean";
                                            readonly description: "Whether the collection was imported";
                                        };
                                        readonly mintAddress: {
                                            readonly type: readonly ["string", "null"];
                                            readonly description: "The mint address of the collection on-chain";
                                        };
                                        readonly created: {
                                            readonly type: "number";
                                            readonly description: "Timestamp of collection creation";
                                        };
                                        readonly stats: {
                                            readonly description: "Statistics about the collection";
                                            readonly type: "object";
                                            readonly required: readonly ["numMinted", "floorPrice", "numListed", "numOwners"];
                                            readonly properties: {
                                                readonly numMinted: {
                                                    readonly type: "number";
                                                    readonly description: "The number of assets minted for this collection";
                                                };
                                                readonly floorPrice: {
                                                    readonly type: "number";
                                                    readonly description: "The floor price of the collection";
                                                };
                                                readonly numListed: {
                                                    readonly type: "number";
                                                    readonly description: "The number of assets listed for this collection";
                                                };
                                                readonly numOwners: {
                                                    readonly type: "number";
                                                    readonly description: "The number of unique owners of assets in this collection";
                                                };
                                            };
                                        };
                                    };
                                };
                                readonly description: {
                                    readonly type: "string";
                                    readonly description: "The description provided when the Asset was created";
                                };
                                readonly environment: {
                                    readonly type: "string";
                                    readonly description: "The asset's environment\n\n`Development` `Production`";
                                    readonly enum: readonly ["Development", "Production"];
                                };
                                readonly imported: {
                                    readonly type: "boolean";
                                    readonly description: "Indicates if the asset belongs to an imported collection";
                                };
                                readonly imageUrl: {
                                    readonly type: "string";
                                    readonly description: "The URI for the image representing the Asset";
                                };
                                readonly status: {
                                    readonly type: "string";
                                    readonly description: "The current status of the Asset\n\n`Uninitiated` `Unprocessed` `Processing` `Committed` `Failed`";
                                    readonly enum: readonly ["Uninitiated", "Unprocessed", "Processing", "Committed", "Failed"];
                                };
                                readonly forSale: {
                                    readonly type: "boolean";
                                    readonly description: "Indicates if the asset is currently for sale";
                                };
                                readonly mintAddress: {
                                    readonly type: "string";
                                    readonly description: "The address of the Asset on the blockchain";
                                };
                                readonly owner: {
                                    readonly description: "The current owner of the Asset.";
                                    readonly type: readonly ["object", "null"];
                                    readonly properties: {
                                        readonly address: {
                                            readonly type: readonly ["string", "null"];
                                            readonly description: "The wallet that currently holds this asset";
                                        };
                                        readonly referenceId: {
                                            readonly type: readonly ["string", "null"];
                                            readonly description: "The reference id associated with the wallet";
                                        };
                                    };
                                };
                                readonly price: {
                                    readonly type: readonly ["object", "null"];
                                    readonly description: "The price of the asset on the marketplace";
                                    readonly additionalProperties: true;
                                };
                            };
                        };
                    };
                    readonly required: readonly ["type", "item"];
                }];
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const CollectionControllerGetCollection: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly collectionId: {
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Identifies the Asset Collection.";
                };
            };
            readonly required: readonly ["collectionId"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly includeStats: {
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Include statistics about the collection.";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-api-key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "API key for your game";
                };
            };
            readonly required: readonly ["x-api-key"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly description: "The id of the collection. This is not an on-chain address, but instead an ID internal to GameShift";
                };
                readonly name: {
                    readonly type: "string";
                    readonly description: "The name given to the collection";
                };
                readonly description: {
                    readonly type: "string";
                    readonly description: "The description given to the collection";
                };
                readonly environment: {
                    readonly type: "string";
                    readonly description: "The collection's environment\n\n`Development` `Production`";
                    readonly enum: readonly ["Development", "Production"];
                };
                readonly imageUrl: {
                    readonly type: readonly ["string", "null"];
                    readonly description: "The url of the image used to represent the collection";
                };
                readonly imported: {
                    readonly type: "boolean";
                    readonly description: "Whether the collection was imported";
                };
                readonly mintAddress: {
                    readonly type: readonly ["string", "null"];
                    readonly description: "The mint address of the collection on-chain";
                };
                readonly created: {
                    readonly type: "number";
                    readonly description: "Timestamp of collection creation";
                };
                readonly stats: {
                    readonly description: "Statistics about the collection";
                    readonly type: "object";
                    readonly required: readonly ["numMinted", "floorPrice", "numListed", "numOwners"];
                    readonly properties: {
                        readonly numMinted: {
                            readonly type: "number";
                            readonly description: "The number of assets minted for this collection";
                        };
                        readonly floorPrice: {
                            readonly type: "number";
                            readonly description: "The floor price of the collection";
                        };
                        readonly numListed: {
                            readonly type: "number";
                            readonly description: "The number of assets listed for this collection";
                        };
                        readonly numOwners: {
                            readonly type: "number";
                            readonly description: "The number of unique owners of assets in this collection";
                        };
                    };
                };
            };
            readonly required: readonly ["id", "name", "description", "environment", "imported", "created"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const CollectionControllerImportCollection: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly collectionAddress: {
                readonly type: "string";
                readonly description: "The on-chain address for the collection";
            };
        };
        readonly required: readonly ["collectionAddress"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly "x-api-key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "API key for your game";
                };
            };
            readonly required: readonly ["x-api-key"];
        }];
    };
    readonly response: {
        readonly "201": {
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly description: "The id of the collection. This is not an on-chain address, but instead an ID internal to GameShift";
                };
                readonly name: {
                    readonly type: "string";
                    readonly description: "The name given to the collection";
                };
                readonly description: {
                    readonly type: "string";
                    readonly description: "The description given to the collection";
                };
                readonly environment: {
                    readonly type: "string";
                    readonly description: "The collection's environment\n\n`Development` `Production`";
                    readonly enum: readonly ["Development", "Production"];
                };
                readonly imageUrl: {
                    readonly type: readonly ["string", "null"];
                    readonly description: "The url of the image used to represent the collection";
                };
                readonly imported: {
                    readonly type: "boolean";
                    readonly description: "Whether the collection was imported";
                };
                readonly mintAddress: {
                    readonly type: readonly ["string", "null"];
                    readonly description: "The mint address of the collection on-chain";
                };
                readonly created: {
                    readonly type: "number";
                    readonly description: "Timestamp of collection creation";
                };
                readonly stats: {
                    readonly description: "Statistics about the collection";
                    readonly type: "object";
                    readonly required: readonly ["numMinted", "floorPrice", "numListed", "numOwners"];
                    readonly properties: {
                        readonly numMinted: {
                            readonly type: "number";
                            readonly description: "The number of assets minted for this collection";
                        };
                        readonly floorPrice: {
                            readonly type: "number";
                            readonly description: "The floor price of the collection";
                        };
                        readonly numListed: {
                            readonly type: "number";
                            readonly description: "The number of assets listed for this collection";
                        };
                        readonly numOwners: {
                            readonly type: "number";
                            readonly description: "The number of unique owners of assets in this collection";
                        };
                    };
                };
            };
            readonly required: readonly ["id", "name", "description", "environment", "imported", "created"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const CollectionControllerUnimport: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly collectionId: {
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Identifies the Asset Collection.";
                };
            };
            readonly required: readonly ["collectionId"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-api-key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "API key for your game";
                };
            };
            readonly required: readonly ["x-api-key"];
        }];
    };
    readonly response: {
        readonly "201": {
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly description: "The id of the collection. This is not an on-chain address, but instead an ID internal to GameShift";
                };
                readonly name: {
                    readonly type: "string";
                    readonly description: "The name given to the collection";
                };
                readonly description: {
                    readonly type: "string";
                    readonly description: "The description given to the collection";
                };
                readonly environment: {
                    readonly type: "string";
                    readonly description: "The collection's environment\n\n`Development` `Production`";
                    readonly enum: readonly ["Development", "Production"];
                };
                readonly imageUrl: {
                    readonly type: readonly ["string", "null"];
                    readonly description: "The url of the image used to represent the collection";
                };
                readonly imported: {
                    readonly type: "boolean";
                    readonly description: "Whether the collection was imported";
                };
                readonly mintAddress: {
                    readonly type: readonly ["string", "null"];
                    readonly description: "The mint address of the collection on-chain";
                };
                readonly created: {
                    readonly type: "number";
                    readonly description: "Timestamp of collection creation";
                };
                readonly stats: {
                    readonly description: "Statistics about the collection";
                    readonly type: "object";
                    readonly required: readonly ["numMinted", "floorPrice", "numListed", "numOwners"];
                    readonly properties: {
                        readonly numMinted: {
                            readonly type: "number";
                            readonly description: "The number of assets minted for this collection";
                        };
                        readonly floorPrice: {
                            readonly type: "number";
                            readonly description: "The floor price of the collection";
                        };
                        readonly numListed: {
                            readonly type: "number";
                            readonly description: "The number of assets listed for this collection";
                        };
                        readonly numOwners: {
                            readonly type: "number";
                            readonly description: "The number of unique owners of assets in this collection";
                        };
                    };
                };
            };
            readonly required: readonly ["id", "name", "description", "environment", "imported", "created"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const CraftingRecipesControllerCreate: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly craftingUserReferenceId: {
                readonly type: "string";
                readonly minLength: 1;
                readonly description: "Idetifies the user that will fulfill the crafting recipe.";
            };
            readonly metadata: {
                readonly description: "Optional metadata to add to the recipe.";
                readonly type: readonly ["object", "null"];
                readonly properties: {
                    readonly attributes: {
                        readonly description: "Associated attributes for the recipe.";
                        readonly type: readonly ["array", "null"];
                        readonly items: {
                            readonly type: "object";
                            readonly required: readonly ["traitType", "value"];
                            readonly properties: {
                                readonly traitType: {
                                    readonly type: "string";
                                    readonly description: "The name of the trait";
                                };
                                readonly value: {
                                    readonly type: "string";
                                    readonly description: "The value of the trait";
                                };
                            };
                        };
                    };
                    readonly title: {
                        readonly type: readonly ["string", "null"];
                        readonly description: "A title to display for the recipe.";
                    };
                    readonly description: {
                        readonly type: readonly ["string", "null"];
                        readonly description: "A description to display for the recipe.";
                    };
                    readonly image: {
                        readonly type: readonly ["string", "null"];
                        readonly description: "An image to display for the recipe.";
                    };
                };
            };
            readonly consumes: {
                readonly type: "array";
                readonly description: "What this recipe will consume.";
                readonly items: {
                    readonly anyOf: readonly [{
                        readonly type: "object";
                        readonly properties: {
                            readonly type: {
                                readonly type: "string";
                                readonly enum: readonly ["Currency"];
                                readonly description: "Specifies that this is a currency";
                            };
                            readonly id: {
                                readonly type: "string";
                                readonly minLength: 1;
                                readonly description: "Identifies the currency to consume";
                            };
                            readonly naturalAmount: {
                                readonly type: "string";
                                readonly description: "The amount of the currency to consume";
                            };
                        };
                        readonly required: readonly ["type", "id", "naturalAmount"];
                    }, {
                        readonly type: "object";
                        readonly properties: {
                            readonly type: {
                                readonly type: "string";
                                readonly enum: readonly ["StackableAsset"];
                                readonly description: "Specifies that this is a stackable asset";
                            };
                            readonly id: {
                                readonly type: "string";
                                readonly description: "Identifies the stackable asset to consume";
                            };
                            readonly naturalAmount: {
                                readonly type: "string";
                                readonly description: "The amount of the stackable asset to consume";
                            };
                        };
                        readonly required: readonly ["type", "id", "naturalAmount"];
                    }, {
                        readonly type: "object";
                        readonly properties: {
                            readonly type: {
                                readonly type: "string";
                                readonly enum: readonly ["UniqueAsset"];
                                readonly description: "Specifies that this is a unique asset.";
                            };
                            readonly id: {
                                readonly type: "string";
                                readonly description: "Identifies the unique asset to consume.";
                            };
                            readonly method: {
                                readonly enum: readonly ["Transfer", "Destroy"];
                                readonly type: readonly ["string", "null"];
                                readonly description: "(Optional) Determines how the unique asset will be consumed.";
                            };
                        };
                        readonly required: readonly ["type", "id"];
                    }];
                };
            };
        };
        readonly required: readonly ["craftingUserReferenceId", "consumes"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly "x-api-key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "API key for your game";
                };
            };
            readonly required: readonly ["x-api-key"];
        }];
    };
    readonly response: {
        readonly "201": {
            readonly type: "object";
            readonly properties: {
                readonly craftingRecipeId: {
                    readonly type: "string";
                    readonly description: "The id for the crafting recipe. Can be used to get the status of the recipe.";
                };
                readonly consentUrl: {
                    readonly type: "string";
                    readonly description: "The url the user must visit to provide consent and complete the recipe.";
                };
            };
            readonly required: readonly ["craftingRecipeId", "consentUrl"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const CraftingRecipesControllerGet: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly recipeId: {
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Identifies the crafting recipe";
                };
            };
            readonly required: readonly ["recipeId"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-api-key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "API key for your game";
                };
            };
            readonly required: readonly ["x-api-key"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly description: "Identifies the recipe.";
                };
                readonly consumes: {
                    readonly type: "array";
                    readonly description: "What this recipe will consume.";
                    readonly items: {
                        readonly anyOf: readonly [{
                            readonly type: "object";
                            readonly properties: {
                                readonly type: {
                                    readonly type: "string";
                                    readonly enum: readonly ["Currency"];
                                    readonly description: "Specifies that this is a currency\n\n`Currency`";
                                };
                                readonly id: {
                                    readonly type: "string";
                                    readonly minLength: 1;
                                    readonly description: "Identifies the currency to consume";
                                };
                                readonly naturalAmount: {
                                    readonly type: "string";
                                    readonly description: "The amount of the currency to consume";
                                };
                                readonly currency: {
                                    readonly description: "Details about the currency";
                                    readonly type: "object";
                                    readonly required: readonly ["id", "mintAddress", "name", "symbol"];
                                    readonly properties: {
                                        readonly id: {
                                            readonly type: "string";
                                            readonly description: "The ID for the currency";
                                        };
                                        readonly mintAddress: {
                                            readonly type: "string";
                                            readonly description: "The address for the currency's SPL token mint";
                                        };
                                        readonly name: {
                                            readonly type: "string";
                                            readonly description: "The name of the currency";
                                        };
                                        readonly symbol: {
                                            readonly type: "string";
                                            readonly description: "The currency's symbol";
                                        };
                                    };
                                };
                            };
                            readonly required: readonly ["type", "id", "naturalAmount", "currency"];
                        }, {
                            readonly type: "object";
                            readonly properties: {
                                readonly type: {
                                    readonly type: "string";
                                    readonly enum: readonly ["StackableAsset"];
                                    readonly description: "Specifies that this is a stackable asset\n\n`StackableAsset`";
                                };
                                readonly id: {
                                    readonly type: "string";
                                    readonly description: "Identifies the stackable asset to consume";
                                };
                                readonly naturalAmount: {
                                    readonly type: "string";
                                    readonly description: "The amount of the stackable asset to consume";
                                };
                            };
                            readonly required: readonly ["type", "id", "naturalAmount"];
                        }, {
                            readonly type: "object";
                            readonly properties: {
                                readonly type: {
                                    readonly type: "string";
                                    readonly enum: readonly ["UniqueAsset"];
                                    readonly description: "Specifies that this is a unique asset.\n\n`UniqueAsset`";
                                };
                                readonly id: {
                                    readonly type: "string";
                                    readonly description: "Identifies the unique asset to consume.";
                                };
                                readonly method: {
                                    readonly enum: readonly ["Transfer", "Destroy"];
                                    readonly type: readonly ["string", "null"];
                                    readonly description: "(Optional) Determines how the unique asset will be consumed.\n\n`Transfer` `Destroy`";
                                };
                                readonly uniqueAsset: {
                                    readonly description: "Details about the unique asset being consumed";
                                    readonly type: "object";
                                    readonly required: readonly ["id", "created", "name", "description", "environment", "imported", "imageUrl", "status", "forSale", "mintAddress"];
                                    readonly properties: {
                                        readonly id: {
                                            readonly type: "string";
                                            readonly description: "The ID of the Asset";
                                        };
                                        readonly attributes: {
                                            readonly description: "The attributes of the Asset";
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "object";
                                                readonly required: readonly ["traitType", "value"];
                                                readonly properties: {
                                                    readonly traitType: {
                                                        readonly type: "string";
                                                        readonly description: "The name of the trait";
                                                    };
                                                    readonly value: {
                                                        readonly type: "string";
                                                        readonly description: "The value of the trait";
                                                    };
                                                };
                                            };
                                        };
                                        readonly created: {
                                            readonly type: "number";
                                            readonly description: "The date the Asset was created";
                                        };
                                        readonly name: {
                                            readonly type: "string";
                                            readonly description: "The name of the Asset";
                                        };
                                        readonly collection: {
                                            readonly description: "The collection the Asset belongs to";
                                            readonly type: "object";
                                            readonly required: readonly ["id", "name", "description", "environment", "imported", "created"];
                                            readonly properties: {
                                                readonly id: {
                                                    readonly type: "string";
                                                    readonly description: "The id of the collection. This is not an on-chain address, but instead an ID internal to GameShift";
                                                };
                                                readonly name: {
                                                    readonly type: "string";
                                                    readonly description: "The name given to the collection";
                                                };
                                                readonly description: {
                                                    readonly type: "string";
                                                    readonly description: "The description given to the collection";
                                                };
                                                readonly environment: {
                                                    readonly type: "string";
                                                    readonly description: "The collection's environment\n\n`Development` `Production`";
                                                    readonly enum: readonly ["Development", "Production"];
                                                };
                                                readonly imageUrl: {
                                                    readonly type: readonly ["string", "null"];
                                                    readonly description: "The url of the image used to represent the collection";
                                                };
                                                readonly imported: {
                                                    readonly type: "boolean";
                                                    readonly description: "Whether the collection was imported";
                                                };
                                                readonly mintAddress: {
                                                    readonly type: readonly ["string", "null"];
                                                    readonly description: "The mint address of the collection on-chain";
                                                };
                                                readonly created: {
                                                    readonly type: "number";
                                                    readonly description: "Timestamp of collection creation";
                                                };
                                                readonly stats: {
                                                    readonly description: "Statistics about the collection";
                                                    readonly type: "object";
                                                    readonly required: readonly ["numMinted", "floorPrice", "numListed", "numOwners"];
                                                    readonly properties: {
                                                        readonly numMinted: {
                                                            readonly type: "number";
                                                            readonly description: "The number of assets minted for this collection";
                                                        };
                                                        readonly floorPrice: {
                                                            readonly type: "number";
                                                            readonly description: "The floor price of the collection";
                                                        };
                                                        readonly numListed: {
                                                            readonly type: "number";
                                                            readonly description: "The number of assets listed for this collection";
                                                        };
                                                        readonly numOwners: {
                                                            readonly type: "number";
                                                            readonly description: "The number of unique owners of assets in this collection";
                                                        };
                                                    };
                                                };
                                            };
                                        };
                                        readonly description: {
                                            readonly type: "string";
                                            readonly description: "The description provided when the Asset was created";
                                        };
                                        readonly environment: {
                                            readonly type: "string";
                                            readonly description: "The asset's environment\n\n`Development` `Production`";
                                            readonly enum: readonly ["Development", "Production"];
                                        };
                                        readonly imported: {
                                            readonly type: "boolean";
                                            readonly description: "Indicates if the asset belongs to an imported collection";
                                        };
                                        readonly imageUrl: {
                                            readonly type: "string";
                                            readonly description: "The URI for the image representing the Asset";
                                        };
                                        readonly status: {
                                            readonly type: "string";
                                            readonly description: "The current status of the Asset\n\n`Uninitiated` `Unprocessed` `Processing` `Committed` `Failed`";
                                            readonly enum: readonly ["Uninitiated", "Unprocessed", "Processing", "Committed", "Failed"];
                                        };
                                        readonly forSale: {
                                            readonly type: "boolean";
                                            readonly description: "Indicates if the asset is currently for sale";
                                        };
                                        readonly mintAddress: {
                                            readonly type: "string";
                                            readonly description: "The address of the Asset on the blockchain";
                                        };
                                        readonly owner: {
                                            readonly description: "The current owner of the Asset.";
                                            readonly type: readonly ["object", "null"];
                                            readonly properties: {
                                                readonly address: {
                                                    readonly type: readonly ["string", "null"];
                                                    readonly description: "The wallet that currently holds this asset";
                                                };
                                                readonly referenceId: {
                                                    readonly type: readonly ["string", "null"];
                                                    readonly description: "The reference id associated with the wallet";
                                                };
                                            };
                                        };
                                        readonly price: {
                                            readonly type: readonly ["object", "null"];
                                            readonly description: "The price of the asset on the marketplace";
                                            readonly additionalProperties: true;
                                        };
                                    };
                                };
                            };
                            readonly required: readonly ["type", "id", "uniqueAsset"];
                        }];
                    };
                };
                readonly craftingUserReferenceId: {
                    readonly type: "string";
                    readonly description: "Idetifies the user that will fulfill the crafting recipe.";
                };
                readonly metadata: {
                    readonly description: "Metadata to describe the recipe.";
                    readonly type: readonly ["object", "null"];
                    readonly properties: {
                        readonly attributes: {
                            readonly description: "Associated attributes for the recipe.";
                            readonly type: readonly ["array", "null"];
                            readonly items: {
                                readonly type: "object";
                                readonly required: readonly ["traitType", "value"];
                                readonly properties: {
                                    readonly traitType: {
                                        readonly type: "string";
                                        readonly description: "The name of the trait";
                                    };
                                    readonly value: {
                                        readonly type: "string";
                                        readonly description: "The value of the trait";
                                    };
                                };
                            };
                        };
                        readonly title: {
                            readonly type: readonly ["string", "null"];
                            readonly description: "A title to display for the recipe.";
                        };
                        readonly description: {
                            readonly type: readonly ["string", "null"];
                            readonly description: "A description to display for the recipe.";
                        };
                        readonly image: {
                            readonly type: readonly ["string", "null"];
                            readonly description: "An image to display for the recipe.";
                        };
                    };
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "The status of the recipe.\n\n`Pending` `Submitting` `Failed` `Completed` `PartiallyCompleted` `Expired`";
                    readonly enum: readonly ["Pending", "Submitting", "Failed", "Completed", "PartiallyCompleted", "Expired"];
                };
                readonly transactions: {
                    readonly description: "The transactions that are must be complete to fulfill the recipe.";
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly id: {
                                readonly type: "string";
                                readonly description: "Transaction ID";
                            };
                            readonly created: {
                                readonly type: "string";
                                readonly description: "Transaction creation date";
                                readonly format: "date-time";
                            };
                            readonly status: {
                                readonly description: "Transaction confirmation status";
                                readonly oneOf: readonly [{
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly status: {
                                            readonly type: "string";
                                            readonly enum: readonly ["Confirmed"];
                                            readonly description: "`Confirmed`";
                                        };
                                        readonly txHash: {
                                            readonly type: "string";
                                        };
                                    };
                                    readonly required: readonly ["status", "txHash"];
                                }, {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly status: {
                                            readonly type: "string";
                                            readonly enum: readonly ["Pending"];
                                            readonly description: "`Pending`";
                                        };
                                    };
                                    readonly required: readonly ["status"];
                                }, {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly status: {
                                            readonly type: "string";
                                            readonly enum: readonly ["Failed"];
                                            readonly description: "`Failed`";
                                        };
                                        readonly error: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "string";
                                            };
                                        };
                                    };
                                    readonly required: readonly ["status", "error"];
                                }, {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly status: {
                                            readonly type: "string";
                                            readonly enum: readonly ["Expired"];
                                            readonly description: "`Expired`";
                                        };
                                    };
                                    readonly required: readonly ["status"];
                                }];
                            };
                            readonly details: {
                                readonly description: "Transaction type and details about asset and balance changes";
                                readonly oneOf: readonly [{
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly type: {
                                            readonly type: "string";
                                            readonly enum: readonly ["BuyAsset", "BuyAssetWithCreditCard", "CancelAssetSale", "ChangeAssetPrice", "ListAssetSale", "TransferAsset", "TransferAssetFromDeveloper"];
                                            readonly description: "`BuyAsset` `BuyAssetWithCreditCard` `CancelAssetSale` `ChangeAssetPrice` `ListAssetSale` `TransferAsset` `TransferAssetFromDeveloper`";
                                        };
                                        readonly item: {
                                            readonly description: "Asset details";
                                            readonly type: "object";
                                            readonly required: readonly ["id", "created", "name", "description", "environment", "imported", "imageUrl", "status", "escrow", "mintAddress"];
                                            readonly properties: {
                                                readonly id: {
                                                    readonly type: "string";
                                                    readonly description: "The ID of the Asset";
                                                };
                                                readonly attributes: {
                                                    readonly description: "The attributes of the Asset";
                                                    readonly type: "array";
                                                    readonly items: {
                                                        readonly type: "object";
                                                        readonly required: readonly ["traitType", "value"];
                                                        readonly properties: {
                                                            readonly traitType: {
                                                                readonly type: "string";
                                                                readonly description: "The name of the trait";
                                                            };
                                                            readonly value: {
                                                                readonly type: "string";
                                                                readonly description: "The value of the trait";
                                                            };
                                                        };
                                                    };
                                                };
                                                readonly created: {
                                                    readonly type: "number";
                                                    readonly description: "The date the Asset was created";
                                                };
                                                readonly name: {
                                                    readonly type: "string";
                                                    readonly description: "The name of the Asset";
                                                };
                                                readonly collection: {
                                                    readonly description: "The collection the Asset belongs to";
                                                    readonly type: "object";
                                                    readonly required: readonly ["id", "name", "description", "environment", "imported", "created"];
                                                    readonly properties: {
                                                        readonly id: {
                                                            readonly type: "string";
                                                            readonly description: "The id of the collection. This is not an on-chain address, but instead an ID internal to GameShift";
                                                        };
                                                        readonly name: {
                                                            readonly type: "string";
                                                            readonly description: "The name given to the collection";
                                                        };
                                                        readonly description: {
                                                            readonly type: "string";
                                                            readonly description: "The description given to the collection";
                                                        };
                                                        readonly environment: {
                                                            readonly type: "string";
                                                            readonly description: "The collection's environment\n\n`Development` `Production`";
                                                            readonly enum: readonly ["Development", "Production"];
                                                        };
                                                        readonly imageUrl: {
                                                            readonly type: readonly ["string", "null"];
                                                            readonly description: "The url of the image used to represent the collection";
                                                        };
                                                        readonly imported: {
                                                            readonly type: "boolean";
                                                            readonly description: "Whether the collection was imported";
                                                        };
                                                        readonly mintAddress: {
                                                            readonly type: readonly ["string", "null"];
                                                            readonly description: "The mint address of the collection on-chain";
                                                        };
                                                        readonly created: {
                                                            readonly type: "number";
                                                            readonly description: "Timestamp of collection creation";
                                                        };
                                                        readonly stats: {
                                                            readonly description: "Statistics about the collection";
                                                            readonly type: "object";
                                                            readonly required: readonly ["numMinted", "floorPrice", "numListed", "numOwners"];
                                                            readonly properties: {
                                                                readonly numMinted: {
                                                                    readonly type: "number";
                                                                    readonly description: "The number of assets minted for this collection";
                                                                };
                                                                readonly floorPrice: {
                                                                    readonly type: "number";
                                                                    readonly description: "The floor price of the collection";
                                                                };
                                                                readonly numListed: {
                                                                    readonly type: "number";
                                                                    readonly description: "The number of assets listed for this collection";
                                                                };
                                                                readonly numOwners: {
                                                                    readonly type: "number";
                                                                    readonly description: "The number of unique owners of assets in this collection";
                                                                };
                                                            };
                                                        };
                                                    };
                                                };
                                                readonly description: {
                                                    readonly type: "string";
                                                    readonly description: "The description provided when the Asset was created";
                                                };
                                                readonly environment: {
                                                    readonly type: "string";
                                                    readonly description: "The asset's environment\n\n`Development` `Production`";
                                                    readonly enum: readonly ["Development", "Production"];
                                                };
                                                readonly imported: {
                                                    readonly type: "boolean";
                                                    readonly description: "Whether the Asset was imported";
                                                };
                                                readonly imageUrl: {
                                                    readonly type: "string";
                                                    readonly description: "The URI for the image representing the Asset";
                                                };
                                                readonly status: {
                                                    readonly type: "string";
                                                    readonly description: "The current status of the Asset\n\n`Uninitiated` `Unprocessed` `Processing` `Committed` `Failed`";
                                                    readonly enum: readonly ["Uninitiated", "Unprocessed", "Processing", "Committed", "Failed"];
                                                };
                                                readonly escrow: {
                                                    readonly type: "boolean";
                                                    readonly description: "If the asset is in escrow or not";
                                                };
                                                readonly mintAddress: {
                                                    readonly type: "string";
                                                    readonly description: "The address of the Asset on the blockchain";
                                                };
                                                readonly owner: {
                                                    readonly description: "The current owner of the Asset.";
                                                    readonly type: readonly ["object", "null"];
                                                    readonly properties: {
                                                        readonly address: {
                                                            readonly type: readonly ["string", "null"];
                                                            readonly description: "The wallet that currently holds this asset";
                                                        };
                                                        readonly referenceId: {
                                                            readonly type: readonly ["string", "null"];
                                                            readonly description: "The reference id associated with the wallet";
                                                        };
                                                    };
                                                };
                                                readonly priceCents: {
                                                    readonly type: readonly ["number", "null"];
                                                    readonly description: "The price of the asset on the marketplace in cents";
                                                };
                                            };
                                        };
                                    };
                                    readonly required: readonly ["type", "item"];
                                }, {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly type: {
                                            readonly type: "string";
                                            readonly enum: readonly ["TransferToken", "TransferTokenFromDeveloper"];
                                            readonly description: "`TransferToken` `TransferTokenFromDeveloper`";
                                        };
                                        readonly item: {
                                            readonly description: "Token details";
                                            readonly type: "object";
                                            readonly required: readonly ["id", "mintAddress", "name", "symbol"];
                                            readonly properties: {
                                                readonly id: {
                                                    readonly type: "string";
                                                    readonly description: "The ID for the currency";
                                                };
                                                readonly mintAddress: {
                                                    readonly type: "string";
                                                    readonly description: "The address for the currency's SPL token mint";
                                                };
                                                readonly name: {
                                                    readonly type: "string";
                                                    readonly description: "The name of the currency";
                                                };
                                                readonly symbol: {
                                                    readonly type: "string";
                                                    readonly description: "The currency's symbol";
                                                };
                                            };
                                        };
                                    };
                                    readonly required: readonly ["type", "item"];
                                }, {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly type: {
                                            readonly type: "string";
                                            readonly enum: readonly ["TransferStackableAsset", "TransferStackableAssetFromDeveloper"];
                                            readonly description: "`TransferStackableAsset` `TransferStackableAssetFromDeveloper`";
                                        };
                                        readonly item: {
                                            readonly description: "StackableAsset details";
                                            readonly type: "object";
                                            readonly required: readonly ["id", "created", "name", "description", "environment", "imageUrl", "status"];
                                            readonly properties: {
                                                readonly id: {
                                                    readonly type: "string";
                                                    readonly description: "The ID of the Stackable Asset";
                                                };
                                                readonly attributes: {
                                                    readonly description: "Add attributes to your Asset";
                                                    readonly type: "array";
                                                    readonly items: {
                                                        readonly type: "object";
                                                        readonly required: readonly ["traitType", "value"];
                                                        readonly properties: {
                                                            readonly traitType: {
                                                                readonly type: "string";
                                                                readonly description: "The name of the trait";
                                                            };
                                                            readonly value: {
                                                                readonly type: "string";
                                                                readonly description: "The value of the trait";
                                                            };
                                                        };
                                                    };
                                                };
                                                readonly created: {
                                                    readonly type: "number";
                                                    readonly description: "The date the Asset was created";
                                                };
                                                readonly name: {
                                                    readonly type: "string";
                                                    readonly description: "The name of the Stackable Asset. Max length: 32 chars";
                                                    readonly maxLength: 32;
                                                };
                                                readonly symbol: {
                                                    readonly type: "string";
                                                    readonly description: "The symbol of the Stackable Asset. Max length: 5 chars";
                                                    readonly maxLength: 5;
                                                };
                                                readonly description: {
                                                    readonly type: "string";
                                                    readonly description: "A description for the Asset";
                                                    readonly maxLength: 64;
                                                };
                                                readonly collection: {
                                                    readonly description: "The collection the Asset belongs to";
                                                    readonly type: "object";
                                                    readonly required: readonly ["id", "name", "description", "environment", "imported", "created"];
                                                    readonly properties: {
                                                        readonly id: {
                                                            readonly type: "string";
                                                            readonly description: "The id of the collection. This is not an on-chain address, but instead an ID internal to GameShift";
                                                        };
                                                        readonly name: {
                                                            readonly type: "string";
                                                            readonly description: "The name given to the collection";
                                                        };
                                                        readonly description: {
                                                            readonly type: "string";
                                                            readonly description: "The description given to the collection";
                                                        };
                                                        readonly environment: {
                                                            readonly type: "string";
                                                            readonly description: "The collection's environment\n\n`Development` `Production`";
                                                            readonly enum: readonly ["Development", "Production"];
                                                        };
                                                        readonly imageUrl: {
                                                            readonly type: readonly ["string", "null"];
                                                            readonly description: "The url of the image used to represent the collection";
                                                        };
                                                        readonly imported: {
                                                            readonly type: "boolean";
                                                            readonly description: "Whether the collection was imported";
                                                        };
                                                        readonly mintAddress: {
                                                            readonly type: readonly ["string", "null"];
                                                            readonly description: "The mint address of the collection on-chain";
                                                        };
                                                        readonly created: {
                                                            readonly type: "number";
                                                            readonly description: "Timestamp of collection creation";
                                                        };
                                                        readonly stats: {
                                                            readonly description: "Statistics about the collection";
                                                            readonly type: "object";
                                                            readonly required: readonly ["numMinted", "floorPrice", "numListed", "numOwners"];
                                                            readonly properties: {
                                                                readonly numMinted: {
                                                                    readonly type: "number";
                                                                    readonly description: "The number of assets minted for this collection";
                                                                };
                                                                readonly floorPrice: {
                                                                    readonly type: "number";
                                                                    readonly description: "The floor price of the collection";
                                                                };
                                                                readonly numListed: {
                                                                    readonly type: "number";
                                                                    readonly description: "The number of assets listed for this collection";
                                                                };
                                                                readonly numOwners: {
                                                                    readonly type: "number";
                                                                    readonly description: "The number of unique owners of assets in this collection";
                                                                };
                                                            };
                                                        };
                                                    };
                                                };
                                                readonly environment: {
                                                    readonly type: "string";
                                                    readonly description: "The asset's environment\n\n`Development` `Production`";
                                                    readonly enum: readonly ["Development", "Production"];
                                                };
                                                readonly imageUrl: {
                                                    readonly type: "string";
                                                    readonly description: "A url to the image underlying the Asset";
                                                };
                                                readonly status: {
                                                    readonly type: "string";
                                                    readonly description: "The current status of the Asset\n\n`Uninitiated` `Unprocessed` `Processing` `Committed` `Failed`";
                                                    readonly enum: readonly ["Uninitiated", "Unprocessed", "Processing", "Committed", "Failed"];
                                                };
                                                readonly mintAddress: {
                                                    readonly type: "string";
                                                    readonly description: "The address of the Asset on the blockchain";
                                                };
                                            };
                                        };
                                    };
                                    readonly required: readonly ["type", "item"];
                                }, {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly type: {
                                            readonly type: "string";
                                            readonly enum: readonly ["AbitraryTransaction"];
                                            readonly description: "`AbitraryTransaction`";
                                        };
                                    };
                                    readonly required: readonly ["type"];
                                }, {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly type: {
                                            readonly type: "string";
                                            readonly enum: readonly ["Withdraw"];
                                            readonly description: "`Withdraw`";
                                        };
                                    };
                                    readonly required: readonly ["type"];
                                }];
                            };
                        };
                        readonly required: readonly ["id", "created", "status", "details"];
                    };
                };
            };
            readonly required: readonly ["id", "consumes", "craftingUserReferenceId", "status", "transactions"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const CraftingRecipesControllerGetAll: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly page: {
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Specifies the page to fetch";
                };
                readonly perPage: {
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of items on each page";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-api-key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "API key for your game";
                };
            };
            readonly required: readonly ["x-api-key"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly description: "A list of Crafting Recipes";
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly id: {
                                readonly type: "string";
                                readonly description: "Identifies the recipe.";
                            };
                            readonly consumes: {
                                readonly type: "array";
                                readonly description: "What this recipe will consume.";
                                readonly items: {
                                    readonly anyOf: readonly [{
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly type: {
                                                readonly type: "string";
                                                readonly enum: readonly ["Currency"];
                                                readonly description: "Specifies that this is a currency\n\n`Currency`";
                                            };
                                            readonly id: {
                                                readonly type: "string";
                                                readonly minLength: 1;
                                                readonly description: "Identifies the currency to consume";
                                            };
                                            readonly naturalAmount: {
                                                readonly type: "string";
                                                readonly description: "The amount of the currency to consume";
                                            };
                                            readonly currency: {
                                                readonly description: "Details about the currency";
                                                readonly type: "object";
                                                readonly required: readonly ["id", "mintAddress", "name", "symbol"];
                                                readonly properties: {
                                                    readonly id: {
                                                        readonly type: "string";
                                                        readonly description: "The ID for the currency";
                                                    };
                                                    readonly mintAddress: {
                                                        readonly type: "string";
                                                        readonly description: "The address for the currency's SPL token mint";
                                                    };
                                                    readonly name: {
                                                        readonly type: "string";
                                                        readonly description: "The name of the currency";
                                                    };
                                                    readonly symbol: {
                                                        readonly type: "string";
                                                        readonly description: "The currency's symbol";
                                                    };
                                                };
                                            };
                                        };
                                        readonly required: readonly ["type", "id", "naturalAmount", "currency"];
                                    }, {
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly type: {
                                                readonly type: "string";
                                                readonly enum: readonly ["StackableAsset"];
                                                readonly description: "Specifies that this is a stackable asset\n\n`StackableAsset`";
                                            };
                                            readonly id: {
                                                readonly type: "string";
                                                readonly description: "Identifies the stackable asset to consume";
                                            };
                                            readonly naturalAmount: {
                                                readonly type: "string";
                                                readonly description: "The amount of the stackable asset to consume";
                                            };
                                        };
                                        readonly required: readonly ["type", "id", "naturalAmount"];
                                    }, {
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly type: {
                                                readonly type: "string";
                                                readonly enum: readonly ["UniqueAsset"];
                                                readonly description: "Specifies that this is a unique asset.\n\n`UniqueAsset`";
                                            };
                                            readonly id: {
                                                readonly type: "string";
                                                readonly description: "Identifies the unique asset to consume.";
                                            };
                                            readonly method: {
                                                readonly enum: readonly ["Transfer", "Destroy"];
                                                readonly type: readonly ["string", "null"];
                                                readonly description: "(Optional) Determines how the unique asset will be consumed.\n\n`Transfer` `Destroy`";
                                            };
                                            readonly uniqueAsset: {
                                                readonly description: "Details about the unique asset being consumed";
                                                readonly type: "object";
                                                readonly required: readonly ["id", "created", "name", "description", "environment", "imported", "imageUrl", "status", "forSale", "mintAddress"];
                                                readonly properties: {
                                                    readonly id: {
                                                        readonly type: "string";
                                                        readonly description: "The ID of the Asset";
                                                    };
                                                    readonly attributes: {
                                                        readonly description: "The attributes of the Asset";
                                                        readonly type: "array";
                                                        readonly items: {
                                                            readonly type: "object";
                                                            readonly required: readonly ["traitType", "value"];
                                                            readonly properties: {
                                                                readonly traitType: {
                                                                    readonly type: "string";
                                                                    readonly description: "The name of the trait";
                                                                };
                                                                readonly value: {
                                                                    readonly type: "string";
                                                                    readonly description: "The value of the trait";
                                                                };
                                                            };
                                                        };
                                                    };
                                                    readonly created: {
                                                        readonly type: "number";
                                                        readonly description: "The date the Asset was created";
                                                    };
                                                    readonly name: {
                                                        readonly type: "string";
                                                        readonly description: "The name of the Asset";
                                                    };
                                                    readonly collection: {
                                                        readonly description: "The collection the Asset belongs to";
                                                        readonly type: "object";
                                                        readonly required: readonly ["id", "name", "description", "environment", "imported", "created"];
                                                        readonly properties: {
                                                            readonly id: {
                                                                readonly type: "string";
                                                                readonly description: "The id of the collection. This is not an on-chain address, but instead an ID internal to GameShift";
                                                            };
                                                            readonly name: {
                                                                readonly type: "string";
                                                                readonly description: "The name given to the collection";
                                                            };
                                                            readonly description: {
                                                                readonly type: "string";
                                                                readonly description: "The description given to the collection";
                                                            };
                                                            readonly environment: {
                                                                readonly type: "string";
                                                                readonly description: "The collection's environment\n\n`Development` `Production`";
                                                                readonly enum: readonly ["Development", "Production"];
                                                            };
                                                            readonly imageUrl: {
                                                                readonly type: readonly ["string", "null"];
                                                                readonly description: "The url of the image used to represent the collection";
                                                            };
                                                            readonly imported: {
                                                                readonly type: "boolean";
                                                                readonly description: "Whether the collection was imported";
                                                            };
                                                            readonly mintAddress: {
                                                                readonly type: readonly ["string", "null"];
                                                                readonly description: "The mint address of the collection on-chain";
                                                            };
                                                            readonly created: {
                                                                readonly type: "number";
                                                                readonly description: "Timestamp of collection creation";
                                                            };
                                                            readonly stats: {
                                                                readonly description: "Statistics about the collection";
                                                                readonly type: "object";
                                                                readonly required: readonly ["numMinted", "floorPrice", "numListed", "numOwners"];
                                                                readonly properties: {
                                                                    readonly numMinted: {
                                                                        readonly type: "number";
                                                                        readonly description: "The number of assets minted for this collection";
                                                                    };
                                                                    readonly floorPrice: {
                                                                        readonly type: "number";
                                                                        readonly description: "The floor price of the collection";
                                                                    };
                                                                    readonly numListed: {
                                                                        readonly type: "number";
                                                                        readonly description: "The number of assets listed for this collection";
                                                                    };
                                                                    readonly numOwners: {
                                                                        readonly type: "number";
                                                                        readonly description: "The number of unique owners of assets in this collection";
                                                                    };
                                                                };
                                                            };
                                                        };
                                                    };
                                                    readonly description: {
                                                        readonly type: "string";
                                                        readonly description: "The description provided when the Asset was created";
                                                    };
                                                    readonly environment: {
                                                        readonly type: "string";
                                                        readonly description: "The asset's environment\n\n`Development` `Production`";
                                                        readonly enum: readonly ["Development", "Production"];
                                                    };
                                                    readonly imported: {
                                                        readonly type: "boolean";
                                                        readonly description: "Indicates if the asset belongs to an imported collection";
                                                    };
                                                    readonly imageUrl: {
                                                        readonly type: "string";
                                                        readonly description: "The URI for the image representing the Asset";
                                                    };
                                                    readonly status: {
                                                        readonly type: "string";
                                                        readonly description: "The current status of the Asset\n\n`Uninitiated` `Unprocessed` `Processing` `Committed` `Failed`";
                                                        readonly enum: readonly ["Uninitiated", "Unprocessed", "Processing", "Committed", "Failed"];
                                                    };
                                                    readonly forSale: {
                                                        readonly type: "boolean";
                                                        readonly description: "Indicates if the asset is currently for sale";
                                                    };
                                                    readonly mintAddress: {
                                                        readonly type: "string";
                                                        readonly description: "The address of the Asset on the blockchain";
                                                    };
                                                    readonly owner: {
                                                        readonly description: "The current owner of the Asset.";
                                                        readonly type: readonly ["object", "null"];
                                                        readonly properties: {
                                                            readonly address: {
                                                                readonly type: readonly ["string", "null"];
                                                                readonly description: "The wallet that currently holds this asset";
                                                            };
                                                            readonly referenceId: {
                                                                readonly type: readonly ["string", "null"];
                                                                readonly description: "The reference id associated with the wallet";
                                                            };
                                                        };
                                                    };
                                                    readonly price: {
                                                        readonly type: readonly ["object", "null"];
                                                        readonly description: "The price of the asset on the marketplace";
                                                        readonly additionalProperties: true;
                                                    };
                                                };
                                            };
                                        };
                                        readonly required: readonly ["type", "id", "uniqueAsset"];
                                    }];
                                };
                            };
                            readonly craftingUserReferenceId: {
                                readonly type: "string";
                                readonly description: "Idetifies the user that will fulfill the crafting recipe.";
                            };
                            readonly metadata: {
                                readonly description: "Metadata to describe the recipe.";
                                readonly type: readonly ["object", "null"];
                                readonly properties: {
                                    readonly attributes: {
                                        readonly description: "Associated attributes for the recipe.";
                                        readonly type: readonly ["array", "null"];
                                        readonly items: {
                                            readonly type: "object";
                                            readonly required: readonly ["traitType", "value"];
                                            readonly properties: {
                                                readonly traitType: {
                                                    readonly type: "string";
                                                    readonly description: "The name of the trait";
                                                };
                                                readonly value: {
                                                    readonly type: "string";
                                                    readonly description: "The value of the trait";
                                                };
                                            };
                                        };
                                    };
                                    readonly title: {
                                        readonly type: readonly ["string", "null"];
                                        readonly description: "A title to display for the recipe.";
                                    };
                                    readonly description: {
                                        readonly type: readonly ["string", "null"];
                                        readonly description: "A description to display for the recipe.";
                                    };
                                    readonly image: {
                                        readonly type: readonly ["string", "null"];
                                        readonly description: "An image to display for the recipe.";
                                    };
                                };
                            };
                            readonly status: {
                                readonly type: "string";
                                readonly description: "The status of the recipe.\n\n`Pending` `Submitting` `Failed` `Completed` `PartiallyCompleted` `Expired`";
                                readonly enum: readonly ["Pending", "Submitting", "Failed", "Completed", "PartiallyCompleted", "Expired"];
                            };
                            readonly transactions: {
                                readonly description: "The transactions that are must be complete to fulfill the recipe.";
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly id: {
                                            readonly type: "string";
                                            readonly description: "Transaction ID";
                                        };
                                        readonly created: {
                                            readonly type: "string";
                                            readonly description: "Transaction creation date";
                                            readonly format: "date-time";
                                        };
                                        readonly status: {
                                            readonly description: "Transaction confirmation status";
                                            readonly oneOf: readonly [{
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly status: {
                                                        readonly type: "string";
                                                        readonly enum: readonly ["Confirmed"];
                                                        readonly description: "`Confirmed`";
                                                    };
                                                    readonly txHash: {
                                                        readonly type: "string";
                                                    };
                                                };
                                                readonly required: readonly ["status", "txHash"];
                                            }, {
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly status: {
                                                        readonly type: "string";
                                                        readonly enum: readonly ["Pending"];
                                                        readonly description: "`Pending`";
                                                    };
                                                };
                                                readonly required: readonly ["status"];
                                            }, {
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly status: {
                                                        readonly type: "string";
                                                        readonly enum: readonly ["Failed"];
                                                        readonly description: "`Failed`";
                                                    };
                                                    readonly error: {
                                                        readonly type: "array";
                                                        readonly items: {
                                                            readonly type: "string";
                                                        };
                                                    };
                                                };
                                                readonly required: readonly ["status", "error"];
                                            }, {
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly status: {
                                                        readonly type: "string";
                                                        readonly enum: readonly ["Expired"];
                                                        readonly description: "`Expired`";
                                                    };
                                                };
                                                readonly required: readonly ["status"];
                                            }];
                                        };
                                        readonly details: {
                                            readonly description: "Transaction type and details about asset and balance changes";
                                            readonly oneOf: readonly [{
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly type: {
                                                        readonly type: "string";
                                                        readonly enum: readonly ["BuyAsset", "BuyAssetWithCreditCard", "CancelAssetSale", "ChangeAssetPrice", "ListAssetSale", "TransferAsset", "TransferAssetFromDeveloper"];
                                                        readonly description: "`BuyAsset` `BuyAssetWithCreditCard` `CancelAssetSale` `ChangeAssetPrice` `ListAssetSale` `TransferAsset` `TransferAssetFromDeveloper`";
                                                    };
                                                    readonly item: {
                                                        readonly description: "Asset details";
                                                        readonly type: "object";
                                                        readonly required: readonly ["id", "created", "name", "description", "environment", "imported", "imageUrl", "status", "escrow", "mintAddress"];
                                                        readonly properties: {
                                                            readonly id: {
                                                                readonly type: "string";
                                                                readonly description: "The ID of the Asset";
                                                            };
                                                            readonly attributes: {
                                                                readonly description: "The attributes of the Asset";
                                                                readonly type: "array";
                                                                readonly items: {
                                                                    readonly type: "object";
                                                                    readonly required: readonly ["traitType", "value"];
                                                                    readonly properties: {
                                                                        readonly traitType: {
                                                                            readonly type: "string";
                                                                            readonly description: "The name of the trait";
                                                                        };
                                                                        readonly value: {
                                                                            readonly type: "string";
                                                                            readonly description: "The value of the trait";
                                                                        };
                                                                    };
                                                                };
                                                            };
                                                            readonly created: {
                                                                readonly type: "number";
                                                                readonly description: "The date the Asset was created";
                                                            };
                                                            readonly name: {
                                                                readonly type: "string";
                                                                readonly description: "The name of the Asset";
                                                            };
                                                            readonly collection: {
                                                                readonly description: "The collection the Asset belongs to";
                                                                readonly type: "object";
                                                                readonly required: readonly ["id", "name", "description", "environment", "imported", "created"];
                                                                readonly properties: {
                                                                    readonly id: {
                                                                        readonly type: "string";
                                                                        readonly description: "The id of the collection. This is not an on-chain address, but instead an ID internal to GameShift";
                                                                    };
                                                                    readonly name: {
                                                                        readonly type: "string";
                                                                        readonly description: "The name given to the collection";
                                                                    };
                                                                    readonly description: {
                                                                        readonly type: "string";
                                                                        readonly description: "The description given to the collection";
                                                                    };
                                                                    readonly environment: {
                                                                        readonly type: "string";
                                                                        readonly description: "The collection's environment\n\n`Development` `Production`";
                                                                        readonly enum: readonly ["Development", "Production"];
                                                                    };
                                                                    readonly imageUrl: {
                                                                        readonly type: readonly ["string", "null"];
                                                                        readonly description: "The url of the image used to represent the collection";
                                                                    };
                                                                    readonly imported: {
                                                                        readonly type: "boolean";
                                                                        readonly description: "Whether the collection was imported";
                                                                    };
                                                                    readonly mintAddress: {
                                                                        readonly type: readonly ["string", "null"];
                                                                        readonly description: "The mint address of the collection on-chain";
                                                                    };
                                                                    readonly created: {
                                                                        readonly type: "number";
                                                                        readonly description: "Timestamp of collection creation";
                                                                    };
                                                                    readonly stats: {
                                                                        readonly description: "Statistics about the collection";
                                                                        readonly type: "object";
                                                                        readonly required: readonly ["numMinted", "floorPrice", "numListed", "numOwners"];
                                                                        readonly properties: {
                                                                            readonly numMinted: {
                                                                                readonly type: "number";
                                                                                readonly description: "The number of assets minted for this collection";
                                                                            };
                                                                            readonly floorPrice: {
                                                                                readonly type: "number";
                                                                                readonly description: "The floor price of the collection";
                                                                            };
                                                                            readonly numListed: {
                                                                                readonly type: "number";
                                                                                readonly description: "The number of assets listed for this collection";
                                                                            };
                                                                            readonly numOwners: {
                                                                                readonly type: "number";
                                                                                readonly description: "The number of unique owners of assets in this collection";
                                                                            };
                                                                        };
                                                                    };
                                                                };
                                                            };
                                                            readonly description: {
                                                                readonly type: "string";
                                                                readonly description: "The description provided when the Asset was created";
                                                            };
                                                            readonly environment: {
                                                                readonly type: "string";
                                                                readonly description: "The asset's environment\n\n`Development` `Production`";
                                                                readonly enum: readonly ["Development", "Production"];
                                                            };
                                                            readonly imported: {
                                                                readonly type: "boolean";
                                                                readonly description: "Whether the Asset was imported";
                                                            };
                                                            readonly imageUrl: {
                                                                readonly type: "string";
                                                                readonly description: "The URI for the image representing the Asset";
                                                            };
                                                            readonly status: {
                                                                readonly type: "string";
                                                                readonly description: "The current status of the Asset\n\n`Uninitiated` `Unprocessed` `Processing` `Committed` `Failed`";
                                                                readonly enum: readonly ["Uninitiated", "Unprocessed", "Processing", "Committed", "Failed"];
                                                            };
                                                            readonly escrow: {
                                                                readonly type: "boolean";
                                                                readonly description: "If the asset is in escrow or not";
                                                            };
                                                            readonly mintAddress: {
                                                                readonly type: "string";
                                                                readonly description: "The address of the Asset on the blockchain";
                                                            };
                                                            readonly owner: {
                                                                readonly description: "The current owner of the Asset.";
                                                                readonly type: readonly ["object", "null"];
                                                                readonly properties: {
                                                                    readonly address: {
                                                                        readonly type: readonly ["string", "null"];
                                                                        readonly description: "The wallet that currently holds this asset";
                                                                    };
                                                                    readonly referenceId: {
                                                                        readonly type: readonly ["string", "null"];
                                                                        readonly description: "The reference id associated with the wallet";
                                                                    };
                                                                };
                                                            };
                                                            readonly priceCents: {
                                                                readonly type: readonly ["number", "null"];
                                                                readonly description: "The price of the asset on the marketplace in cents";
                                                            };
                                                        };
                                                    };
                                                };
                                                readonly required: readonly ["type", "item"];
                                            }, {
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly type: {
                                                        readonly type: "string";
                                                        readonly enum: readonly ["TransferToken", "TransferTokenFromDeveloper"];
                                                        readonly description: "`TransferToken` `TransferTokenFromDeveloper`";
                                                    };
                                                    readonly item: {
                                                        readonly description: "Token details";
                                                        readonly type: "object";
                                                        readonly required: readonly ["id", "mintAddress", "name", "symbol"];
                                                        readonly properties: {
                                                            readonly id: {
                                                                readonly type: "string";
                                                                readonly description: "The ID for the currency";
                                                            };
                                                            readonly mintAddress: {
                                                                readonly type: "string";
                                                                readonly description: "The address for the currency's SPL token mint";
                                                            };
                                                            readonly name: {
                                                                readonly type: "string";
                                                                readonly description: "The name of the currency";
                                                            };
                                                            readonly symbol: {
                                                                readonly type: "string";
                                                                readonly description: "The currency's symbol";
                                                            };
                                                        };
                                                    };
                                                };
                                                readonly required: readonly ["type", "item"];
                                            }, {
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly type: {
                                                        readonly type: "string";
                                                        readonly enum: readonly ["TransferStackableAsset", "TransferStackableAssetFromDeveloper"];
                                                        readonly description: "`TransferStackableAsset` `TransferStackableAssetFromDeveloper`";
                                                    };
                                                    readonly item: {
                                                        readonly description: "StackableAsset details";
                                                        readonly type: "object";
                                                        readonly required: readonly ["id", "created", "name", "description", "environment", "imageUrl", "status"];
                                                        readonly properties: {
                                                            readonly id: {
                                                                readonly type: "string";
                                                                readonly description: "The ID of the Stackable Asset";
                                                            };
                                                            readonly attributes: {
                                                                readonly description: "Add attributes to your Asset";
                                                                readonly type: "array";
                                                                readonly items: {
                                                                    readonly type: "object";
                                                                    readonly required: readonly ["traitType", "value"];
                                                                    readonly properties: {
                                                                        readonly traitType: {
                                                                            readonly type: "string";
                                                                            readonly description: "The name of the trait";
                                                                        };
                                                                        readonly value: {
                                                                            readonly type: "string";
                                                                            readonly description: "The value of the trait";
                                                                        };
                                                                    };
                                                                };
                                                            };
                                                            readonly created: {
                                                                readonly type: "number";
                                                                readonly description: "The date the Asset was created";
                                                            };
                                                            readonly name: {
                                                                readonly type: "string";
                                                                readonly description: "The name of the Stackable Asset. Max length: 32 chars";
                                                                readonly maxLength: 32;
                                                            };
                                                            readonly symbol: {
                                                                readonly type: "string";
                                                                readonly description: "The symbol of the Stackable Asset. Max length: 5 chars";
                                                                readonly maxLength: 5;
                                                            };
                                                            readonly description: {
                                                                readonly type: "string";
                                                                readonly description: "A description for the Asset";
                                                                readonly maxLength: 64;
                                                            };
                                                            readonly collection: {
                                                                readonly description: "The collection the Asset belongs to";
                                                                readonly type: "object";
                                                                readonly required: readonly ["id", "name", "description", "environment", "imported", "created"];
                                                                readonly properties: {
                                                                    readonly id: {
                                                                        readonly type: "string";
                                                                        readonly description: "The id of the collection. This is not an on-chain address, but instead an ID internal to GameShift";
                                                                    };
                                                                    readonly name: {
                                                                        readonly type: "string";
                                                                        readonly description: "The name given to the collection";
                                                                    };
                                                                    readonly description: {
                                                                        readonly type: "string";
                                                                        readonly description: "The description given to the collection";
                                                                    };
                                                                    readonly environment: {
                                                                        readonly type: "string";
                                                                        readonly description: "The collection's environment\n\n`Development` `Production`";
                                                                        readonly enum: readonly ["Development", "Production"];
                                                                    };
                                                                    readonly imageUrl: {
                                                                        readonly type: readonly ["string", "null"];
                                                                        readonly description: "The url of the image used to represent the collection";
                                                                    };
                                                                    readonly imported: {
                                                                        readonly type: "boolean";
                                                                        readonly description: "Whether the collection was imported";
                                                                    };
                                                                    readonly mintAddress: {
                                                                        readonly type: readonly ["string", "null"];
                                                                        readonly description: "The mint address of the collection on-chain";
                                                                    };
                                                                    readonly created: {
                                                                        readonly type: "number";
                                                                        readonly description: "Timestamp of collection creation";
                                                                    };
                                                                    readonly stats: {
                                                                        readonly description: "Statistics about the collection";
                                                                        readonly type: "object";
                                                                        readonly required: readonly ["numMinted", "floorPrice", "numListed", "numOwners"];
                                                                        readonly properties: {
                                                                            readonly numMinted: {
                                                                                readonly type: "number";
                                                                                readonly description: "The number of assets minted for this collection";
                                                                            };
                                                                            readonly floorPrice: {
                                                                                readonly type: "number";
                                                                                readonly description: "The floor price of the collection";
                                                                            };
                                                                            readonly numListed: {
                                                                                readonly type: "number";
                                                                                readonly description: "The number of assets listed for this collection";
                                                                            };
                                                                            readonly numOwners: {
                                                                                readonly type: "number";
                                                                                readonly description: "The number of unique owners of assets in this collection";
                                                                            };
                                                                        };
                                                                    };
                                                                };
                                                            };
                                                            readonly environment: {
                                                                readonly type: "string";
                                                                readonly description: "The asset's environment\n\n`Development` `Production`";
                                                                readonly enum: readonly ["Development", "Production"];
                                                            };
                                                            readonly imageUrl: {
                                                                readonly type: "string";
                                                                readonly description: "A url to the image underlying the Asset";
                                                            };
                                                            readonly status: {
                                                                readonly type: "string";
                                                                readonly description: "The current status of the Asset\n\n`Uninitiated` `Unprocessed` `Processing` `Committed` `Failed`";
                                                                readonly enum: readonly ["Uninitiated", "Unprocessed", "Processing", "Committed", "Failed"];
                                                            };
                                                            readonly mintAddress: {
                                                                readonly type: "string";
                                                                readonly description: "The address of the Asset on the blockchain";
                                                            };
                                                        };
                                                    };
                                                };
                                                readonly required: readonly ["type", "item"];
                                            }, {
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly type: {
                                                        readonly type: "string";
                                                        readonly enum: readonly ["AbitraryTransaction"];
                                                        readonly description: "`AbitraryTransaction`";
                                                    };
                                                };
                                                readonly required: readonly ["type"];
                                            }, {
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly type: {
                                                        readonly type: "string";
                                                        readonly enum: readonly ["Withdraw"];
                                                        readonly description: "`Withdraw`";
                                                    };
                                                };
                                                readonly required: readonly ["type"];
                                            }];
                                        };
                                    };
                                    readonly required: readonly ["id", "created", "status", "details"];
                                };
                            };
                        };
                        readonly required: readonly ["id", "consumes", "craftingUserReferenceId", "status", "transactions"];
                    };
                };
                readonly meta: {
                    readonly description: "Pagination related metadata";
                    readonly type: "object";
                    readonly required: readonly ["page", "perPage", "totalPages", "totalResults"];
                    readonly properties: {
                        readonly page: {
                            readonly type: "number";
                            readonly description: "The page number fetched";
                        };
                        readonly perPage: {
                            readonly type: "number";
                            readonly description: "The number of items in each page";
                        };
                        readonly totalPages: {
                            readonly type: "number";
                            readonly description: "The total number of pages in all results";
                        };
                        readonly totalResults: {
                            readonly type: "number";
                            readonly description: "The total result count";
                        };
                    };
                };
            };
            readonly required: readonly ["data", "meta"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const DeveloperWalletControllerFetchWalletAddress: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly "x-api-key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "API key for your game";
                };
            };
            readonly required: readonly ["x-api-key"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly address: {
                    readonly type: "string";
                    readonly description: "The address of the wallet.";
                };
            };
            readonly required: readonly ["address"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const DeveloperWalletControllerGetItems: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly page: {
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Specifies the page to fetch";
                };
                readonly perPage: {
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of items on each page";
                };
                readonly types: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly examples: readonly ["Currency, UniqueAsset, StackableAsset"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "A list of Item types to return.";
                };
                readonly collectionId: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Only return Items that belong to this collection. Will not return Item types that cannot have a collection (such as Currencies).";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-api-key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "API key for your game";
                };
            };
            readonly required: readonly ["x-api-key"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly description: "A list of items";
                    readonly items: {
                        readonly anyOf: readonly [{
                            readonly type: "object";
                            readonly properties: {
                                readonly type: {
                                    readonly type: "string";
                                    readonly enum: readonly ["Currency"];
                                    readonly description: "Indicates that this `Item` is a `Currency`\n\n`Currency`";
                                    readonly title: "Currency";
                                    readonly examples: readonly ["Currency"];
                                };
                                readonly item: {
                                    readonly description: "The currency";
                                    readonly type: "object";
                                    readonly required: readonly ["id", "mintAddress", "name", "symbol"];
                                    readonly properties: {
                                        readonly id: {
                                            readonly type: "string";
                                            readonly description: "The ID for the currency";
                                        };
                                        readonly mintAddress: {
                                            readonly type: "string";
                                            readonly description: "The address for the currency's SPL token mint";
                                        };
                                        readonly name: {
                                            readonly type: "string";
                                            readonly description: "The name of the currency";
                                        };
                                        readonly symbol: {
                                            readonly type: "string";
                                            readonly description: "The currency's symbol";
                                        };
                                    };
                                };
                                readonly quantity: {
                                    readonly type: "string";
                                    readonly description: "Amount of the currency being held";
                                };
                            };
                            readonly required: readonly ["type", "item", "quantity"];
                        }, {
                            readonly type: "object";
                            readonly properties: {
                                readonly type: {
                                    readonly type: "string";
                                    readonly enum: readonly ["UniqueAsset"];
                                    readonly description: "Indicates that this `Item` is an `UniqueAsset`\n\n`UniqueAsset`";
                                    readonly title: "UniqueAsset";
                                    readonly examples: readonly ["UniqueAsset"];
                                };
                                readonly item: {
                                    readonly description: "The unique asset";
                                    readonly type: "object";
                                    readonly required: readonly ["id", "created", "name", "description", "environment", "imported", "imageUrl", "status", "forSale", "mintAddress"];
                                    readonly properties: {
                                        readonly id: {
                                            readonly type: "string";
                                            readonly description: "The ID of the Asset";
                                        };
                                        readonly attributes: {
                                            readonly description: "The attributes of the Asset";
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "object";
                                                readonly required: readonly ["traitType", "value"];
                                                readonly properties: {
                                                    readonly traitType: {
                                                        readonly type: "string";
                                                        readonly description: "The name of the trait";
                                                    };
                                                    readonly value: {
                                                        readonly type: "string";
                                                        readonly description: "The value of the trait";
                                                    };
                                                };
                                            };
                                        };
                                        readonly created: {
                                            readonly type: "number";
                                            readonly description: "The date the Asset was created";
                                        };
                                        readonly name: {
                                            readonly type: "string";
                                            readonly description: "The name of the Asset";
                                        };
                                        readonly collection: {
                                            readonly description: "The collection the Asset belongs to";
                                            readonly type: "object";
                                            readonly required: readonly ["id", "name", "description", "environment", "imported", "created"];
                                            readonly properties: {
                                                readonly id: {
                                                    readonly type: "string";
                                                    readonly description: "The id of the collection. This is not an on-chain address, but instead an ID internal to GameShift";
                                                };
                                                readonly name: {
                                                    readonly type: "string";
                                                    readonly description: "The name given to the collection";
                                                };
                                                readonly description: {
                                                    readonly type: "string";
                                                    readonly description: "The description given to the collection";
                                                };
                                                readonly environment: {
                                                    readonly type: "string";
                                                    readonly description: "The collection's environment\n\n`Development` `Production`";
                                                    readonly enum: readonly ["Development", "Production"];
                                                };
                                                readonly imageUrl: {
                                                    readonly type: readonly ["string", "null"];
                                                    readonly description: "The url of the image used to represent the collection";
                                                };
                                                readonly imported: {
                                                    readonly type: "boolean";
                                                    readonly description: "Whether the collection was imported";
                                                };
                                                readonly mintAddress: {
                                                    readonly type: readonly ["string", "null"];
                                                    readonly description: "The mint address of the collection on-chain";
                                                };
                                                readonly created: {
                                                    readonly type: "number";
                                                    readonly description: "Timestamp of collection creation";
                                                };
                                                readonly stats: {
                                                    readonly description: "Statistics about the collection";
                                                    readonly type: "object";
                                                    readonly required: readonly ["numMinted", "floorPrice", "numListed", "numOwners"];
                                                    readonly properties: {
                                                        readonly numMinted: {
                                                            readonly type: "number";
                                                            readonly description: "The number of assets minted for this collection";
                                                        };
                                                        readonly floorPrice: {
                                                            readonly type: "number";
                                                            readonly description: "The floor price of the collection";
                                                        };
                                                        readonly numListed: {
                                                            readonly type: "number";
                                                            readonly description: "The number of assets listed for this collection";
                                                        };
                                                        readonly numOwners: {
                                                            readonly type: "number";
                                                            readonly description: "The number of unique owners of assets in this collection";
                                                        };
                                                    };
                                                };
                                            };
                                        };
                                        readonly description: {
                                            readonly type: "string";
                                            readonly description: "The description provided when the Asset was created";
                                        };
                                        readonly environment: {
                                            readonly type: "string";
                                            readonly description: "The asset's environment\n\n`Development` `Production`";
                                            readonly enum: readonly ["Development", "Production"];
                                        };
                                        readonly imported: {
                                            readonly type: "boolean";
                                            readonly description: "Indicates if the asset belongs to an imported collection";
                                        };
                                        readonly imageUrl: {
                                            readonly type: "string";
                                            readonly description: "The URI for the image representing the Asset";
                                        };
                                        readonly status: {
                                            readonly type: "string";
                                            readonly description: "The current status of the Asset\n\n`Uninitiated` `Unprocessed` `Processing` `Committed` `Failed`";
                                            readonly enum: readonly ["Uninitiated", "Unprocessed", "Processing", "Committed", "Failed"];
                                        };
                                        readonly forSale: {
                                            readonly type: "boolean";
                                            readonly description: "Indicates if the asset is currently for sale";
                                        };
                                        readonly mintAddress: {
                                            readonly type: "string";
                                            readonly description: "The address of the Asset on the blockchain";
                                        };
                                        readonly owner: {
                                            readonly description: "The current owner of the Asset.";
                                            readonly type: readonly ["object", "null"];
                                            readonly properties: {
                                                readonly address: {
                                                    readonly type: readonly ["string", "null"];
                                                    readonly description: "The wallet that currently holds this asset";
                                                };
                                                readonly referenceId: {
                                                    readonly type: readonly ["string", "null"];
                                                    readonly description: "The reference id associated with the wallet";
                                                };
                                            };
                                        };
                                        readonly price: {
                                            readonly type: readonly ["object", "null"];
                                            readonly description: "The price of the asset on the marketplace";
                                            readonly additionalProperties: true;
                                        };
                                    };
                                };
                            };
                            readonly required: readonly ["type", "item"];
                        }, {
                            readonly type: "object";
                            readonly properties: {
                                readonly type: {
                                    readonly type: "string";
                                    readonly enum: readonly ["StackableAsset"];
                                    readonly description: "Indicates that this `Item` is a `Stackable Asset`\n\n`StackableAsset`";
                                    readonly title: "StackableAsset";
                                    readonly examples: readonly ["StackableAsset"];
                                };
                                readonly item: {
                                    readonly description: "The stackable asset";
                                    readonly type: "object";
                                    readonly required: readonly ["id", "created", "name", "description", "environment", "imageUrl", "status"];
                                    readonly properties: {
                                        readonly id: {
                                            readonly type: "string";
                                            readonly description: "The ID of the Stackable Asset";
                                        };
                                        readonly attributes: {
                                            readonly description: "Add attributes to your Asset";
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "object";
                                                readonly required: readonly ["traitType", "value"];
                                                readonly properties: {
                                                    readonly traitType: {
                                                        readonly type: "string";
                                                        readonly description: "The name of the trait";
                                                    };
                                                    readonly value: {
                                                        readonly type: "string";
                                                        readonly description: "The value of the trait";
                                                    };
                                                };
                                            };
                                        };
                                        readonly created: {
                                            readonly type: "number";
                                            readonly description: "The date the Asset was created";
                                        };
                                        readonly name: {
                                            readonly type: "string";
                                            readonly description: "The name of the Stackable Asset. Max length: 32 chars";
                                            readonly maxLength: 32;
                                        };
                                        readonly symbol: {
                                            readonly type: "string";
                                            readonly description: "The symbol of the Stackable Asset. Max length: 5 chars";
                                            readonly maxLength: 5;
                                        };
                                        readonly description: {
                                            readonly type: "string";
                                            readonly description: "A description for the Asset";
                                            readonly maxLength: 64;
                                        };
                                        readonly collection: {
                                            readonly description: "The collection the Asset belongs to";
                                            readonly type: "object";
                                            readonly required: readonly ["id", "name", "description", "environment", "imported", "created"];
                                            readonly properties: {
                                                readonly id: {
                                                    readonly type: "string";
                                                    readonly description: "The id of the collection. This is not an on-chain address, but instead an ID internal to GameShift";
                                                };
                                                readonly name: {
                                                    readonly type: "string";
                                                    readonly description: "The name given to the collection";
                                                };
                                                readonly description: {
                                                    readonly type: "string";
                                                    readonly description: "The description given to the collection";
                                                };
                                                readonly environment: {
                                                    readonly type: "string";
                                                    readonly description: "The collection's environment\n\n`Development` `Production`";
                                                    readonly enum: readonly ["Development", "Production"];
                                                };
                                                readonly imageUrl: {
                                                    readonly type: readonly ["string", "null"];
                                                    readonly description: "The url of the image used to represent the collection";
                                                };
                                                readonly imported: {
                                                    readonly type: "boolean";
                                                    readonly description: "Whether the collection was imported";
                                                };
                                                readonly mintAddress: {
                                                    readonly type: readonly ["string", "null"];
                                                    readonly description: "The mint address of the collection on-chain";
                                                };
                                                readonly created: {
                                                    readonly type: "number";
                                                    readonly description: "Timestamp of collection creation";
                                                };
                                                readonly stats: {
                                                    readonly description: "Statistics about the collection";
                                                    readonly type: "object";
                                                    readonly required: readonly ["numMinted", "floorPrice", "numListed", "numOwners"];
                                                    readonly properties: {
                                                        readonly numMinted: {
                                                            readonly type: "number";
                                                            readonly description: "The number of assets minted for this collection";
                                                        };
                                                        readonly floorPrice: {
                                                            readonly type: "number";
                                                            readonly description: "The floor price of the collection";
                                                        };
                                                        readonly numListed: {
                                                            readonly type: "number";
                                                            readonly description: "The number of assets listed for this collection";
                                                        };
                                                        readonly numOwners: {
                                                            readonly type: "number";
                                                            readonly description: "The number of unique owners of assets in this collection";
                                                        };
                                                    };
                                                };
                                            };
                                        };
                                        readonly environment: {
                                            readonly type: "string";
                                            readonly description: "The asset's environment\n\n`Development` `Production`";
                                            readonly enum: readonly ["Development", "Production"];
                                        };
                                        readonly imageUrl: {
                                            readonly type: "string";
                                            readonly description: "A url to the image underlying the Asset";
                                        };
                                        readonly status: {
                                            readonly type: "string";
                                            readonly description: "The current status of the Asset\n\n`Uninitiated` `Unprocessed` `Processing` `Committed` `Failed`";
                                            readonly enum: readonly ["Uninitiated", "Unprocessed", "Processing", "Committed", "Failed"];
                                        };
                                        readonly mintAddress: {
                                            readonly type: "string";
                                            readonly description: "The address of the Asset on the blockchain";
                                        };
                                    };
                                };
                                readonly quantity: {
                                    readonly type: "string";
                                    readonly description: "Amount of the stackable asset";
                                };
                            };
                            readonly required: readonly ["type", "item", "quantity"];
                        }];
                    };
                };
                readonly meta: {
                    readonly description: "Pagination related metadata";
                    readonly type: "object";
                    readonly required: readonly ["page", "perPage", "totalPages", "totalResults"];
                    readonly properties: {
                        readonly page: {
                            readonly type: "number";
                            readonly description: "The page number fetched";
                        };
                        readonly perPage: {
                            readonly type: "number";
                            readonly description: "The number of items in each page";
                        };
                        readonly totalPages: {
                            readonly type: "number";
                            readonly description: "The total number of pages in all results";
                        };
                        readonly totalResults: {
                            readonly type: "number";
                            readonly description: "The total result count";
                        };
                    };
                };
            };
            readonly required: readonly ["data", "meta"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const DeveloperWalletControllerTransferItem: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly destinationUserReferenceId: {
                readonly type: "string";
                readonly description: "Identifies the User receiving the Item";
            };
            readonly destinationWallet: {
                readonly type: "string";
                readonly description: "Address of the wallet receiving the Item";
            };
            readonly quantity: {
                readonly type: "string";
                readonly minLength: 1;
                readonly description: "Specifies the amount of the Item to send";
            };
        };
        readonly required: readonly ["quantity"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly itemId: {
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Specifies the id of the item to transfer";
                };
            };
            readonly required: readonly ["itemId"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-api-key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "API key for your game";
                };
                readonly "x-wallet-key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Wallet key for your game developer wallet";
                };
            };
            readonly required: readonly ["x-api-key", "x-wallet-key"];
        }];
    };
    readonly response: {
        readonly "201": {
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly description: "Transaction ID";
                };
                readonly created: {
                    readonly type: "string";
                    readonly description: "Transaction creation date";
                    readonly format: "date-time";
                };
                readonly status: {
                    readonly description: "Transaction confirmation status";
                    readonly oneOf: readonly [{
                        readonly type: "object";
                        readonly properties: {
                            readonly status: {
                                readonly type: "string";
                                readonly enum: readonly ["Confirmed"];
                                readonly description: "`Confirmed`";
                            };
                            readonly txHash: {
                                readonly type: "string";
                            };
                        };
                        readonly required: readonly ["status", "txHash"];
                    }, {
                        readonly type: "object";
                        readonly properties: {
                            readonly status: {
                                readonly type: "string";
                                readonly enum: readonly ["Pending"];
                                readonly description: "`Pending`";
                            };
                        };
                        readonly required: readonly ["status"];
                    }, {
                        readonly type: "object";
                        readonly properties: {
                            readonly status: {
                                readonly type: "string";
                                readonly enum: readonly ["Failed"];
                                readonly description: "`Failed`";
                            };
                            readonly error: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "string";
                                };
                            };
                        };
                        readonly required: readonly ["status", "error"];
                    }, {
                        readonly type: "object";
                        readonly properties: {
                            readonly status: {
                                readonly type: "string";
                                readonly enum: readonly ["Expired"];
                                readonly description: "`Expired`";
                            };
                        };
                        readonly required: readonly ["status"];
                    }];
                };
                readonly details: {
                    readonly description: "Transaction type and details about asset and balance changes";
                    readonly oneOf: readonly [{
                        readonly type: "object";
                        readonly properties: {
                            readonly type: {
                                readonly type: "string";
                                readonly enum: readonly ["BuyAsset", "BuyAssetWithCreditCard", "CancelAssetSale", "ChangeAssetPrice", "ListAssetSale", "TransferAsset", "TransferAssetFromDeveloper"];
                                readonly description: "`BuyAsset` `BuyAssetWithCreditCard` `CancelAssetSale` `ChangeAssetPrice` `ListAssetSale` `TransferAsset` `TransferAssetFromDeveloper`";
                            };
                            readonly item: {
                                readonly description: "Asset details";
                                readonly type: "object";
                                readonly required: readonly ["id", "created", "name", "description", "environment", "imported", "imageUrl", "status", "escrow", "mintAddress"];
                                readonly properties: {
                                    readonly id: {
                                        readonly type: "string";
                                        readonly description: "The ID of the Asset";
                                    };
                                    readonly attributes: {
                                        readonly description: "The attributes of the Asset";
                                        readonly type: "array";
                                        readonly items: {
                                            readonly type: "object";
                                            readonly required: readonly ["traitType", "value"];
                                            readonly properties: {
                                                readonly traitType: {
                                                    readonly type: "string";
                                                    readonly description: "The name of the trait";
                                                };
                                                readonly value: {
                                                    readonly type: "string";
                                                    readonly description: "The value of the trait";
                                                };
                                            };
                                        };
                                    };
                                    readonly created: {
                                        readonly type: "number";
                                        readonly description: "The date the Asset was created";
                                    };
                                    readonly name: {
                                        readonly type: "string";
                                        readonly description: "The name of the Asset";
                                    };
                                    readonly collection: {
                                        readonly description: "The collection the Asset belongs to";
                                        readonly type: "object";
                                        readonly required: readonly ["id", "name", "description", "environment", "imported", "created"];
                                        readonly properties: {
                                            readonly id: {
                                                readonly type: "string";
                                                readonly description: "The id of the collection. This is not an on-chain address, but instead an ID internal to GameShift";
                                            };
                                            readonly name: {
                                                readonly type: "string";
                                                readonly description: "The name given to the collection";
                                            };
                                            readonly description: {
                                                readonly type: "string";
                                                readonly description: "The description given to the collection";
                                            };
                                            readonly environment: {
                                                readonly type: "string";
                                                readonly description: "The collection's environment\n\n`Development` `Production`";
                                                readonly enum: readonly ["Development", "Production"];
                                            };
                                            readonly imageUrl: {
                                                readonly type: readonly ["string", "null"];
                                                readonly description: "The url of the image used to represent the collection";
                                            };
                                            readonly imported: {
                                                readonly type: "boolean";
                                                readonly description: "Whether the collection was imported";
                                            };
                                            readonly mintAddress: {
                                                readonly type: readonly ["string", "null"];
                                                readonly description: "The mint address of the collection on-chain";
                                            };
                                            readonly created: {
                                                readonly type: "number";
                                                readonly description: "Timestamp of collection creation";
                                            };
                                            readonly stats: {
                                                readonly description: "Statistics about the collection";
                                                readonly type: "object";
                                                readonly required: readonly ["numMinted", "floorPrice", "numListed", "numOwners"];
                                                readonly properties: {
                                                    readonly numMinted: {
                                                        readonly type: "number";
                                                        readonly description: "The number of assets minted for this collection";
                                                    };
                                                    readonly floorPrice: {
                                                        readonly type: "number";
                                                        readonly description: "The floor price of the collection";
                                                    };
                                                    readonly numListed: {
                                                        readonly type: "number";
                                                        readonly description: "The number of assets listed for this collection";
                                                    };
                                                    readonly numOwners: {
                                                        readonly type: "number";
                                                        readonly description: "The number of unique owners of assets in this collection";
                                                    };
                                                };
                                            };
                                        };
                                    };
                                    readonly description: {
                                        readonly type: "string";
                                        readonly description: "The description provided when the Asset was created";
                                    };
                                    readonly environment: {
                                        readonly type: "string";
                                        readonly description: "The asset's environment\n\n`Development` `Production`";
                                        readonly enum: readonly ["Development", "Production"];
                                    };
                                    readonly imported: {
                                        readonly type: "boolean";
                                        readonly description: "Whether the Asset was imported";
                                    };
                                    readonly imageUrl: {
                                        readonly type: "string";
                                        readonly description: "The URI for the image representing the Asset";
                                    };
                                    readonly status: {
                                        readonly type: "string";
                                        readonly description: "The current status of the Asset\n\n`Uninitiated` `Unprocessed` `Processing` `Committed` `Failed`";
                                        readonly enum: readonly ["Uninitiated", "Unprocessed", "Processing", "Committed", "Failed"];
                                    };
                                    readonly escrow: {
                                        readonly type: "boolean";
                                        readonly description: "If the asset is in escrow or not";
                                    };
                                    readonly mintAddress: {
                                        readonly type: "string";
                                        readonly description: "The address of the Asset on the blockchain";
                                    };
                                    readonly owner: {
                                        readonly description: "The current owner of the Asset.";
                                        readonly type: readonly ["object", "null"];
                                        readonly properties: {
                                            readonly address: {
                                                readonly type: readonly ["string", "null"];
                                                readonly description: "The wallet that currently holds this asset";
                                            };
                                            readonly referenceId: {
                                                readonly type: readonly ["string", "null"];
                                                readonly description: "The reference id associated with the wallet";
                                            };
                                        };
                                    };
                                    readonly priceCents: {
                                        readonly type: readonly ["number", "null"];
                                        readonly description: "The price of the asset on the marketplace in cents";
                                    };
                                };
                            };
                        };
                        readonly required: readonly ["type", "item"];
                    }, {
                        readonly type: "object";
                        readonly properties: {
                            readonly type: {
                                readonly type: "string";
                                readonly enum: readonly ["TransferToken", "TransferTokenFromDeveloper"];
                                readonly description: "`TransferToken` `TransferTokenFromDeveloper`";
                            };
                            readonly item: {
                                readonly description: "Token details";
                                readonly type: "object";
                                readonly required: readonly ["id", "mintAddress", "name", "symbol"];
                                readonly properties: {
                                    readonly id: {
                                        readonly type: "string";
                                        readonly description: "The ID for the currency";
                                    };
                                    readonly mintAddress: {
                                        readonly type: "string";
                                        readonly description: "The address for the currency's SPL token mint";
                                    };
                                    readonly name: {
                                        readonly type: "string";
                                        readonly description: "The name of the currency";
                                    };
                                    readonly symbol: {
                                        readonly type: "string";
                                        readonly description: "The currency's symbol";
                                    };
                                };
                            };
                        };
                        readonly required: readonly ["type", "item"];
                    }, {
                        readonly type: "object";
                        readonly properties: {
                            readonly type: {
                                readonly type: "string";
                                readonly enum: readonly ["TransferStackableAsset", "TransferStackableAssetFromDeveloper"];
                                readonly description: "`TransferStackableAsset` `TransferStackableAssetFromDeveloper`";
                            };
                            readonly item: {
                                readonly description: "StackableAsset details";
                                readonly type: "object";
                                readonly required: readonly ["id", "created", "name", "description", "environment", "imageUrl", "status"];
                                readonly properties: {
                                    readonly id: {
                                        readonly type: "string";
                                        readonly description: "The ID of the Stackable Asset";
                                    };
                                    readonly attributes: {
                                        readonly description: "Add attributes to your Asset";
                                        readonly type: "array";
                                        readonly items: {
                                            readonly type: "object";
                                            readonly required: readonly ["traitType", "value"];
                                            readonly properties: {
                                                readonly traitType: {
                                                    readonly type: "string";
                                                    readonly description: "The name of the trait";
                                                };
                                                readonly value: {
                                                    readonly type: "string";
                                                    readonly description: "The value of the trait";
                                                };
                                            };
                                        };
                                    };
                                    readonly created: {
                                        readonly type: "number";
                                        readonly description: "The date the Asset was created";
                                    };
                                    readonly name: {
                                        readonly type: "string";
                                        readonly description: "The name of the Stackable Asset. Max length: 32 chars";
                                        readonly maxLength: 32;
                                    };
                                    readonly symbol: {
                                        readonly type: "string";
                                        readonly description: "The symbol of the Stackable Asset. Max length: 5 chars";
                                        readonly maxLength: 5;
                                    };
                                    readonly description: {
                                        readonly type: "string";
                                        readonly description: "A description for the Asset";
                                        readonly maxLength: 64;
                                    };
                                    readonly collection: {
                                        readonly description: "The collection the Asset belongs to";
                                        readonly type: "object";
                                        readonly required: readonly ["id", "name", "description", "environment", "imported", "created"];
                                        readonly properties: {
                                            readonly id: {
                                                readonly type: "string";
                                                readonly description: "The id of the collection. This is not an on-chain address, but instead an ID internal to GameShift";
                                            };
                                            readonly name: {
                                                readonly type: "string";
                                                readonly description: "The name given to the collection";
                                            };
                                            readonly description: {
                                                readonly type: "string";
                                                readonly description: "The description given to the collection";
                                            };
                                            readonly environment: {
                                                readonly type: "string";
                                                readonly description: "The collection's environment\n\n`Development` `Production`";
                                                readonly enum: readonly ["Development", "Production"];
                                            };
                                            readonly imageUrl: {
                                                readonly type: readonly ["string", "null"];
                                                readonly description: "The url of the image used to represent the collection";
                                            };
                                            readonly imported: {
                                                readonly type: "boolean";
                                                readonly description: "Whether the collection was imported";
                                            };
                                            readonly mintAddress: {
                                                readonly type: readonly ["string", "null"];
                                                readonly description: "The mint address of the collection on-chain";
                                            };
                                            readonly created: {
                                                readonly type: "number";
                                                readonly description: "Timestamp of collection creation";
                                            };
                                            readonly stats: {
                                                readonly description: "Statistics about the collection";
                                                readonly type: "object";
                                                readonly required: readonly ["numMinted", "floorPrice", "numListed", "numOwners"];
                                                readonly properties: {
                                                    readonly numMinted: {
                                                        readonly type: "number";
                                                        readonly description: "The number of assets minted for this collection";
                                                    };
                                                    readonly floorPrice: {
                                                        readonly type: "number";
                                                        readonly description: "The floor price of the collection";
                                                    };
                                                    readonly numListed: {
                                                        readonly type: "number";
                                                        readonly description: "The number of assets listed for this collection";
                                                    };
                                                    readonly numOwners: {
                                                        readonly type: "number";
                                                        readonly description: "The number of unique owners of assets in this collection";
                                                    };
                                                };
                                            };
                                        };
                                    };
                                    readonly environment: {
                                        readonly type: "string";
                                        readonly description: "The asset's environment\n\n`Development` `Production`";
                                        readonly enum: readonly ["Development", "Production"];
                                    };
                                    readonly imageUrl: {
                                        readonly type: "string";
                                        readonly description: "A url to the image underlying the Asset";
                                    };
                                    readonly status: {
                                        readonly type: "string";
                                        readonly description: "The current status of the Asset\n\n`Uninitiated` `Unprocessed` `Processing` `Committed` `Failed`";
                                        readonly enum: readonly ["Uninitiated", "Unprocessed", "Processing", "Committed", "Failed"];
                                    };
                                    readonly mintAddress: {
                                        readonly type: "string";
                                        readonly description: "The address of the Asset on the blockchain";
                                    };
                                };
                            };
                        };
                        readonly required: readonly ["type", "item"];
                    }, {
                        readonly type: "object";
                        readonly properties: {
                            readonly type: {
                                readonly type: "string";
                                readonly enum: readonly ["AbitraryTransaction"];
                                readonly description: "`AbitraryTransaction`";
                            };
                        };
                        readonly required: readonly ["type"];
                    }, {
                        readonly type: "object";
                        readonly properties: {
                            readonly type: {
                                readonly type: "string";
                                readonly enum: readonly ["Withdraw"];
                                readonly description: "`Withdraw`";
                            };
                        };
                        readonly required: readonly ["type"];
                    }];
                };
            };
            readonly required: readonly ["id", "created", "status", "details"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ItemsControllerGet: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly itemId: {
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Identifies the item";
                };
            };
            readonly required: readonly ["itemId"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-api-key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "API key for your game";
                };
            };
            readonly required: readonly ["x-api-key"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly oneOf: readonly [{
                readonly type: "object";
                readonly properties: {
                    readonly type: {
                        readonly type: "string";
                        readonly enum: readonly ["Currency"];
                        readonly description: "Indicates that this `Item` is a `Currency`\n\n`Currency`";
                        readonly title: "Currency";
                        readonly examples: readonly ["Currency"];
                    };
                    readonly item: {
                        readonly description: "The currency";
                        readonly type: "object";
                        readonly required: readonly ["id", "mintAddress", "name", "symbol"];
                        readonly properties: {
                            readonly id: {
                                readonly type: "string";
                                readonly description: "The ID for the currency";
                            };
                            readonly mintAddress: {
                                readonly type: "string";
                                readonly description: "The address for the currency's SPL token mint";
                            };
                            readonly name: {
                                readonly type: "string";
                                readonly description: "The name of the currency";
                            };
                            readonly symbol: {
                                readonly type: "string";
                                readonly description: "The currency's symbol";
                            };
                        };
                    };
                };
                readonly required: readonly ["type", "item"];
            }, {
                readonly type: "object";
                readonly properties: {
                    readonly type: {
                        readonly type: "string";
                        readonly enum: readonly ["UniqueAsset"];
                        readonly description: "Indicates that this `Item` is an `UniqueAsset`\n\n`UniqueAsset`";
                        readonly title: "UniqueAsset";
                        readonly examples: readonly ["UniqueAsset"];
                    };
                    readonly item: {
                        readonly description: "The unique asset";
                        readonly type: "object";
                        readonly required: readonly ["id", "created", "name", "description", "environment", "imported", "imageUrl", "status", "forSale", "mintAddress"];
                        readonly properties: {
                            readonly id: {
                                readonly type: "string";
                                readonly description: "The ID of the Asset";
                            };
                            readonly attributes: {
                                readonly description: "The attributes of the Asset";
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "object";
                                    readonly required: readonly ["traitType", "value"];
                                    readonly properties: {
                                        readonly traitType: {
                                            readonly type: "string";
                                            readonly description: "The name of the trait";
                                        };
                                        readonly value: {
                                            readonly type: "string";
                                            readonly description: "The value of the trait";
                                        };
                                    };
                                };
                            };
                            readonly created: {
                                readonly type: "number";
                                readonly description: "The date the Asset was created";
                            };
                            readonly name: {
                                readonly type: "string";
                                readonly description: "The name of the Asset";
                            };
                            readonly collection: {
                                readonly description: "The collection the Asset belongs to";
                                readonly type: "object";
                                readonly required: readonly ["id", "name", "description", "environment", "imported", "created"];
                                readonly properties: {
                                    readonly id: {
                                        readonly type: "string";
                                        readonly description: "The id of the collection. This is not an on-chain address, but instead an ID internal to GameShift";
                                    };
                                    readonly name: {
                                        readonly type: "string";
                                        readonly description: "The name given to the collection";
                                    };
                                    readonly description: {
                                        readonly type: "string";
                                        readonly description: "The description given to the collection";
                                    };
                                    readonly environment: {
                                        readonly type: "string";
                                        readonly description: "The collection's environment\n\n`Development` `Production`";
                                        readonly enum: readonly ["Development", "Production"];
                                    };
                                    readonly imageUrl: {
                                        readonly type: readonly ["string", "null"];
                                        readonly description: "The url of the image used to represent the collection";
                                    };
                                    readonly imported: {
                                        readonly type: "boolean";
                                        readonly description: "Whether the collection was imported";
                                    };
                                    readonly mintAddress: {
                                        readonly type: readonly ["string", "null"];
                                        readonly description: "The mint address of the collection on-chain";
                                    };
                                    readonly created: {
                                        readonly type: "number";
                                        readonly description: "Timestamp of collection creation";
                                    };
                                    readonly stats: {
                                        readonly description: "Statistics about the collection";
                                        readonly type: "object";
                                        readonly required: readonly ["numMinted", "floorPrice", "numListed", "numOwners"];
                                        readonly properties: {
                                            readonly numMinted: {
                                                readonly type: "number";
                                                readonly description: "The number of assets minted for this collection";
                                            };
                                            readonly floorPrice: {
                                                readonly type: "number";
                                                readonly description: "The floor price of the collection";
                                            };
                                            readonly numListed: {
                                                readonly type: "number";
                                                readonly description: "The number of assets listed for this collection";
                                            };
                                            readonly numOwners: {
                                                readonly type: "number";
                                                readonly description: "The number of unique owners of assets in this collection";
                                            };
                                        };
                                    };
                                };
                            };
                            readonly description: {
                                readonly type: "string";
                                readonly description: "The description provided when the Asset was created";
                            };
                            readonly environment: {
                                readonly type: "string";
                                readonly description: "The asset's environment\n\n`Development` `Production`";
                                readonly enum: readonly ["Development", "Production"];
                            };
                            readonly imported: {
                                readonly type: "boolean";
                                readonly description: "Indicates if the asset belongs to an imported collection";
                            };
                            readonly imageUrl: {
                                readonly type: "string";
                                readonly description: "The URI for the image representing the Asset";
                            };
                            readonly status: {
                                readonly type: "string";
                                readonly description: "The current status of the Asset\n\n`Uninitiated` `Unprocessed` `Processing` `Committed` `Failed`";
                                readonly enum: readonly ["Uninitiated", "Unprocessed", "Processing", "Committed", "Failed"];
                            };
                            readonly forSale: {
                                readonly type: "boolean";
                                readonly description: "Indicates if the asset is currently for sale";
                            };
                            readonly mintAddress: {
                                readonly type: "string";
                                readonly description: "The address of the Asset on the blockchain";
                            };
                            readonly owner: {
                                readonly description: "The current owner of the Asset.";
                                readonly type: readonly ["object", "null"];
                                readonly properties: {
                                    readonly address: {
                                        readonly type: readonly ["string", "null"];
                                        readonly description: "The wallet that currently holds this asset";
                                    };
                                    readonly referenceId: {
                                        readonly type: readonly ["string", "null"];
                                        readonly description: "The reference id associated with the wallet";
                                    };
                                };
                            };
                            readonly price: {
                                readonly type: readonly ["object", "null"];
                                readonly description: "The price of the asset on the marketplace";
                                readonly additionalProperties: true;
                            };
                        };
                    };
                };
                readonly required: readonly ["type", "item"];
            }, {
                readonly type: "object";
                readonly properties: {
                    readonly type: {
                        readonly type: "string";
                        readonly enum: readonly ["StackableAsset"];
                        readonly description: "Indicates that this `Item` is a `Stackable Asset`\n\n`StackableAsset`";
                        readonly title: "StackableAsset";
                        readonly examples: readonly ["StackableAsset"];
                    };
                    readonly item: {
                        readonly description: "The stackable asset";
                        readonly type: "object";
                        readonly required: readonly ["id", "created", "name", "description", "environment", "imageUrl", "status"];
                        readonly properties: {
                            readonly id: {
                                readonly type: "string";
                                readonly description: "The ID of the Stackable Asset";
                            };
                            readonly attributes: {
                                readonly description: "Add attributes to your Asset";
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "object";
                                    readonly required: readonly ["traitType", "value"];
                                    readonly properties: {
                                        readonly traitType: {
                                            readonly type: "string";
                                            readonly description: "The name of the trait";
                                        };
                                        readonly value: {
                                            readonly type: "string";
                                            readonly description: "The value of the trait";
                                        };
                                    };
                                };
                            };
                            readonly created: {
                                readonly type: "number";
                                readonly description: "The date the Asset was created";
                            };
                            readonly name: {
                                readonly type: "string";
                                readonly description: "The name of the Stackable Asset. Max length: 32 chars";
                                readonly maxLength: 32;
                            };
                            readonly symbol: {
                                readonly type: "string";
                                readonly description: "The symbol of the Stackable Asset. Max length: 5 chars";
                                readonly maxLength: 5;
                            };
                            readonly description: {
                                readonly type: "string";
                                readonly description: "A description for the Asset";
                                readonly maxLength: 64;
                            };
                            readonly collection: {
                                readonly description: "The collection the Asset belongs to";
                                readonly type: "object";
                                readonly required: readonly ["id", "name", "description", "environment", "imported", "created"];
                                readonly properties: {
                                    readonly id: {
                                        readonly type: "string";
                                        readonly description: "The id of the collection. This is not an on-chain address, but instead an ID internal to GameShift";
                                    };
                                    readonly name: {
                                        readonly type: "string";
                                        readonly description: "The name given to the collection";
                                    };
                                    readonly description: {
                                        readonly type: "string";
                                        readonly description: "The description given to the collection";
                                    };
                                    readonly environment: {
                                        readonly type: "string";
                                        readonly description: "The collection's environment\n\n`Development` `Production`";
                                        readonly enum: readonly ["Development", "Production"];
                                    };
                                    readonly imageUrl: {
                                        readonly type: readonly ["string", "null"];
                                        readonly description: "The url of the image used to represent the collection";
                                    };
                                    readonly imported: {
                                        readonly type: "boolean";
                                        readonly description: "Whether the collection was imported";
                                    };
                                    readonly mintAddress: {
                                        readonly type: readonly ["string", "null"];
                                        readonly description: "The mint address of the collection on-chain";
                                    };
                                    readonly created: {
                                        readonly type: "number";
                                        readonly description: "Timestamp of collection creation";
                                    };
                                    readonly stats: {
                                        readonly description: "Statistics about the collection";
                                        readonly type: "object";
                                        readonly required: readonly ["numMinted", "floorPrice", "numListed", "numOwners"];
                                        readonly properties: {
                                            readonly numMinted: {
                                                readonly type: "number";
                                                readonly description: "The number of assets minted for this collection";
                                            };
                                            readonly floorPrice: {
                                                readonly type: "number";
                                                readonly description: "The floor price of the collection";
                                            };
                                            readonly numListed: {
                                                readonly type: "number";
                                                readonly description: "The number of assets listed for this collection";
                                            };
                                            readonly numOwners: {
                                                readonly type: "number";
                                                readonly description: "The number of unique owners of assets in this collection";
                                            };
                                        };
                                    };
                                };
                            };
                            readonly environment: {
                                readonly type: "string";
                                readonly description: "The asset's environment\n\n`Development` `Production`";
                                readonly enum: readonly ["Development", "Production"];
                            };
                            readonly imageUrl: {
                                readonly type: "string";
                                readonly description: "A url to the image underlying the Asset";
                            };
                            readonly status: {
                                readonly type: "string";
                                readonly description: "The current status of the Asset\n\n`Uninitiated` `Unprocessed` `Processing` `Committed` `Failed`";
                                readonly enum: readonly ["Uninitiated", "Unprocessed", "Processing", "Committed", "Failed"];
                            };
                            readonly mintAddress: {
                                readonly type: "string";
                                readonly description: "The address of the Asset on the blockchain";
                            };
                        };
                    };
                };
                readonly required: readonly ["type", "item"];
            }];
            readonly discriminator: {
                readonly propertyName: "type";
                readonly mapping: {
                    readonly Currency: "#/components/schemas/CurrencyItemDto";
                    readonly UniqueAsset: "#/components/schemas/UniqueAssetItemDto";
                    readonly StackableAsset: "#/components/schemas/StackableAssetItemDto";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ItemsControllerGetAll: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly page: {
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Specifies the page to fetch";
                };
                readonly perPage: {
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of items on each page";
                };
                readonly types: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly examples: readonly ["Currency, UniqueAsset, StackableAsset"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "A list of Item types to return.";
                };
                readonly forSale: {
                    readonly type: "string";
                    readonly examples: readonly ["true"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Only return Items that are listed for sale. This is automatically exclude any Items that cannot be listed on the marketplace, i.e. Currencies.";
                };
                readonly collectionId: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Only return Items that belong to this collection. Will not return Item types that cannot have a collection (such as Currencies).";
                };
                readonly ownerReferenceId: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Only return Items that belong to this user. Will also return all Currencies unless otherwise specified, even if the quantity in possession is zero.";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-api-key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "API key for your game";
                };
            };
            readonly required: readonly ["x-api-key"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly description: "A list of items";
                    readonly items: {
                        readonly anyOf: readonly [{
                            readonly type: "object";
                            readonly properties: {
                                readonly type: {
                                    readonly type: "string";
                                    readonly enum: readonly ["Currency"];
                                    readonly description: "Indicates that this `Item` is a `Currency`\n\n`Currency`";
                                    readonly title: "Currency";
                                    readonly examples: readonly ["Currency"];
                                };
                                readonly item: {
                                    readonly description: "The currency";
                                    readonly type: "object";
                                    readonly required: readonly ["id", "mintAddress", "name", "symbol"];
                                    readonly properties: {
                                        readonly id: {
                                            readonly type: "string";
                                            readonly description: "The ID for the currency";
                                        };
                                        readonly mintAddress: {
                                            readonly type: "string";
                                            readonly description: "The address for the currency's SPL token mint";
                                        };
                                        readonly name: {
                                            readonly type: "string";
                                            readonly description: "The name of the currency";
                                        };
                                        readonly symbol: {
                                            readonly type: "string";
                                            readonly description: "The currency's symbol";
                                        };
                                    };
                                };
                            };
                            readonly required: readonly ["type", "item"];
                        }, {
                            readonly type: "object";
                            readonly properties: {
                                readonly type: {
                                    readonly type: "string";
                                    readonly enum: readonly ["UniqueAsset"];
                                    readonly description: "Indicates that this `Item` is an `UniqueAsset`\n\n`UniqueAsset`";
                                    readonly title: "UniqueAsset";
                                    readonly examples: readonly ["UniqueAsset"];
                                };
                                readonly item: {
                                    readonly description: "The unique asset";
                                    readonly type: "object";
                                    readonly required: readonly ["id", "created", "name", "description", "environment", "imported", "imageUrl", "status", "forSale", "mintAddress"];
                                    readonly properties: {
                                        readonly id: {
                                            readonly type: "string";
                                            readonly description: "The ID of the Asset";
                                        };
                                        readonly attributes: {
                                            readonly description: "The attributes of the Asset";
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "object";
                                                readonly required: readonly ["traitType", "value"];
                                                readonly properties: {
                                                    readonly traitType: {
                                                        readonly type: "string";
                                                        readonly description: "The name of the trait";
                                                    };
                                                    readonly value: {
                                                        readonly type: "string";
                                                        readonly description: "The value of the trait";
                                                    };
                                                };
                                            };
                                        };
                                        readonly created: {
                                            readonly type: "number";
                                            readonly description: "The date the Asset was created";
                                        };
                                        readonly name: {
                                            readonly type: "string";
                                            readonly description: "The name of the Asset";
                                        };
                                        readonly collection: {
                                            readonly description: "The collection the Asset belongs to";
                                            readonly type: "object";
                                            readonly required: readonly ["id", "name", "description", "environment", "imported", "created"];
                                            readonly properties: {
                                                readonly id: {
                                                    readonly type: "string";
                                                    readonly description: "The id of the collection. This is not an on-chain address, but instead an ID internal to GameShift";
                                                };
                                                readonly name: {
                                                    readonly type: "string";
                                                    readonly description: "The name given to the collection";
                                                };
                                                readonly description: {
                                                    readonly type: "string";
                                                    readonly description: "The description given to the collection";
                                                };
                                                readonly environment: {
                                                    readonly type: "string";
                                                    readonly description: "The collection's environment\n\n`Development` `Production`";
                                                    readonly enum: readonly ["Development", "Production"];
                                                };
                                                readonly imageUrl: {
                                                    readonly type: readonly ["string", "null"];
                                                    readonly description: "The url of the image used to represent the collection";
                                                };
                                                readonly imported: {
                                                    readonly type: "boolean";
                                                    readonly description: "Whether the collection was imported";
                                                };
                                                readonly mintAddress: {
                                                    readonly type: readonly ["string", "null"];
                                                    readonly description: "The mint address of the collection on-chain";
                                                };
                                                readonly created: {
                                                    readonly type: "number";
                                                    readonly description: "Timestamp of collection creation";
                                                };
                                                readonly stats: {
                                                    readonly description: "Statistics about the collection";
                                                    readonly type: "object";
                                                    readonly required: readonly ["numMinted", "floorPrice", "numListed", "numOwners"];
                                                    readonly properties: {
                                                        readonly numMinted: {
                                                            readonly type: "number";
                                                            readonly description: "The number of assets minted for this collection";
                                                        };
                                                        readonly floorPrice: {
                                                            readonly type: "number";
                                                            readonly description: "The floor price of the collection";
                                                        };
                                                        readonly numListed: {
                                                            readonly type: "number";
                                                            readonly description: "The number of assets listed for this collection";
                                                        };
                                                        readonly numOwners: {
                                                            readonly type: "number";
                                                            readonly description: "The number of unique owners of assets in this collection";
                                                        };
                                                    };
                                                };
                                            };
                                        };
                                        readonly description: {
                                            readonly type: "string";
                                            readonly description: "The description provided when the Asset was created";
                                        };
                                        readonly environment: {
                                            readonly type: "string";
                                            readonly description: "The asset's environment\n\n`Development` `Production`";
                                            readonly enum: readonly ["Development", "Production"];
                                        };
                                        readonly imported: {
                                            readonly type: "boolean";
                                            readonly description: "Indicates if the asset belongs to an imported collection";
                                        };
                                        readonly imageUrl: {
                                            readonly type: "string";
                                            readonly description: "The URI for the image representing the Asset";
                                        };
                                        readonly status: {
                                            readonly type: "string";
                                            readonly description: "The current status of the Asset\n\n`Uninitiated` `Unprocessed` `Processing` `Committed` `Failed`";
                                            readonly enum: readonly ["Uninitiated", "Unprocessed", "Processing", "Committed", "Failed"];
                                        };
                                        readonly forSale: {
                                            readonly type: "boolean";
                                            readonly description: "Indicates if the asset is currently for sale";
                                        };
                                        readonly mintAddress: {
                                            readonly type: "string";
                                            readonly description: "The address of the Asset on the blockchain";
                                        };
                                        readonly owner: {
                                            readonly description: "The current owner of the Asset.";
                                            readonly type: readonly ["object", "null"];
                                            readonly properties: {
                                                readonly address: {
                                                    readonly type: readonly ["string", "null"];
                                                    readonly description: "The wallet that currently holds this asset";
                                                };
                                                readonly referenceId: {
                                                    readonly type: readonly ["string", "null"];
                                                    readonly description: "The reference id associated with the wallet";
                                                };
                                            };
                                        };
                                        readonly price: {
                                            readonly type: readonly ["object", "null"];
                                            readonly description: "The price of the asset on the marketplace";
                                            readonly additionalProperties: true;
                                        };
                                    };
                                };
                            };
                            readonly required: readonly ["type", "item"];
                        }, {
                            readonly type: "object";
                            readonly properties: {
                                readonly type: {
                                    readonly type: "string";
                                    readonly enum: readonly ["StackableAsset"];
                                    readonly description: "Indicates that this `Item` is a `Stackable Asset`\n\n`StackableAsset`";
                                    readonly title: "StackableAsset";
                                    readonly examples: readonly ["StackableAsset"];
                                };
                                readonly item: {
                                    readonly description: "The stackable asset";
                                    readonly type: "object";
                                    readonly required: readonly ["id", "created", "name", "description", "environment", "imageUrl", "status"];
                                    readonly properties: {
                                        readonly id: {
                                            readonly type: "string";
                                            readonly description: "The ID of the Stackable Asset";
                                        };
                                        readonly attributes: {
                                            readonly description: "Add attributes to your Asset";
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "object";
                                                readonly required: readonly ["traitType", "value"];
                                                readonly properties: {
                                                    readonly traitType: {
                                                        readonly type: "string";
                                                        readonly description: "The name of the trait";
                                                    };
                                                    readonly value: {
                                                        readonly type: "string";
                                                        readonly description: "The value of the trait";
                                                    };
                                                };
                                            };
                                        };
                                        readonly created: {
                                            readonly type: "number";
                                            readonly description: "The date the Asset was created";
                                        };
                                        readonly name: {
                                            readonly type: "string";
                                            readonly description: "The name of the Stackable Asset. Max length: 32 chars";
                                            readonly maxLength: 32;
                                        };
                                        readonly symbol: {
                                            readonly type: "string";
                                            readonly description: "The symbol of the Stackable Asset. Max length: 5 chars";
                                            readonly maxLength: 5;
                                        };
                                        readonly description: {
                                            readonly type: "string";
                                            readonly description: "A description for the Asset";
                                            readonly maxLength: 64;
                                        };
                                        readonly collection: {
                                            readonly description: "The collection the Asset belongs to";
                                            readonly type: "object";
                                            readonly required: readonly ["id", "name", "description", "environment", "imported", "created"];
                                            readonly properties: {
                                                readonly id: {
                                                    readonly type: "string";
                                                    readonly description: "The id of the collection. This is not an on-chain address, but instead an ID internal to GameShift";
                                                };
                                                readonly name: {
                                                    readonly type: "string";
                                                    readonly description: "The name given to the collection";
                                                };
                                                readonly description: {
                                                    readonly type: "string";
                                                    readonly description: "The description given to the collection";
                                                };
                                                readonly environment: {
                                                    readonly type: "string";
                                                    readonly description: "The collection's environment\n\n`Development` `Production`";
                                                    readonly enum: readonly ["Development", "Production"];
                                                };
                                                readonly imageUrl: {
                                                    readonly type: readonly ["string", "null"];
                                                    readonly description: "The url of the image used to represent the collection";
                                                };
                                                readonly imported: {
                                                    readonly type: "boolean";
                                                    readonly description: "Whether the collection was imported";
                                                };
                                                readonly mintAddress: {
                                                    readonly type: readonly ["string", "null"];
                                                    readonly description: "The mint address of the collection on-chain";
                                                };
                                                readonly created: {
                                                    readonly type: "number";
                                                    readonly description: "Timestamp of collection creation";
                                                };
                                                readonly stats: {
                                                    readonly description: "Statistics about the collection";
                                                    readonly type: "object";
                                                    readonly required: readonly ["numMinted", "floorPrice", "numListed", "numOwners"];
                                                    readonly properties: {
                                                        readonly numMinted: {
                                                            readonly type: "number";
                                                            readonly description: "The number of assets minted for this collection";
                                                        };
                                                        readonly floorPrice: {
                                                            readonly type: "number";
                                                            readonly description: "The floor price of the collection";
                                                        };
                                                        readonly numListed: {
                                                            readonly type: "number";
                                                            readonly description: "The number of assets listed for this collection";
                                                        };
                                                        readonly numOwners: {
                                                            readonly type: "number";
                                                            readonly description: "The number of unique owners of assets in this collection";
                                                        };
                                                    };
                                                };
                                            };
                                        };
                                        readonly environment: {
                                            readonly type: "string";
                                            readonly description: "The asset's environment\n\n`Development` `Production`";
                                            readonly enum: readonly ["Development", "Production"];
                                        };
                                        readonly imageUrl: {
                                            readonly type: "string";
                                            readonly description: "A url to the image underlying the Asset";
                                        };
                                        readonly status: {
                                            readonly type: "string";
                                            readonly description: "The current status of the Asset\n\n`Uninitiated` `Unprocessed` `Processing` `Committed` `Failed`";
                                            readonly enum: readonly ["Uninitiated", "Unprocessed", "Processing", "Committed", "Failed"];
                                        };
                                        readonly mintAddress: {
                                            readonly type: "string";
                                            readonly description: "The address of the Asset on the blockchain";
                                        };
                                    };
                                };
                            };
                            readonly required: readonly ["type", "item"];
                        }];
                    };
                };
                readonly meta: {
                    readonly description: "Pagination related metadata";
                    readonly type: "object";
                    readonly required: readonly ["page", "perPage", "totalPages", "totalResults"];
                    readonly properties: {
                        readonly page: {
                            readonly type: "number";
                            readonly description: "The page number fetched";
                        };
                        readonly perPage: {
                            readonly type: "number";
                            readonly description: "The number of items in each page";
                        };
                        readonly totalPages: {
                            readonly type: "number";
                            readonly description: "The total number of pages in all results";
                        };
                        readonly totalResults: {
                            readonly type: "number";
                            readonly description: "The total result count";
                        };
                    };
                };
            };
            readonly required: readonly ["data", "meta"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const LendControllerAcceptLease: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly borrowerReferenceId: {
                readonly type: "string";
                readonly description: "The reference id of the borrower";
            };
        };
        readonly required: readonly ["borrowerReferenceId"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Identifies the lending Grant";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-api-key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "API key for your game";
                };
            };
            readonly required: readonly ["x-api-key"];
        }];
    };
    readonly response: {
        readonly "201": {
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly description: "The unique ID of the LendingGrant entry";
                };
                readonly itemId: {
                    readonly type: "string";
                    readonly description: "The ID of the Item being borrowed";
                };
                readonly ownerReferenceId: {
                    readonly type: "string";
                    readonly description: "The reference ID of the owner of the Asset";
                };
                readonly borrowerReferenceId: {
                    readonly type: "string";
                    readonly description: "The reference ID of the borrower of the Asset";
                };
                readonly expiration: {
                    readonly format: "date-time";
                    readonly type: "string";
                    readonly description: "The expiration date and time of the borrowing period";
                };
                readonly created: {
                    readonly format: "date-time";
                    readonly type: "string";
                    readonly description: "The date and time when the borrow entry was created";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "The current status of the LendingGrant entry\n\n`Pending` `Accepted`";
                    readonly enum: readonly ["Pending", "Accepted"];
                };
                readonly environment: {
                    readonly type: "string";
                    readonly description: "The current environment of the Asset\n\n`Development` `Production`";
                    readonly enum: readonly ["Development", "Production"];
                };
            };
            readonly required: readonly ["id", "itemId", "ownerReferenceId", "borrowerReferenceId", "expiration", "created", "status", "environment"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const LendControllerCancelLease: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly lenderReferenceId: {
                readonly type: "string";
                readonly description: "The reference id of the lender";
            };
        };
        readonly required: readonly ["lenderReferenceId"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Identifies the lending Grant";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-api-key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "API key for your game";
                };
            };
            readonly required: readonly ["x-api-key"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly description: "The unique ID of the LendingGrant entry";
                };
                readonly itemId: {
                    readonly type: "string";
                    readonly description: "The ID of the Item being borrowed";
                };
                readonly ownerReferenceId: {
                    readonly type: "string";
                    readonly description: "The reference ID of the owner of the Asset";
                };
                readonly borrowerReferenceId: {
                    readonly type: "string";
                    readonly description: "The reference ID of the borrower of the Asset";
                };
                readonly expiration: {
                    readonly format: "date-time";
                    readonly type: "string";
                    readonly description: "The expiration date and time of the borrowing period";
                };
                readonly created: {
                    readonly format: "date-time";
                    readonly type: "string";
                    readonly description: "The date and time when the borrow entry was created";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "The current status of the LendingGrant entry\n\n`Pending` `Accepted`";
                    readonly enum: readonly ["Pending", "Accepted"];
                };
                readonly environment: {
                    readonly type: "string";
                    readonly description: "The current environment of the Asset\n\n`Development` `Production`";
                    readonly enum: readonly ["Development", "Production"];
                };
            };
            readonly required: readonly ["id", "itemId", "ownerReferenceId", "borrowerReferenceId", "expiration", "created", "status", "environment"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const LendControllerGetLease: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Identifies the lending Grant";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-api-key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "API key for your game";
                };
            };
            readonly required: readonly ["x-api-key"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly description: "The unique ID of the LendingGrant entry";
                };
                readonly itemId: {
                    readonly type: "string";
                    readonly description: "The ID of the Item being borrowed";
                };
                readonly ownerReferenceId: {
                    readonly type: "string";
                    readonly description: "The reference ID of the owner of the Asset";
                };
                readonly borrowerReferenceId: {
                    readonly type: "string";
                    readonly description: "The reference ID of the borrower of the Asset";
                };
                readonly expiration: {
                    readonly format: "date-time";
                    readonly type: "string";
                    readonly description: "The expiration date and time of the borrowing period";
                };
                readonly created: {
                    readonly format: "date-time";
                    readonly type: "string";
                    readonly description: "The date and time when the borrow entry was created";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "The current status of the LendingGrant entry\n\n`Pending` `Accepted`";
                    readonly enum: readonly ["Pending", "Accepted"];
                };
                readonly environment: {
                    readonly type: "string";
                    readonly description: "The current environment of the Asset\n\n`Development` `Production`";
                    readonly enum: readonly ["Development", "Production"];
                };
            };
            readonly required: readonly ["id", "itemId", "ownerReferenceId", "borrowerReferenceId", "expiration", "created", "status", "environment"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const LendControllerReturnLease: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly borrowerReferenceId: {
                readonly type: "string";
                readonly description: "The reference id of the borrower";
            };
        };
        readonly required: readonly ["borrowerReferenceId"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Identifies the lending Grant";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-api-key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "API key for your game";
                };
            };
            readonly required: readonly ["x-api-key"];
        }];
    };
    readonly response: {
        readonly "201": {
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly description: "The unique ID of the LendingGrant entry";
                };
                readonly itemId: {
                    readonly type: "string";
                    readonly description: "The ID of the Item being borrowed";
                };
                readonly ownerReferenceId: {
                    readonly type: "string";
                    readonly description: "The reference ID of the owner of the Asset";
                };
                readonly borrowerReferenceId: {
                    readonly type: "string";
                    readonly description: "The reference ID of the borrower of the Asset";
                };
                readonly expiration: {
                    readonly format: "date-time";
                    readonly type: "string";
                    readonly description: "The expiration date and time of the borrowing period";
                };
                readonly created: {
                    readonly format: "date-time";
                    readonly type: "string";
                    readonly description: "The date and time when the borrow entry was created";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "The current status of the LendingGrant entry\n\n`Pending` `Accepted`";
                    readonly enum: readonly ["Pending", "Accepted"];
                };
                readonly environment: {
                    readonly type: "string";
                    readonly description: "The current environment of the Asset\n\n`Development` `Production`";
                    readonly enum: readonly ["Development", "Production"];
                };
            };
            readonly required: readonly ["id", "itemId", "ownerReferenceId", "borrowerReferenceId", "expiration", "created", "status", "environment"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const LoyaltyProgramControllerAllocateLoyaltyProgramRewards: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly rewardsId: {
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Specifies the reward snapshot";
                };
                readonly programId: {
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Specifies the program";
                };
            };
            readonly required: readonly ["rewardsId", "programId"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-api-key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "API key for your game";
                };
                readonly "x-wallet-key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["x-api-key", "x-wallet-key"];
        }];
    };
    readonly response: {
        readonly "201": {
            readonly type: "object";
            readonly properties: {
                readonly transactionId: {
                    readonly type: "string";
                    readonly description: "GameShift transaction id";
                };
                readonly transactionHash: {
                    readonly type: "string";
                    readonly description: "Transaction hash";
                };
            };
            readonly required: readonly ["transactionId", "transactionHash"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const LoyaltyProgramControllerCreateLoyaltyProgram: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly name: {
                readonly type: "string";
                readonly description: "Optional name of the program, shown in the UI";
            };
            readonly image: {
                readonly type: "string";
                readonly description: "Optional associated image URL of the program, shown in the UI";
            };
            readonly enrollmentCurrencyId: {
                readonly type: "string";
                readonly description: "The currency id of the enrollment currency. Register under /nx/currencies";
            };
            readonly rewardCurrencyId: {
                readonly type: "string";
                readonly description: "The currency id of the enrollment currency. Register under /nx/currencies";
            };
            readonly maxEnrollments: {
                readonly type: "number";
                readonly description: "The max number of enrollments that this pool can support (up to 32,000)";
            };
            readonly maxTokens: {
                readonly type: "string";
                readonly description: "The max number of enrolled tokens that this pool can support (as a string). Up to 2^64.";
            };
            readonly maxEnrollmentPeriod: {
                readonly type: "number";
                readonly description: "The max amount of time in seconds that an enrollment can last.";
            };
            readonly minEnrollmentPeriod: {
                readonly type: "number";
                readonly description: "The minimum amount of time, in seconds, that an enrollment can last.";
            };
        };
        readonly required: readonly ["enrollmentCurrencyId", "rewardCurrencyId", "maxEnrollments", "maxTokens", "maxEnrollmentPeriod", "minEnrollmentPeriod"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly "x-api-key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "API key for your game";
                };
                readonly "x-wallet-key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["x-api-key", "x-wallet-key"];
        }];
    };
    readonly response: {
        readonly "201": {
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly description: "The ID of the newly created program";
                };
                readonly transactionId: {
                    readonly type: "string";
                    readonly description: "The GameShift ID of the on-chain transaction that created the program";
                };
                readonly transactionHash: {
                    readonly type: "string";
                    readonly description: "The transaction hash, can be used on explorers";
                };
            };
            readonly required: readonly ["id", "transactionId", "transactionHash"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const LoyaltyProgramControllerCreateLoyaltyProgramRewardSnapshot: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly amountToAllocate: {
                readonly type: "string";
                readonly description: "Amount of unallocated reward tokens to allocate (final processed balance may differ due to rounding)";
            };
            readonly enrollments: {
                readonly description: "A list of enrollments and corresponding multipliers to allocate rewards to";
                readonly type: "array";
                readonly items: {
                    readonly type: "object";
                    readonly properties: {
                        readonly enrollmentId: {
                            readonly type: "string";
                            readonly description: "The ID of the Enrollment";
                        };
                        readonly multiplier: {
                            readonly type: "number";
                            readonly description: "The multiplier that will be averaged against all others to get final percent of allocation given to enrollment";
                        };
                    };
                    readonly required: readonly ["enrollmentId", "multiplier"];
                };
            };
            readonly requireAllEnrollmentIds: {
                readonly type: "boolean";
                readonly description: "If true, throw an error if some of the program's enrollment IDs are missing from the enrollments list";
            };
        };
        readonly required: readonly ["amountToAllocate", "enrollments"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly programId: {
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Specifies the program to create a reward snapshot for";
                };
            };
            readonly required: readonly ["programId"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-api-key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "API key for your game";
                };
            };
            readonly required: readonly ["x-api-key"];
        }];
    };
    readonly response: {
        readonly "201": {
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly description: "The ID of the LoyaltyRewardsSnapshot";
                };
                readonly created: {
                    readonly type: "number";
                    readonly description: "The date the LoyaltyRewardsSnapshot was created";
                };
                readonly programId: {
                    readonly type: "string";
                    readonly description: "The ID of the LoyaltyProgram the LoyaltyRewardsSnapshot belongs to";
                };
                readonly allocatedRewards: {
                    readonly type: "string";
                    readonly description: "The amount of rewards the LoyaltyRewardsSnapshot contains (in subunits - no decimals)";
                };
                readonly status: {
                    readonly type: "object";
                    readonly description: "The current status of the LoyaltyRewardsSnapshot";
                    readonly additionalProperties: true;
                };
                readonly errorMessage: {
                    readonly type: "string";
                    readonly description: "Error message, if any status is Error";
                };
                readonly publishedTransactionHash: {
                    readonly type: "string";
                    readonly description: "The transaction hash used to publish this snapshot, if it has been published";
                };
            };
            readonly required: readonly ["id", "created", "programId", "allocatedRewards", "status"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const LoyaltyProgramControllerDeleteLoyaltyProgram: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly programId: {
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Specifies the program to delete";
                };
            };
            readonly required: readonly ["programId"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-api-key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "API key for your game";
                };
                readonly "x-wallet-key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["x-api-key", "x-wallet-key"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly transactionId: {
                    readonly type: "string";
                    readonly description: "GameShift transaction id";
                };
                readonly transactionHash: {
                    readonly type: "string";
                    readonly description: "Transaction hash";
                };
            };
            readonly required: readonly ["transactionId", "transactionHash"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const LoyaltyProgramControllerEnrollUserInLoyaltyProgram: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly amount: {
                readonly type: "string";
                readonly description: "The amount of tokens to enroll (decimals ok)";
            };
            readonly userId: {
                readonly type: "string";
                readonly description: "The reference user ID of the enrollment";
            };
            readonly enrollmentPeriod: {
                readonly type: "number";
                readonly description: "The period of enrollment in seconds";
            };
        };
        readonly required: readonly ["amount", "userId", "enrollmentPeriod"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly programId: {
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Specifies the program to enroll the user in";
                };
            };
            readonly required: readonly ["programId"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-api-key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "API key for your game";
                };
            };
            readonly required: readonly ["x-api-key"];
        }];
    };
    readonly response: {
        readonly "201": {
            readonly type: "object";
            readonly properties: {
                readonly transactionId: {
                    readonly type: "string";
                    readonly description: "The id for the transaction. Can be used to get the status of the transaction.";
                };
                readonly consentUrl: {
                    readonly type: "string";
                    readonly description: "The url the user must visit to provide consent for the transaction.";
                };
                readonly enrollmentId: {
                    readonly type: "string";
                    readonly description: "The enrollment ID created if the user's transaction completes successfully";
                };
            };
            readonly required: readonly ["transactionId", "consentUrl", "enrollmentId"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const LoyaltyProgramControllerFundLoyaltyProgramRewards: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly amount: {
                readonly type: "string";
                readonly description: "The amount of tokens to move (supports decimals)";
            };
        };
        readonly required: readonly ["amount"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly programId: {
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Specifies the program to fund rewards for";
                };
            };
            readonly required: readonly ["programId"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-api-key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "API key for your game";
                };
                readonly "x-wallet-key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["x-api-key", "x-wallet-key"];
        }];
    };
    readonly response: {
        readonly "201": {
            readonly type: "object";
            readonly properties: {
                readonly transactionId: {
                    readonly type: "string";
                    readonly description: "GameShift transaction id";
                };
                readonly transactionHash: {
                    readonly type: "string";
                    readonly description: "Transaction hash";
                };
            };
            readonly required: readonly ["transactionId", "transactionHash"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const LoyaltyProgramControllerGetLoyaltyProgram: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly programId: {
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Specifies the program to get";
                };
            };
            readonly required: readonly ["programId"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-api-key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "API key for your game";
                };
            };
            readonly required: readonly ["x-api-key"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly name: {
                    readonly type: "string";
                    readonly description: "The name of the Loyalty Program";
                };
                readonly image: {
                    readonly type: "string";
                    readonly description: "The associated image URL of the Loyalty Program";
                };
                readonly environment: {
                    readonly type: "object";
                    readonly description: "The Environment of the Enrollment";
                    readonly additionalProperties: true;
                };
                readonly id: {
                    readonly type: "string";
                    readonly description: "The ID of the Loyalty Program";
                };
                readonly address: {
                    readonly type: "string";
                    readonly description: "The on-chain address of the Loyalty Program";
                };
                readonly enrollmentCurrencyId: {
                    readonly type: "string";
                    readonly description: "The currency id of the enrollment currency. Register new currencies under /nx/currencies";
                };
                readonly enrollmentMintAddress: {
                    readonly type: "string";
                    readonly description: "The on-chain address of the enrollment currency";
                };
                readonly rewardCurrencyId: {
                    readonly type: "string";
                    readonly description: "The currency id of the reward currency. Register new currencies under /nx/currencies";
                };
                readonly rewardMintAddress: {
                    readonly type: "string";
                    readonly description: "The on-chain address of the reward currency";
                };
                readonly maxTokens: {
                    readonly type: "string";
                    readonly description: "The max number of tokens that can be enrolled in this program";
                };
                readonly maxEnrollmentPeriod: {
                    readonly type: "number";
                    readonly description: "The max amount of time in seconds that an enrollment can last in this program";
                };
                readonly minEnrollmentPeriod: {
                    readonly type: "number";
                    readonly description: "The min amount of time in seconds that an enrollment can last in this program";
                };
                readonly maxEnrollments: {
                    readonly type: "number";
                    readonly description: "The max number of enrollments that this program can support";
                };
                readonly projectId: {
                    readonly type: "string";
                    readonly description: "The project ID that owns this Loyalty Program";
                };
                readonly adminAddress: {
                    readonly type: "string";
                    readonly description: "The on-chain address of the wallet that has administrative control over this Loyalty Program";
                };
                readonly fundingAddress: {
                    readonly type: "string";
                    readonly description: "The on-chain address of the rewards token account";
                };
                readonly currentSnapshotId: {
                    readonly type: "string";
                    readonly description: "The ID of the latest snapshot of the rewards in the program (if one exists)";
                };
                readonly rewards: {
                    readonly description: "A breakdown of rewards that have been allocated to enrollments";
                    readonly type: "object";
                    readonly required: readonly ["totalAllocated", "totalUnallocated", "totalClaimed", "rewardFunding"];
                    readonly properties: {
                        readonly totalAllocated: {
                            readonly type: "string";
                            readonly description: "The total amount of rewards that have been allocated to enrollments";
                        };
                        readonly totalUnallocated: {
                            readonly type: "string";
                            readonly description: "The unallocated rewards that are just sitting in the program";
                        };
                        readonly totalClaimed: {
                            readonly type: "string";
                            readonly description: "The amount of rewards claimed from the program";
                        };
                        readonly rewardFunding: {
                            readonly type: "string";
                            readonly description: "The total amount of rewards that are currently in the program";
                        };
                    };
                };
                readonly allowNewEnrollees: {
                    readonly type: "boolean";
                    readonly description: "Whether new enrollments are currently allowed in the program (can be changed by administrator wallet)";
                };
            };
            readonly required: readonly ["name", "image", "environment", "id", "address", "enrollmentCurrencyId", "enrollmentMintAddress", "rewardCurrencyId", "rewardMintAddress", "maxTokens", "maxEnrollmentPeriod", "minEnrollmentPeriod", "maxEnrollments", "projectId", "adminAddress", "fundingAddress", "rewards", "allowNewEnrollees"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const LoyaltyProgramControllerGetLoyaltyProgramEnrollments: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly programId: {
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Specifies the program to get enrollment for";
                };
            };
            readonly required: readonly ["programId"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly page: {
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Specifies the page to fetch";
                };
                readonly perPage: {
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of items on each page";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-api-key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "API key for your game";
                };
            };
            readonly required: readonly ["x-api-key"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly description: "A list of Enrollments";
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly environment: {
                                readonly type: "object";
                                readonly description: "The Environment of the Enrollment";
                                readonly additionalProperties: true;
                            };
                            readonly id: {
                                readonly type: "string";
                                readonly description: "The ID of the Enrollment";
                            };
                            readonly enrollmentAddress: {
                                readonly type: "string";
                                readonly description: "The on-chain address of the Enrollment";
                            };
                            readonly lastSnapshotId: {
                                readonly type: "string";
                                readonly description: "The ID of the last reward snapshot issued that included the Enrollment";
                            };
                            readonly enrollmentStartTime: {
                                readonly format: "date-time";
                                readonly type: "string";
                                readonly description: "The time the Enrollment was created";
                            };
                            readonly commitmentPeriod: {
                                readonly type: "number";
                                readonly description: "The time in seconds that the Enrollment will last for";
                            };
                            readonly elapsedEnrollmentTime: {
                                readonly type: "number";
                                readonly description: "Time elapsed since the creation of the Enrollment (in seconds)";
                            };
                            readonly enrollmentPeriod: {
                                readonly type: "number";
                                readonly description: "The time that the Enrollment is committed to before it can claim rewards";
                            };
                            readonly ownerAddress: {
                                readonly type: "string";
                                readonly description: "The on-chain address of the owner of the Enrollment";
                            };
                            readonly ownerId: {
                                readonly type: "string";
                                readonly description: "The user reference ID of the owner of the Enrollment";
                            };
                            readonly programId: {
                                readonly type: "string";
                                readonly description: "The ID of the LoyaltyProgram the Enrollment belongs to";
                            };
                            readonly programAddress: {
                                readonly type: "string";
                                readonly description: "The on-chain address of the LoyaltyProgram the Enrollment belongs to";
                            };
                            readonly enrolledBalance: {
                                readonly type: "string";
                                readonly description: "The balance of the Enrollment";
                            };
                            readonly allocatedRewards: {
                                readonly type: "string";
                                readonly description: "The allocated reward balance of the Enrollment";
                            };
                            readonly claimedRewards: {
                                readonly type: "string";
                                readonly description: "Number of allocated rewards claimed so far, for the Enrollment";
                            };
                        };
                        readonly required: readonly ["environment", "id", "enrollmentAddress", "enrollmentStartTime", "commitmentPeriod", "elapsedEnrollmentTime", "enrollmentPeriod", "ownerAddress", "ownerId", "programId", "programAddress", "enrolledBalance", "allocatedRewards", "claimedRewards"];
                    };
                };
                readonly meta: {
                    readonly description: "Pagination related metadata";
                    readonly type: "object";
                    readonly required: readonly ["page", "perPage", "totalPages", "totalResults"];
                    readonly properties: {
                        readonly page: {
                            readonly type: "number";
                            readonly description: "The page number fetched";
                        };
                        readonly perPage: {
                            readonly type: "number";
                            readonly description: "The number of items in each page";
                        };
                        readonly totalPages: {
                            readonly type: "number";
                            readonly description: "The total number of pages in all results";
                        };
                        readonly totalResults: {
                            readonly type: "number";
                            readonly description: "The total result count";
                        };
                    };
                };
            };
            readonly required: readonly ["data", "meta"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const LoyaltyProgramControllerGetLoyaltyProgramRewardSnapshot: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly rewardsId: {
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Specifies the reward snapshot to retrieve";
                };
                readonly programId: {
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Specifies the program this reward snapshot was created for";
                };
            };
            readonly required: readonly ["rewardsId", "programId"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-api-key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "API key for your game";
                };
            };
            readonly required: readonly ["x-api-key"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly description: "The ID of the LoyaltyRewardsSnapshot";
                };
                readonly created: {
                    readonly type: "number";
                    readonly description: "The date the LoyaltyRewardsSnapshot was created";
                };
                readonly programId: {
                    readonly type: "string";
                    readonly description: "The ID of the LoyaltyProgram the LoyaltyRewardsSnapshot belongs to";
                };
                readonly allocatedRewards: {
                    readonly type: "string";
                    readonly description: "The amount of rewards the LoyaltyRewardsSnapshot contains (in subunits - no decimals)";
                };
                readonly status: {
                    readonly type: "object";
                    readonly description: "The current status of the LoyaltyRewardsSnapshot";
                    readonly additionalProperties: true;
                };
                readonly errorMessage: {
                    readonly type: "string";
                    readonly description: "Error message, if any status is Error";
                };
                readonly publishedTransactionHash: {
                    readonly type: "string";
                    readonly description: "The transaction hash used to publish this snapshot, if it has been published";
                };
            };
            readonly required: readonly ["id", "created", "programId", "allocatedRewards", "status"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const LoyaltyProgramControllerGetLoyaltyProgramRewards: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly programId: {
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Specifies the program this reward snapshot was created for";
                };
            };
            readonly required: readonly ["programId"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly page: {
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Specifies the page to fetch";
                };
                readonly perPage: {
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of items on each page";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-api-key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "API key for your game";
                };
            };
            readonly required: readonly ["x-api-key"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly description: "A list of Reward Snapshots";
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly id: {
                                readonly type: "string";
                                readonly description: "The ID of the LoyaltyRewardsSnapshot";
                            };
                            readonly created: {
                                readonly type: "number";
                                readonly description: "The date the LoyaltyRewardsSnapshot was created";
                            };
                            readonly programId: {
                                readonly type: "string";
                                readonly description: "The ID of the LoyaltyProgram the LoyaltyRewardsSnapshot belongs to";
                            };
                            readonly allocatedRewards: {
                                readonly type: "string";
                                readonly description: "The amount of rewards the LoyaltyRewardsSnapshot contains (in subunits - no decimals)";
                            };
                            readonly status: {
                                readonly type: "object";
                                readonly description: "The current status of the LoyaltyRewardsSnapshot";
                                readonly additionalProperties: true;
                            };
                            readonly errorMessage: {
                                readonly type: "string";
                                readonly description: "Error message, if any status is Error";
                            };
                            readonly publishedTransactionHash: {
                                readonly type: "string";
                                readonly description: "The transaction hash used to publish this snapshot, if it has been published";
                            };
                        };
                        readonly required: readonly ["id", "created", "programId", "allocatedRewards", "status"];
                    };
                };
                readonly meta: {
                    readonly description: "Pagination related metadata";
                    readonly type: "object";
                    readonly required: readonly ["page", "perPage", "totalPages", "totalResults"];
                    readonly properties: {
                        readonly page: {
                            readonly type: "number";
                            readonly description: "The page number fetched";
                        };
                        readonly perPage: {
                            readonly type: "number";
                            readonly description: "The number of items in each page";
                        };
                        readonly totalPages: {
                            readonly type: "number";
                            readonly description: "The total number of pages in all results";
                        };
                        readonly totalResults: {
                            readonly type: "number";
                            readonly description: "The total result count";
                        };
                    };
                };
            };
            readonly required: readonly ["data", "meta"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const LoyaltyProgramControllerGetLoyaltyProgramStatsSummary: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly programId: {
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Specifies the program to get stats for";
                };
            };
            readonly required: readonly ["programId"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-api-key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "API key for your game";
                };
            };
            readonly required: readonly ["x-api-key"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly enrollees: {
                    readonly description: "Breakdown of enrollees";
                    readonly type: "object";
                    readonly required: readonly ["uniqueUsers"];
                    readonly properties: {
                        readonly uniqueUsers: {
                            readonly type: "number";
                            readonly description: "Total number of unique users who have enrolled in the program";
                        };
                    };
                };
                readonly enrollments: {
                    readonly description: "Breakdown of enrollments";
                    readonly type: "object";
                    readonly required: readonly ["totalEnrollments", "enrollmentPeriodComplete", "enrollmentPeriodOngoing", "totalEnrolledTokens"];
                    readonly properties: {
                        readonly totalEnrollments: {
                            readonly type: "number";
                            readonly description: "Total number of enrollments in the program";
                        };
                        readonly enrollmentPeriodComplete: {
                            readonly type: "number";
                            readonly description: "Total number of enrollments that have completed";
                        };
                        readonly enrollmentPeriodOngoing: {
                            readonly type: "number";
                            readonly description: "Total number of enrollments that are ongoing";
                        };
                        readonly totalEnrolledTokens: {
                            readonly type: "string";
                            readonly description: "Total number of enrollments enrolled in the program";
                        };
                    };
                };
                readonly rewards: {
                    readonly description: "Breakdown of rewards";
                    readonly type: "object";
                    readonly required: readonly ["totalAllocated", "totalUnallocated", "totalClaimed", "rewardFunding"];
                    readonly properties: {
                        readonly totalAllocated: {
                            readonly type: "string";
                            readonly description: "The total amount of rewards that have been allocated to enrollments";
                        };
                        readonly totalUnallocated: {
                            readonly type: "string";
                            readonly description: "The unallocated rewards that are just sitting in the program";
                        };
                        readonly totalClaimed: {
                            readonly type: "string";
                            readonly description: "The amount of rewards claimed from the program";
                        };
                        readonly rewardFunding: {
                            readonly type: "string";
                            readonly description: "The total amount of rewards that are currently in the program";
                        };
                    };
                };
            };
            readonly required: readonly ["enrollees", "enrollments", "rewards"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const LoyaltyProgramControllerGetLoyaltyPrograms: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly page: {
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Specifies the page to fetch";
                };
                readonly perPage: {
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of items on each page";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-api-key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "API key for your game";
                };
            };
            readonly required: readonly ["x-api-key"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly description: "The loyalty programs";
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly name: {
                                readonly type: "string";
                                readonly description: "The name of the Loyalty Program";
                            };
                            readonly image: {
                                readonly type: "string";
                                readonly description: "The associated image URL of the Loyalty Program";
                            };
                            readonly environment: {
                                readonly type: "object";
                                readonly description: "The Environment of the Enrollment";
                                readonly additionalProperties: true;
                            };
                            readonly id: {
                                readonly type: "string";
                                readonly description: "The ID of the Loyalty Program";
                            };
                            readonly address: {
                                readonly type: "string";
                                readonly description: "The on-chain address of the Loyalty Program";
                            };
                            readonly enrollmentCurrencyId: {
                                readonly type: "string";
                                readonly description: "The currency id of the enrollment currency. Register new currencies under /nx/currencies";
                            };
                            readonly enrollmentMintAddress: {
                                readonly type: "string";
                                readonly description: "The on-chain address of the enrollment currency";
                            };
                            readonly rewardCurrencyId: {
                                readonly type: "string";
                                readonly description: "The currency id of the reward currency. Register new currencies under /nx/currencies";
                            };
                            readonly rewardMintAddress: {
                                readonly type: "string";
                                readonly description: "The on-chain address of the reward currency";
                            };
                            readonly maxTokens: {
                                readonly type: "string";
                                readonly description: "The max number of tokens that can be enrolled in this program";
                            };
                            readonly maxEnrollmentPeriod: {
                                readonly type: "number";
                                readonly description: "The max amount of time in seconds that an enrollment can last in this program";
                            };
                            readonly minEnrollmentPeriod: {
                                readonly type: "number";
                                readonly description: "The min amount of time in seconds that an enrollment can last in this program";
                            };
                            readonly maxEnrollments: {
                                readonly type: "number";
                                readonly description: "The max number of enrollments that this program can support";
                            };
                            readonly projectId: {
                                readonly type: "string";
                                readonly description: "The project ID that owns this Loyalty Program";
                            };
                            readonly adminAddress: {
                                readonly type: "string";
                                readonly description: "The on-chain address of the wallet that has administrative control over this Loyalty Program";
                            };
                            readonly fundingAddress: {
                                readonly type: "string";
                                readonly description: "The on-chain address of the rewards token account";
                            };
                            readonly currentSnapshotId: {
                                readonly type: "string";
                                readonly description: "The ID of the latest snapshot of the rewards in the program (if one exists)";
                            };
                            readonly rewards: {
                                readonly description: "A breakdown of rewards that have been allocated to enrollments";
                                readonly type: "object";
                                readonly required: readonly ["totalAllocated", "totalUnallocated", "totalClaimed", "rewardFunding"];
                                readonly properties: {
                                    readonly totalAllocated: {
                                        readonly type: "string";
                                        readonly description: "The total amount of rewards that have been allocated to enrollments";
                                    };
                                    readonly totalUnallocated: {
                                        readonly type: "string";
                                        readonly description: "The unallocated rewards that are just sitting in the program";
                                    };
                                    readonly totalClaimed: {
                                        readonly type: "string";
                                        readonly description: "The amount of rewards claimed from the program";
                                    };
                                    readonly rewardFunding: {
                                        readonly type: "string";
                                        readonly description: "The total amount of rewards that are currently in the program";
                                    };
                                };
                            };
                            readonly allowNewEnrollees: {
                                readonly type: "boolean";
                                readonly description: "Whether new enrollments are currently allowed in the program (can be changed by administrator wallet)";
                            };
                        };
                        readonly required: readonly ["name", "image", "environment", "id", "address", "enrollmentCurrencyId", "enrollmentMintAddress", "rewardCurrencyId", "rewardMintAddress", "maxTokens", "maxEnrollmentPeriod", "minEnrollmentPeriod", "maxEnrollments", "projectId", "adminAddress", "fundingAddress", "rewards", "allowNewEnrollees"];
                    };
                };
                readonly meta: {
                    readonly description: "Pagination related metadata";
                    readonly type: "object";
                    readonly required: readonly ["page", "perPage", "totalPages", "totalResults"];
                    readonly properties: {
                        readonly page: {
                            readonly type: "number";
                            readonly description: "The page number fetched";
                        };
                        readonly perPage: {
                            readonly type: "number";
                            readonly description: "The number of items in each page";
                        };
                        readonly totalPages: {
                            readonly type: "number";
                            readonly description: "The total number of pages in all results";
                        };
                        readonly totalResults: {
                            readonly type: "number";
                            readonly description: "The total result count";
                        };
                    };
                };
            };
            readonly required: readonly ["data", "meta"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const LoyaltyProgramControllerSetLoyaltyProgramName: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly name: {
                readonly type: "string";
                readonly description: "The new name of the program";
            };
            readonly image: {
                readonly type: "string";
                readonly description: "URL for the Loyalty Program's image";
                readonly default: "https://solana.com/src/img/branding/solanaLogoMark.png";
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly programId: {
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Specifies the program to set the metadata of";
                };
            };
            readonly required: readonly ["programId"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-api-key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "API key for your game";
                };
            };
            readonly required: readonly ["x-api-key"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly description: "The ID of the Loyalty Program";
                };
                readonly name: {
                    readonly type: "string";
                    readonly description: "The name of the Loyalty Program";
                };
                readonly image: {
                    readonly type: "string";
                    readonly description: "The associated image URL of the Loyalty Program";
                };
            };
            readonly required: readonly ["id", "name", "image"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const LoyaltyProgramControllerUpdateLoyaltyProgram: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly programId: {
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Specifies the program to update";
                };
            };
            readonly required: readonly ["programId"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly open: {
                    readonly type: "boolean";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["open"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-api-key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "API key for your game";
                };
                readonly "x-wallet-key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["x-api-key", "x-wallet-key"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly transactionId: {
                    readonly type: "string";
                    readonly description: "GameShift transaction id";
                };
                readonly transactionHash: {
                    readonly type: "string";
                    readonly description: "Transaction hash";
                };
            };
            readonly required: readonly ["transactionId", "transactionHash"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const LoyaltyProgramControllerWithdrawLoyaltyProgramRewards: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly amount: {
                readonly type: "string";
                readonly description: "The amount of tokens to move (supports decimals)";
            };
        };
        readonly required: readonly ["amount"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly programId: {
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Specifies the program to withdraw unallocated rewards from";
                };
            };
            readonly required: readonly ["programId"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-api-key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "API key for your game";
                };
                readonly "x-wallet-key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["x-api-key", "x-wallet-key"];
        }];
    };
    readonly response: {
        readonly "201": {
            readonly type: "object";
            readonly properties: {
                readonly transactionId: {
                    readonly type: "string";
                    readonly description: "GameShift transaction id";
                };
                readonly transactionHash: {
                    readonly type: "string";
                    readonly description: "Transaction hash";
                };
            };
            readonly required: readonly ["transactionId", "transactionHash"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const LoyaltyProgramEnrollmentsControllerClaimRewardsFromLoyaltyProgram: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly amount: {
                readonly type: "string";
                readonly description: "The amount to claim (decimals ok)";
            };
        };
        readonly required: readonly ["amount"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly enrollmentId: {
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Specifies the enrollment to claim rewards for";
                };
            };
            readonly required: readonly ["enrollmentId"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-api-key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "API key for your game";
                };
            };
            readonly required: readonly ["x-api-key"];
        }];
    };
    readonly response: {
        readonly "201": {
            readonly type: "object";
            readonly properties: {
                readonly transactionId: {
                    readonly type: "string";
                    readonly description: "The id for the transaction. Can be used to get the status of the transaction.";
                };
                readonly consentUrl: {
                    readonly type: "string";
                    readonly description: "The url the user must visit to provide consent for the transaction.";
                };
            };
            readonly required: readonly ["transactionId", "consentUrl"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const LoyaltyProgramEnrollmentsControllerDisenrollUserFromLoyaltyProgram: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly forfeitRewardsOnDisenroll: {
                readonly type: "boolean";
                readonly description: "Whether to allow unclaimed rewards to be forfeited";
                readonly default: false;
            };
        };
        readonly required: readonly ["forfeitRewardsOnDisenroll"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly enrollmentId: {
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Specifies the enrollment to delete";
                };
            };
            readonly required: readonly ["enrollmentId"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-api-key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "API key for your game";
                };
            };
            readonly required: readonly ["x-api-key"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly transactionId: {
                    readonly type: "string";
                    readonly description: "The id for the transaction. Can be used to get the status of the transaction.";
                };
                readonly consentUrl: {
                    readonly type: "string";
                    readonly description: "The url the user must visit to provide consent for the transaction.";
                };
            };
            readonly required: readonly ["transactionId", "consentUrl"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const LoyaltyProgramEnrollmentsControllerGetLoyaltyProgramEnrollmentById: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly enrollmentId: {
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Specifies the enrollment to fetch";
                };
            };
            readonly required: readonly ["enrollmentId"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-api-key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "API key for your game";
                };
            };
            readonly required: readonly ["x-api-key"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly environment: {
                    readonly type: "object";
                    readonly description: "The Environment of the Enrollment";
                    readonly additionalProperties: true;
                };
                readonly id: {
                    readonly type: "string";
                    readonly description: "The ID of the Enrollment";
                };
                readonly enrollmentAddress: {
                    readonly type: "string";
                    readonly description: "The on-chain address of the Enrollment";
                };
                readonly lastSnapshotId: {
                    readonly type: "string";
                    readonly description: "The ID of the last reward snapshot issued that included the Enrollment";
                };
                readonly enrollmentStartTime: {
                    readonly format: "date-time";
                    readonly type: "string";
                    readonly description: "The time the Enrollment was created";
                };
                readonly commitmentPeriod: {
                    readonly type: "number";
                    readonly description: "The time in seconds that the Enrollment will last for";
                };
                readonly elapsedEnrollmentTime: {
                    readonly type: "number";
                    readonly description: "Time elapsed since the creation of the Enrollment (in seconds)";
                };
                readonly enrollmentPeriod: {
                    readonly type: "number";
                    readonly description: "The time that the Enrollment is committed to before it can claim rewards";
                };
                readonly ownerAddress: {
                    readonly type: "string";
                    readonly description: "The on-chain address of the owner of the Enrollment";
                };
                readonly ownerId: {
                    readonly type: "string";
                    readonly description: "The user reference ID of the owner of the Enrollment";
                };
                readonly programId: {
                    readonly type: "string";
                    readonly description: "The ID of the LoyaltyProgram the Enrollment belongs to";
                };
                readonly programAddress: {
                    readonly type: "string";
                    readonly description: "The on-chain address of the LoyaltyProgram the Enrollment belongs to";
                };
                readonly enrolledBalance: {
                    readonly type: "string";
                    readonly description: "The balance of the Enrollment";
                };
                readonly allocatedRewards: {
                    readonly type: "string";
                    readonly description: "The allocated reward balance of the Enrollment";
                };
                readonly claimedRewards: {
                    readonly type: "string";
                    readonly description: "Number of allocated rewards claimed so far, for the Enrollment";
                };
            };
            readonly required: readonly ["environment", "id", "enrollmentAddress", "enrollmentStartTime", "commitmentPeriod", "elapsedEnrollmentTime", "enrollmentPeriod", "ownerAddress", "ownerId", "programId", "programAddress", "enrolledBalance", "allocatedRewards", "claimedRewards"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const LoyaltyProgramEnrollmentsControllerGetLoyaltyProgramEnrollmentsByProject: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly page: {
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Specifies the page to fetch";
                };
                readonly perPage: {
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of items on each page";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-api-key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "API key for your game";
                };
            };
            readonly required: readonly ["x-api-key"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly description: "A list of Enrollments";
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly environment: {
                                readonly type: "object";
                                readonly description: "The Environment of the Enrollment";
                                readonly additionalProperties: true;
                            };
                            readonly id: {
                                readonly type: "string";
                                readonly description: "The ID of the Enrollment";
                            };
                            readonly enrollmentAddress: {
                                readonly type: "string";
                                readonly description: "The on-chain address of the Enrollment";
                            };
                            readonly lastSnapshotId: {
                                readonly type: "string";
                                readonly description: "The ID of the last reward snapshot issued that included the Enrollment";
                            };
                            readonly enrollmentStartTime: {
                                readonly format: "date-time";
                                readonly type: "string";
                                readonly description: "The time the Enrollment was created";
                            };
                            readonly commitmentPeriod: {
                                readonly type: "number";
                                readonly description: "The time in seconds that the Enrollment will last for";
                            };
                            readonly elapsedEnrollmentTime: {
                                readonly type: "number";
                                readonly description: "Time elapsed since the creation of the Enrollment (in seconds)";
                            };
                            readonly enrollmentPeriod: {
                                readonly type: "number";
                                readonly description: "The time that the Enrollment is committed to before it can claim rewards";
                            };
                            readonly ownerAddress: {
                                readonly type: "string";
                                readonly description: "The on-chain address of the owner of the Enrollment";
                            };
                            readonly ownerId: {
                                readonly type: "string";
                                readonly description: "The user reference ID of the owner of the Enrollment";
                            };
                            readonly programId: {
                                readonly type: "string";
                                readonly description: "The ID of the LoyaltyProgram the Enrollment belongs to";
                            };
                            readonly programAddress: {
                                readonly type: "string";
                                readonly description: "The on-chain address of the LoyaltyProgram the Enrollment belongs to";
                            };
                            readonly enrolledBalance: {
                                readonly type: "string";
                                readonly description: "The balance of the Enrollment";
                            };
                            readonly allocatedRewards: {
                                readonly type: "string";
                                readonly description: "The allocated reward balance of the Enrollment";
                            };
                            readonly claimedRewards: {
                                readonly type: "string";
                                readonly description: "Number of allocated rewards claimed so far, for the Enrollment";
                            };
                        };
                        readonly required: readonly ["environment", "id", "enrollmentAddress", "enrollmentStartTime", "commitmentPeriod", "elapsedEnrollmentTime", "enrollmentPeriod", "ownerAddress", "ownerId", "programId", "programAddress", "enrolledBalance", "allocatedRewards", "claimedRewards"];
                    };
                };
                readonly meta: {
                    readonly description: "Pagination related metadata";
                    readonly type: "object";
                    readonly required: readonly ["page", "perPage", "totalPages", "totalResults"];
                    readonly properties: {
                        readonly page: {
                            readonly type: "number";
                            readonly description: "The page number fetched";
                        };
                        readonly perPage: {
                            readonly type: "number";
                            readonly description: "The number of items in each page";
                        };
                        readonly totalPages: {
                            readonly type: "number";
                            readonly description: "The total number of pages in all results";
                        };
                        readonly totalResults: {
                            readonly type: "number";
                            readonly description: "The total result count";
                        };
                    };
                };
            };
            readonly required: readonly ["data", "meta"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PaymentControllerCheckout: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly title: {
                readonly type: "string";
                readonly minLength: 1;
                readonly description: "Item being purchased";
            };
            readonly description: {
                readonly type: "string";
                readonly minLength: 1;
                readonly description: "Describes the item being purchased";
            };
            readonly price: {
                readonly description: "Price of the item";
                readonly type: "object";
                readonly required: readonly ["currencyId", "naturalAmount"];
                readonly properties: {
                    readonly currencyId: {
                        readonly minLength: 1;
                        readonly type: "string";
                        readonly description: "The currency identifier";
                    };
                    readonly naturalAmount: {
                        readonly type: "string";
                        readonly minLength: 1;
                        readonly description: "The amount in the human readable format";
                    };
                };
            };
            readonly quantity: {
                readonly type: "number";
                readonly description: "Amount of items being purchased";
            };
            readonly buyerId: {
                readonly type: "string";
                readonly minLength: 1;
                readonly description: "Identifies the `User` buying the item";
            };
        };
        readonly required: readonly ["title", "description", "price", "quantity", "buyerId"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly "x-api-key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "API key for your game";
                };
            };
            readonly required: readonly ["x-api-key"];
        }];
    };
    readonly response: {
        readonly "201": {
            readonly type: "object";
            readonly properties: {
                readonly checkoutUrl: {
                    readonly type: "string";
                    readonly description: "A URL the User must visit to complete the payment";
                };
                readonly id: {
                    readonly type: "string";
                    readonly description: "An id used to reference the payment";
                };
            };
            readonly required: readonly ["checkoutUrl", "id"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PaymentControllerGet: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly paymentId: {
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Identifies the payment";
                };
            };
            readonly required: readonly ["paymentId"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-api-key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "API key for your game";
                };
            };
            readonly required: readonly ["x-api-key"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly description: "The ID of the payment";
                };
                readonly environment: {
                    readonly type: "string";
                    readonly description: "Environment the payment initiated on\n\n`Development` `Production`";
                    readonly enum: readonly ["Development", "Production"];
                };
                readonly purchaser: {
                    readonly description: "The user making the purchase";
                    readonly type: "object";
                    readonly required: readonly ["referenceId", "email"];
                    readonly properties: {
                        readonly referenceId: {
                            readonly type: "string";
                            readonly description: "The reference id of the user";
                        };
                        readonly email: {
                            readonly type: "string";
                            readonly description: "The email of the user";
                        };
                    };
                };
                readonly price: {
                    readonly description: "The payment amount";
                    readonly type: "object";
                    readonly required: readonly ["currencyId", "naturalAmount"];
                    readonly properties: {
                        readonly currencyId: {
                            readonly minLength: 1;
                            readonly type: "string";
                            readonly description: "The currency identifier";
                        };
                        readonly naturalAmount: {
                            readonly type: "string";
                            readonly minLength: 1;
                            readonly description: "The amount in the human readable format";
                        };
                    };
                };
                readonly sku: {
                    readonly description: "What this payment is for";
                    readonly oneOf: readonly [{
                        readonly type: "object";
                        readonly properties: {
                            readonly type: {
                                readonly type: "string";
                                readonly description: "Indicates that this payment is for a Unique Asset\n\n`MarketplaceSale`";
                                readonly enum: readonly ["MarketplaceSale"];
                            };
                            readonly item: {
                                readonly description: "The Unique Asset the payment is for.";
                                readonly type: "object";
                                readonly required: readonly ["id", "created", "name", "description", "environment", "imported", "imageUrl", "status", "forSale", "mintAddress"];
                                readonly properties: {
                                    readonly id: {
                                        readonly type: "string";
                                        readonly description: "The ID of the Asset";
                                    };
                                    readonly attributes: {
                                        readonly description: "The attributes of the Asset";
                                        readonly type: "array";
                                        readonly items: {
                                            readonly type: "object";
                                            readonly required: readonly ["traitType", "value"];
                                            readonly properties: {
                                                readonly traitType: {
                                                    readonly type: "string";
                                                    readonly description: "The name of the trait";
                                                };
                                                readonly value: {
                                                    readonly type: "string";
                                                    readonly description: "The value of the trait";
                                                };
                                            };
                                        };
                                    };
                                    readonly created: {
                                        readonly type: "number";
                                        readonly description: "The date the Asset was created";
                                    };
                                    readonly name: {
                                        readonly type: "string";
                                        readonly description: "The name of the Asset";
                                    };
                                    readonly collection: {
                                        readonly description: "The collection the Asset belongs to";
                                        readonly type: "object";
                                        readonly required: readonly ["id", "name", "description", "environment", "imported", "created"];
                                        readonly properties: {
                                            readonly id: {
                                                readonly type: "string";
                                                readonly description: "The id of the collection. This is not an on-chain address, but instead an ID internal to GameShift";
                                            };
                                            readonly name: {
                                                readonly type: "string";
                                                readonly description: "The name given to the collection";
                                            };
                                            readonly description: {
                                                readonly type: "string";
                                                readonly description: "The description given to the collection";
                                            };
                                            readonly environment: {
                                                readonly type: "string";
                                                readonly description: "The collection's environment\n\n`Development` `Production`";
                                                readonly enum: readonly ["Development", "Production"];
                                            };
                                            readonly imageUrl: {
                                                readonly type: readonly ["string", "null"];
                                                readonly description: "The url of the image used to represent the collection";
                                            };
                                            readonly imported: {
                                                readonly type: "boolean";
                                                readonly description: "Whether the collection was imported";
                                            };
                                            readonly mintAddress: {
                                                readonly type: readonly ["string", "null"];
                                                readonly description: "The mint address of the collection on-chain";
                                            };
                                            readonly created: {
                                                readonly type: "number";
                                                readonly description: "Timestamp of collection creation";
                                            };
                                            readonly stats: {
                                                readonly description: "Statistics about the collection";
                                                readonly type: "object";
                                                readonly required: readonly ["numMinted", "floorPrice", "numListed", "numOwners"];
                                                readonly properties: {
                                                    readonly numMinted: {
                                                        readonly type: "number";
                                                        readonly description: "The number of assets minted for this collection";
                                                    };
                                                    readonly floorPrice: {
                                                        readonly type: "number";
                                                        readonly description: "The floor price of the collection";
                                                    };
                                                    readonly numListed: {
                                                        readonly type: "number";
                                                        readonly description: "The number of assets listed for this collection";
                                                    };
                                                    readonly numOwners: {
                                                        readonly type: "number";
                                                        readonly description: "The number of unique owners of assets in this collection";
                                                    };
                                                };
                                            };
                                        };
                                    };
                                    readonly description: {
                                        readonly type: "string";
                                        readonly description: "The description provided when the Asset was created";
                                    };
                                    readonly environment: {
                                        readonly type: "string";
                                        readonly description: "The asset's environment\n\n`Development` `Production`";
                                        readonly enum: readonly ["Development", "Production"];
                                    };
                                    readonly imported: {
                                        readonly type: "boolean";
                                        readonly description: "Indicates if the asset belongs to an imported collection";
                                    };
                                    readonly imageUrl: {
                                        readonly type: "string";
                                        readonly description: "The URI for the image representing the Asset";
                                    };
                                    readonly status: {
                                        readonly type: "string";
                                        readonly description: "The current status of the Asset\n\n`Uninitiated` `Unprocessed` `Processing` `Committed` `Failed`";
                                        readonly enum: readonly ["Uninitiated", "Unprocessed", "Processing", "Committed", "Failed"];
                                    };
                                    readonly forSale: {
                                        readonly type: "boolean";
                                        readonly description: "Indicates if the asset is currently for sale";
                                    };
                                    readonly mintAddress: {
                                        readonly type: "string";
                                        readonly description: "The address of the Asset on the blockchain";
                                    };
                                    readonly owner: {
                                        readonly description: "The current owner of the Asset.";
                                        readonly type: readonly ["object", "null"];
                                        readonly properties: {
                                            readonly address: {
                                                readonly type: readonly ["string", "null"];
                                                readonly description: "The wallet that currently holds this asset";
                                            };
                                            readonly referenceId: {
                                                readonly type: readonly ["string", "null"];
                                                readonly description: "The reference id associated with the wallet";
                                            };
                                        };
                                    };
                                    readonly price: {
                                        readonly type: readonly ["object", "null"];
                                        readonly description: "The price of the asset on the marketplace";
                                        readonly additionalProperties: true;
                                    };
                                };
                            };
                        };
                        readonly required: readonly ["type", "item"];
                    }, {
                        readonly type: "object";
                        readonly properties: {
                            readonly type: {
                                readonly type: "string";
                                readonly description: "Indicates that this payment is for a Unique Asset mint operation.\n\n`AssetMint`";
                                readonly enum: readonly ["AssetMint"];
                            };
                        };
                        readonly required: readonly ["type"];
                    }, {
                        readonly type: "object";
                        readonly properties: {
                            readonly type: {
                                readonly type: "string";
                                readonly description: "Indicates that this payment is for a generic purchase\n\n`Generic`";
                                readonly enum: readonly ["Generic"];
                            };
                        };
                        readonly required: readonly ["type"];
                    }];
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "Status of the payment\n\n`Pending` `Confirmed` `Completed` `Failed` `Expired`";
                    readonly enum: readonly ["Pending", "Confirmed", "Completed", "Failed", "Expired"];
                };
            };
            readonly required: readonly ["id", "environment", "purchaser", "price", "sku", "status"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PaymentControllerGetAll: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly page: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly perPage: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["page", "perPage"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-api-key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "API key for your game";
                };
            };
            readonly required: readonly ["x-api-key"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly description: "A list of Payments";
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly id: {
                                readonly type: "string";
                                readonly description: "The ID of the payment";
                            };
                            readonly environment: {
                                readonly type: "string";
                                readonly description: "Environment the payment initiated on\n\n`Development` `Production`";
                                readonly enum: readonly ["Development", "Production"];
                            };
                            readonly purchaser: {
                                readonly description: "The user making the purchase";
                                readonly type: "object";
                                readonly required: readonly ["referenceId", "email"];
                                readonly properties: {
                                    readonly referenceId: {
                                        readonly type: "string";
                                        readonly description: "The reference id of the user";
                                    };
                                    readonly email: {
                                        readonly type: "string";
                                        readonly description: "The email of the user";
                                    };
                                };
                            };
                            readonly price: {
                                readonly description: "The payment amount";
                                readonly type: "object";
                                readonly required: readonly ["currencyId", "naturalAmount"];
                                readonly properties: {
                                    readonly currencyId: {
                                        readonly minLength: 1;
                                        readonly type: "string";
                                        readonly description: "The currency identifier";
                                    };
                                    readonly naturalAmount: {
                                        readonly type: "string";
                                        readonly minLength: 1;
                                        readonly description: "The amount in the human readable format";
                                    };
                                };
                            };
                            readonly sku: {
                                readonly description: "What this payment is for";
                                readonly oneOf: readonly [{
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly type: {
                                            readonly type: "string";
                                            readonly description: "Indicates that this payment is for a Unique Asset\n\n`MarketplaceSale`";
                                            readonly enum: readonly ["MarketplaceSale"];
                                        };
                                        readonly item: {
                                            readonly description: "The Unique Asset the payment is for.";
                                            readonly type: "object";
                                            readonly required: readonly ["id", "created", "name", "description", "environment", "imported", "imageUrl", "status", "forSale", "mintAddress"];
                                            readonly properties: {
                                                readonly id: {
                                                    readonly type: "string";
                                                    readonly description: "The ID of the Asset";
                                                };
                                                readonly attributes: {
                                                    readonly description: "The attributes of the Asset";
                                                    readonly type: "array";
                                                    readonly items: {
                                                        readonly type: "object";
                                                        readonly required: readonly ["traitType", "value"];
                                                        readonly properties: {
                                                            readonly traitType: {
                                                                readonly type: "string";
                                                                readonly description: "The name of the trait";
                                                            };
                                                            readonly value: {
                                                                readonly type: "string";
                                                                readonly description: "The value of the trait";
                                                            };
                                                        };
                                                    };
                                                };
                                                readonly created: {
                                                    readonly type: "number";
                                                    readonly description: "The date the Asset was created";
                                                };
                                                readonly name: {
                                                    readonly type: "string";
                                                    readonly description: "The name of the Asset";
                                                };
                                                readonly collection: {
                                                    readonly description: "The collection the Asset belongs to";
                                                    readonly type: "object";
                                                    readonly required: readonly ["id", "name", "description", "environment", "imported", "created"];
                                                    readonly properties: {
                                                        readonly id: {
                                                            readonly type: "string";
                                                            readonly description: "The id of the collection. This is not an on-chain address, but instead an ID internal to GameShift";
                                                        };
                                                        readonly name: {
                                                            readonly type: "string";
                                                            readonly description: "The name given to the collection";
                                                        };
                                                        readonly description: {
                                                            readonly type: "string";
                                                            readonly description: "The description given to the collection";
                                                        };
                                                        readonly environment: {
                                                            readonly type: "string";
                                                            readonly description: "The collection's environment\n\n`Development` `Production`";
                                                            readonly enum: readonly ["Development", "Production"];
                                                        };
                                                        readonly imageUrl: {
                                                            readonly type: readonly ["string", "null"];
                                                            readonly description: "The url of the image used to represent the collection";
                                                        };
                                                        readonly imported: {
                                                            readonly type: "boolean";
                                                            readonly description: "Whether the collection was imported";
                                                        };
                                                        readonly mintAddress: {
                                                            readonly type: readonly ["string", "null"];
                                                            readonly description: "The mint address of the collection on-chain";
                                                        };
                                                        readonly created: {
                                                            readonly type: "number";
                                                            readonly description: "Timestamp of collection creation";
                                                        };
                                                        readonly stats: {
                                                            readonly description: "Statistics about the collection";
                                                            readonly type: "object";
                                                            readonly required: readonly ["numMinted", "floorPrice", "numListed", "numOwners"];
                                                            readonly properties: {
                                                                readonly numMinted: {
                                                                    readonly type: "number";
                                                                    readonly description: "The number of assets minted for this collection";
                                                                };
                                                                readonly floorPrice: {
                                                                    readonly type: "number";
                                                                    readonly description: "The floor price of the collection";
                                                                };
                                                                readonly numListed: {
                                                                    readonly type: "number";
                                                                    readonly description: "The number of assets listed for this collection";
                                                                };
                                                                readonly numOwners: {
                                                                    readonly type: "number";
                                                                    readonly description: "The number of unique owners of assets in this collection";
                                                                };
                                                            };
                                                        };
                                                    };
                                                };
                                                readonly description: {
                                                    readonly type: "string";
                                                    readonly description: "The description provided when the Asset was created";
                                                };
                                                readonly environment: {
                                                    readonly type: "string";
                                                    readonly description: "The asset's environment\n\n`Development` `Production`";
                                                    readonly enum: readonly ["Development", "Production"];
                                                };
                                                readonly imported: {
                                                    readonly type: "boolean";
                                                    readonly description: "Indicates if the asset belongs to an imported collection";
                                                };
                                                readonly imageUrl: {
                                                    readonly type: "string";
                                                    readonly description: "The URI for the image representing the Asset";
                                                };
                                                readonly status: {
                                                    readonly type: "string";
                                                    readonly description: "The current status of the Asset\n\n`Uninitiated` `Unprocessed` `Processing` `Committed` `Failed`";
                                                    readonly enum: readonly ["Uninitiated", "Unprocessed", "Processing", "Committed", "Failed"];
                                                };
                                                readonly forSale: {
                                                    readonly type: "boolean";
                                                    readonly description: "Indicates if the asset is currently for sale";
                                                };
                                                readonly mintAddress: {
                                                    readonly type: "string";
                                                    readonly description: "The address of the Asset on the blockchain";
                                                };
                                                readonly owner: {
                                                    readonly description: "The current owner of the Asset.";
                                                    readonly type: readonly ["object", "null"];
                                                    readonly properties: {
                                                        readonly address: {
                                                            readonly type: readonly ["string", "null"];
                                                            readonly description: "The wallet that currently holds this asset";
                                                        };
                                                        readonly referenceId: {
                                                            readonly type: readonly ["string", "null"];
                                                            readonly description: "The reference id associated with the wallet";
                                                        };
                                                    };
                                                };
                                                readonly price: {
                                                    readonly type: readonly ["object", "null"];
                                                    readonly description: "The price of the asset on the marketplace";
                                                    readonly additionalProperties: true;
                                                };
                                            };
                                        };
                                    };
                                    readonly required: readonly ["type", "item"];
                                }, {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly type: {
                                            readonly type: "string";
                                            readonly description: "Indicates that this payment is for a Unique Asset mint operation.\n\n`AssetMint`";
                                            readonly enum: readonly ["AssetMint"];
                                        };
                                    };
                                    readonly required: readonly ["type"];
                                }, {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly type: {
                                            readonly type: "string";
                                            readonly description: "Indicates that this payment is for a generic purchase\n\n`Generic`";
                                            readonly enum: readonly ["Generic"];
                                        };
                                    };
                                    readonly required: readonly ["type"];
                                }];
                            };
                            readonly status: {
                                readonly type: "string";
                                readonly description: "Status of the payment\n\n`Pending` `Confirmed` `Completed` `Failed` `Expired`";
                                readonly enum: readonly ["Pending", "Confirmed", "Completed", "Failed", "Expired"];
                            };
                        };
                        readonly required: readonly ["id", "environment", "purchaser", "price", "sku", "status"];
                    };
                };
                readonly meta: {
                    readonly description: "Pagination related metadata";
                    readonly type: "object";
                    readonly required: readonly ["page", "perPage", "totalPages", "totalResults"];
                    readonly properties: {
                        readonly page: {
                            readonly type: "number";
                            readonly description: "The page number fetched";
                        };
                        readonly perPage: {
                            readonly type: "number";
                            readonly description: "The number of items in each page";
                        };
                        readonly totalPages: {
                            readonly type: "number";
                            readonly description: "The total number of pages in all results";
                        };
                        readonly totalResults: {
                            readonly type: "number";
                            readonly description: "The total result count";
                        };
                    };
                };
            };
            readonly required: readonly ["data", "meta"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ProjectTokenControllerImport: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly mintAddress: {
                readonly type: "string";
                readonly description: "The address for the currency's SPL token mint";
            };
        };
        readonly required: readonly ["mintAddress"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly "x-api-key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "API key for your game";
                };
            };
            readonly required: readonly ["x-api-key"];
        }];
    };
    readonly response: {
        readonly "201": {
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly description: "The ID for the currency";
                };
                readonly mintAddress: {
                    readonly type: "string";
                    readonly description: "The address for the currency's SPL token mint";
                };
                readonly name: {
                    readonly type: "string";
                    readonly description: "The name of the currency";
                };
                readonly symbol: {
                    readonly type: "string";
                    readonly description: "The currency's symbol";
                };
            };
            readonly required: readonly ["id", "mintAddress", "name", "symbol"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ProjectTokenControllerRefreshMetadata: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly itemId: {
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Specifies the Currency to refresh";
                };
            };
            readonly required: readonly ["itemId"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-api-key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "API key for your game";
                };
            };
            readonly required: readonly ["x-api-key"];
        }];
    };
    readonly response: {
        readonly "201": {
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly description: "The ID for the currency";
                };
                readonly mintAddress: {
                    readonly type: "string";
                    readonly description: "The address for the currency's SPL token mint";
                };
                readonly name: {
                    readonly type: "string";
                    readonly description: "The name of the currency";
                };
                readonly symbol: {
                    readonly type: "string";
                    readonly description: "The currency's symbol";
                };
            };
            readonly required: readonly ["id", "mintAddress", "name", "symbol"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ProjectTokenControllerUnimport: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly itemId: {
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Specifies the Currency to un-import";
                };
            };
            readonly required: readonly ["itemId"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-api-key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "API key for your game";
                };
            };
            readonly required: readonly ["x-api-key"];
        }];
    };
    readonly response: {
        readonly "201": {
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly description: "The ID for the currency";
                };
                readonly mintAddress: {
                    readonly type: "string";
                    readonly description: "The address for the currency's SPL token mint";
                };
                readonly name: {
                    readonly type: "string";
                    readonly description: "The name of the currency";
                };
                readonly symbol: {
                    readonly type: "string";
                    readonly description: "The currency's symbol";
                };
            };
            readonly required: readonly ["id", "mintAddress", "name", "symbol"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ProjectUserControllerCreate: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly referenceId: {
                readonly type: "string";
                readonly minLength: 1;
                readonly description: "The reference id of the user. Must be unique, and cannot contain the character \"/\".";
            };
            readonly email: {
                readonly type: "string";
                readonly description: "User's email address.";
            };
            readonly externalWalletAddress: {
                readonly type: "string";
                readonly description: "`User`'s wallet address. Signing transactions will require use of a wallet like Phantom or Backpack.";
            };
        };
        readonly required: readonly ["referenceId", "email"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly "x-api-key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "API key for your game";
                };
            };
            readonly required: readonly ["x-api-key"];
        }];
    };
    readonly response: {
        readonly "201": {
            readonly type: "object";
            readonly properties: {
                readonly referenceId: {
                    readonly type: "string";
                    readonly description: "The reference id of the user";
                };
                readonly email: {
                    readonly type: "string";
                    readonly description: "The email of the user";
                };
            };
            readonly required: readonly ["referenceId", "email"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ProjectUserControllerCreateLease: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly destinationReferenceId: {
                readonly type: "string";
                readonly minLength: 1;
                readonly description: "Identifies the User borrowing the Asset";
            };
            readonly expiration: {
                readonly type: "number";
                readonly description: "The time the lending grant will expire";
            };
        };
        readonly required: readonly ["destinationReferenceId"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly itemId: {
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Specifies the Item to lend";
                };
                readonly referenceId: {
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Identifies the User.";
                };
            };
            readonly required: readonly ["itemId", "referenceId"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-api-key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "API key for your game";
                };
            };
            readonly required: readonly ["x-api-key"];
        }];
    };
    readonly response: {
        readonly "201": {
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly description: "The unique ID of the LendingGrant entry";
                };
                readonly itemId: {
                    readonly type: "string";
                    readonly description: "The ID of the Item being borrowed";
                };
                readonly ownerReferenceId: {
                    readonly type: "string";
                    readonly description: "The reference ID of the owner of the Asset";
                };
                readonly borrowerReferenceId: {
                    readonly type: "string";
                    readonly description: "The reference ID of the borrower of the Asset";
                };
                readonly expiration: {
                    readonly format: "date-time";
                    readonly type: "string";
                    readonly description: "The expiration date and time of the borrowing period";
                };
                readonly created: {
                    readonly format: "date-time";
                    readonly type: "string";
                    readonly description: "The date and time when the borrow entry was created";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "The current status of the LendingGrant entry\n\n`Pending` `Accepted`";
                    readonly enum: readonly ["Pending", "Accepted"];
                };
                readonly environment: {
                    readonly type: "string";
                    readonly description: "The current environment of the Asset\n\n`Development` `Production`";
                    readonly enum: readonly ["Development", "Production"];
                };
            };
            readonly required: readonly ["id", "itemId", "ownerReferenceId", "borrowerReferenceId", "expiration", "created", "status", "environment"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ProjectUserControllerGet: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly referenceId: {
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Identifies the User.";
                };
            };
            readonly required: readonly ["referenceId"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-api-key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "API key for your game";
                };
            };
            readonly required: readonly ["x-api-key"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly referenceId: {
                    readonly type: "string";
                    readonly description: "The reference id of the user";
                };
                readonly email: {
                    readonly type: "string";
                    readonly description: "The email of the user";
                };
            };
            readonly required: readonly ["referenceId", "email"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ProjectUserControllerGetAll: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly page: {
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Specifies the page to fetch";
                };
                readonly perPage: {
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of items on each page";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-api-key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "API key for your game";
                };
            };
            readonly required: readonly ["x-api-key"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly description: "A list of users";
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly referenceId: {
                                readonly type: "string";
                                readonly description: "The reference id of the user";
                            };
                            readonly email: {
                                readonly type: "string";
                                readonly description: "The email of the user";
                            };
                        };
                        readonly required: readonly ["referenceId", "email"];
                    };
                };
                readonly meta: {
                    readonly description: "Pagination related metadata";
                    readonly type: "object";
                    readonly required: readonly ["page", "perPage", "totalPages", "totalResults"];
                    readonly properties: {
                        readonly page: {
                            readonly type: "number";
                            readonly description: "The page number fetched";
                        };
                        readonly perPage: {
                            readonly type: "number";
                            readonly description: "The number of items in each page";
                        };
                        readonly totalPages: {
                            readonly type: "number";
                            readonly description: "The total number of pages in all results";
                        };
                        readonly totalResults: {
                            readonly type: "number";
                            readonly description: "The total result count";
                        };
                    };
                };
            };
            readonly required: readonly ["data", "meta"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ProjectUserControllerGetItem: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly itemId: {
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Specifies the Item.";
                };
                readonly referenceId: {
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Identifies the User.";
                };
            };
            readonly required: readonly ["itemId", "referenceId"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-api-key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "API key for your game";
                };
            };
            readonly required: readonly ["x-api-key"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly oneOf: readonly [{
                readonly type: "object";
                readonly properties: {
                    readonly type: {
                        readonly type: "string";
                        readonly enum: readonly ["Currency"];
                        readonly description: "Indicates that this `Item` is a `Currency`\n\n`Currency`";
                        readonly title: "Currency";
                        readonly examples: readonly ["Currency"];
                    };
                    readonly item: {
                        readonly description: "The currency";
                        readonly type: "object";
                        readonly required: readonly ["id", "mintAddress", "name", "symbol"];
                        readonly properties: {
                            readonly id: {
                                readonly type: "string";
                                readonly description: "The ID for the currency";
                            };
                            readonly mintAddress: {
                                readonly type: "string";
                                readonly description: "The address for the currency's SPL token mint";
                            };
                            readonly name: {
                                readonly type: "string";
                                readonly description: "The name of the currency";
                            };
                            readonly symbol: {
                                readonly type: "string";
                                readonly description: "The currency's symbol";
                            };
                        };
                    };
                    readonly quantity: {
                        readonly type: "string";
                        readonly description: "Amount of the currency being held";
                    };
                };
                readonly required: readonly ["type", "item", "quantity"];
            }, {
                readonly type: "object";
                readonly properties: {
                    readonly type: {
                        readonly type: "string";
                        readonly enum: readonly ["UniqueAsset"];
                        readonly description: "Indicates that this `Item` is an `UniqueAsset`\n\n`UniqueAsset`";
                        readonly title: "UniqueAsset";
                        readonly examples: readonly ["UniqueAsset"];
                    };
                    readonly item: {
                        readonly description: "The unique asset";
                        readonly type: "object";
                        readonly required: readonly ["id", "created", "name", "description", "environment", "imported", "imageUrl", "status", "forSale", "mintAddress"];
                        readonly properties: {
                            readonly id: {
                                readonly type: "string";
                                readonly description: "The ID of the Asset";
                            };
                            readonly attributes: {
                                readonly description: "The attributes of the Asset";
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "object";
                                    readonly required: readonly ["traitType", "value"];
                                    readonly properties: {
                                        readonly traitType: {
                                            readonly type: "string";
                                            readonly description: "The name of the trait";
                                        };
                                        readonly value: {
                                            readonly type: "string";
                                            readonly description: "The value of the trait";
                                        };
                                    };
                                };
                            };
                            readonly created: {
                                readonly type: "number";
                                readonly description: "The date the Asset was created";
                            };
                            readonly name: {
                                readonly type: "string";
                                readonly description: "The name of the Asset";
                            };
                            readonly collection: {
                                readonly description: "The collection the Asset belongs to";
                                readonly type: "object";
                                readonly required: readonly ["id", "name", "description", "environment", "imported", "created"];
                                readonly properties: {
                                    readonly id: {
                                        readonly type: "string";
                                        readonly description: "The id of the collection. This is not an on-chain address, but instead an ID internal to GameShift";
                                    };
                                    readonly name: {
                                        readonly type: "string";
                                        readonly description: "The name given to the collection";
                                    };
                                    readonly description: {
                                        readonly type: "string";
                                        readonly description: "The description given to the collection";
                                    };
                                    readonly environment: {
                                        readonly type: "string";
                                        readonly description: "The collection's environment\n\n`Development` `Production`";
                                        readonly enum: readonly ["Development", "Production"];
                                    };
                                    readonly imageUrl: {
                                        readonly type: readonly ["string", "null"];
                                        readonly description: "The url of the image used to represent the collection";
                                    };
                                    readonly imported: {
                                        readonly type: "boolean";
                                        readonly description: "Whether the collection was imported";
                                    };
                                    readonly mintAddress: {
                                        readonly type: readonly ["string", "null"];
                                        readonly description: "The mint address of the collection on-chain";
                                    };
                                    readonly created: {
                                        readonly type: "number";
                                        readonly description: "Timestamp of collection creation";
                                    };
                                    readonly stats: {
                                        readonly description: "Statistics about the collection";
                                        readonly type: "object";
                                        readonly required: readonly ["numMinted", "floorPrice", "numListed", "numOwners"];
                                        readonly properties: {
                                            readonly numMinted: {
                                                readonly type: "number";
                                                readonly description: "The number of assets minted for this collection";
                                            };
                                            readonly floorPrice: {
                                                readonly type: "number";
                                                readonly description: "The floor price of the collection";
                                            };
                                            readonly numListed: {
                                                readonly type: "number";
                                                readonly description: "The number of assets listed for this collection";
                                            };
                                            readonly numOwners: {
                                                readonly type: "number";
                                                readonly description: "The number of unique owners of assets in this collection";
                                            };
                                        };
                                    };
                                };
                            };
                            readonly description: {
                                readonly type: "string";
                                readonly description: "The description provided when the Asset was created";
                            };
                            readonly environment: {
                                readonly type: "string";
                                readonly description: "The asset's environment\n\n`Development` `Production`";
                                readonly enum: readonly ["Development", "Production"];
                            };
                            readonly imported: {
                                readonly type: "boolean";
                                readonly description: "Indicates if the asset belongs to an imported collection";
                            };
                            readonly imageUrl: {
                                readonly type: "string";
                                readonly description: "The URI for the image representing the Asset";
                            };
                            readonly status: {
                                readonly type: "string";
                                readonly description: "The current status of the Asset\n\n`Uninitiated` `Unprocessed` `Processing` `Committed` `Failed`";
                                readonly enum: readonly ["Uninitiated", "Unprocessed", "Processing", "Committed", "Failed"];
                            };
                            readonly forSale: {
                                readonly type: "boolean";
                                readonly description: "Indicates if the asset is currently for sale";
                            };
                            readonly mintAddress: {
                                readonly type: "string";
                                readonly description: "The address of the Asset on the blockchain";
                            };
                            readonly owner: {
                                readonly description: "The current owner of the Asset.";
                                readonly type: readonly ["object", "null"];
                                readonly properties: {
                                    readonly address: {
                                        readonly type: readonly ["string", "null"];
                                        readonly description: "The wallet that currently holds this asset";
                                    };
                                    readonly referenceId: {
                                        readonly type: readonly ["string", "null"];
                                        readonly description: "The reference id associated with the wallet";
                                    };
                                };
                            };
                            readonly price: {
                                readonly type: readonly ["object", "null"];
                                readonly description: "The price of the asset on the marketplace";
                                readonly additionalProperties: true;
                            };
                        };
                    };
                };
                readonly required: readonly ["type", "item"];
            }, {
                readonly type: "object";
                readonly properties: {
                    readonly type: {
                        readonly type: "string";
                        readonly enum: readonly ["StackableAsset"];
                        readonly description: "Indicates that this `Item` is a `Stackable Asset`\n\n`StackableAsset`";
                        readonly title: "StackableAsset";
                        readonly examples: readonly ["StackableAsset"];
                    };
                    readonly item: {
                        readonly description: "The stackable asset";
                        readonly type: "object";
                        readonly required: readonly ["id", "created", "name", "description", "environment", "imageUrl", "status"];
                        readonly properties: {
                            readonly id: {
                                readonly type: "string";
                                readonly description: "The ID of the Stackable Asset";
                            };
                            readonly attributes: {
                                readonly description: "Add attributes to your Asset";
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "object";
                                    readonly required: readonly ["traitType", "value"];
                                    readonly properties: {
                                        readonly traitType: {
                                            readonly type: "string";
                                            readonly description: "The name of the trait";
                                        };
                                        readonly value: {
                                            readonly type: "string";
                                            readonly description: "The value of the trait";
                                        };
                                    };
                                };
                            };
                            readonly created: {
                                readonly type: "number";
                                readonly description: "The date the Asset was created";
                            };
                            readonly name: {
                                readonly type: "string";
                                readonly description: "The name of the Stackable Asset. Max length: 32 chars";
                                readonly maxLength: 32;
                            };
                            readonly symbol: {
                                readonly type: "string";
                                readonly description: "The symbol of the Stackable Asset. Max length: 5 chars";
                                readonly maxLength: 5;
                            };
                            readonly description: {
                                readonly type: "string";
                                readonly description: "A description for the Asset";
                                readonly maxLength: 64;
                            };
                            readonly collection: {
                                readonly description: "The collection the Asset belongs to";
                                readonly type: "object";
                                readonly required: readonly ["id", "name", "description", "environment", "imported", "created"];
                                readonly properties: {
                                    readonly id: {
                                        readonly type: "string";
                                        readonly description: "The id of the collection. This is not an on-chain address, but instead an ID internal to GameShift";
                                    };
                                    readonly name: {
                                        readonly type: "string";
                                        readonly description: "The name given to the collection";
                                    };
                                    readonly description: {
                                        readonly type: "string";
                                        readonly description: "The description given to the collection";
                                    };
                                    readonly environment: {
                                        readonly type: "string";
                                        readonly description: "The collection's environment\n\n`Development` `Production`";
                                        readonly enum: readonly ["Development", "Production"];
                                    };
                                    readonly imageUrl: {
                                        readonly type: readonly ["string", "null"];
                                        readonly description: "The url of the image used to represent the collection";
                                    };
                                    readonly imported: {
                                        readonly type: "boolean";
                                        readonly description: "Whether the collection was imported";
                                    };
                                    readonly mintAddress: {
                                        readonly type: readonly ["string", "null"];
                                        readonly description: "The mint address of the collection on-chain";
                                    };
                                    readonly created: {
                                        readonly type: "number";
                                        readonly description: "Timestamp of collection creation";
                                    };
                                    readonly stats: {
                                        readonly description: "Statistics about the collection";
                                        readonly type: "object";
                                        readonly required: readonly ["numMinted", "floorPrice", "numListed", "numOwners"];
                                        readonly properties: {
                                            readonly numMinted: {
                                                readonly type: "number";
                                                readonly description: "The number of assets minted for this collection";
                                            };
                                            readonly floorPrice: {
                                                readonly type: "number";
                                                readonly description: "The floor price of the collection";
                                            };
                                            readonly numListed: {
                                                readonly type: "number";
                                                readonly description: "The number of assets listed for this collection";
                                            };
                                            readonly numOwners: {
                                                readonly type: "number";
                                                readonly description: "The number of unique owners of assets in this collection";
                                            };
                                        };
                                    };
                                };
                            };
                            readonly environment: {
                                readonly type: "string";
                                readonly description: "The asset's environment\n\n`Development` `Production`";
                                readonly enum: readonly ["Development", "Production"];
                            };
                            readonly imageUrl: {
                                readonly type: "string";
                                readonly description: "A url to the image underlying the Asset";
                            };
                            readonly status: {
                                readonly type: "string";
                                readonly description: "The current status of the Asset\n\n`Uninitiated` `Unprocessed` `Processing` `Committed` `Failed`";
                                readonly enum: readonly ["Uninitiated", "Unprocessed", "Processing", "Committed", "Failed"];
                            };
                            readonly mintAddress: {
                                readonly type: "string";
                                readonly description: "The address of the Asset on the blockchain";
                            };
                        };
                    };
                    readonly quantity: {
                        readonly type: "string";
                        readonly description: "Amount of the stackable asset";
                    };
                };
                readonly required: readonly ["type", "item", "quantity"];
            }];
            readonly discriminator: {
                readonly propertyName: "type";
                readonly mapping: {
                    readonly Currency: "#/components/schemas/OwnedCurrencyItemDto";
                    readonly UniqueAsset: "#/components/schemas/UniqueAssetItemDto";
                    readonly StackableAsset: "#/components/schemas/OwnedStackableAssetItemDto";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ProjectUserControllerGetLoyaltyProgramEnrollmentsByUser: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly referenceId: {
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Identifies the User.";
                };
            };
            readonly required: readonly ["referenceId"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly page: {
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Specifies the page to fetch";
                };
                readonly perPage: {
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of items on each page";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-api-key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "API key for your game";
                };
            };
            readonly required: readonly ["x-api-key"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly description: "A list of Enrollments";
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly environment: {
                                readonly type: "object";
                                readonly description: "The Environment of the Enrollment";
                                readonly additionalProperties: true;
                            };
                            readonly id: {
                                readonly type: "string";
                                readonly description: "The ID of the Enrollment";
                            };
                            readonly enrollmentAddress: {
                                readonly type: "string";
                                readonly description: "The on-chain address of the Enrollment";
                            };
                            readonly lastSnapshotId: {
                                readonly type: "string";
                                readonly description: "The ID of the last reward snapshot issued that included the Enrollment";
                            };
                            readonly enrollmentStartTime: {
                                readonly format: "date-time";
                                readonly type: "string";
                                readonly description: "The time the Enrollment was created";
                            };
                            readonly commitmentPeriod: {
                                readonly type: "number";
                                readonly description: "The time in seconds that the Enrollment will last for";
                            };
                            readonly elapsedEnrollmentTime: {
                                readonly type: "number";
                                readonly description: "Time elapsed since the creation of the Enrollment (in seconds)";
                            };
                            readonly enrollmentPeriod: {
                                readonly type: "number";
                                readonly description: "The time that the Enrollment is committed to before it can claim rewards";
                            };
                            readonly ownerAddress: {
                                readonly type: "string";
                                readonly description: "The on-chain address of the owner of the Enrollment";
                            };
                            readonly ownerId: {
                                readonly type: "string";
                                readonly description: "The user reference ID of the owner of the Enrollment";
                            };
                            readonly programId: {
                                readonly type: "string";
                                readonly description: "The ID of the LoyaltyProgram the Enrollment belongs to";
                            };
                            readonly programAddress: {
                                readonly type: "string";
                                readonly description: "The on-chain address of the LoyaltyProgram the Enrollment belongs to";
                            };
                            readonly enrolledBalance: {
                                readonly type: "string";
                                readonly description: "The balance of the Enrollment";
                            };
                            readonly allocatedRewards: {
                                readonly type: "string";
                                readonly description: "The allocated reward balance of the Enrollment";
                            };
                            readonly claimedRewards: {
                                readonly type: "string";
                                readonly description: "Number of allocated rewards claimed so far, for the Enrollment";
                            };
                        };
                        readonly required: readonly ["environment", "id", "enrollmentAddress", "enrollmentStartTime", "commitmentPeriod", "elapsedEnrollmentTime", "enrollmentPeriod", "ownerAddress", "ownerId", "programId", "programAddress", "enrolledBalance", "allocatedRewards", "claimedRewards"];
                    };
                };
                readonly meta: {
                    readonly description: "Pagination related metadata";
                    readonly type: "object";
                    readonly required: readonly ["page", "perPage", "totalPages", "totalResults"];
                    readonly properties: {
                        readonly page: {
                            readonly type: "number";
                            readonly description: "The page number fetched";
                        };
                        readonly perPage: {
                            readonly type: "number";
                            readonly description: "The number of items in each page";
                        };
                        readonly totalPages: {
                            readonly type: "number";
                            readonly description: "The total number of pages in all results";
                        };
                        readonly totalResults: {
                            readonly type: "number";
                            readonly description: "The total result count";
                        };
                    };
                };
            };
            readonly required: readonly ["data", "meta"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ProjectUserControllerGetUserItems: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly referenceId: {
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Identifies the User.";
                };
            };
            readonly required: readonly ["referenceId"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly page: {
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Specifies the page to fetch";
                };
                readonly perPage: {
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of items on each page";
                };
                readonly types: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly examples: readonly ["Currency, UniqueAsset, StackableAsset"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "A list of Item types to return.";
                };
                readonly forSale: {
                    readonly type: "string";
                    readonly examples: readonly ["true"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Only return Items that are listed for sale. This is automatically exclude any Items that cannot be listed on the marketplace, i.e. Currencies.";
                };
                readonly collectionId: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Only return Items that belong to this collection. Will not return Item types that cannot have a collection (such as Currencies).";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-api-key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "API key for your game";
                };
            };
            readonly required: readonly ["x-api-key"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly description: "A list of items";
                    readonly items: {
                        readonly anyOf: readonly [{
                            readonly type: "object";
                            readonly properties: {
                                readonly type: {
                                    readonly type: "string";
                                    readonly enum: readonly ["Currency"];
                                    readonly description: "Indicates that this `Item` is a `Currency`\n\n`Currency`";
                                    readonly title: "Currency";
                                    readonly examples: readonly ["Currency"];
                                };
                                readonly item: {
                                    readonly description: "The currency";
                                    readonly type: "object";
                                    readonly required: readonly ["id", "mintAddress", "name", "symbol"];
                                    readonly properties: {
                                        readonly id: {
                                            readonly type: "string";
                                            readonly description: "The ID for the currency";
                                        };
                                        readonly mintAddress: {
                                            readonly type: "string";
                                            readonly description: "The address for the currency's SPL token mint";
                                        };
                                        readonly name: {
                                            readonly type: "string";
                                            readonly description: "The name of the currency";
                                        };
                                        readonly symbol: {
                                            readonly type: "string";
                                            readonly description: "The currency's symbol";
                                        };
                                    };
                                };
                                readonly quantity: {
                                    readonly type: "string";
                                    readonly description: "Amount of the currency being held";
                                };
                            };
                            readonly required: readonly ["type", "item", "quantity"];
                        }, {
                            readonly type: "object";
                            readonly properties: {
                                readonly type: {
                                    readonly type: "string";
                                    readonly enum: readonly ["UniqueAsset"];
                                    readonly description: "Indicates that this `Item` is an `UniqueAsset`\n\n`UniqueAsset`";
                                    readonly title: "UniqueAsset";
                                    readonly examples: readonly ["UniqueAsset"];
                                };
                                readonly item: {
                                    readonly description: "The unique asset";
                                    readonly type: "object";
                                    readonly required: readonly ["id", "created", "name", "description", "environment", "imported", "imageUrl", "status", "forSale", "mintAddress"];
                                    readonly properties: {
                                        readonly id: {
                                            readonly type: "string";
                                            readonly description: "The ID of the Asset";
                                        };
                                        readonly attributes: {
                                            readonly description: "The attributes of the Asset";
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "object";
                                                readonly required: readonly ["traitType", "value"];
                                                readonly properties: {
                                                    readonly traitType: {
                                                        readonly type: "string";
                                                        readonly description: "The name of the trait";
                                                    };
                                                    readonly value: {
                                                        readonly type: "string";
                                                        readonly description: "The value of the trait";
                                                    };
                                                };
                                            };
                                        };
                                        readonly created: {
                                            readonly type: "number";
                                            readonly description: "The date the Asset was created";
                                        };
                                        readonly name: {
                                            readonly type: "string";
                                            readonly description: "The name of the Asset";
                                        };
                                        readonly collection: {
                                            readonly description: "The collection the Asset belongs to";
                                            readonly type: "object";
                                            readonly required: readonly ["id", "name", "description", "environment", "imported", "created"];
                                            readonly properties: {
                                                readonly id: {
                                                    readonly type: "string";
                                                    readonly description: "The id of the collection. This is not an on-chain address, but instead an ID internal to GameShift";
                                                };
                                                readonly name: {
                                                    readonly type: "string";
                                                    readonly description: "The name given to the collection";
                                                };
                                                readonly description: {
                                                    readonly type: "string";
                                                    readonly description: "The description given to the collection";
                                                };
                                                readonly environment: {
                                                    readonly type: "string";
                                                    readonly description: "The collection's environment\n\n`Development` `Production`";
                                                    readonly enum: readonly ["Development", "Production"];
                                                };
                                                readonly imageUrl: {
                                                    readonly type: readonly ["string", "null"];
                                                    readonly description: "The url of the image used to represent the collection";
                                                };
                                                readonly imported: {
                                                    readonly type: "boolean";
                                                    readonly description: "Whether the collection was imported";
                                                };
                                                readonly mintAddress: {
                                                    readonly type: readonly ["string", "null"];
                                                    readonly description: "The mint address of the collection on-chain";
                                                };
                                                readonly created: {
                                                    readonly type: "number";
                                                    readonly description: "Timestamp of collection creation";
                                                };
                                                readonly stats: {
                                                    readonly description: "Statistics about the collection";
                                                    readonly type: "object";
                                                    readonly required: readonly ["numMinted", "floorPrice", "numListed", "numOwners"];
                                                    readonly properties: {
                                                        readonly numMinted: {
                                                            readonly type: "number";
                                                            readonly description: "The number of assets minted for this collection";
                                                        };
                                                        readonly floorPrice: {
                                                            readonly type: "number";
                                                            readonly description: "The floor price of the collection";
                                                        };
                                                        readonly numListed: {
                                                            readonly type: "number";
                                                            readonly description: "The number of assets listed for this collection";
                                                        };
                                                        readonly numOwners: {
                                                            readonly type: "number";
                                                            readonly description: "The number of unique owners of assets in this collection";
                                                        };
                                                    };
                                                };
                                            };
                                        };
                                        readonly description: {
                                            readonly type: "string";
                                            readonly description: "The description provided when the Asset was created";
                                        };
                                        readonly environment: {
                                            readonly type: "string";
                                            readonly description: "The asset's environment\n\n`Development` `Production`";
                                            readonly enum: readonly ["Development", "Production"];
                                        };
                                        readonly imported: {
                                            readonly type: "boolean";
                                            readonly description: "Indicates if the asset belongs to an imported collection";
                                        };
                                        readonly imageUrl: {
                                            readonly type: "string";
                                            readonly description: "The URI for the image representing the Asset";
                                        };
                                        readonly status: {
                                            readonly type: "string";
                                            readonly description: "The current status of the Asset\n\n`Uninitiated` `Unprocessed` `Processing` `Committed` `Failed`";
                                            readonly enum: readonly ["Uninitiated", "Unprocessed", "Processing", "Committed", "Failed"];
                                        };
                                        readonly forSale: {
                                            readonly type: "boolean";
                                            readonly description: "Indicates if the asset is currently for sale";
                                        };
                                        readonly mintAddress: {
                                            readonly type: "string";
                                            readonly description: "The address of the Asset on the blockchain";
                                        };
                                        readonly owner: {
                                            readonly description: "The current owner of the Asset.";
                                            readonly type: readonly ["object", "null"];
                                            readonly properties: {
                                                readonly address: {
                                                    readonly type: readonly ["string", "null"];
                                                    readonly description: "The wallet that currently holds this asset";
                                                };
                                                readonly referenceId: {
                                                    readonly type: readonly ["string", "null"];
                                                    readonly description: "The reference id associated with the wallet";
                                                };
                                            };
                                        };
                                        readonly price: {
                                            readonly type: readonly ["object", "null"];
                                            readonly description: "The price of the asset on the marketplace";
                                            readonly additionalProperties: true;
                                        };
                                    };
                                };
                            };
                            readonly required: readonly ["type", "item"];
                        }, {
                            readonly type: "object";
                            readonly properties: {
                                readonly type: {
                                    readonly type: "string";
                                    readonly enum: readonly ["StackableAsset"];
                                    readonly description: "Indicates that this `Item` is a `Stackable Asset`\n\n`StackableAsset`";
                                    readonly title: "StackableAsset";
                                    readonly examples: readonly ["StackableAsset"];
                                };
                                readonly item: {
                                    readonly description: "The stackable asset";
                                    readonly type: "object";
                                    readonly required: readonly ["id", "created", "name", "description", "environment", "imageUrl", "status"];
                                    readonly properties: {
                                        readonly id: {
                                            readonly type: "string";
                                            readonly description: "The ID of the Stackable Asset";
                                        };
                                        readonly attributes: {
                                            readonly description: "Add attributes to your Asset";
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "object";
                                                readonly required: readonly ["traitType", "value"];
                                                readonly properties: {
                                                    readonly traitType: {
                                                        readonly type: "string";
                                                        readonly description: "The name of the trait";
                                                    };
                                                    readonly value: {
                                                        readonly type: "string";
                                                        readonly description: "The value of the trait";
                                                    };
                                                };
                                            };
                                        };
                                        readonly created: {
                                            readonly type: "number";
                                            readonly description: "The date the Asset was created";
                                        };
                                        readonly name: {
                                            readonly type: "string";
                                            readonly description: "The name of the Stackable Asset. Max length: 32 chars";
                                            readonly maxLength: 32;
                                        };
                                        readonly symbol: {
                                            readonly type: "string";
                                            readonly description: "The symbol of the Stackable Asset. Max length: 5 chars";
                                            readonly maxLength: 5;
                                        };
                                        readonly description: {
                                            readonly type: "string";
                                            readonly description: "A description for the Asset";
                                            readonly maxLength: 64;
                                        };
                                        readonly collection: {
                                            readonly description: "The collection the Asset belongs to";
                                            readonly type: "object";
                                            readonly required: readonly ["id", "name", "description", "environment", "imported", "created"];
                                            readonly properties: {
                                                readonly id: {
                                                    readonly type: "string";
                                                    readonly description: "The id of the collection. This is not an on-chain address, but instead an ID internal to GameShift";
                                                };
                                                readonly name: {
                                                    readonly type: "string";
                                                    readonly description: "The name given to the collection";
                                                };
                                                readonly description: {
                                                    readonly type: "string";
                                                    readonly description: "The description given to the collection";
                                                };
                                                readonly environment: {
                                                    readonly type: "string";
                                                    readonly description: "The collection's environment\n\n`Development` `Production`";
                                                    readonly enum: readonly ["Development", "Production"];
                                                };
                                                readonly imageUrl: {
                                                    readonly type: readonly ["string", "null"];
                                                    readonly description: "The url of the image used to represent the collection";
                                                };
                                                readonly imported: {
                                                    readonly type: "boolean";
                                                    readonly description: "Whether the collection was imported";
                                                };
                                                readonly mintAddress: {
                                                    readonly type: readonly ["string", "null"];
                                                    readonly description: "The mint address of the collection on-chain";
                                                };
                                                readonly created: {
                                                    readonly type: "number";
                                                    readonly description: "Timestamp of collection creation";
                                                };
                                                readonly stats: {
                                                    readonly description: "Statistics about the collection";
                                                    readonly type: "object";
                                                    readonly required: readonly ["numMinted", "floorPrice", "numListed", "numOwners"];
                                                    readonly properties: {
                                                        readonly numMinted: {
                                                            readonly type: "number";
                                                            readonly description: "The number of assets minted for this collection";
                                                        };
                                                        readonly floorPrice: {
                                                            readonly type: "number";
                                                            readonly description: "The floor price of the collection";
                                                        };
                                                        readonly numListed: {
                                                            readonly type: "number";
                                                            readonly description: "The number of assets listed for this collection";
                                                        };
                                                        readonly numOwners: {
                                                            readonly type: "number";
                                                            readonly description: "The number of unique owners of assets in this collection";
                                                        };
                                                    };
                                                };
                                            };
                                        };
                                        readonly environment: {
                                            readonly type: "string";
                                            readonly description: "The asset's environment\n\n`Development` `Production`";
                                            readonly enum: readonly ["Development", "Production"];
                                        };
                                        readonly imageUrl: {
                                            readonly type: "string";
                                            readonly description: "A url to the image underlying the Asset";
                                        };
                                        readonly status: {
                                            readonly type: "string";
                                            readonly description: "The current status of the Asset\n\n`Uninitiated` `Unprocessed` `Processing` `Committed` `Failed`";
                                            readonly enum: readonly ["Uninitiated", "Unprocessed", "Processing", "Committed", "Failed"];
                                        };
                                        readonly mintAddress: {
                                            readonly type: "string";
                                            readonly description: "The address of the Asset on the blockchain";
                                        };
                                    };
                                };
                                readonly quantity: {
                                    readonly type: "string";
                                    readonly description: "Amount of the stackable asset";
                                };
                            };
                            readonly required: readonly ["type", "item", "quantity"];
                        }];
                    };
                };
                readonly meta: {
                    readonly description: "Pagination related metadata";
                    readonly type: "object";
                    readonly required: readonly ["page", "perPage", "totalPages", "totalResults"];
                    readonly properties: {
                        readonly page: {
                            readonly type: "number";
                            readonly description: "The page number fetched";
                        };
                        readonly perPage: {
                            readonly type: "number";
                            readonly description: "The number of items in each page";
                        };
                        readonly totalPages: {
                            readonly type: "number";
                            readonly description: "The total number of pages in all results";
                        };
                        readonly totalResults: {
                            readonly type: "number";
                            readonly description: "The total result count";
                        };
                    };
                };
            };
            readonly required: readonly ["data", "meta"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ProjectUserControllerGetWalletAddress: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly referenceId: {
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Identifies the User.";
                };
            };
            readonly required: readonly ["referenceId"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-api-key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "API key for your game";
                };
            };
            readonly required: readonly ["x-api-key"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly address: {
                    readonly type: "string";
                    readonly description: "The wallet address of the user";
                };
                readonly walletProvider: {
                    readonly type: "string";
                    readonly description: "The type of the wallet";
                };
            };
            readonly required: readonly ["address", "walletProvider"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ProjectUserControllerGetWithdrawal: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly withdrawalId: {
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Identifies the withdrawal";
                };
                readonly referenceId: {
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Identifies the user";
                };
            };
            readonly required: readonly ["withdrawalId", "referenceId"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-api-key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "API key for your game";
                };
            };
            readonly required: readonly ["x-api-key"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly description: "The ID of the withdrawal";
                };
                readonly userReferenceId: {
                    readonly type: "string";
                    readonly description: "The reference ID of the user";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "The status of the withdrawal\n\n`Uninitiated` `Pending` `Confirmed` `Failed` `Expired`";
                    readonly enum: readonly ["Uninitiated", "Pending", "Confirmed", "Failed", "Expired"];
                };
                readonly amount: {
                    readonly type: readonly ["number", "null"];
                    readonly description: "The amount of the withdrawal";
                };
                readonly currency: {
                    readonly type: "string";
                    readonly description: "The currency of the withdrawal";
                };
                readonly created: {
                    readonly type: "number";
                    readonly description: "The date and time the withdrawal was created";
                };
            };
            readonly required: readonly ["id", "userReferenceId", "status", "amount", "currency", "created"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ProjectUserControllerGetWithdrawals: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly referenceId: {
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Identifies the User";
                };
            };
            readonly required: readonly ["referenceId"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly page: {
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Specifies the page to fetch";
                };
                readonly perPage: {
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of items on each page";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-api-key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "API key for your game";
                };
            };
            readonly required: readonly ["x-api-key"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly description: "A list of withdrawals";
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly id: {
                                readonly type: "string";
                                readonly description: "The ID of the withdrawal";
                            };
                            readonly userReferenceId: {
                                readonly type: "string";
                                readonly description: "The reference ID of the user";
                            };
                            readonly status: {
                                readonly type: "string";
                                readonly description: "The status of the withdrawal\n\n`Uninitiated` `Pending` `Confirmed` `Failed` `Expired`";
                                readonly enum: readonly ["Uninitiated", "Pending", "Confirmed", "Failed", "Expired"];
                            };
                            readonly amount: {
                                readonly type: readonly ["number", "null"];
                                readonly description: "The amount of the withdrawal";
                            };
                            readonly currency: {
                                readonly type: "string";
                                readonly description: "The currency of the withdrawal";
                            };
                            readonly created: {
                                readonly type: "number";
                                readonly description: "The date and time the withdrawal was created";
                            };
                        };
                        readonly required: readonly ["id", "userReferenceId", "status", "amount", "currency", "created"];
                    };
                };
                readonly meta: {
                    readonly description: "Pagination related metadata";
                    readonly type: "object";
                    readonly required: readonly ["page", "perPage", "totalPages", "totalResults"];
                    readonly properties: {
                        readonly page: {
                            readonly type: "number";
                            readonly description: "The page number fetched";
                        };
                        readonly perPage: {
                            readonly type: "number";
                            readonly description: "The number of items in each page";
                        };
                        readonly totalPages: {
                            readonly type: "number";
                            readonly description: "The total number of pages in all results";
                        };
                        readonly totalResults: {
                            readonly type: "number";
                            readonly description: "The total result count";
                        };
                    };
                };
            };
            readonly required: readonly ["data", "meta"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ProjectUserControllerSignTransaction: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly serializedTransactionMessage: {
                readonly type: "string";
                readonly minLength: 1;
                readonly description: "A transaction message serialized to a hex format. This can\n      typically be created by calling `transaction.serializeMessage().toString('hex')`";
            };
            readonly description: {
                readonly type: readonly ["string", "null"];
                readonly maxLength: 64;
                readonly description: "A brief description of what the transaction will do. Max length: 64 characters.";
            };
        };
        readonly required: readonly ["serializedTransactionMessage"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly referenceId: {
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Identifies the User.";
                };
            };
            readonly required: readonly ["referenceId"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-api-key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "API key for your game";
                };
            };
            readonly required: readonly ["x-api-key"];
        }];
    };
    readonly response: {
        readonly "201": {
            readonly type: "object";
            readonly properties: {
                readonly transactionId: {
                    readonly type: "string";
                    readonly description: "The id for the transaction. Can be used to get the status of the transaction.";
                };
                readonly consentUrl: {
                    readonly type: "string";
                    readonly description: "The url the user must visit to provide consent for the transaction.";
                };
            };
            readonly required: readonly ["transactionId", "consentUrl"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ProjectUserControllerTransfer: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly destinationUserReferenceId: {
                readonly type: "string";
                readonly description: "Identifies the User receiving the Item";
            };
            readonly destinationWallet: {
                readonly type: "string";
                readonly description: "Address of the wallet receiving the Item";
            };
            readonly quantity: {
                readonly type: "string";
                readonly minLength: 1;
                readonly description: "Specifies the amount of the Item to send";
            };
        };
        readonly required: readonly ["quantity"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly itemId: {
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Specifies the Item to transfer";
                };
                readonly referenceId: {
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Identifies the User.";
                };
            };
            readonly required: readonly ["itemId", "referenceId"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-api-key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "API key for your game";
                };
            };
            readonly required: readonly ["x-api-key"];
        }];
    };
    readonly response: {
        readonly "201": {
            readonly type: "object";
            readonly properties: {
                readonly transactionId: {
                    readonly type: "string";
                    readonly description: "The id for the transaction. Can be used to get the status of the transaction.";
                };
                readonly consentUrl: {
                    readonly type: "string";
                    readonly description: "The url the user must visit to provide consent for the transaction.";
                };
            };
            readonly required: readonly ["transactionId", "consentUrl"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ProjectUserControllerWithdraw: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly referenceId: {
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Identifies the User";
                };
            };
            readonly required: readonly ["referenceId"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-api-key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "API key for your game";
                };
            };
            readonly required: readonly ["x-api-key"];
        }];
    };
    readonly response: {
        readonly "201": {
            readonly type: "object";
            readonly properties: {
                readonly withdrawalId: {
                    readonly type: "string";
                    readonly description: "An id that references the withdrawal";
                };
                readonly url: {
                    readonly type: "string";
                    readonly description: "A URL the User must visit to complete the withdrawal";
                };
            };
            readonly required: readonly ["withdrawalId", "url"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const StackableAssetControllerCreateStackableAsset: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly attributes: {
                readonly description: "Add attributes to your Asset";
                readonly type: "array";
                readonly items: {
                    readonly type: "object";
                    readonly properties: {
                        readonly traitType: {
                            readonly type: "string";
                            readonly description: "The name of the trait";
                        };
                        readonly value: {
                            readonly type: "string";
                            readonly description: "The value of the trait";
                        };
                    };
                    readonly required: readonly ["traitType", "value"];
                };
            };
            readonly collectionId: {
                readonly type: "string";
                readonly description: "Add the Asset to an existing collection";
            };
            readonly description: {
                readonly type: "string";
                readonly description: "A description for the Asset";
                readonly maxLength: 64;
            };
            readonly imageUrl: {
                readonly type: "string";
                readonly description: "A url to the image underlying the Asset";
            };
            readonly name: {
                readonly type: "string";
                readonly description: "The name of the Asset. Max length: 32 chars";
                readonly maxLength: 32;
            };
            readonly symbol: {
                readonly type: "string";
                readonly description: "The symbol of the Asset. Max length: 5 chars";
                readonly maxLength: 5;
            };
        };
        readonly required: readonly ["collectionId", "description", "imageUrl", "name"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly "x-api-key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "API key for your game";
                };
            };
            readonly required: readonly ["x-api-key"];
        }];
    };
    readonly response: {
        readonly "201": {
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly description: "The ID of the Stackable Asset";
                };
                readonly attributes: {
                    readonly description: "Add attributes to your Asset";
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly traitType: {
                                readonly type: "string";
                                readonly description: "The name of the trait";
                            };
                            readonly value: {
                                readonly type: "string";
                                readonly description: "The value of the trait";
                            };
                        };
                        readonly required: readonly ["traitType", "value"];
                    };
                };
                readonly created: {
                    readonly type: "number";
                    readonly description: "The date the Asset was created";
                };
                readonly name: {
                    readonly type: "string";
                    readonly description: "The name of the Stackable Asset. Max length: 32 chars";
                    readonly maxLength: 32;
                };
                readonly symbol: {
                    readonly type: "string";
                    readonly description: "The symbol of the Stackable Asset. Max length: 5 chars";
                    readonly maxLength: 5;
                };
                readonly description: {
                    readonly type: "string";
                    readonly description: "A description for the Asset";
                    readonly maxLength: 64;
                };
                readonly collection: {
                    readonly description: "The collection the Asset belongs to";
                    readonly type: "object";
                    readonly required: readonly ["id", "name", "description", "environment", "imported", "created"];
                    readonly properties: {
                        readonly id: {
                            readonly type: "string";
                            readonly description: "The id of the collection. This is not an on-chain address, but instead an ID internal to GameShift";
                        };
                        readonly name: {
                            readonly type: "string";
                            readonly description: "The name given to the collection";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description given to the collection";
                        };
                        readonly environment: {
                            readonly type: "string";
                            readonly description: "The collection's environment\n\n`Development` `Production`";
                            readonly enum: readonly ["Development", "Production"];
                        };
                        readonly imageUrl: {
                            readonly type: readonly ["string", "null"];
                            readonly description: "The url of the image used to represent the collection";
                        };
                        readonly imported: {
                            readonly type: "boolean";
                            readonly description: "Whether the collection was imported";
                        };
                        readonly mintAddress: {
                            readonly type: readonly ["string", "null"];
                            readonly description: "The mint address of the collection on-chain";
                        };
                        readonly created: {
                            readonly type: "number";
                            readonly description: "Timestamp of collection creation";
                        };
                        readonly stats: {
                            readonly description: "Statistics about the collection";
                            readonly type: "object";
                            readonly required: readonly ["numMinted", "floorPrice", "numListed", "numOwners"];
                            readonly properties: {
                                readonly numMinted: {
                                    readonly type: "number";
                                    readonly description: "The number of assets minted for this collection";
                                };
                                readonly floorPrice: {
                                    readonly type: "number";
                                    readonly description: "The floor price of the collection";
                                };
                                readonly numListed: {
                                    readonly type: "number";
                                    readonly description: "The number of assets listed for this collection";
                                };
                                readonly numOwners: {
                                    readonly type: "number";
                                    readonly description: "The number of unique owners of assets in this collection";
                                };
                            };
                        };
                    };
                };
                readonly environment: {
                    readonly type: "string";
                    readonly description: "The asset's environment\n\n`Development` `Production`";
                    readonly enum: readonly ["Development", "Production"];
                };
                readonly imageUrl: {
                    readonly type: "string";
                    readonly description: "A url to the image underlying the Asset";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "The current status of the Asset\n\n`Uninitiated` `Unprocessed` `Processing` `Committed` `Failed`";
                    readonly enum: readonly ["Uninitiated", "Unprocessed", "Processing", "Committed", "Failed"];
                };
                readonly mintAddress: {
                    readonly type: "string";
                    readonly description: "The address of the Asset on the blockchain";
                };
            };
            readonly required: readonly ["id", "created", "name", "description", "environment", "imageUrl", "status"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const StackableAssetControllerIssueAsset: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly destinationUserReferenceId: {
                readonly type: "string";
                readonly minLength: 1;
                readonly description: "The reference id of the user the asset should be assigned to";
            };
            readonly amount: {
                readonly type: "number";
                readonly minimum: 1;
                readonly description: "The amount of currency to be transferred";
            };
        };
        readonly required: readonly ["destinationUserReferenceId", "amount"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly itemId: {
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Specifies the Stackable Asset to issue.";
                };
            };
            readonly required: readonly ["itemId"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-api-key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "API key for your game";
                };
            };
            readonly required: readonly ["x-api-key"];
        }];
    };
    readonly response: {
        readonly "201": {
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly description: "The ID of the Stackable Asset";
                };
                readonly attributes: {
                    readonly description: "Add attributes to your Asset";
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly traitType: {
                                readonly type: "string";
                                readonly description: "The name of the trait";
                            };
                            readonly value: {
                                readonly type: "string";
                                readonly description: "The value of the trait";
                            };
                        };
                        readonly required: readonly ["traitType", "value"];
                    };
                };
                readonly created: {
                    readonly type: "number";
                    readonly description: "The date the Asset was created";
                };
                readonly name: {
                    readonly type: "string";
                    readonly description: "The name of the Stackable Asset. Max length: 32 chars";
                    readonly maxLength: 32;
                };
                readonly symbol: {
                    readonly type: "string";
                    readonly description: "The symbol of the Stackable Asset. Max length: 5 chars";
                    readonly maxLength: 5;
                };
                readonly description: {
                    readonly type: "string";
                    readonly description: "A description for the Asset";
                    readonly maxLength: 64;
                };
                readonly collection: {
                    readonly description: "The collection the Asset belongs to";
                    readonly type: "object";
                    readonly required: readonly ["id", "name", "description", "environment", "imported", "created"];
                    readonly properties: {
                        readonly id: {
                            readonly type: "string";
                            readonly description: "The id of the collection. This is not an on-chain address, but instead an ID internal to GameShift";
                        };
                        readonly name: {
                            readonly type: "string";
                            readonly description: "The name given to the collection";
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "The description given to the collection";
                        };
                        readonly environment: {
                            readonly type: "string";
                            readonly description: "The collection's environment\n\n`Development` `Production`";
                            readonly enum: readonly ["Development", "Production"];
                        };
                        readonly imageUrl: {
                            readonly type: readonly ["string", "null"];
                            readonly description: "The url of the image used to represent the collection";
                        };
                        readonly imported: {
                            readonly type: "boolean";
                            readonly description: "Whether the collection was imported";
                        };
                        readonly mintAddress: {
                            readonly type: readonly ["string", "null"];
                            readonly description: "The mint address of the collection on-chain";
                        };
                        readonly created: {
                            readonly type: "number";
                            readonly description: "Timestamp of collection creation";
                        };
                        readonly stats: {
                            readonly description: "Statistics about the collection";
                            readonly type: "object";
                            readonly required: readonly ["numMinted", "floorPrice", "numListed", "numOwners"];
                            readonly properties: {
                                readonly numMinted: {
                                    readonly type: "number";
                                    readonly description: "The number of assets minted for this collection";
                                };
                                readonly floorPrice: {
                                    readonly type: "number";
                                    readonly description: "The floor price of the collection";
                                };
                                readonly numListed: {
                                    readonly type: "number";
                                    readonly description: "The number of assets listed for this collection";
                                };
                                readonly numOwners: {
                                    readonly type: "number";
                                    readonly description: "The number of unique owners of assets in this collection";
                                };
                            };
                        };
                    };
                };
                readonly environment: {
                    readonly type: "string";
                    readonly description: "The asset's environment\n\n`Development` `Production`";
                    readonly enum: readonly ["Development", "Production"];
                };
                readonly imageUrl: {
                    readonly type: "string";
                    readonly description: "A url to the image underlying the Asset";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "The current status of the Asset\n\n`Uninitiated` `Unprocessed` `Processing` `Committed` `Failed`";
                    readonly enum: readonly ["Uninitiated", "Unprocessed", "Processing", "Committed", "Failed"];
                };
                readonly mintAddress: {
                    readonly type: "string";
                    readonly description: "The address of the Asset on the blockchain";
                };
            };
            readonly required: readonly ["id", "created", "name", "description", "environment", "imageUrl", "status"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const StackableAssetControllerUpdateAsset: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly itemId: {
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Specifies the Stackable Asset to update.";
                };
            };
            readonly required: readonly ["itemId"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-api-key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "API key for your game";
                };
            };
            readonly required: readonly ["x-api-key"];
        }];
    };
};
declare const TransactionControllerGet: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly transactionId: {
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Transaction ID to fetch";
                };
            };
            readonly required: readonly ["transactionId"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-api-key": {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "API key for your game";
                };
            };
            readonly required: readonly ["x-api-key"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly description: "Transaction ID";
                };
                readonly created: {
                    readonly type: "string";
                    readonly description: "Transaction creation date";
                    readonly format: "date-time";
                };
                readonly status: {
                    readonly description: "Transaction confirmation status";
                    readonly oneOf: readonly [{
                        readonly type: "object";
                        readonly properties: {
                            readonly status: {
                                readonly type: "string";
                                readonly enum: readonly ["Confirmed"];
                                readonly description: "`Confirmed`";
                            };
                            readonly txHash: {
                                readonly type: "string";
                            };
                        };
                        readonly required: readonly ["status", "txHash"];
                    }, {
                        readonly type: "object";
                        readonly properties: {
                            readonly status: {
                                readonly type: "string";
                                readonly enum: readonly ["Pending"];
                                readonly description: "`Pending`";
                            };
                        };
                        readonly required: readonly ["status"];
                    }, {
                        readonly type: "object";
                        readonly properties: {
                            readonly status: {
                                readonly type: "string";
                                readonly enum: readonly ["Failed"];
                                readonly description: "`Failed`";
                            };
                            readonly error: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "string";
                                };
                            };
                        };
                        readonly required: readonly ["status", "error"];
                    }, {
                        readonly type: "object";
                        readonly properties: {
                            readonly status: {
                                readonly type: "string";
                                readonly enum: readonly ["Expired"];
                                readonly description: "`Expired`";
                            };
                        };
                        readonly required: readonly ["status"];
                    }];
                };
                readonly details: {
                    readonly description: "Transaction type and details about asset and balance changes";
                    readonly oneOf: readonly [{
                        readonly type: "object";
                        readonly properties: {
                            readonly type: {
                                readonly type: "string";
                                readonly enum: readonly ["BuyAsset", "BuyAssetWithCreditCard", "CancelAssetSale", "ChangeAssetPrice", "ListAssetSale", "TransferAsset", "TransferAssetFromDeveloper"];
                                readonly description: "`BuyAsset` `BuyAssetWithCreditCard` `CancelAssetSale` `ChangeAssetPrice` `ListAssetSale` `TransferAsset` `TransferAssetFromDeveloper`";
                            };
                            readonly item: {
                                readonly description: "Asset details";
                                readonly type: "object";
                                readonly required: readonly ["id", "created", "name", "description", "environment", "imported", "imageUrl", "status", "escrow", "mintAddress"];
                                readonly properties: {
                                    readonly id: {
                                        readonly type: "string";
                                        readonly description: "The ID of the Asset";
                                    };
                                    readonly attributes: {
                                        readonly description: "The attributes of the Asset";
                                        readonly type: "array";
                                        readonly items: {
                                            readonly type: "object";
                                            readonly required: readonly ["traitType", "value"];
                                            readonly properties: {
                                                readonly traitType: {
                                                    readonly type: "string";
                                                    readonly description: "The name of the trait";
                                                };
                                                readonly value: {
                                                    readonly type: "string";
                                                    readonly description: "The value of the trait";
                                                };
                                            };
                                        };
                                    };
                                    readonly created: {
                                        readonly type: "number";
                                        readonly description: "The date the Asset was created";
                                    };
                                    readonly name: {
                                        readonly type: "string";
                                        readonly description: "The name of the Asset";
                                    };
                                    readonly collection: {
                                        readonly description: "The collection the Asset belongs to";
                                        readonly type: "object";
                                        readonly required: readonly ["id", "name", "description", "environment", "imported", "created"];
                                        readonly properties: {
                                            readonly id: {
                                                readonly type: "string";
                                                readonly description: "The id of the collection. This is not an on-chain address, but instead an ID internal to GameShift";
                                            };
                                            readonly name: {
                                                readonly type: "string";
                                                readonly description: "The name given to the collection";
                                            };
                                            readonly description: {
                                                readonly type: "string";
                                                readonly description: "The description given to the collection";
                                            };
                                            readonly environment: {
                                                readonly type: "string";
                                                readonly description: "The collection's environment\n\n`Development` `Production`";
                                                readonly enum: readonly ["Development", "Production"];
                                            };
                                            readonly imageUrl: {
                                                readonly type: readonly ["string", "null"];
                                                readonly description: "The url of the image used to represent the collection";
                                            };
                                            readonly imported: {
                                                readonly type: "boolean";
                                                readonly description: "Whether the collection was imported";
                                            };
                                            readonly mintAddress: {
                                                readonly type: readonly ["string", "null"];
                                                readonly description: "The mint address of the collection on-chain";
                                            };
                                            readonly created: {
                                                readonly type: "number";
                                                readonly description: "Timestamp of collection creation";
                                            };
                                            readonly stats: {
                                                readonly description: "Statistics about the collection";
                                                readonly type: "object";
                                                readonly required: readonly ["numMinted", "floorPrice", "numListed", "numOwners"];
                                                readonly properties: {
                                                    readonly numMinted: {
                                                        readonly type: "number";
                                                        readonly description: "The number of assets minted for this collection";
                                                    };
                                                    readonly floorPrice: {
                                                        readonly type: "number";
                                                        readonly description: "The floor price of the collection";
                                                    };
                                                    readonly numListed: {
                                                        readonly type: "number";
                                                        readonly description: "The number of assets listed for this collection";
                                                    };
                                                    readonly numOwners: {
                                                        readonly type: "number";
                                                        readonly description: "The number of unique owners of assets in this collection";
                                                    };
                                                };
                                            };
                                        };
                                    };
                                    readonly description: {
                                        readonly type: "string";
                                        readonly description: "The description provided when the Asset was created";
                                    };
                                    readonly environment: {
                                        readonly type: "string";
                                        readonly description: "The asset's environment\n\n`Development` `Production`";
                                        readonly enum: readonly ["Development", "Production"];
                                    };
                                    readonly imported: {
                                        readonly type: "boolean";
                                        readonly description: "Whether the Asset was imported";
                                    };
                                    readonly imageUrl: {
                                        readonly type: "string";
                                        readonly description: "The URI for the image representing the Asset";
                                    };
                                    readonly status: {
                                        readonly type: "string";
                                        readonly description: "The current status of the Asset\n\n`Uninitiated` `Unprocessed` `Processing` `Committed` `Failed`";
                                        readonly enum: readonly ["Uninitiated", "Unprocessed", "Processing", "Committed", "Failed"];
                                    };
                                    readonly escrow: {
                                        readonly type: "boolean";
                                        readonly description: "If the asset is in escrow or not";
                                    };
                                    readonly mintAddress: {
                                        readonly type: "string";
                                        readonly description: "The address of the Asset on the blockchain";
                                    };
                                    readonly owner: {
                                        readonly description: "The current owner of the Asset.";
                                        readonly type: readonly ["object", "null"];
                                        readonly properties: {
                                            readonly address: {
                                                readonly type: readonly ["string", "null"];
                                                readonly description: "The wallet that currently holds this asset";
                                            };
                                            readonly referenceId: {
                                                readonly type: readonly ["string", "null"];
                                                readonly description: "The reference id associated with the wallet";
                                            };
                                        };
                                    };
                                    readonly priceCents: {
                                        readonly type: readonly ["number", "null"];
                                        readonly description: "The price of the asset on the marketplace in cents";
                                    };
                                };
                            };
                        };
                        readonly required: readonly ["type", "item"];
                    }, {
                        readonly type: "object";
                        readonly properties: {
                            readonly type: {
                                readonly type: "string";
                                readonly enum: readonly ["TransferToken", "TransferTokenFromDeveloper"];
                                readonly description: "`TransferToken` `TransferTokenFromDeveloper`";
                            };
                            readonly item: {
                                readonly description: "Token details";
                                readonly type: "object";
                                readonly required: readonly ["id", "mintAddress", "name", "symbol"];
                                readonly properties: {
                                    readonly id: {
                                        readonly type: "string";
                                        readonly description: "The ID for the currency";
                                    };
                                    readonly mintAddress: {
                                        readonly type: "string";
                                        readonly description: "The address for the currency's SPL token mint";
                                    };
                                    readonly name: {
                                        readonly type: "string";
                                        readonly description: "The name of the currency";
                                    };
                                    readonly symbol: {
                                        readonly type: "string";
                                        readonly description: "The currency's symbol";
                                    };
                                };
                            };
                        };
                        readonly required: readonly ["type", "item"];
                    }, {
                        readonly type: "object";
                        readonly properties: {
                            readonly type: {
                                readonly type: "string";
                                readonly enum: readonly ["TransferStackableAsset", "TransferStackableAssetFromDeveloper"];
                                readonly description: "`TransferStackableAsset` `TransferStackableAssetFromDeveloper`";
                            };
                            readonly item: {
                                readonly description: "StackableAsset details";
                                readonly type: "object";
                                readonly required: readonly ["id", "created", "name", "description", "environment", "imageUrl", "status"];
                                readonly properties: {
                                    readonly id: {
                                        readonly type: "string";
                                        readonly description: "The ID of the Stackable Asset";
                                    };
                                    readonly attributes: {
                                        readonly description: "Add attributes to your Asset";
                                        readonly type: "array";
                                        readonly items: {
                                            readonly type: "object";
                                            readonly required: readonly ["traitType", "value"];
                                            readonly properties: {
                                                readonly traitType: {
                                                    readonly type: "string";
                                                    readonly description: "The name of the trait";
                                                };
                                                readonly value: {
                                                    readonly type: "string";
                                                    readonly description: "The value of the trait";
                                                };
                                            };
                                        };
                                    };
                                    readonly created: {
                                        readonly type: "number";
                                        readonly description: "The date the Asset was created";
                                    };
                                    readonly name: {
                                        readonly type: "string";
                                        readonly description: "The name of the Stackable Asset. Max length: 32 chars";
                                        readonly maxLength: 32;
                                    };
                                    readonly symbol: {
                                        readonly type: "string";
                                        readonly description: "The symbol of the Stackable Asset. Max length: 5 chars";
                                        readonly maxLength: 5;
                                    };
                                    readonly description: {
                                        readonly type: "string";
                                        readonly description: "A description for the Asset";
                                        readonly maxLength: 64;
                                    };
                                    readonly collection: {
                                        readonly description: "The collection the Asset belongs to";
                                        readonly type: "object";
                                        readonly required: readonly ["id", "name", "description", "environment", "imported", "created"];
                                        readonly properties: {
                                            readonly id: {
                                                readonly type: "string";
                                                readonly description: "The id of the collection. This is not an on-chain address, but instead an ID internal to GameShift";
                                            };
                                            readonly name: {
                                                readonly type: "string";
                                                readonly description: "The name given to the collection";
                                            };
                                            readonly description: {
                                                readonly type: "string";
                                                readonly description: "The description given to the collection";
                                            };
                                            readonly environment: {
                                                readonly type: "string";
                                                readonly description: "The collection's environment\n\n`Development` `Production`";
                                                readonly enum: readonly ["Development", "Production"];
                                            };
                                            readonly imageUrl: {
                                                readonly type: readonly ["string", "null"];
                                                readonly description: "The url of the image used to represent the collection";
                                            };
                                            readonly imported: {
                                                readonly type: "boolean";
                                                readonly description: "Whether the collection was imported";
                                            };
                                            readonly mintAddress: {
                                                readonly type: readonly ["string", "null"];
                                                readonly description: "The mint address of the collection on-chain";
                                            };
                                            readonly created: {
                                                readonly type: "number";
                                                readonly description: "Timestamp of collection creation";
                                            };
                                            readonly stats: {
                                                readonly description: "Statistics about the collection";
                                                readonly type: "object";
                                                readonly required: readonly ["numMinted", "floorPrice", "numListed", "numOwners"];
                                                readonly properties: {
                                                    readonly numMinted: {
                                                        readonly type: "number";
                                                        readonly description: "The number of assets minted for this collection";
                                                    };
                                                    readonly floorPrice: {
                                                        readonly type: "number";
                                                        readonly description: "The floor price of the collection";
                                                    };
                                                    readonly numListed: {
                                                        readonly type: "number";
                                                        readonly description: "The number of assets listed for this collection";
                                                    };
                                                    readonly numOwners: {
                                                        readonly type: "number";
                                                        readonly description: "The number of unique owners of assets in this collection";
                                                    };
                                                };
                                            };
                                        };
                                    };
                                    readonly environment: {
                                        readonly type: "string";
                                        readonly description: "The asset's environment\n\n`Development` `Production`";
                                        readonly enum: readonly ["Development", "Production"];
                                    };
                                    readonly imageUrl: {
                                        readonly type: "string";
                                        readonly description: "A url to the image underlying the Asset";
                                    };
                                    readonly status: {
                                        readonly type: "string";
                                        readonly description: "The current status of the Asset\n\n`Uninitiated` `Unprocessed` `Processing` `Committed` `Failed`";
                                        readonly enum: readonly ["Uninitiated", "Unprocessed", "Processing", "Committed", "Failed"];
                                    };
                                    readonly mintAddress: {
                                        readonly type: "string";
                                        readonly description: "The address of the Asset on the blockchain";
                                    };
                                };
                            };
                        };
                        readonly required: readonly ["type", "item"];
                    }, {
                        readonly type: "object";
                        readonly properties: {
                            readonly type: {
                                readonly type: "string";
                                readonly enum: readonly ["AbitraryTransaction"];
                                readonly description: "`AbitraryTransaction`";
                            };
                        };
                        readonly required: readonly ["type"];
                    }, {
                        readonly type: "object";
                        readonly properties: {
                            readonly type: {
                                readonly type: "string";
                                readonly enum: readonly ["Withdraw"];
                                readonly description: "`Withdraw`";
                            };
                        };
                        readonly required: readonly ["type"];
                    }];
                };
            };
            readonly required: readonly ["id", "created", "status", "details"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
export { AssetControllerBuyAsset, AssetControllerCancelListingAsset, AssetControllerCreateAsset, AssetControllerEditAsset, AssetControllerListAsset, CollectionControllerCreateCollection, CollectionControllerGetAll, CollectionControllerGetAssets, CollectionControllerGetCollection, CollectionControllerImportCollection, CollectionControllerUnimport, CraftingRecipesControllerCreate, CraftingRecipesControllerGet, CraftingRecipesControllerGetAll, DeveloperWalletControllerFetchWalletAddress, DeveloperWalletControllerGetItems, DeveloperWalletControllerTransferItem, ItemsControllerGet, ItemsControllerGetAll, LendControllerAcceptLease, LendControllerCancelLease, LendControllerGetLease, LendControllerReturnLease, LoyaltyProgramControllerAllocateLoyaltyProgramRewards, LoyaltyProgramControllerCreateLoyaltyProgram, LoyaltyProgramControllerCreateLoyaltyProgramRewardSnapshot, LoyaltyProgramControllerDeleteLoyaltyProgram, LoyaltyProgramControllerEnrollUserInLoyaltyProgram, LoyaltyProgramControllerFundLoyaltyProgramRewards, LoyaltyProgramControllerGetLoyaltyProgram, LoyaltyProgramControllerGetLoyaltyProgramEnrollments, LoyaltyProgramControllerGetLoyaltyProgramRewardSnapshot, LoyaltyProgramControllerGetLoyaltyProgramRewards, LoyaltyProgramControllerGetLoyaltyProgramStatsSummary, LoyaltyProgramControllerGetLoyaltyPrograms, LoyaltyProgramControllerSetLoyaltyProgramName, LoyaltyProgramControllerUpdateLoyaltyProgram, LoyaltyProgramControllerWithdrawLoyaltyProgramRewards, LoyaltyProgramEnrollmentsControllerClaimRewardsFromLoyaltyProgram, LoyaltyProgramEnrollmentsControllerDisenrollUserFromLoyaltyProgram, LoyaltyProgramEnrollmentsControllerGetLoyaltyProgramEnrollmentById, LoyaltyProgramEnrollmentsControllerGetLoyaltyProgramEnrollmentsByProject, PaymentControllerCheckout, PaymentControllerGet, PaymentControllerGetAll, ProjectTokenControllerImport, ProjectTokenControllerRefreshMetadata, ProjectTokenControllerUnimport, ProjectUserControllerCreate, ProjectUserControllerCreateLease, ProjectUserControllerGet, ProjectUserControllerGetAll, ProjectUserControllerGetItem, ProjectUserControllerGetLoyaltyProgramEnrollmentsByUser, ProjectUserControllerGetUserItems, ProjectUserControllerGetWalletAddress, ProjectUserControllerGetWithdrawal, ProjectUserControllerGetWithdrawals, ProjectUserControllerSignTransaction, ProjectUserControllerTransfer, ProjectUserControllerWithdraw, StackableAssetControllerCreateStackableAsset, StackableAssetControllerIssueAsset, StackableAssetControllerUpdateAsset, TransactionControllerGet };
