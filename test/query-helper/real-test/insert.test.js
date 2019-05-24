const { Query, pool } = require('./init')

describe('Test INSERT', () => {
  let idx

  test('should insert one row', async () => {
    const q = new Query('t_user')
    let { insertId, affectedRows } = await q
      .insert({
        name: 'INSERT test',
        age: 11,
        addr: 'hell'
      })
      .run()
    idx = insertId
    expect(affectedRows).toBe(1)
  })

  afterAll(async () => {
    await pool.query(`DELETE FROM t_user WHERE id=${idx}`)
    return pool.end()
  })
})
