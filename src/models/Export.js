const Joi = require('joi');

const BaseModel = require('../core/BaseModel');

const ExportPlaylistPayloadModel = new BaseModel({
  schema: {
    targetEmail: Joi.string().email({ tlds: true }).required(),
  },
});

module.exports = { ExportPlaylistPayloadModel };
