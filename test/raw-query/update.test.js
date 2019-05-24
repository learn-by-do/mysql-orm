const { pool } = require('./init')
const { query, close } = pool

describe('Test update', () => {
  beforeAll(() => {
    return query(
      'REPLACE INTO demo_msg (id, msg) VALUES(5, "UPDATE TEST")'
    )
  })
  test('should insert one row', async () => {
    await query(
      'UPDATE demo_msg set msg="UPADATE CHANGED" where id=5'
    )

    const [queryResult] = await query('select * from demo_msg where id=5')

    expect(queryResult[0].msg).toBe('UPADATE CHANGED')
  })
  afterAll(async () => {
    await query('delete from demo_msg where id=5')
    return close()
  })
})
