class AlbumService {
  constructor(repository, model) {
    this._repository = repository;
    this._model = model;
  }

  async add({ name, year }) {
    return this._repository.create({ name, year });
  }

  async getAll() {
    return this._repository.findAll();
  }

  async getById(id) {
    return this._repository.findById(id);
  }

  async edit(id, { name, year }) {
    return this._repository.update(id, { name, year });
  }

  async remove(id) {
    return this._repository.delete(id);
  }
}

module.exports = AlbumService;
