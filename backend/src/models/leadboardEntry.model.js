const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');
const gsUtil = require('../utils/gsUtil');

const loaderboardEntrySchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      primaryKey:true,
      index:true
    },
    name: {
      type: String,
      required: true,
      trim: true,
      default:gsUtil.shortName
    },
    score: {
      type: Number,
    },
  },
  {
    timestamps: true,

  }
);

// add plugin that converts mongoose to json
loaderboardEntrySchema.plugin(toJSON);
loaderboardEntrySchema.plugin(paginate);

loaderboardEntrySchema.statics.isUserRecordExist = async function (userId, excludeUserId) {
  const record = await this.findById({ userId, _id: { $ne: excludeUserId } });
  return !!record;
};
/**
 * @typedef User
 */
const LeaderboardEntry = mongoose.model('LeaderboardEntries', loaderboardEntrySchema);

module.exports = LeaderboardEntry;
