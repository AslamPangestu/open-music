class ExportService {
  constructor(repository) {
    this._repository = repository;
  }

  async exportPlaylist({ message }) {
    this._repository.exportPlaylist({ message });
  }
}

module.exports = ExportService;
