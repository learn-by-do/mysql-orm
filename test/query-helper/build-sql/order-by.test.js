const { normalizeOrderBy } = require('@normalize')
const { buildOrderBy } = require('@build')

describe('Test `ORDER BY` builder', () => {
  test('should convert empty params to ""', () => {
    expect(buildOrderBy(normalizeOrderBy())).toBe('')
  })
  test('should throw on invalid order type', () => {
    expect(() => {
      buildOrderBy(normalizeOrderBy('name', 'default'))
    }).toThrow()
  })
  test('should convert to right `order by`', () => {
    expect(buildOrderBy(normalizeOrderBy('name'))).toBe('ORDER BY `name` ASC')
    expect(buildOrderBy(normalizeOrderBy(['id', 'name']))).toBe(
      'ORDER BY `id`, `name` ASC'
    )
    expect(buildOrderBy(normalizeOrderBy(['id', 'name'], 'DESC'))).toBe(
      'ORDER BY `id`, `name` DESC'
    )
  })
})
