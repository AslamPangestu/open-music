const Joi = require('joi');

const BaseModel = require('../core/BaseModel');

const AlbumPayloadModel = new BaseModel({
  schema: {
    name: Joi.string().required(),
    year: Joi.number().required(),
  },
});

module.exports = { AlbumPayloadModel };
