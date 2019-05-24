const { transaction, pool } = require('./init')

describe('Test transaction', () => {
  test('should do transaction commit()', async () => {
    const t = await transaction()

    const [{ insertId }] = await t.query(
      'INSERT INTO t_user SET name = "TRANSACTION test", age = 23'
    )
    await t.commit()
    t.release()
    const [[queryRes]] = await pool.query(
      'SELECT * FROM t_user WHERE id = ' + insertId
    )
    expect(queryRes.name).toBe('TRANSACTION test')
    await pool.query('DELETE FROM t_user WHERE id=' + insertId)
  })

  test('should do transaction rollback()', async () => {
    const t = await transaction()

    const [{ insertId }] = await t.query(
      'INSERT INTO t_user SET name = "TRANSACTION test", age = 23'
    )
    await t.rollback()
    t.release()
    const [[queryRes]] = await pool.query(
      'SELECT * FROM t_user WHERE id = ' + insertId
    )
    expect(queryRes).toBeUndefined()
  })

  afterAll(() => {
    return pool.end()
  })
})
