const { Pool } = require('pg');

const Invariant = require('../../core/exceptions/Invariant');
const NotFound = require('../../core/exceptions/NotFound');
const Unauthorized = require('../../core/exceptions/Unauthorized');
const { generateCurrentDate, generateId } = require('../../core/Database');

const TABLE_NAME = 'users';

class UserRepository {
  constructor() {
    this._db = new Pool();
  }

  async create({ username, password, fullname }) {
    const id = generateId('user');
    const currentDate = generateCurrentDate();

    const query = {
      text: `INSERT INTO ${TABLE_NAME} VALUES($1, $2, $3, $4, $5, $5) RETURNING id`,
      values: [id, username, password, fullname, currentDate],
    };

    const result = await this._db.query(query);

    if (!result.rows[0].id) {
      throw new Invariant('Failed Create User');
    }

    return result.rows[0].id;
  }

  async findById(id) {
    const query = {
      text: `SELECT id, username, password FROM ${TABLE_NAME} WHERE id = $1`,
      values: [id],
    };

    const result = await this._db.query(query);

    if (!result.rowCount) {
      throw new NotFound('User Not Found');
    }

    return result.rows[0];
  }

  async findByUsername(username) {
    const query = {
      text: `SELECT id, username, password FROM ${TABLE_NAME} WHERE username = $1`,
      values: [username],
    };

    const result = await this._db.query(query);

    if (!result.rowCount) {
      throw new Unauthorized('User Not Found');
    }

    return result.rows[0];
  }
}

module.exports = UserRepository;
