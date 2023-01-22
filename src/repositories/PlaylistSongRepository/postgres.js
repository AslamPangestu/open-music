const { Pool } = require('pg');
const Invariant = require('../../core/exceptions/Invariant');
const NotFound = require('../../core/exceptions/NotFound');
const Forbidden = require('../../core/exceptions/Forbidden');
const { generateCurrentDate, generateId } = require('../../core/Database');

const TABLE_NAME = 'playlists_songs';

class PlaylistSongRepository {
  constructor() {
    this._db = new Pool();
  }

  async create({ playlistId, songId }) {
    const id = generateId('playlists_songs');
    const createdAt = generateCurrentDate();
    const updatedAt = createdAt;

    const query = {
      text: `INSERT INTO ${TABLE_NAME} VALUES($1, $2, $3, $4, $5) RETURNING id`,
      values: [id, playlistId, songId, createdAt, updatedAt],
    };

    const result = await this._db.query(query);

    if (!result.rows[0].id) {
      throw new Invariant('Failed Add Song to Playlist');
    }

    return result.rows[0].id;
  }

  async findByPlaylistId(playlistId, userId) {
    const query = {
      text: `SELECT playlists.id AS playlist_id, playlists.name AS playlist_name, 
      owner_user.username, owner_user.id AS owner, collaboration_user.id AS user_id, 
      songs.id AS song_id, songs.title AS song_title, songs.performer AS song_performer 
      FROM ${TABLE_NAME} 
      INNER JOIN playlists ON ${TABLE_NAME}.playlist_id = playlists.id
      INNER JOIN songs ON ${TABLE_NAME}.song_id = songs.id
      LEFT JOIN collaborations ON playlists.id = collaborations.playlist_id 
      INNER JOIN users collaboration_user ON collaborations.user_id = collaboration_user.id 
      INNER JOIN users owner_user ON playlists.owner = owner_user.id
      WHERE playlists.id = $1`,
      values: [playlistId],
    };
    const result = await this._db.query(query);

    if (!result.rowCount) {
      throw new NotFound('Playlist Song Not Found');
    }

    const index = result.rows.findIndex((item) => item.user_id === userId);
    if (userId && index < 0) {
      throw new Forbidden('Playlist forbidden for user');
    }
    const data = result.rows[index];

    const finalResult = {
      id: data.playlist_id,
      name: data.playlist_name,
      username: data.username,
      user_id: data.user_id,
      owner: data.owner,
      songs: data?.song_id ? result.rows.filter((item) => item.user_id === userId)
        .map((item) => ({
          id: item.song_id,
          title: item.song_title,
          performer: item.song_performer,
        })) : [],
    };

    return finalResult;
  }

  async delete(playlistId, songId) {
    const query = {
      text: `DELETE FROM ${TABLE_NAME} WHERE playlist_id = $1 AND song_id = $2 RETURNING id`,
      values: [playlistId, songId],
    };

    const result = await this._db.query(query);

    if (!result.rowCount) {
      throw new Invariant('Failed Delete Song in Playlist');
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
      throw new Invariant('Failed Delete All Songs Playlist');
    }
    return result.rows[0].id;
  }
}

module.exports = PlaylistSongRepository;
