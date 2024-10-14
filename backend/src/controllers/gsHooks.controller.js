const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const { AssetMint, Payment, User } = require('../models');
const { MarketPlaceEvent,AssetMintEvent, AssetMintStatus, PaymentEvent, PaymentStatus, PayoutEvent } = require('../utils/staticData');
const { gsService } = require('../services');
const {SendUserMessageOnSocket} = require('../socket/socket.controller');


const PaymentsHook = catchAsync(async (req, res) => {
  try {
    const eventType = req.body.type;
    console.log("Event Type:"+eventType);

    if(!Object.values(PaymentEvent).includes(eventType))
      return;

    const data = req.body.data;

    if (data) {
      const internalData = {
        type: data.type,
        status: data.status,
        currency: data.currency,
        unit: data.unit,
        details: data.details,
        amount: data.amount,
        paymentId: data.paymentId
      };

      console.log(`Event Type:${eventType} Status: ${internalData.status} PaymentId:${internalData.paymentId}` );

      const paymentModel = await Payment.findOne({ paymentId: internalData.paymentId });

      if (paymentModel) {
        switch (eventType) {
          case PaymentEvent.INITIATED:
            paymentModel.status = PaymentStatus.INITIATED;
            SendUserMessageOnSocket(paymentModel.userId,"paymentInitiated","");

            break;
          case PaymentEvent.FAILED:
            paymentModel.status = PaymentStatus.FAILED;
            SendUserMessageOnSocket(paymentModel.userId,"paymentFailed","");
            break;
          case PaymentEvent.COMPLETED:
            paymentModel.status = PaymentStatus.COMPLETED;

            //Initiate minting if required//
            if(!paymentModel.isAutoMinted)
            {
              const asset= await gsService.MintAssetToUser(paymentModel.userId,paymentModel.itemId);

              const mintModel = new AssetMint({
                userId: paymentModel.userId,
                gsAssetId: asset.data["id"],
                itemId: paymentModel.itemId,
                status: AssetMintStatus.PENDING,
                paymentDocumentId: paymentModel._id
              });

              await mintModel.save();
            }

            SendUserMessageOnSocket(paymentModel.userId,"paymentComplete","");

            break;
          default:
            paymentModel.status = PaymentStatus.PENDING;
            break;
        }

        await paymentModel.save();
      }

      // res.status(httpStatus.FOUND).send();
    }
  } catch (e) {
    console.log(e);
    // throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
  }
});

const PayoutHooks = catchAsync(async (req, res) => {
  try {
    const eventType = req.body.type;
    console.log("Event Type:"+eventType);

    if(!Object.values(PayoutEvent).includes(eventType))
      return;

    const data = req.body.data;

    if (data) {
      const internalData = {
        type: data.type,
        status: data.status,
        currency: data.currency,
        amount: data.amount,
        from: data.from,
        to: data.to,
        transactionId: data.paymentId
      };

      console.log(`Event Type:${eventType} Status: ${internalData.status} TransactionId:${internalData.transactionId}` );

      const user = await User.findOne({walletId: internalData.to});

      if (user) {
        switch (eventType) {
          case PayoutEvent.INITIATED:
            SendUserMessageOnSocket(user.userId,"payoutInitiated","");
            break;
          case PayoutEvent.FAILED:
            SendUserMessageOnSocket(user.userId,"payoutFailed",);
            break;
          case PayoutEvent.COMPLETED:
            //TODO:Just send the socket a message here that you got monays
            SendUserMessageOnSocket(user.userId,"payoutComplete",internalData.amount);
            break;
          default:
            break;
        }
      }

      // res.status(httpStatus.FOUND).send();
    }
  } catch (e) {
    console.log(e);
    // throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
  }
});

const MarketplaceHooks = catchAsync(async (req, res) => {
  try {
    const eventType = req.body.type;

    if(!Object.values(MarketPlaceEvent).includes(eventType))
      return;

    console.log("Event Type:"+eventType);
    const data = req.body.data;

    if (data) {
      const internalData = {
        sellerId: data.sellerId,
      };

      const user = await User.findOne({ userId: internalData.sellerId });

      if (user) {
        switch (eventType) {
          case MarketPlaceEvent.LISTED:
            SendUserMessageOnSocket(user.userId, "marketAssetListed", "");
            break;
          case MarketPlaceEvent.UNLISTED:
            SendUserMessageOnSocket(user.userId, "marketAssetUnListed","");
            break;
          case MarketPlaceEvent.BOUGHT:
            SendUserMessageOnSocket(user.userId, "marketAssetBought","");
            break;
          default:
            break;
        }
      }
    }
  } catch (e) {
    console.log(e);
    // throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
  }
});

/**
 * type PaymentEventPayload = {
 *   type: 'payment';
 *   status: 'success' | 'failed';
 *   currency: 'USD' | 'USDC' | 'SOL';
 *   unit: 'cents' | 'dollars' | 'lamports';
 *   amount: number;
 *   transactionId?: string;
 * };
 */


const AssetMintingHook = catchAsync(async (req, res) => {
  try {

    const eventType = req.body.type;
    console.log("Event Type:"+eventType);

    if(!Object.values(AssetMintEvent).includes(eventType))
      return;

    const data = req.body.data;

    if (data) {
      const internalData = {
        type: data.type,
        status: data.status,
        assetId: data.assetId,
        collectionId: data.collectionId,
        details: data.details,
        userId: data.userId
      };

      console.log(`Event Type:${eventType} Status: ${internalData.status} assetID:${internalData.assetId}` );

      const mintModel = await AssetMint.findOne({ gsAssetId: internalData.assetId });

      switch (eventType) {
        case AssetMintEvent.INITIATED:
          mintModel && (mintModel.status = AssetMintStatus.INITIATED);

          SendUserMessageOnSocket(internalData.userId,"assetMintInitiated","");
          break;
        case AssetMintEvent.FAILED:
          mintModel && (mintModel.status = AssetMintStatus.FAILED);

          SendUserMessageOnSocket(internalData.userId,"assetMintFailed","");
          break;
        case AssetMintEvent.COMPLETED:

          mintModel && (mintModel.status = AssetMintStatus.COMPLETED);
          //TODO: Send socket message to user using: For now this can only be done in case of USD credit card payments//
          const itemIdToSend = (mintModel !== null) ? mintModel.itemId : internalData.assetId;
          SendUserMessageOnSocket(internalData.userId,"assetMintComplete", itemIdToSend);

          break;
        default:
          mintModel && (mintModel.status = AssetMintStatus.PENDING);
          break;
      }
      if (mintModel)
        await mintModel.save();

      // res.status(httpStatus.FOUND).send();
    }
  } catch (e) {
    console.log(e);
    // throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
  }
});

/*
{
  "type": "asset.mint.initiated",
  "timestamp": 1723126330559,
  "environment": "Development",
  "data": {
    "type": "asset",
    "status": "success",
    "assetId": "63c21857-98a1-460a-8fc5-4b04881d79e5",
    "collectionId": "0dfe473e-bbb7-453f-8d3f-ba9af79dfc14",
    "details": "Asset mint initiated"
  }
}
* */

module.exports = {
  AssetMintingHook,
  PaymentsHook,
  PayoutHooks,
  MarketplaceHooks
};
