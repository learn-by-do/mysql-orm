const { Query, pool } = require('./init')

describe('Test SELECT', () => {
  const idList = [5, 6, 7, 8]
  beforeAll(async () => {
    for (let i = 0; i < idList.length; i++) {
      let id = idList[i]
      await pool.query(
        `REPLACE INTO t_user (id, name, age, addr) VALUES(${id}, "SELECT test-${id}", ${i % 3 + 10}, "")`
      )
    }
  })

  test('should select one row', async () => {
    const q = new Query('t_user')
    let [{ mAge }] = await q
      .select({
        age: 'mAge'
      }).where({
        id: idList[0]
      })
      .run()
    expect(mAge).toBe(10)
  })

  test("SELECT id, name FROM `t_user` WHERE `name` LIKE 'SELECT test %' ORDER BY `name` DESC LIMIT 2", async () => {
    const q = new Query('t_user')
    let [data] = await q
      .select(['id', 'name'])
      .where([
        {
          key: 'name',
          value: 'SELECT test%',
          op: 'LIKE'
        }
      ])
      .limit(2)
      .orderBy('name', 'DESC')
      .run()
    expect(data.name).toBe('SELECT test-8')
    expect(data.id).toBe(idList.slice(-1)[0])
  })

  test('SELECT age, count(*) FROM `t_user` WHERE `id` > 1 GROUP BY `age`', async () => {
    const q = new Query('t_user')
    let [age10, age11, age12] = await q
      .select(['age', 'count(*)'])
      .where([
        {
          key: 'id',
          op: '>',
          value: 1
        }
      ])
      .groupBy('age')
      .run()
    expect(age10['count(*)']).toBe(2)
    expect(age11['count(*)']).toBe(1)
    expect(age12['count(*)']).toBe(1)
  })

  afterAll(async () => {
    await pool.query(`DELETE FROM t_user WHERE id IN (${idList.join(', ')})`)
    return pool.end()
  })
})
