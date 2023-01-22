const bcrypt = require('bcrypt');

const BadRequest = require('../core/exceptions/BadRequest');
const Unauthorized = require('../core/exceptions/Unauthorized');

class UserService {
  constructor(repository, model) {
    this._repository = repository;
    this._model = model;
  }

  async add({ username, password, fullname }) {
    const isUserExist = await new Promise((resolve) => {
      this._repository.findByUsername(username).then(() => {
        resolve(true);
      }).catch(() => {
        resolve(false);
      });
    });
    if (isUserExist) {
      throw new BadRequest('User already exist');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    return this._repository.create({ username, password: hashedPassword, fullname });
  }

  async verify({ username, password }) {
    const result = await this._repository.findByUsername(username);

    const { id, password: hashedPassword } = result;

    const isMatch = await bcrypt.compare(password, hashedPassword);

    if (!isMatch) {
      throw new Unauthorized('Wrong Credential');
    }
    return id;
  }
}

module.exports = UserService;
