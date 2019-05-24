const { normalizeField } = require('@normalize')
const { buildField } = require('@build')

describe('Test `field` builder', () => {
  test('should convert empty params to *', () => {
    expect(buildField(normalizeField())).toBe('*')
  })

  test('should build one field', () => {
    expect(buildField(normalizeField('id'))).toBe('id')
  })

  test('should convert multi fields to a, b, c...', () => {
    expect(buildField(normalizeField(['id', 'name']))).toBe('id, name')
  })

  test('should convert alias fields with AS', () => {
    expect(buildField(normalizeField({ id: 'ID' }))).toBe('id AS ID')
    expect(buildField(normalizeField({ id: 'ID', name: 'firstName' }))).toBe('id AS ID, name AS firstName')
    expect(buildField(normalizeField({ column: 'id', alias: 'ID' }))).toBe(
      'id AS ID'
    )
  })

  test('should convert mixed params', () => {
    expect(
      buildField(
        normalizeField([
          { column: 'count(id)', alias: 'sum' },
          { createAt: 'ctime' },
          'name',
          'age'
        ])
      )
    ).toBe('count(id) AS sum, createAt AS ctime, name, age')
  })
})
