const Query = require('@Query')

describe('Test insert builder', () => {
  test('should convert to "INSERT INTO `user` SET `name` = "jonge""', () => {
    const q = new Query('user')
    expect(q.insert({ name: 'jonge' }).getSQL()).toBe(
      "INSERT INTO `user` SET `name` = 'jonge'"
    )

    expect(q.insert({ name: 'jonge', age: 29 }).getSQL()).toBe(
      "INSERT INTO `user` SET `name` = 'jonge', `age` = 29"
    )
  })
})
