const NotFound = require('../core/Exceptions/NotFound');

class UserAlbumLikeService {
  constructor({ userAlbumLikeRepository, albumRepository, cacheManager }) {
    this._userAlbumLikeRepository = userAlbumLikeRepository;
    this._albumRepository = albumRepository;
    this._cacheManager = cacheManager;
  }

  async update({ userId, albumId }) {
    try {
      await this._albumRepository.findById(albumId);
      await this._userAlbumLikeRepository.findAlbumByUserId({ userId, albumId });
      await this._userAlbumLikeRepository.delete({ userId, albumId });
      await this._cleanupCache(albumId);
      return 'unlike';
    } catch (error) {
      if (error instanceof NotFound && error.message === 'User Album Like Not Found') {
        await this._userAlbumLikeRepository.create({ userId, albumId });
        await this._cleanupCache(albumId);
        return 'like';
      }
      throw error;
    }
  }

  async getPlaylistLikeCount(albumId) {
    let likes;
    try {
      likes = await this._cacheManager.get(`likes:${albumId}`);
      return { source: 'cache', likes };
    } catch (error) {
      if (error instanceof Error && error.message === 'Cache not found') {
        likes = await this._userAlbumLikeRepository.countByAlbumId(albumId);
        await this._cacheManager.set(`likes:${albumId}`, likes);
        return { source: 'db', likes };
      }
      throw error;
    }
  }

  async _cleanupCache(albumId) {
    try {
      await this._cacheManager.get(`likes:${albumId}`);
      await this._cacheManager.delete(`likes:${albumId}`);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = UserAlbumLikeService;
