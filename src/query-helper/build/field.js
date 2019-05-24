const { Keyword } = require('../../utils/const')

function buildField (fields = [{ column: '*' }]) {
  return fields
    .map(item => {
      const { column, alias } = item
      if (alias) {
        return `${column} ${Keyword.AS} ${alias}`
      }
      return column
    })
    .join(', ')
}

exports.buildField = buildField
