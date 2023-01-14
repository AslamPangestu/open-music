class AlbumsHandler {
  constructor(service, model) {
    this._service = service;
    this._model = model;

    this.post = this.post.bind(this);
    this.get = this.get.bind(this);
    this.getById = this.getById.bind(this);
    this.put = this.put.bind(this);
    this.delete = this.delete.bind(this);
  }

  async post(request, h) {
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

  async get(_request, h) {
    const albums = await this._service.getAll();
    const response = h.response({
      status: 'success',
      message: 'All Album success get',
      data: {
        albums,
      },
    });
    response.code(200);
    return response;
  }

  async getById(request, h) {
    const { id } = request.params;
    const album = await this._service.getById(id);
    const response = h.response({
      status: 'success',
      message: `Album ${id} success get`,
      data: {
        album,
      },
    });
    response.code(200);
    return response;
  }

  async put(request, h) {
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

module.exports = AlbumsHandler;
