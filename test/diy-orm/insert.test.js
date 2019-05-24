const { pool } = require('./init')
const User = require('./User')

describe('Test INSERT', () => {
  let idx

  test('should insert one row', async () => {
    let { insertId, affectedRows } = await User.insert({
      name: 'INSERT test',
      age: 11,
      addr: 'hell'
    })
    idx = insertId
    expect(affectedRows).toBe(1)
  })

  afterAll(async () => {
    await pool.query(`DELETE FROM t_user WHERE id=${idx}`)
    return pool.end()
  })
})
