const mongoose = require('mongoose');
const { toJSON } = require('./plugins');
const {AssetMintStatus} = require('../utils/staticData');

const assetMintScheme = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      trim: true,
      index:true
    },
    gsAssetId: {  //this is the game shift internal id of the asset
      type: String,
      required: true,
      index: true,
      unique: true
    },
    itemId: { //this is the item id from the game//once this payment is completed mint this to the user
      type: String,
      required: true,
      trim: true
    },
    status: { //The status coming from the call is different to this, this is based on the webhooks//
      type: String,
      enum: [AssetMintStatus.PENDING,AssetMintStatus.INITIATED,AssetMintStatus.COMPLETED,AssetMintStatus.FAILED], //this comes from the webhooks and is not a representation of the state of the minting process//
      default: AssetMintStatus.PENDING,
      required: true
    },
    paymentDocumentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Payment',
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
assetMintScheme.plugin(toJSON);

/**
 * @typedef Token
 */
const AssetMint = mongoose.model('AssetMint', assetMintScheme);

module.exports = AssetMint;
