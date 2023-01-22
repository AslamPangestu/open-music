class CollaborationHandler {
  constructor(service, model) {
    this._service = service;
    this._model = model;

    this.create = this.create.bind(this);
    this.delete = this.delete.bind(this);
  }

  async create(request, h) {
    const { id: credentialId } = request.auth.credentials;
    const { payload } = request;
    this._model.CollaborationPayloadModel.validate(payload);

    const collaborationId = await this._service.add({ ...payload, currentUserId: credentialId });

    const response = h.response({
      status: 'success',
      message: 'Collaboration success created',
      data: {
        collaborationId,
      },
    });
    response.code(201);
    return response;
  }

  async delete(request, h) {
    const { id: credentialId } = request.auth.credentials;
    const { payload } = request;
    this._model.CollaborationPayloadModel.validate(payload);

    const collaborationId = await this._service.remove({ ...payload, currentUserId: credentialId });

    const response = h.response({
      status: 'success',
      message: 'Collaboration success delete',
      data: {
        collaborationId,
      },
    });
    response.code(200);
    return response;
  }
}

module.exports = CollaborationHandler;
