/* eslint-disable camelcase */

const TABEL_NAME = 'users';

exports.up = (pgm) => {
  pgm.createTable(TABEL_NAME, {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    username: {
      type: 'VARCHAR(255)',
      unique: true,
      notNull: true,
    },
    password: {
      type: 'VARCHAR(255)',
      notNull: true,
    },
    fullname: {
      type: 'VARCHAR(255)',
      notNull: true,
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
};

exports.down = (pgm) => {
  pgm.dropTable(TABEL_NAME);
};
