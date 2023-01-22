/* eslint-disable camelcase */

const TABEL_NAME = 'playlist_song_activities';

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
    user_id: {
      type: 'varchar(50)',
      references: '"users"',
    },
    action: {
      type: 'varchar(50)',
      notNull: true,
    },
    created_at: {
      type: 'timestamp',
      notNull: true,
    },
  });
  pgm.createIndex(TABEL_NAME, 'song_id');
  pgm.createIndex(TABEL_NAME, 'playlist_id');
  pgm.createIndex(TABEL_NAME, 'user_id');
};

exports.down = (pgm) => {
  pgm.dropTable(TABEL_NAME);
};
