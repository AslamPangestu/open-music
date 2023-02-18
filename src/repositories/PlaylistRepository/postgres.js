const { Pool } = require('pg');
const Invariant = require('../../core/Exceptions/Invariant');
const NotFound = require('../../core/Exceptions/NotFound');
const Forbidden = require('../../core/Exceptions/Forbidden');
const { generateCurrentDate, generateId } = require('../../core/Database');

const TABLE_NAME = 'playlists';

class PlaylistRepository {
  constructor() {
    this._db = new Pool();
  }

  async create({ name, userId }) {
    const id = generateId('playlist');
    const createdAt = generateCurrentDate();
    const updatedAt = createdAt;

    const query = {
      text: `INSERT INTO ${TABLE_NAME} VALUES($1, $2, $3, $4, $5) RETURNING id`,
      values: [id, name, userId, createdAt, updatedAt],
    };

    const result = await this._db.query(query);

    if (!result.rows[0].id) {
      throw new Invariant('Failed Create Playlist');
    }

    return result.rows[0].id;
  }

  async findAll(userId) {
    const query = {
      text: `SELECT ${TABLE_NAME}.id, ${TABLE_NAME}.name, owner_user.username AS username 
      FROM ${TABLE_NAME} 
      LEFT JOIN collaborations ON ${TABLE_NAME}.id = collaborations.playlist_id
      INNER JOIN users collaboration_user ON collaborations.user_id = collaboration_user.id
      INNER JOIN users owner_user ON ${TABLE_NAME}.owner = owner_user.id
      WHERE collaboration_user.id = $1`,
      values: [userId],
    };
    const result = await this._db.query(query);
    return result.rows;
  }

  async findById(id, userId) {
    const query = {
      text: `SELECT ${TABLE_NAME}.id, ${TABLE_NAME}.name, users.username, users.id AS user_id, ${TABLE_NAME}.owner
      FROM ${TABLE_NAME}
      LEFT JOIN collaborations ON ${TABLE_NAME}.id = collaborations.playlist_id
      INNER JOIN users ON collaborations.user_id = users.id
      WHERE ${TABLE_NAME}.id = $1`,
      values: [id],
    };
    const result = await this._db.query(query);

    if (!result.rowCount) {
      throw new NotFound('Playlist Not Found');
    }

    const index = result.rows.findIndex((item) => item.user_id === userId);

    if (userId && index < 0) {
      throw new Forbidden('Playlist forbidden for user');
    }

    return result.rows[index];
  }

  async delete(id) {
    const query = {
      text: `DELETE FROM ${TABLE_NAME} WHERE id = $1 RETURNING id`,
      values: [id],
    };

    const result = await this._db.query(query);

    if (!result.rowCount) {
      throw new Invariant('Failed Delete Playlist');
    }
    return result.rows[0].id;
  }
}

module.exports = PlaylistRepository;
