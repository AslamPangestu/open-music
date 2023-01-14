const { Pool } = require('pg');
const Invariant = require('../../core/exceptions/Invariant');
const NotFound = require('../../core/exceptions/NotFound');
const { generateCurrentDate, generateId } = require('../../core/Database');

const TABLE_NAME = 'albums';

class AlbumService {
  constructor() {
    this._db = new Pool();
  }

  async create({ name, year }) {
    const id = generateId('album');
    const currentDate = generateCurrentDate();

    const query = {
      text: `INSERT INTO ${TABLE_NAME} VALUES($1, $2, $3, $4, $4) RETURNING id`,
      values: [id, name, year, currentDate],
    };

    const result = await this._db.query(query);

    if (!result.rows[0].id) {
      throw new Invariant('Failed Create Album');
    }

    return result.rows[0].id;
  }

  async findAll() {
    const result = await this._db.query(`SELECT * FROM ${TABLE_NAME}`);
    return result.rows;
  }

  async findById(id) {
    const query = {
      text: `SELECT ${TABLE_NAME}.id AS album_id, ${TABLE_NAME}.name AS album_name, ${TABLE_NAME}.year AS album_year, songs.id AS song_id, songs.title as title, songs.performer as performer FROM ${TABLE_NAME} LEFT JOIN songs ON ${TABLE_NAME}.id = songs.album_id WHERE ${TABLE_NAME}.id = $1`,
      values: [id],
    };
    const result = await this._db.query(query);

    if (!result.rowCount) {
      throw new NotFound('Album Not Found');
    }
    const finalResult = {
      id: result.rows[0].album_id,
      name: result.rows[0].album_name,
      year: result.rows[0].album_year,
      songs: result.rows[0]?.song_id ? result.rows.map((item) => ({
        id: item.song_id,
        title: item.title,
        performer: item.performer,
      })) : [],
    };

    return finalResult;
  }

  async update(id, { name, year }) {
    await this.findById(id);

    const updatedAt = generateCurrentDate();
    const query = {
      text: `UPDATE ${TABLE_NAME} SET name = $1, year = $2, updated_at = $3 WHERE id = $4 RETURNING id`,
      values: [name, year, updatedAt, id],
    };

    const result = await this._db.query(query);

    if (!result.rowCount) {
      throw new Invariant('Failed Update Album');
    }

    return result.rows[0].id;
  }

  async delete(id) {
    await this.findById(id);

    const query = {
      text: `DELETE FROM ${TABLE_NAME} WHERE id = $1 RETURNING id`,
      values: [id],
    };

    const result = await this._db.query(query);

    if (!result.rowCount) {
      throw new Invariant('Failed Delete Album');
    }

    return result.rows[0].id;
  }
}

module.exports = AlbumService;
