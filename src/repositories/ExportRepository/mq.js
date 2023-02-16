const MessageBroker = require('../../core/MessageBroker');

// const Invariant = require('../../core/exceptions/Invariant');
// const NotFound = require('../../core/exceptions/NotFound');
// const Unauthorized = require('../../core/exceptions/Unauthorized');

class ExportRepository {
  constructor() {
    this._db = new MessageBroker();
  }

  async exportPlaylist({ message }) {
    this._db.sendMessage('export:playlist', JSON.stringify(message));
  }
}

module.exports = ExportRepository;
