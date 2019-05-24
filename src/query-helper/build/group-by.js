const { Keyword } = require('../../utils/const')

function buildGroupBy (field) {
  if (!field) {
    return ''
  }

  return `${Keyword.GROUP_BY} ${field}`
}

exports.buildGroupBy = buildGroupBy
