/* eslint-disable camelcase */

const TABEL_NAME = 'albums';

exports.up = (pgm) => {
  pgm.createTable(TABEL_NAME, {
    id: {
      type: 'varchar(50)',
      primaryKey: true,
    },
    name: {
      type: 'varchar(255)',
      notNull: true,
    },
    year: {
      type: 'integer',
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
