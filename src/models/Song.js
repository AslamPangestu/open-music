const Joi = require('joi');

const BaseModel = require('../core/BaseModel');

const SongPayloadModel = new BaseModel({
  schema: {
    title: Joi.string().required(),
    year: Joi.number().required(),
    genre: Joi.string().required(),
    performer: Joi.string().required(),
    duration: Joi.number(),
    albumId: Joi.string(),
  },
});

module.exports = { SongPayloadModel };
