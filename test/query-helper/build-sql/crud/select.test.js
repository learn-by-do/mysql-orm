const Query = require('@Query')

describe('Test select builder', () => {
  test('should convert to "SELECT * FROM `user`"', () => {
    const q = new Query('user')
    expect(q.select().getSQL()).toBe('SELECT * FROM `user`')
  })

  test('should convert to "SELECT id, name, age FROM `user` WHERE `id` = 2"', () => {
    const q = new Query('user')
    expect(
      q
        .select(['id', 'name', 'age'])
        .where({ id: 2 })
        .getSQL()
    ).toBe('SELECT id, name, age FROM `user` WHERE `id` = 2')
  })

  test('should convert to "SELECT id, name, createAt AS ctime FROM `user` WHERE `id` IN (2, 3)"', () => {
    const q = new Query('user')
    expect(
      q
        .select(['id', 'name', { createAt: 'ctime' }])
        .whereNot({ id: [2, 3] })
        .limit(20)
        .getSQL()
    ).toBe(
      'SELECT id, name, createAt AS ctime FROM `user` WHERE `id` NOT IN (2, 3) LIMIT 20'
    )
  })

  test('should convert to "SELECT id, name, createAt AS ctime FROM `user` WHERE `id` IN (2, 3)"', () => {
    const q = new Query('user')
    expect(
      q
        .select(['id', 'name', 'age', 'addr'])
        .where([{ key: 'name', op: 'LIKE', value: '%jo' }])
        .limit(20)
        .orderBy(['name', 'age'], 'desc')
        .groupBy('age')
        .getSQL()
    ).toBe(
      "SELECT id, name, age, addr FROM `user` WHERE `name` LIKE '%jo' ORDER BY `name`, `age` DESC GROUP BY `age` LIMIT 20"
    )
  })
})
