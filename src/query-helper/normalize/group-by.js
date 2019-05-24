const { escapeId } = require('mysql2')

function normalizeGroupBy (field) {
  if (!field) {
    return
  }

  return escapeId(field)
}

exports.normalizeGroupBy = normalizeGroupBy
