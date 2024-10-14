module.exports.AssetMintEvent = Object.freeze({
  INITIATED: 'asset.mint.initiated',
  COMPLETED: 'asset.mint.completed',
  FAILED: 'asset.mint.failed',
});

module.exports.MarketPlaceEvent = Object.freeze({
  LISTED: 'asset.marketplace.listed',
  UNLISTED: 'asset.marketplace.unlisted',
  BOUGHT: 'asset.marketplace.buy',
});

module.exports.PaymentEvent = Object.freeze({
  INITIATED: 'payment.initiated',
  COMPLETED: 'payment.completed',
  FAILED: 'payment.failed',
});

module.exports.PayoutEvent = Object.freeze({
  INITIATED: 'developer.currency.transfer.initiated',
  COMPLETED: 'developer.currency.transfer.completed',
  FAILED: 'developer.currency.transfer.failed',
});

module.exports.TransactionUpdate = Object.freeze({
  INITIATED: 'payment.initiated',
  COMPLETED: 'payment.completed',
  FAILED: 'payment.failed',
});

module.exports.AssetMintStatus = Object.freeze({
  INITIATED: 'Initiated',
  COMPLETED: 'Completed',
  FAILED: 'Failed',
  PENDING: 'Pending',
});

module.exports.PaymentStatus = Object.freeze({
  INITIATED: 'Initiated',
  COMPLETED: 'Completed',
  FAILED: 'Failed',
  PENDING: 'Pending',
});

module.exports.CoinToSolRatio = 1;
