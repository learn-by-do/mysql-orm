const pool = require('./pool')

/**
 * @returns {Promise} resolve(connection)
 */
async function transaction () {
  const conn = await pool.getConnection()
  await conn.beginTransaction()
  return conn
}

module.exports = transaction
