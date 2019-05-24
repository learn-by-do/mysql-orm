const { Keyword } = require('../../utils/const')

exports.buildLimit = function (limits) {
  if (!limits) {
    return ''
  }
  return `${Keyword.LIMIT} ${limits.join(', ')}`
}
