const { pool } = require('./init')
const User = require('./User')

describe('Test DELETE', () => {
  beforeAll(async () => {
    return pool.query(
      'REPLACE INTO t_user (id, name, age, addr) VALUES(4, "DELETE INSERT", 44, "")'
    )
  })

  test('should delete rows where id is 4', async () => {
    let { affectedRows } = await User.delete({ id: 4 })
    expect(affectedRows).toBe(1)
  })

  afterAll(async () => {
    return pool.end()
  })
})
