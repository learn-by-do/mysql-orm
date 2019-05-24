const { pool } = require('./init')

describe('Test insert', () => {
  let id
  test('should insert one row', async () => {
    const data = await pool.query(
      'INSERT INTO demo_msg (`msg`) VALUES ("insert by test")'
    )
    const [queryResult] = await pool.query(
      'select * from demo_msg order by id desc limit 1'
    )

    id = queryResult[0].id
    expect(queryResult[0]['id']).toBe(data[0].insertId)
    expect(queryResult[0]['msg']).toBe('insert by test')
  })

  afterAll(async () => {
    await pool.query('delete from demo_msg where id=' + id)
    return pool.close()
  })
})
