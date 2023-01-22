/* eslint-disable camelcase */

const TABEL_NAME = 'playlists';

exports.up = (pgm) => {
  pgm.createTable(TABEL_NAME, {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    name: {
      type: 'VARCHAR(255)',
      notNull: true,
    },
    owner: {
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
  pgm.createIndex(TABEL_NAME, 'owner');
};

exports.down = (pgm) => {
  pgm.dropTable(TABEL_NAME);
};
