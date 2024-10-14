const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');
const gsUtil = require('../utils/gsUtil');

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
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
    walletId: {
      type: String,
      required: true,
      trim: true
    },
    coinsCollected: {
      type: Number,
      required: false,
      trim: true,
      default:0
    },
    role: {
      type: String,
      enum: roles,
      default: 'user',
      private: true,
    },
  },
  {
    timestamps: true,

  }
);

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);
userSchema.plugin(paginate);

/**
 * Check if email is taken
 * @param userId
 * @returns {Promise<boolean>}
 */
userSchema.statics.isUserExists = async function (userId) {
  const user = await this.findOne({"userId":userId});
  return !!user;
};

/**
 * @typedef User
 */
const User = mongoose.model('User', userSchema);

module.exports = User;
