const { Pool } = require('pg');

const Invariant = require('../../core/exceptions/Invariant');
const { generateCurrentDate, generateId } = require('../../core/Database');

const TABLE_NAME = 'playlist_song_activities';

class PlaylistSongActivityRepository {
  constructor() {
    this._db = new Pool();
  }

  async create({
    playlistId, songId, action, userId,
  }) {
    const id = generateId('playlist_song_activities');
    const currentDate = generateCurrentDate();

    const query = {
      text: `INSERT INTO ${TABLE_NAME} VALUES($1, $2, $3, $4, $5, $6) RETURNING id`,
      values: [id, playlistId, songId, userId, action, currentDate],
    };

    const result = await this._db.query(query);

    if (!result.rows[0].id) {
      throw new Invariant('Failed Create Playlist Song Activity');
    }

    return result.rows[0].id;
  }

  async findAll(playlistId) {
    const query = {
      text: `SELECT ${TABLE_NAME}.action AS action, ${TABLE_NAME}.created_at AS time, 
      users.username AS username, songs.title AS title
      FROM ${TABLE_NAME} 
      INNER JOIN users ON ${TABLE_NAME}.user_id = users.id 
      INNER JOIN songs ON ${TABLE_NAME}.song_id = songs.id 
      WHERE playlist_id = $1`,
      values: [playlistId],
    };
    const result = await this._db.query(query);
    return {
      playlistId,
      activities: result.rows,
    };
  }

  async delete(playlistId) {
    const query = {
      text: `DELETE FROM ${TABLE_NAME} WHERE playlist_id = $1 RETURNING id`,
      values: [playlistId],
    };

    const result = await this._db.query(query);

    if (!result.rowCount) {
      throw new Invariant('Failed Delete All Playlist Activity');
    }
    return result.rows[0].id;
  }
}

module.exports = PlaylistSongActivityRepository;
