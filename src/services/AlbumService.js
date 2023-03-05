class AlbumService {
  constructor({ repository, storageManager, cacheManager }) {
    this._repository = repository;
    this._storageManager = storageManager;
    this._cacheManager = cacheManager;
  }

  async add({ name, year }) {
    const albumId = await this._repository.create({ name, year });
    await this._cleanupCache(albumId);
    return albumId;
  }

  async getById(id) {
    try {
      const cacheData = await this._cacheManager.get(`albums:${id}`);
      return { source: 'cache', data: JSON.parse(cacheData) };
    } catch (error) {
      const data = await this._repository.findById(id);
      await this._cacheManager.set(`albums:${id}`, JSON.stringify(data));
      return { source: 'db', data };
    }
  }

  async edit(id, { name, year }) {
    await this._repository.findById(id);
    const albumId = await this._repository.update(id, { name, year });
    await this._cleanupCache(id);
    return albumId;
  }

  async remove(id) {
    await this._repository.findById(id);
    const albumId = await this._repository.delete(id);
    await this._cleanupCache(id);
    return albumId;
  }

  async addCover(id, file, meta) {
    await this._repository.findById(id);
    const fileLocation = await this._storageManager.add(file, meta);
    await this._repository.updateCover(id, { fileLocation });
    await this._cleanupCache(id);
    return fileLocation;
  }

  async _cleanupCache(albumId) {
    try {
      await this._cacheManager.get(`albums:${albumId}`);
      await this._cacheManager.delete(`albums:${albumId}`);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = AlbumService;
