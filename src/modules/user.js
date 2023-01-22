const plugin = require('../api/user');
const model = require('../models/User');
const Service = require('../services/UserService');
const Repository = require('../repositories/UserRepository/postgres');

const UserModule = () => {
  const repository = new Repository();
  const service = new Service(repository, model);

  return {
    plugin,
    options: { service, model },
  };
};

module.exports = UserModule;
