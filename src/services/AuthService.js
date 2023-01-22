class AuthService {
  constructor(repository, model) {
    this._repository = repository;
    this._model = model;
  }

  async add({ token }) {
    return this._repository.create({ token });
  }

  async getByToken(token) {
    return this._repository.findByToken(token);
  }

  async delete(id) {
    await this._repository.findByToken(id);
    return this._repository.delete(id);
  }
}

module.exports = AuthService;
