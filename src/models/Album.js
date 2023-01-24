const Joi = require("joi");

const BaseModel = require("../core/BaseModel");

const currentYear = new Date().getFullYear();

const AlbumPayloadModel = new BaseModel({
  schema: {
    name: Joi.string().required(),
    year: Joi.number().min(1900).max(currentYear).required(),
  },
});

module.exports = { AlbumPayloadModel };
