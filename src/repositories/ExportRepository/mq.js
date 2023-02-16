const MessageBroker = require('../../core/MessageBroker');

class ExportRepository {
  constructor() {
    this._db = new MessageBroker();
  }

  async exportPlaylist({ message }) {
    await this._db.init();
    await this._db.sendMessage('export:playlist', JSON.stringify(message));
    this._db.close();
  }
}

module.exports = ExportRepository;
