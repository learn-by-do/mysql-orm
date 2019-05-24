const { pool, Orm } = require('./init')
const User = require('./User')

describe('Test SELECT', () => {
  const idList = [5, 6, 7, 8]
  beforeAll(async () => {
    for (let i = 0; i < idList.length; i++) {
      let id = idList[i]
      await pool.query(
        `REPLACE INTO t_user (id, name, age, addr) VALUES(${id}, "SELECT test-${id}", ${(i %
          3) +
          10}, "")`
      )
    }
  })

  test('should select one row', async () => {
    const User1 = Orm.define('t_user', [
      { column: 'id', alias: 'uid' },
      { name: 'firstName' },
      'age',
      'addr'
    ])
    let [data] = await User1.select('', {
      where: { id: idList[0] }
    })
    expect(data).toEqual({ uid: 5, firstName: 'SELECT test-5', age: 10, addr: '' })
  })

  test("SELECT id, name FROM `t_user` WHERE `name` LIKE 'SELECT test %' ORDER BY `name` DESC LIMIT 2", async () => {
    let [data] = await User.find({
      where: [{ key: 'name', value: 'SELECT test%', op: 'LIKE' }],
      limit: 2,
      order: { by: 'name', type: 'DESC' }
    })
    expect(data.name).toBe('SELECT test-8')
    expect(data.id).toBe(idList.slice(-1)[0])
  })

  test('SELECT age, count(*) FROM `t_user` WHERE `id` > 1 GROUP BY `age`', async () => {
    let [age10, age11, age12] = await User.select(['age', { column: 'count(*)', alias: 'cnt' }], {
      where: [{ key: 'id', op: '>', value: 1 }],
      group: 'age'
    })
    expect(age10['cnt']).toBe(2)
    expect(age11['cnt']).toBe(1)
    expect(age12['cnt']).toBe(1)
  })

  afterAll(async () => {
    await pool.query(`DELETE FROM t_user WHERE id IN (${idList.join(', ')})`)
    return pool.end()
  })
})
