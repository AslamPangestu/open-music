class PlaylistSongService {
  constructor({
    playlistRepository, songRepository,
    playlistSongActivityRepository,
    playlistSongRepository, model,
  }) {
    this._songRepository = songRepository;
    this._playlistRepository = playlistRepository;
    this._playlistSongActivityRepository = playlistSongActivityRepository;
    this._playlistSongRepository = playlistSongRepository;
    this._model = model;
  }

  async add({ playlistId, songId, userId }) {
    await this._songRepository.findById(songId);
    await this._playlistRepository.findById(playlistId, userId);
    const res = await this._playlistSongRepository.create({ playlistId, songId });
    await this._playlistSongActivityRepository.create({
      playlistId, songId, userId, action: 'add',
    });
    return res;
  }

  async getByPlaylistId(playlistId, userId) {
    return this._playlistSongRepository.findByPlaylistId(playlistId, userId);
  }

  async getActivitiesPlaylistId(playlistId, userId) {
    await this._playlistRepository.findById(playlistId, userId);
    return this._playlistSongActivityRepository.findAll(playlistId);
  }

  async remove({ playlistId, songId, userId }) {
    await this._playlistRepository.findById(playlistId, userId);
    const res = await this._playlistSongRepository.delete(playlistId, songId);
    await this._playlistSongActivityRepository.create({
      playlistId, songId, userId, action: 'delete',
    });
    return res;
  }
}

module.exports = PlaylistSongService;
