const ClientError = require('./ClientError');

class Forbidden extends ClientError {
  constructor(message) {
    super(message);
    this.statusCode = 403;
    this.name = 'Forbidden';
  }
}

module.exports = Forbidden;
