const { Keyword } = require('../../utils/const')

function buildOrderBy ({ fields, order }) {
  if (!fields || !fields.length) {
    return ''
  }
  return `${Keyword.ORDER_BY} ${fields.join(', ')} ${order}`
}

exports.buildOrderBy = buildOrderBy
