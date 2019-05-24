const { normalizeGroupBy } = require('@normalize')
const { buildGroupBy } = require('@build')

describe('Test `GROUP BY` builder', () => {
  test('should convert empty params to ""', () => {
    expect(buildGroupBy(normalizeGroupBy())).toBe('')
  })

  test('should convert to right `GROUP BY`', () => {
    expect(buildGroupBy(normalizeGroupBy('name'))).toBe('GROUP BY `name`')
  })
})
