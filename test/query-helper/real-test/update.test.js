const { Query, pool } = require('./init')

describe('Test UPDATE', () => {
  const idx = 2
  beforeAll(() => {
    return pool.query(
      `REPLACE INTO t_user (id, name, age, addr) VALUES(${idx}, "UPDATE test", 55, "")`
    )
  })
  test("UPDATE `t_user` SET `name` = 'updated', `age` = 66, `addr` = 'hiahia' WHERE `id` = 2", async () => {
    const q = new Query('t_user')
    const updateData = {
      name: 'updated',
      age: 66,
      addr: 'hiahia'
    }
    let { affectedRows } = await q
      .update(updateData)
      .where({ id: idx })
      .run()
    expect(affectedRows).toBe(1)

    const [[{ name, age, addr, updateAt }]] = await pool.query(
      `SELECT * FROM t_user WHERE id=${idx}`
    )
    expect(updateData).toEqual({ name, age, addr })
    expect(updateAt).not.toBeNull()
  })

  afterAll(async () => {
    await pool.query(`DELETE FROM t_user WHERE id=${idx}`)
    return pool.end()
  })
})
