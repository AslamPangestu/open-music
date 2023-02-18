/* eslint-disable camelcase */

const TABEL_NAME = 'albums';

exports.up = (pgm) => {
  pgm.addColumn(TABEL_NAME, {
    cover: { type: 'text' },
  });
};

exports.down = (pgm) => {
  pgm.dropColumn(TABEL_NAME, 'cover');
};
