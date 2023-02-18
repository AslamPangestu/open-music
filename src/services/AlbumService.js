class AlbumService {
  constructor({ repository, storageManager }) {
    this._repository = repository;
    this._storageManager = storageManager;
  }

  async add({ name, year }) {
    return this._repository.create({ name, year });
  }

  async getById(id) {
    return this._repository.findById(id);
  }

  async edit(id, { name, year }) {
    await this._repository.findById(id);
    return this._repository.update(id, { name, year });
  }

  async remove(id) {
    await this._repository.findById(id);
    return this._repository.delete(id);
  }

  async addCover(id, file, meta) {
    await this._repository.findById(id);
    const fileLocation = await this._storageManager.add(file, meta);
    await this._repository.updateCover(id, { fileLocation });
    return fileLocation;
  }
}

module.exports = AlbumService;
