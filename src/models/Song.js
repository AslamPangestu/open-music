const Joi = require('joi');

const BaseModel = require('../core/BaseModel');

const currentYear = new Date().getFullYear();

const SongPayloadModel = new BaseModel({
  schema: {
    title: Joi.string().required(),
    year: Joi.number().min(1900).max(currentYear).required(),
    genre: Joi.string().required(),
    performer: Joi.string().required(),
    duration: Joi.number(),
    albumId: Joi.string(),
  },
});

module.exports = { SongPayloadModel };
