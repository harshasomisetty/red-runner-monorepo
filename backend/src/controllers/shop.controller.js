const httpStatus = require('http-status');
const {shopService} = require('../services');

const getShopData = (req, res) => {
  res.status(httpStatus.OK).send(shopService.GetShopStaticData());
};

exports.getShopData = getShopData;
