const axios = require('axios');
const config = require('../config/config');
const {starWars } = require('unique-names-generator');
const { uniqueNamesGenerator, NumberDictionary } = require ('unique-names-generator');
const crypto = require('crypto');
const ApiError = require('./ApiError');
const httpStatus = require('http-status');

const numberDictionary = NumberDictionary.generate({ min: 100, max: 999 });

exports.AxiosInstance = axios.create({
  baseURL: config.gs.gsBaseUrl,
  timeout: 5000,
  headers: {
    'x-api-key': config.gs.gsApiKey,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

exports.shortName = uniqueNamesGenerator({
  dictionaries: [starWars,numberDictionary], // colors can be omitted here as not used
  length: 2,
  separator: '-'
});

exports.verifyWebhook = (req, res, next) =>{
  try {
    const { body } = req;

    const signature = req.headers["webhook-signature"];
    const webhookId = req.headers["webhook-id"];
    const timestamp = req.headers["webhook-timestamp"];

    const signedContent = `${webhookId}.${timestamp}.${JSON.stringify(body)}`;
    const expectedSignature = crypto.createHmac('sha256', config.gs.gsHooksValidationKey)
      .update(signedContent)
      .digest('base64');

    if(expectedSignature !== signature)
    {
      return next(new ApiError(httpStatus.BAD_REQUEST, "Mismatched signature"));
    }

    return next();

  }catch (e) {
    return next(new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Error"));
  }
}

