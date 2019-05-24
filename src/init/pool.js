/**
 * nodejs driver
 *
 * ref: https://github.com/sidorares/node-mysql2
 */
const mysql = require('mysql2/promise')
const EventEmitter = require('events')
class MysqlEmitter extends EventEmitter {}
const emitter = new MysqlEmitter()

let pool

exports.query = function (sql) {
  if (pool) {
    return pool.query(sql)
  }

  return new Promise(resolve => {
    emitter.on('inited', () => {
      resolve(pool.query(sql))
    })
  })
}

/**
 * keep all query in one connection
 *
 * eg: some sequential queries
 */
exports.getConnection = function () {
  if (pool) {
    return pool.getConnection()
  }
  return new Promise(resolve => {
    emitter.on('inited', () => {
      resolve(pool.getConnection())
    })
  })
}

exports.close = function () {
  if (pool) {
    return pool.end()
  }
  return new Promise(resolve => {
    emitter.on('inited', () => {
      resolve(pool.end())
    })
  })
}

exports.init = function (rawConfig) {
  const config = {
    ...rawConfig
  }
  delete config.poolSize
  pool = mysql.createPool({
    connectionLimit: rawConfig.poolSize || 20,
    ...config
  })
  emitter.emit('inited')
}
