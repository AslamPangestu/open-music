const Forbidden = require('../core/exceptions/Forbidden');

class PlaylistService {
  constructor({
    playlistRepository, collaborationRepository,
    playlistSongActivityRepository, playlistSongRepository, model,
  }) {
    this._playlistRepository = playlistRepository;
    this._collaborationRepository = collaborationRepository;
    this._playlistSongRepository = playlistSongRepository;
    this._playlistSongActivityRepository = playlistSongActivityRepository;
    this._model = model;
  }

  async add({ name, userId }) {
    const playlistId = await this._playlistRepository.create({ name, userId });
    await this._collaborationRepository.create({ playlistId, userId });
    return playlistId;
  }

  async getAll(userId) {
    return this._playlistRepository.findAll(userId);
  }

  async getById(id, userId) {
    return this._playlistRepository.findById(id, userId);
  }

  async remove(id, userId) {
    const playlist = await this._playlistRepository.findById(id, userId);
    if (playlist.user_id !== playlist.owner) {
      throw new Forbidden('Playlist forbidden for user');
    }
    const isSongPlaylistExist = await new Promise((resolve) => {
      this._playlistSongRepository.findByPlaylistId(id, userId).then(() => {
        resolve(true);
      }).catch(() => {
        resolve(false);
      });
    });
    if (isSongPlaylistExist) {
      await this._playlistSongRepository.deleteAll(id);
    }
    const playlistActivities = await this._playlistSongActivityRepository.findAll(id, userId);
    if (playlistActivities.activities.length) {
      await this._playlistSongActivityRepository.delete(id);
    }
    await this._collaborationRepository.deleteAll(id);
    return this._playlistRepository.delete(id, userId);
  }
}

module.exports = PlaylistService;
