const NotFound = require('../core/Exceptions/NotFound');

class UserAlbumLikeService {
  constructor({ userAlbumLikeRepository, albumRepository }) {
    this._userAlbumLikeRepository = userAlbumLikeRepository;
    this._albumRepository = albumRepository;
  }

  async update({ userId, albumId }) {
    try {
      await this._albumRepository.findById(albumId);
      await this._userAlbumLikeRepository.findAlbumByUserId({ userId, albumId });
      await this._userAlbumLikeRepository.delete({ userId, albumId });
      return 'unlike';
    } catch (error) {
      if (error instanceof NotFound && error.message === 'User Album Like Not Found') {
        await this._userAlbumLikeRepository.create({ userId, albumId });
        return 'like';
      }
      throw error;
    }
  }

  async getPlaylistLikeCount(id) {
    return this._userAlbumLikeRepository.countByAlbumId(id);
  }
}

module.exports = UserAlbumLikeService;
