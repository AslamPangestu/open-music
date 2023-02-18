const Joi = require('joi');

const BaseModel = require('../core/BaseModel');

const currentYear = new Date().getFullYear();

const AlbumPayloadModel = new BaseModel({
  schema: {
    name: Joi.string().required(),
    year: Joi.number().min(1900).max(currentYear).required(),
  },
});

const AlbumCoverPayloadModel = new BaseModel({
  schema: {
    'content-type': Joi.string().valid('image/apng', 'image/avif', 'image/gif', 'image/jpeg', 'image/jpg', 'image/png', 'image/webp').required(),
  },
  unknown: true,
});

module.exports = { AlbumPayloadModel, AlbumCoverPayloadModel };
