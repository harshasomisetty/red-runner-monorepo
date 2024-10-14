const Joi = require('joi');

const AddLeaderboardEntry = {
  body: Joi.object().keys({
    score: Joi.number().required(),
  }),
};

module.exports = {
  AddLeaderboardEntry
};
