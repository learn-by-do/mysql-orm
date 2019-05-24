const { transaction, pool } = require('./init')
const User = require('./User')

describe('Test transaction', () => {
  test('should do transaction commit()', async () => {
    const t = await transaction()

    const { insertId } = await User.insert(
      { name: 'TRANSACTION test', age: 23 }, t
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

    const { insertId } = await User.insert(
      { name: 'TRANSACTION test', age: 23 }, t
    )
    await t.rollback()
    t.release()
    const [queryRes] = await pool.query(
      'SELECT * FROM t_user WHERE id = ' + insertId
    )
    expect(queryRes).toEqual([])
  })

  afterAll(() => {
    return pool.end()
  })
})
