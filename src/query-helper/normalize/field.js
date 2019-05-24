const { isPlainObject, isPrimitive } = require('../../utils/type')
const { Keyword } = require('../../utils/const')

function normalizeField (params = Keyword.ALL) {
  // a
  if (isPrimitive(params)) {
    return [].concat({ column: params })
  }

  // { a: AA, b: BB } or { column: a, alias: AA }
  if (isPlainObject(params)) {
    if (params.column) {
      return [].concat(params)
    }
    return Object.keys(params).map(key => {
      return { column: key, alias: params[key] }
    })
  }

  // [a, b, c] or [{ column: a, alias: AA }, { column: b, alias: BB }] or mixed
  const result = []

  params.forEach(item => {
    result.push(...normalizeField(item))
  })

  return result
}

exports.normalizeField = normalizeField
