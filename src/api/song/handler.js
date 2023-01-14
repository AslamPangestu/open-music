class SongsHandler {
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
    this._model.SongPayloadModel.validate(payload);

    const songId = await this._service.add(payload);

    const response = h.response({
      status: 'success',
      message: 'Song success created',
      data: {
        songId,
      },
    });
    response.code(201);
    return response;
  }

  async get(request, h) {
    const { title, performer } = request.query;
    const songs = await this._service.getAll({ title, performer });
    const response = h.response({
      status: 'success',
      message: 'All Song success get',
      data: {
        songs,
      },
    });
    response.code(200);
    return response;
  }

  async getById(request, h) {
    const { id } = request.params;
    const song = await this._service.getById(id);
    const response = h.response({
      status: 'success',
      message: `Song ${id} success get`,
      data: {
        song,
      },
    });
    response.code(200);
    return response;
  }

  async put(request, h) {
    const { payload } = request;
    this._model.SongPayloadModel.validate(payload);
    const { id } = request.params;

    const songId = await this._service.edit(id, payload);

    const response = h.response({
      status: 'success',
      message: 'Song success updated',
      data: {
        songId,
      },
    });
    response.code(200);
    return response;
  }

  async delete(request, h) {
    const { id } = request.params;
    const songId = await this._service.remove(id);

    const response = h.response({
      status: 'success',
      message: 'Song success delete',
      data: {
        songId,
      },
    });
    response.code(200);
    return response;
  }
}

module.exports = SongsHandler;
