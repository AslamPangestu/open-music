const ClientError = require('./ClientError');

class BadRequest extends ClientError {
  constructor(message) {
    super(message);
    this.statusCode = 400;
    this.name = 'BadRequest';
  }
}

module.exports = BadRequest;
