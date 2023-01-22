const Joi = require('joi');

const BaseModel = require('../core/BaseModel');

const CollaborationPayloadModel = new BaseModel({
  schema: {
    playlistId: Joi.string().required(),
    userId: Joi.string().required(),
  },
});

module.exports = { CollaborationPayloadModel };
