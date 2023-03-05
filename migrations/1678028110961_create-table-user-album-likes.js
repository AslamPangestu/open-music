/* eslint-disable camelcase */

const TABEL_NAME = 'user_album_likes';

exports.up = (pgm) => {
  pgm.createTable(TABEL_NAME, {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    user_id: {
      type: 'varchar(50)',
      references: '"users"',
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
  pgm.createIndex(TABEL_NAME, 'user_id');
};

exports.down = (pgm) => {
  pgm.dropTable(TABEL_NAME);
};
