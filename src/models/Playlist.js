const Joi = require('joi');

const BaseModel = require('../core/BaseModel');

const PlaylistPayloadModel = new BaseModel({
  schema: {
    name: Joi.string().required(),
  },
});

const PlaylistSongPayloadModel = new BaseModel({
  schema: {
    playlistId: Joi.string().required(),
    songId: Joi.string().required(),
  },
});

module.exports = { PlaylistPayloadModel, PlaylistSongPayloadModel };
