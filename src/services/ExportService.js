const Forbidden = require('../core/exceptions/Forbidden');

class ExportService {
  constructor({ exportRepository, playlistRepository }) {
    this._exportRepository = exportRepository;
    this._playlistRepository = playlistRepository;
  }

  async exportPlaylist({ userId, playlistId, targetEmail }) {
    const playlist = await this._playlistRepository.findById(playlistId, userId);
    if (playlist.user_id !== playlist.owner) {
      throw new Forbidden('Playlist forbidden for user');
    }
    const message = {
      targetEmail,
      userId,
      playlistId,
    };
    await this._exportRepository.exportPlaylist({ message });
  }
}

module.exports = ExportService;
