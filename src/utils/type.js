const { Op, Keyword } = require('./const')

exports.isPlainObject = obj => {
  return obj && Object.prototype.toString.call(obj) === '[object Object]'
}

exports.isPrimitive = value => {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

String.prototype.capitalize = function () { // eslint-disable-line
  const val = this.valueOf()
  return val && val.slice(0, 1).toUpperCase() + val.slice(1)
}

exports.assertBuildinOperator = op => {
  const opList = Object.values(Op)
  if (!opList.includes(op)) {
    throw new Error(`only support operator in (${opList.join(', ')})`)
  }
}

exports.assertOrderType = order => {
  if (order !== Keyword.ASC && order !== Keyword.DESC) {
    throw new Error(`order type '${order}' is invalid`)
  }
}
