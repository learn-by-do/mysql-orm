const { Keyword } = require('../../utils/const')
const { assertOrderType } = require('../../utils/type')
const { escapeId } = require('mysql2')

function normalizeOrderBy (fields, order = Keyword.ASC) {
  const uppperOrder = order.toUpperCase()
  if (!fields) {
    return { fields: [], order: uppperOrder }
  }

  assertOrderType(uppperOrder)

  if (typeof fields === 'string') {
    return {
      fields: [].concat(escapeId(fields)),
      order: uppperOrder
    }
  }

  return {
    fields: fields.map(item => escapeId(item)),
    order: uppperOrder
  }
}

exports.normalizeOrderBy = normalizeOrderBy
