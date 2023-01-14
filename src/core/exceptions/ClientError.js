class ClientError extends Error {
  constructor(message, name, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = name;
  }
}

module.exports = ClientError;
