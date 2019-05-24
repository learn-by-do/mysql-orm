const { Query, pool } = require('./init')

describe('Test DELETE', () => {
  let connection
  beforeAll(async () => {
    connection = await pool.getConnection()
    return connection.query(
      'REPLACE INTO t_user (id, name, age, addr) VALUES(4, "DELETE INSERT", 44, "")'
    )
  })

  test('should delete rows where id is 4', async () => {
    const q = new Query('t_user')
    let { affectedRows } = await q
      .delete({ id: 4 })
      .run(connection)
    expect(affectedRows).toBe(1)
  })

  afterAll(async () => {
    await connection.release()
    return pool.end()
  })
})
