const where = require('./where')
const field = require('./field')
const limit = require('./limit')
const table = require('./table')
const orderBy = require('./order-by')
const groupBy = require('./group-by')

module.exports = {
  ...where,
  ...field,
  ...limit,
  ...table,
  ...orderBy,
  ...groupBy
}
