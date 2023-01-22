class AlbumHandler {
  constructor(service, model) {
    this._service = service;
    this._model = model;

    this.create = this.create.bind(this);
    this.readById = this.readById.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async create(request, h) {
    const { payload } = request;
    this._model.AlbumPayloadModel.validate(payload);

    const albumId = await this._service.add(payload);

    const response = h.response({
      status: 'success',
      message: 'Album success created',
      data: {
        albumId,
      },
    });
    response.code(201);
    return response;
  }

  async readById(request, h) {
    const { id } = request.params;
    const album = await this._service.getById(id);
    const response = h.response({
      status: 'success',
      message: `Album ${id} success read`,
      data: {
        album,
      },
    });
    response.code(200);
    return response;
  }

  async update(request, h) {
    const { payload } = request;
    this._model.AlbumPayloadModel.validate(payload);
    const { id } = request.params;

    const albumId = await this._service.edit(id, payload);

    const response = h.response({
      status: 'success',
      message: 'Album success updated',
      data: {
        albumId,
      },
    });
    response.code(200);
    return response;
  }

  async delete(request, h) {
    const { id } = request.params;
    const albumId = await this._service.remove(id);

    const response = h.response({
      status: 'success',
      message: 'Album success delete',
      data: {
        albumId,
      },
    });
    response.code(200);
    return response;
  }
}

module.exports = AlbumHandler;
