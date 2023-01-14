/* eslint-disable camelcase */
const { nanoid } = require('nanoid');

const mapDBToModel = ({
  id,
  title,
  body,
  tags,
  created_at,
  updated_at,
}) => ({
  id,
  title,
  body,
  tags,
  createdAt: created_at,
  updatedAt: updated_at,
});

const generateId = (tableName) => `${tableName}-${nanoid(16)}`;
const generateCurrentDate = () => new Date().toISOString();

module.exports = { mapDBToModel, generateId, generateCurrentDate };
