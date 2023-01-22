const Joi = require('joi');

const BaseModel = require('../core/BaseModel');

const UserPayloadModel = new BaseModel({
  schema: {
    username: Joi.string().required(),
    password: Joi.string().required(),
    fullname: Joi.string().required(),
  },
});

module.exports = { UserPayloadModel };
