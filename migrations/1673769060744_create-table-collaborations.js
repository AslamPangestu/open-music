/* eslint-disable camelcase */

const TABEL_NAME = 'collaborations';

exports.up = (pgm) => {
  pgm.createTable(TABEL_NAME, {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    playlist_id: {
      type: 'varchar(50)',
      references: '"playlists"',
    },
    user_id: {
      type: 'varchar(50)',
      references: '"users"',
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
  pgm.createIndex(TABEL_NAME, 'playlist_id');
  pgm.createIndex(TABEL_NAME, 'user_id');
};

exports.down = (pgm) => {
  pgm.dropTable(TABEL_NAME);
};
