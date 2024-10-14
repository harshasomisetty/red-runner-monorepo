const Joi = require('joi');

const getShop = {
  body: Joi.object().keys({
    pageNumber: Joi.number().required(),
    types: Joi.string().custom((value, helpers) =>  {
  const tokens = value.split(',');
  const allowedTokens = new Set(['Currency', 'UniqueAsset', 'StackableAssets']);
  for (const token of tokens) {
    if (!allowedTokens.has(token)) {
      return { value, errors: helpers.error('tokenString.invalid') };
    }
  }

  return { value };
}),
    forSale: Joi.bool(),
    collectionId: Joi.string(),
  }),
};



module.exports = {
  getShop
};
