const { Pool } = require('pg');
const Invariant = require('../../core/Exceptions/Invariant');
const NotFound = require('../../core/Exceptions/NotFound');
const { generateCurrentDate, generateId } = require('../../core/Database');

const TABLE_NAME = 'user_album_likes';

class UserAlbumLikeRepository {
  constructor() {
    this._db = new Pool();
  }

  async create({ userId, albumId }) {
    const id = generateId('user_album_like');
    const currentDate = generateCurrentDate();

    const query = {
      text: `INSERT INTO ${TABLE_NAME} VALUES($1, $2, $3, $4, $4) RETURNING id`,
      values: [id, userId, albumId, currentDate],
    };

    const result = await this._db.query(query);

    if (!result.rows[0].id) {
      throw new Invariant('Failed Create User Album Like');
    }

    return result.rows[0].id;
  }

  async countByAlbumId(albumId) {
    const query = {
      text: `SELECT COUNT (user_id) FROM ${TABLE_NAME} WHERE album_id = $1`,
      values: [albumId],
    };
    const result = await this._db.query(query);

    if (!result.rowCount) {
      throw new NotFound('User Album Like Not Found');
    }

    return result.rows[0].count;
  }

  async findAlbumByUserId({ userId, albumId }) {
    const query = {
      text: `SELECT * FROM ${TABLE_NAME} WHERE user_id = $1 AND album_id = $2`,
      values: [userId, albumId],
    };
    const result = await this._db.query(query);

    if (!result.rowCount) {
      throw new NotFound('User Album Like Not Found');
    }

    return result.rows[0];
  }

  async delete({ userId, albumId }) {
    const query = {
      text: `DELETE FROM ${TABLE_NAME} WHERE user_id = $1 AND album_id = $2 RETURNING id`,
      values: [userId, albumId],
    };

    const result = await this._db.query(query);

    if (!result.rowCount) {
      throw new Invariant('Failed Delete User Album Like');
    }
    return result.rows[0].id;
  }
}

module.exports = UserAlbumLikeRepository;
