const { gsService, shopService } = require('../services');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const DataParser = require('../parsers/inventoryData.parser');
const { Payment } = require('../models');
const { PaymentStatus } = require('../utils/staticData');
const gsUtil = require('../utils/gsUtil');
const staticData = require('../utils/staticData');
const userService = require('../services/user.service');

const getUserWalletAddress = catchAsync(async (req, res) => {
  try {
    const walletAddress = await gsService.getUserWalletAddress(req.user.id);
    res.status(httpStatus.FOUND).send({ walletId: walletAddress });
  } catch (e) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
  }
});

const getUserInventory = catchAsync(async (req, res) => {
  try {
    const inventory = await gsService.getUserInventory(req.body);
    const dataParser = new DataParser(inventory['data']);
    const modelToSend = dataParser.GetClientModel();
    res.status(httpStatus.OK).send(modelToSend);
  } catch (e) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
  }
});

const mintAssetToUser = catchAsync(async (req, res) => {
  try {
    const asset = await gsService.MintAssetToUser(req.body.userId, req.body.itemId);
    res.status(httpStatus.OK).send(asset);
  } catch (e) {
    if (e instanceof ApiError) {
      res.status(e.statusCode).send({ message: e.message });
      return;
    }
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: e.message });
  }
});

const GetMarketPlaceItems = catchAsync(async (req, res) => {
  try {
    const inventory = await gsService.GetMarketPlaceAssets(req.body);
    const dataParser = new DataParser(inventory['data']);
    const modelToSend = dataParser.GetClientModel();
    res.status(httpStatus.OK).send(modelToSend);
  } catch (e) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
  }
});

const updateUserAsset = catchAsync(async (req, res) => {
  try {
    const asset = await gsService.UpdateAsset(req.body.assetId, req.body.itemId, req.body['usesLeft']);
    res.status(httpStatus.OK).send(asset);
  } catch (e) {
    if (e instanceof ApiError) {
      res.status(e.statusCode).send({ message: e.message });
      return;
    }
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: e.message });
  }
});

const withdrawFundsToAccount = catchAsync(async (req, res) => {
  try {
    const asset = await gsService.WithdrawFunds(req.body.userId);
    res.status(httpStatus.OK).send(asset);
  } catch (e) {
    if (e instanceof ApiError) {
      res.status(e.statusCode).send({ message: e.message });
      return;
    }
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: e.message });
  }
});

const ListAssetForSale = catchAsync(async (req, res) => {
  try {
    const asset = await gsService.ListAssetForSale(req.body.assetId, req.body.amount);
    res.status(httpStatus.OK).send(asset);
  } catch (e) {
    if (e instanceof ApiError) {
      res.status(e.statusCode).send({ message: e.message });
      return;
    }
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: e.message });
  }
});

const DeListAssetForSale = catchAsync(async (req, res) => {
  try {
    const asset = await gsService.DeListAssetForSale(req.body.assetId);
    res.status(httpStatus.OK).send(asset);
  } catch (e) {
    if (e instanceof ApiError) {
      res.status(e.statusCode).send({ message: e.message });
      return;
    }
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: e.message });
  }
});

const BuyAssetFromMarket = catchAsync(async (req, res) => {
  try {
    const asset = await gsService.BuyAssetFromMarketplace(req.body.userId, req.body.assetId);
    res.status(httpStatus.OK).send(asset);
  } catch (e) {
    if (e instanceof ApiError) {
      res.status(e.statusCode).send({ message: e.message });
      return;
    }
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: e.message });
  }
});

const transferSolDevToUser = catchAsync(async (req, res) => {
  try {
    const response = await gsService.TransferSolDevWalletToUser(req.body.userId, req.body.quantity);
    res.status(httpStatus.OK).send(response.data);
  } catch (e) {
    if (e instanceof ApiError) {
      res.status(e.statusCode).send({ message: e.message });
      return;
    }
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: e.message });
  }
});

const userClaimsCoins = catchAsync(async (req, res) => {
  try {
    const quantity = req.body.quantity;
    const userId = req.body.userId;

    await userService.updateUserById(userId, { coinsCollected: quantity });

    const rrQuantity = quantity * staticData.CoinToSolRatio;

    const response = await gsService.TransferRRDevWalletToUser(req.body.userId, rrQuantity.toString());

    res.status(httpStatus.OK).send(response.data);
  } catch (e) {
    if (e instanceof ApiError) {
      res.status(e.statusCode).send({ message: e.message });
      return;
    }
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: e.message });
  }
});

const buyItem = catchAsync(async (req, res) => {
  try {
    const itemToBuy = shopService.GetItemMintableByKey(req.body.itemId);
    let payment;

    if (req.body.currencyId === 'SOL') {
      //This requires a different flow
      payment = await gsService.CreateSolPayment(req.body.userId, itemToBuy);
    } else {
      payment = await gsService.CreateCreditCardPayment(
        req.body.userId,
        req.body.itemId,
        req.body.currencyId,
        itemToBuy['price'][req.body.currencyId],
        itemToBuy['name'],
        itemToBuy['description']
      );
    }

    const paymentModel = new Payment({
      userId: req.body.userId,
      paymentId: payment.data['id'],
      itemId: req.body.itemId,
      status: PaymentStatus.PENDING,
      consentUrl: payment.data['checkoutUrl'],
      isAutoMinted: req.body.currencyId !== 'USDC', //in the case of USDC the asset is not autominted//
    });

    await paymentModel.save();
    res.status(httpStatus.OK).send(payment.data);
  } catch (e) {
    if (e instanceof ApiError) {
      res.status(e.statusCode).send({ message: e.message });
      return;
    }
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: e.message });
  }
});

module.exports = {
  getUserWalletAddress,
  getUserInventory,
  mintAssetToUser,
  buyItem,
  transferSolDevToUser,
  userClaimsCoins,
  updateUserAsset,
  withdrawFundsToAccount,
  ListAssetForSale,
  DeListAssetForSale,
  BuyAssetFromMarket,
  GetMarketPlaceItems,
};
