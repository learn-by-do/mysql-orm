const { normalizeLimit } = require('@normalize')
const { buildLimit } = require('@build')

describe('Test `field` builder', () => {
  test('should convert empty params to LIMIT 1', () => {
    expect(buildLimit(normalizeLimit())).toBe('LIMIT 1')
    expect(buildLimit(normalizeLimit(0))).toBe('LIMIT 0')
  })

  test('should convert limit(3) LIMIT 3', () => {
    expect(buildLimit(normalizeLimit(3))).toBe('LIMIT 3')
  })

  test('should convert limit(1,3) params to LIMIT 1, 3', () => {
    expect(buildLimit(normalizeLimit(1, 3))).toBe('LIMIT 1, 3')
    expect(buildLimit(normalizeLimit(0, 3))).toBe('LIMIT 0, 3')
  })
})
