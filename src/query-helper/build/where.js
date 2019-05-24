const { Keyword, Op } = require('../../utils/const')

function buildWhere (where) {
  if (!where.length) {
    return ''
  }

  const [{ key, value, op }] = where
  let whereSql = composite(Keyword.WHERE, '', key, op, value)

  if (where.length === 1) {
    return whereSql
  }

  return where.slice(1).reduce((result, item) => {
    const { key, value, op, relation = Op.AND } = item
    return composite(result, relation, key, op, value)
  }, whereSql)
}

function composite (prefix = '', relation, key, op, value) {
  let sql = ''
  if (op === Op.BETWEEN || op === Op.N_BETWEEN) {
    sql = `${relation} ${key} ${op} ${value[0]} ${Op.AND} ${value[1]}`
  } else {
    sql = `${relation} ${key} ${op} ${value}`
  }
  return prefix ? `${prefix} ${sql.trim()}` : sql.trim()
}

exports.buildWhere = buildWhere
