const mongoose = require('mongoose');
const { toJSON } = require('./plugins');
const { PaymentStatus } = require('../utils/staticData');

const paymentScheme = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      trim: true,
      index:true
    },
    paymentId: {
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
      enum: [PaymentStatus.PENDING,PaymentStatus.INITIATED,PaymentStatus.COMPLETED,PaymentStatus.FAILED],
      default: PaymentStatus.PENDING,
      required: true
    },
    isAutoMinted: {
      type: Boolean,
      required: false,
      default: true
    },
    consentUrl: {
      type: String,
      required: true,
      trim: true,
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
paymentScheme.plugin(toJSON);

/**
 * @typedef Token
 */
const Payment = mongoose.model('Payment', paymentScheme);

module.exports = Payment;
