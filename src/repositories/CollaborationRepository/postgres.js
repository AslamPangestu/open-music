const { Pool } = require('pg');
const Invariant = require('../../core/exceptions/Invariant');
const NotFound = require('../../core/exceptions/NotFound');
const Forbidden = require('../../core/exceptions/Forbidden');
const { generateCurrentDate, generateId } = require('../../core/Database');

const TABLE_NAME = 'collaborations';

class CollaborationRepository {
  constructor() {
    this._db = new Pool();
  }

  async create({ playlistId, userId }) {
    const id = generateId('collaboration');
    const createdAt = generateCurrentDate();

    const query = {
      text: `INSERT INTO ${TABLE_NAME} VALUES($1, $2, $3, $4, $4) RETURNING id`,
      values: [id, playlistId, userId, createdAt],
    };

    const result = await this._db.query(query);

    if (!result.rows[0].id) {
      throw new Invariant('Failed Add new Collaborator in playlist');
    }

    return result.rows[0].id;
  }

  async findByPlaylistId(playlistId, userId) {
    const query = {
      text: `SELECT ${TABLE_NAME}.id AS collaboration_id, ${TABLE_NAME}.user_id, ${TABLE_NAME}.playlist_id, playlists.owner
      FROM ${TABLE_NAME} 
      INNER JOIN playlists ON ${TABLE_NAME}.playlist_id = playlists.id
      WHERE ${TABLE_NAME}.playlist_id = $1`,
      values: [playlistId],
    };
    const result = await this._db.query(query);

    if (!result.rowCount) {
      throw new NotFound('Collaboration Not Found');
    }

    const index = result.rows.findIndex((item) => item.user_id === userId || item.owner === userId);

    if (userId && index < 0) {
      throw new Forbidden('Collaboration forbidden for user');
    }

    const data = result.rows[index];

    return data;
  }

  async delete(playlistId, userId) {
    const query = {
      text: `DELETE FROM ${TABLE_NAME} WHERE playlist_id = $1 AND user_id = $2 RETURNING id`,
      values: [playlistId, userId],
    };

    const result = await this._db.query(query);

    if (!result.rowCount) {
      throw new Invariant('Failed Delete Collaborator in playlist');
    }
    return result.rows[0].id;
  }

  async deleteAll(playlistId) {
    const query = {
      text: `DELETE FROM ${TABLE_NAME} WHERE playlist_id = $1 RETURNING id`,
      values: [playlistId],
    };

    const result = await this._db.query(query);

    if (!result.rowCount) {
      throw new Invariant('Failed Delete Collaborator playlist');
    }
    return result.rows[0].id;
  }
}

module.exports = CollaborationRepository;
