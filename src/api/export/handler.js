class ExportHandler {
  constructor(service, model) {
    this._service = service;
    this._model = model;
    this.exportPlaylist = this.exportPlaylist.bind(this);
  }

  async exportPlaylist(request, h) {
    const { id: playlistId } = request.params;
    const { id: credentialId } = request.auth.credentials;
    const { payload } = request;
    this._model.ExportPlaylistPayloadModel.validate(payload);

    await this._service.exportPlaylist({ ...payload, playlistId, userId: credentialId });

    const response = h.response({
      status: 'success',
      message: 'Export playlist on process',
    });
    response.code(201);
    return response;
  }
}

module.exports = ExportHandler;
