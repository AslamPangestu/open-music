class UserHandler {
  constructor(service, model) {
    this._service = service;
    this._model = model;

    this.register = this.register.bind(this);
  }

  async register(request, h) {
    const { payload } = request;
    this._model.UserPayloadModel.validate(payload);

    const userId = await this._service.add(payload);

    const response = h.response({
      status: 'success',
      message: 'User success created',
      data: {
        userId,
      },
    });
    response.code(201);
    return response;
  }
}

module.exports = UserHandler;
