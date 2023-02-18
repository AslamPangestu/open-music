const Joi = require('joi');

const BadRequest = require('./Exceptions/BadRequest');

class BaseModel {
  constructor({
    schema, haveId = false, haveTimestamp = false, unknown = false,
  }) {
    let mainSchema = Joi.object({
      ...schema,
      ...(haveId && { id: Joi.string().required() }),
      ...(haveTimestamp && {
        createdAt: Joi.date().timestamp().required(),
        updatedAt: Joi.date().timestamp().required(),
      }),
    });
    if (unknown) {
      mainSchema = mainSchema.unknown();
    }
    this._schema = mainSchema;
  }

  validate(payload) {
    const validation = this._schema.validate(payload, { abortEarly: false });
    if (validation.error) {
      throw new BadRequest(validation.error.message);
    }
  }

  mapDataToModel(payload) {
    const keys = Object.keys(this._schema);
    const response = {};
    keys.forEach((key) => {
      response[key] = payload[key];
    });
    return response;
  }
}

module.exports = BaseModel;
