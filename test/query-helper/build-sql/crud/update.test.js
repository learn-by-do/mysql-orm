const Query = require('@Query')

describe('Test update builder', () => {
  test('should convert to  correct UPDATE SQL', () => {
    const q = new Query('user')
    expect(q.where({ id: [1, 2] }).update({ name: 'jonge' }).getSQL()).toBe(
      "UPDATE `user` SET `name` = 'jonge' WHERE `id` IN (1, 2)"
    )

    expect(q.where({ id: 3 }).update({ name: 'jonge', age: 29 }).getSQL()).toBe(
      "UPDATE `user` SET `name` = 'jonge', `age` = 29 WHERE `id` = 3"
    )

    expect(q.whereOr({
      id: 1,
      name: 'jonge'
    }).update({ name: 'jonge den' }).getSQL()).toBe(
      "UPDATE `user` SET `name` = 'jonge den' WHERE `id` = 1 OR `name` = 'jonge'"
    )
  })
})
