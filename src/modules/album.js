const plugin = require('../api/album');
const model = require('../models/Album');
const StorageManager = require('../core/StorageManager');
const AlbumService = require('../services/AlbumService');
const AlbumRepository = require('../repositories/AlbumRepository/postgres');
const UserAlbumLikeService = require('../services/UserAlbumLikeService');
const UserAlbumLikeRepository = require('../repositories/UserAlbumLikeRepository/postgres');

const AlbumModule = ({ cacheManager }) => {
  const storageManager = new StorageManager({ config: { folder: '/album-covers' } });

  const albumRepository = new AlbumRepository();
  // eslint-disable-next-line max-len
  const albumService = new AlbumService({ repository: albumRepository, storageManager, cacheManager });

  const userAlbumLikeRepository = new UserAlbumLikeRepository();
  // eslint-disable-next-line max-len
  const userAlbumLikeService = new UserAlbumLikeService({ albumRepository, userAlbumLikeRepository, cacheManager });

  return {
    plugin,
    options: { albumService, userAlbumLikeService, model },
  };
};

module.exports = AlbumModule;
