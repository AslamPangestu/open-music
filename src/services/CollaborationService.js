const Forbidden = require('../core/exceptions/Forbidden');

class CollaborationService {
  constructor({
    collaborationRepository, userRepository, playlistRepository, model,
  }) {
    this._collaborationRepository = collaborationRepository;
    this._userRepository = userRepository;
    this._playlistRepository = playlistRepository;
    this._model = model;
  }

  async add({ playlistId, userId, currentUserId }) {
    await this._validate(playlistId, userId);
    if (currentUserId === userId) {
      throw new Forbidden('Cannot collaborate with same account');
    }
    return this._collaborationRepository.create({ playlistId, userId });
  }

  async remove({ playlistId, userId, currentUserId }) {
    await this._validate(playlistId, userId);
    const collaboration = await this._collaborationRepository.findByPlaylistId(playlistId, userId);
    if (collaboration.owner !== currentUserId) {
      throw new Forbidden('Collaboration forbidden for user');
    }
    return this._collaborationRepository.delete(playlistId, userId);
  }

  async _validate(playlistId, userId) {
    await this._userRepository.findById(userId);
    await this._playlistRepository.findById(playlistId);
  }
}

module.exports = CollaborationService;
