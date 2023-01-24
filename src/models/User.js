const Joi = require('joi');

const BaseModel = require('../core/BaseModel');

const UserPayloadModel = new BaseModel({
  schema: {
    username: Joi.string().max(50).required(),
    password: Joi.string().required(),
    fullname: Joi.string().required(),
  },
});

module.exports = { UserPayloadModel };
