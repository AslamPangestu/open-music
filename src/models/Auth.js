const Joi = require('joi');

const BaseModel = require('../core/BaseModel');

const AuthPayloadModel = new BaseModel({
  schema: {
    username: Joi.string().required(),
    password: Joi.string().required(),
  },
});

const TokenPayloadModel = new BaseModel({
  schema: {
    refreshToken: Joi.string().required(),
  },
});

module.exports = { AuthPayloadModel, TokenPayloadModel };
