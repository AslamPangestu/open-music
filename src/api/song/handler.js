class SongHandler {
  constructor(service, model) {
    this._service = service;
    this._model = model;

    this.create = this.create.bind(this);
    this.readAll = this.readAll.bind(this);
    this.readById = this.readById.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async create(request, h) {
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

  async readAll(request, h) {
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

  async readById(request, h) {
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

  async update(request, h) {
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

module.exports = SongHandler;
