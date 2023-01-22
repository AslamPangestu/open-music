/* eslint-disable camelcase */

const TABEL_NAME = 'playlists_songs';

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
    song_id: {
      type: 'varchar(50)',
      references: '"songs"',
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
  pgm.createIndex(TABEL_NAME, 'song_id');
  pgm.createIndex(TABEL_NAME, 'playlist_id');
};

exports.down = (pgm) => {
  pgm.dropTable(TABEL_NAME);
};
