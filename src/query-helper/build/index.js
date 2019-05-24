const where = require('./where')
const field = require('./field')
const limit = require('./limit')
const table = require('./table')
const orderBy = require('./order-by')
const groupBy = require('./group-by')
const { Keyword } = require('../../utils/const')
const { format } = require('mysql2')

const builder = {
  ...where,
  ...field,
  ...limit,
  ...table,
  ...orderBy,
  ...groupBy
}

function _select (config) {
  let sql = _build('SELECT ', ['field'], config)
  sql = _build(
    `${sql} FROM ${config._table} `,
    ['where', 'orderBy', 'groupBy', 'limit'],
    config
  )
  return sql
}

function _insert (config) {
  const table = config._table
  const sql = format(`INSERT INTO ${table} SET ?`, config._data)
  return sql
}

function _update (config) {
  const table = config._table
  const where = builder.buildWhere(config._where)
  const sql = format(`UPDATE ${table} SET ? ${where}`, config._data)
  return sql
}

function _delete (config) {
  const table = config._table
  const where = builder.buildWhere(config._where)
  const sql = `DELETE FROM ${table} ${where}`
  return sql
}

function _build (prefix, list, config) {
  let sql = prefix
  list.forEach(key => {
    const part = builder[`build${key.capitalize()}`](config['_' + key])
    sql += part ? `${part} ` : ''
  })
  return sql.trim()
}

function build (config) {
  const type = config._type
  let result = ''
  switch (type) {
    case Keyword.SELECT:
      result = _select(config)
      break
    case Keyword.UPDATE:
      result = _update(config)
      break
    case Keyword.INSERT:
      result = _insert(config)
      break
    case Keyword.DELETE:
      result = _delete(config)
      break
    default:
      break
  }
  return result
};

module.exports = {
  ...builder,
  build
}
