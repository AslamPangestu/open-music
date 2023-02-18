const { Pool } = require('pg');

const BadRequest = require('../../core/Exceptions/BadRequest');

const TABLE_NAME = 'authentications';

class AuthRepository {
  constructor() {
    this._db = new Pool();
  }

  async create({ token }) {
    const query = {
      text: `INSERT INTO ${TABLE_NAME} VALUES($1)`,
      values: [token],
    };

    await this._db.query(query);
  }

  async findByToken(token) {
    const query = {
      text: `SELECT token FROM ${TABLE_NAME} WHERE token = $1`,
      values: [token],
    };

    const result = await this._db.query(query);

    if (!result.rowCount) {
      throw new BadRequest('Token Not Found');
    }

    return result.rows[0];
  }

  async delete(token) {
    await this.findByToken(token);
    const query = {
      text: `DELETE FROM ${TABLE_NAME} WHERE token = $1`,
      values: [token],
    };
    await this._db.query(query);
  }
}

module.exports = AuthRepository;
