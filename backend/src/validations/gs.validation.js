const Joi = require('joi');
const { assetFilter } = require('./custom.validation');

const fetchInfo = {
  body: Joi.object().keys({
    userId: Joi.string().required(),
  }),
};
const fetchInventory = {
  body: Joi.object().keys({
    pageNumber: Joi.number().required(),
    types: Joi.string().custom(assetFilter),
    forSale: Joi.bool(),
    collectionId: Joi.string(),
  }),
};

const fetchMarketPlace = {
  body: Joi.object().keys({
    pageNumber: Joi.number().required(),
    types: Joi.string().custom(assetFilter),
    collectionId: Joi.string(),
  }),
};

const mintAsset = {
  body: Joi.object().keys({
    itemId: Joi.string().required(),
  }),
};

const buyItem = {
  body: Joi.object().keys({
    itemId: Joi.string().required(),
    currencyId: Joi.string().required(),
  }),
};

const coinClaim = {
  body: Joi.object().keys({
    quantity: Joi.number().required(),
  }),
};

const transferSol = {
  body: Joi.object().keys({
    quantity: Joi.number().required(),
  }),
};

const updateNft = {
  body: Joi.object().keys({
    usesLeft: Joi.number().required(),
    itemId: Joi.string().required(),
    assetId: Joi.string().required(),
  }),
};

const withdrawFunds = {
  query: Joi.object().keys({
    userId: Joi.string().required()
  }),
};

const assetListing = {
  query: Joi.object().keys({
    userId: Joi.string().required()
  }),
  body: Joi.object().keys({
    assetId: Joi.string().required(),
    amount: Joi.number().required()
  })
};

const assetDeListing = {
  query: Joi.object().keys({
    userId: Joi.string().required()
  }),
  body: Joi.object().keys({
    assetId: Joi.string().required()
  })
};

const marketPlaceItemBuy = {
  query: Joi.object().keys({
    userId: Joi.string().required()
  }),
  body: Joi.object().keys({
    assetId: Joi.string().required()
  })
};

const webHook = {
  headers: Joi.object().keys({
    "webhook-id": Joi.string().required(),
    "webhook-timestamp": Joi.string(),
    "webhook-signature": Joi.string(),
  }).unknown(true),
};

module.exports = {
  fetchInfo,
  fetchInventory,
  webHook,
  mintAsset,
  buyItem,
  transferSol,
  coinClaim,
  updateNft,
  withdrawFunds,
  assetListing,
  assetDeListing,
  marketPlaceItemBuy,
  fetchMarketPlace
};
