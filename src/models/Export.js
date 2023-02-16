const Joi = require('joi');

const BaseModel = require('../core/BaseModel');

const ExportPlaylistPayloadModel = new BaseModel({
  schema: {
    targetEmail: Joi.string().email({ tlds: true }).required(),
    playlistId: Joi.string().required(),
  },
});

module.exports = { ExportPlaylistPayloadModel };
