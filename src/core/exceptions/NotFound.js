const ClientError = require('./ClientError');

class NotFound extends ClientError {
  constructor(message) {
    super(message);
    this.statusCode = 404;
    this.name = 'NotFound';
  }
}

module.exports = NotFound;
