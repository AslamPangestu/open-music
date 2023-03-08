class AlbumHandler {
  constructor({ albumService, userAlbumLikeService, model }) {
    this._albumService = albumService;
    this._userAlbumLikeService = userAlbumLikeService;
    this._model = model;

    this.create = this.create.bind(this);
    this.readById = this.readById.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.uploadCover = this.uploadCover.bind(this);
    this.like = this.like.bind(this);
    this.readLike = this.readLike.bind(this);
  }

  async create(request, h) {
    const { payload } = request;
    this._model.AlbumPayloadModel.validate(payload);

    const albumId = await this._albumService.add(payload);

    const response = h.response({
      status: "success",
      message: "Album success created",
      data: {
        albumId,
      },
    });
    response.code(201);
    return response;
  }

  async readById(request, h) {
    const { id } = request.params;
    const service = await this._albumService.getById(id);
    const response = h.response({
      status: "success",
      message: `Album ${id} success read`,
      data: {
        album: service.data,
      },
    });
    if (service.source === "cache") {
      response.header("X-Data-Source", "cache");
    }
    response.code(200);
    return response;
  }

  async update(request, h) {
    const { payload } = request;
    this._model.AlbumPayloadModel.validate(payload);
    const { id } = request.params;

    const albumId = await this._albumService.edit(id, payload);

    const response = h.response({
      status: "success",
      message: "Album success updated",
      data: {
        albumId,
      },
    });
    response.code(200);
    return response;
  }

  async delete(request, h) {
    const { id } = request.params;
    const albumId = await this._albumService.remove(id);

    const response = h.response({
      status: "success",
      message: "Album success delete",
      data: {
        albumId,
      },
    });
    response.code(200);
    return response;
  }

  async uploadCover(request, h) {
    const { cover } = request.payload;
    const { id } = request.params;
    this._model.AlbumCoverPayloadModel.validate(cover.hapi.headers);

    const fileLocation = await this._albumService.addCover(
      id,
      cover,
      cover.hapi
    );

    const response = h.response({
      status: "success",
      message: "Sampul berhasil diunggah",
      data: {
        fileLocation,
      },
    });
    response.code(201);
    return response;
  }

  async like(request, h) {
    const { id: albumId } = request.params;
    this._model.AlbumUserLikePayloadModel.validate({ albumId });

    const { id: credentialId } = request.auth.credentials;

    const status = await this._userAlbumLikeService.update({
      userId: credentialId,
      albumId,
    });

    const response = h.response({
      status: "success",
      message: `Album success ${status}`,
    });
    response.code(201);
    return response;
  }

  async readLike(request, h) {
    const { id: albumId } = request.params;
    this._model.AlbumUserLikePayloadModel.validate({ albumId });

    const service = await this._userAlbumLikeService.getPlaylistLikeCount(
      albumId
    );
    const response = h.response({
      status: "success",
      message: "Album Like success read",
      data: {
        likes: parseInt(service.likes, 10),
      },
    });
    if (service.source === "cache") {
      response.header("X-Data-Source", "cache");
    }
    response.code(200);
    return response;
  }
}

module.exports = AlbumHandler;
