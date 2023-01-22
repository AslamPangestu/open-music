class PlaylistHandler {
  constructor(playlistService, playlistSongService, model) {
    this._playlistService = playlistService;
    this._playlistSongService = playlistSongService;
    this._model = model;

    this.createPlaylist = this.createPlaylist.bind(this);
    this.readPlaylists = this.readPlaylists.bind(this);
    this.deletePlaylist = this.deletePlaylist.bind(this);
    this.addSongPlaylist = this.addSongPlaylist.bind(this);
    this.readPlaylistSongs = this.readPlaylistSongs.bind(this);
    this.removeSongPlaylist = this.removeSongPlaylist.bind(this);
    this.readPlaylistActivity = this.readPlaylistActivity.bind(this);
  }

  async createPlaylist(request, h) {
    const { payload } = request;
    this._model.PlaylistPayloadModel.validate(payload);

    const { id: credentialId } = request.auth.credentials;

    const playlistId = await this._playlistService.add({ ...payload, userId: credentialId });

    const response = h.response({
      status: 'success',
      message: 'Playlist success created',
      data: {
        playlistId,
      },
    });
    response.code(201);
    return response;
  }

  async readPlaylists(request, h) {
    const { id: credentialId } = request.auth.credentials;
    const playlists = await this._playlistService.getAll(credentialId);
    const response = h.response({
      status: 'success',
      message: 'Playlists success read',
      data: {
        playlists,
      },
    });
    response.code(200);
    return response;
  }

  async deletePlaylist(request, h) {
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;
    const playlistId = await this._playlistService.remove(id, credentialId);

    const response = h.response({
      status: 'success',
      message: 'Playlist success delete',
      data: {
        playlistId,
      },
    });
    response.code(200);
    return response;
  }

  async addSongPlaylist(request, h) {
    const { id } = request.params;
    const { payload } = request;
    const mainRequest = {
      ...payload,
      playlistId: id,
    };
    this._model.PlaylistSongPayloadModel.validate(mainRequest);

    const { id: credentialId } = request.auth.credentials;

    const playlistId = await this._playlistSongService.add({
      ...mainRequest, userId: credentialId,
    });

    const response = h.response({
      status: 'success',
      message: 'Add Song to Playlist success',
      data: {
        playlistId,
      },
    });
    response.code(201);
    return response;
  }

  async readPlaylistSongs(request, h) {
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;
    const playlist = await this._playlistSongService.getByPlaylistId(id, credentialId);
    const response = h.response({
      status: 'success',
      message: 'Playlist Songs success read',
      data: {
        playlist,
      },
    });
    response.code(200);
    return response;
  }

  async removeSongPlaylist(request, h) {
    const { id } = request.params;
    const { payload } = request;
    const mainRequest = {
      ...payload,
      playlistId: id,
    };
    this._model.PlaylistSongPayloadModel.validate(mainRequest);

    const { id: credentialId } = request.auth.credentials;

    const playlistId = await this._playlistSongService.remove(
      { ...mainRequest, userId: credentialId },
    );

    const response = h.response({
      status: 'success',
      message: 'Playlist Song success delete',
      data: {
        playlistId,
      },
    });
    response.code(200);
    return response;
  }

  async readPlaylistActivity(request, h) {
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;
    const playlist = await this._playlistSongService.getActivitiesPlaylistId(id, credentialId);
    const response = h.response({
      status: 'success',
      message: 'Playlist Song Activity success read',
      data: {
        ...playlist,
      },
    });
    response.code(200);
    return response;
  }
}

module.exports = PlaylistHandler;
