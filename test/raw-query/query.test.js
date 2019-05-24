const { pool } = require('./init')
const { query, close } = pool

describe('Test query', () => {
  test('should got error when query table not exist', () => {
    return expect(query('select * from demo_msg_1 limit 1')).rejects.toThrow(
      "Table 'jonge.demo_msg_1' doesn't exist"
    )
  })

  test('should query one row', () => {
    return query('select * from demo_msg where id=1').then(([rows]) => {
      expect(rows[0].id).toBe(1)
      expect(rows[0].msg).toBe('this is demo msg')
    })
  })

  test('should query two rows', () => {
    return query('select * from demo_msg limit 2').then(([rows]) => {
      expect(rows.length).toBe(2)
      expect(rows[0].msg).toBe('this is demo msg')
      expect(rows[1].id).toBe(2)
    })
  })
  afterAll(() => {
    return close()
  })
})
