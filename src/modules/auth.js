const plugin = require('../api/auth');
const model = require('../models/Auth');
const AuthRepository = require('../repositories/AuthRepository/postgres');
const AuthService = require('../services/AuthService');
const UserRepository = require('../repositories/UserRepository/postgres');
const UserService = require('../services/UserService');
const tokenManager = require('../core/TokenManager');

const AlbumModule = () => {
  const authRepository = new AuthRepository();
  const authenticationsService = new AuthService(authRepository, model);
  const userRepository = new UserRepository();
  const userService = new UserService(userRepository, model);

  return {
    plugin,
    options: {
      authenticationsService, userService, tokenManager, model,
    },
  };
};

module.exports = AlbumModule;
