const pool = require('./pool')

exports.pool = {
  query: pool.query,
  getConnection: pool.getConnection,
  close: pool.close
}

exports.Query = require('../query-helper/index')
exports.Orm = require('../orm')
exports.transaction = require('./transaction')

exports.init = function (config) {
  pool.init(config)
}
