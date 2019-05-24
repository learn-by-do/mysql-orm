const { escapeId } = require('mysql2')

exports.normalizeTable = function (table) {
  if (!table) {
    throw new Error('table name is not specified')
  }
  return escapeId(table)
}
