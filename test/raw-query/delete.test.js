const { pool } = require('./init')

describe('Test delete', () => {
  beforeEach(() => {
    return pool.query('REPLACE INTO demo_msg (id, msg) VALUES(4, "DELETE TEST")')
  })

  test('should delete one row', async () => {
    await pool.query('DELETE FROM demo_msg where id=4')
    const [data] = await pool.query('SELECT msg FROM demo_msg where id=4')
    expect(data[0]).not.toBeDefined()
  })

  afterAll(() => {
    return pool.close()
  })
})
