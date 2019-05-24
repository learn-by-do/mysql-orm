const Query = require('@Query')

describe('Test delete builder', () => {
  test('should convert to "DELETE FROM `user` WHERE `id` = 1"', () => {
    const q = new Query('user')
    expect(
      q
        .delete()
        .where({ id: 1 })
        .getSQL()
    ).toBe('DELETE FROM `user` WHERE `id` = 1')
  })
})
