const Jwt = require('@hapi/jwt');

const BadRequest = require('./Exceptions/BadRequest');
const Config = require('./Config');

const TokenManager = {
  generateAccessToken: (payload) => Jwt.token.generate(payload, Config.app.ACCESS_TOKEN_KEY),
  generateRefreshToken: (payload) => Jwt.token.generate(payload, Config.app.REFRESH_TOKEN_KEY),
  verifyRefreshToken: (refreshToken) => {
    try {
      const artifacts = Jwt.token.decode(refreshToken);
      Jwt.token.verifySignature(artifacts, Config.app.REFRESH_TOKEN_KEY);
      const { payload } = artifacts.decoded;
      return payload;
    } catch (error) {
      throw new BadRequest('Refresh token invalid');
    }
  },
};

module.exports = TokenManager;
