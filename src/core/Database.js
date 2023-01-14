/* eslint-disable camelcase */
const { nanoid } = require('nanoid');

const generateId = (tableName) => `${tableName}-${nanoid(16)}`;
const generateCurrentDate = () => new Date().toISOString();

module.exports = { generateId, generateCurrentDate };
