const { Pool } = require('pg');
const Invariant = require('../../core/Exceptions/Invariant');
const NotFound = require('../../core/Exceptions/NotFound');
const { generateCurrentDate, generateId } = require('../../core/Database');

const TABLE_NAME = 'songs';

class SongRepository {
  constructor() {
    this._db = new Pool();
  }

  async create({
    title, year, genre, performer, duration, albumId,
  }) {
    const id = generateId('song');
    const createdAt = generateCurrentDate();

    const query = {
      text: `INSERT INTO ${TABLE_NAME} VALUES($1, $2, $3, $4, $5, $6, $7, $8, $8) RETURNING id`,
      values: [id, title, year, genre, performer, duration, albumId, createdAt],
    };

    const result = await this._db.query(query);

    if (!result.rows[0].id) {
      throw new Invariant('Failed Create Song');
    }

    return result.rows[0].id;
  }

  async findAll({ title, performer }) {
    let query = `SELECT id, title, performer FROM ${TABLE_NAME}`;
    if (title && performer) {
      query += ` WHERE title ILIKE '%${title}%' AND performer ILIKE '%${performer}%'`;
    } else if (title) {
      query += ` WHERE title ILIKE '%${title}%'`;
    } else if (performer) {
      query += ` WHERE performer ILIKE '%${performer}%'`;
    }

    const { rows } = await this._db.query(query);
    return rows;
  }

  async findById(id) {
    const query = {
      text: `SELECT * FROM ${TABLE_NAME} WHERE id = $1`,
      values: [id],
    };
    const result = await this._db.query(query);

    if (!result.rowCount) {
      throw new NotFound('Song Not Found');
    }

    return result.rows[0];
  }

  async update(id, {
    title, year, genre, performer, duration, albumId,
  }) {
    const updatedAt = generateCurrentDate();
    const query = {
      text: `UPDATE ${TABLE_NAME} SET title = $1, year = $2, genre = $3, performer = $4, duration = $5, album_id = $6, updated_at = $7 WHERE id = $8 RETURNING id`,
      values: [title, year, genre, performer, duration, albumId, updatedAt, id],
    };

    const result = await this._db.query(query);

    if (!result.rowCount) {
      throw new Invariant('Failed Update Song');
    }
    return result.rows[0].id;
  }

  async delete(id) {
    const query = {
      text: `DELETE FROM ${TABLE_NAME} WHERE id = $1 RETURNING id`,
      values: [id],
    };

    const result = await this._db.query(query);

    if (!result.rowCount) {
      throw new Invariant('Failed Delete Song');
    }
    return result.rows[0].id;
  }
}

module.exports = SongRepository;
