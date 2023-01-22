/* eslint-disable camelcase */

const TABEL_NAME = 'authentications';

exports.up = (pgm) => {
  pgm.createTable(TABEL_NAME, {
    token: {
      type: 'TEXT',
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable(TABEL_NAME);
};
