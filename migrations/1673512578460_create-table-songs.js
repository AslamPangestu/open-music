/* eslint-disable camelcase */

const TABEL_NAME = 'songs';

exports.up = (pgm) => {
  pgm.createTable(TABEL_NAME, {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    title: {
      type: 'VARCHAR(255)',
      notNull: true,
    },
    year: {
      type: 'integer',
      notNull: true,
    },
    genre: {
      type: 'VARCHAR(255)',
      notNull: true,
    },
    performer: {
      type: 'VARCHAR(255)',
      notNull: true,
    },
    duration: {
      type: 'integer',
    },
    album_id: {
      type: 'varchar(50)',
      references: '"albums"',
    },
    created_at: {
      type: 'timestamp',
      notNull: true,
    },
    updated_at: {
      type: 'timestamp',
      notNull: true,
    },
  });
  pgm.createIndex(TABEL_NAME, 'album_id');
};

exports.down = (pgm) => {
  pgm.dropTable(TABEL_NAME);
};
