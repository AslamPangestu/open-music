class SongService {
  constructor(repository, model) {
    this._repository = repository;
    this._model = model;
  }

  async add({
    title, year, genre, performer, duration, albumId,
  }) {
    return this._repository.create({
      title, year, genre, performer, duration, albumId,
    });
  }

  async getAll({ title, performer }) {
    return this._repository.findAll({ title, performer });
  }

  async getById(id) {
    return this._repository.findById(id);
  }

  async edit(id, {
    title, year, genre, performer, duration, albumId,
  }) {
    await this._repository.findById(id);
    return this._repository.update(id, {
      title, year, genre, performer, duration, albumId,
    });
  }

  async remove(id) {
    await this._repository.findById(id);
    return this._repository.delete(id);
  }
}

module.exports = SongService;
