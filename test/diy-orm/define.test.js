const { Orm } = require('./init')

describe('Test define table', () => {
  test('should throw when no table or fields is specified', () => {
    expect(() => Orm.define('', ['name'])).toThrow()
    expect(() => Orm.define('t_user', '')).toThrow()
  })

  test('should throw when no table or fields is specified', () => {
    const User = Orm.define('t_user', ['name'])
    expect(User.select).toBeInstanceOf(Function)
    expect(User.insert).toBeInstanceOf(Function)
    expect(User.update).toBeInstanceOf(Function)
    expect(User.delete).toBeInstanceOf(Function)
  })
})
