const { normalizeWhere } = require('@normalize')
const { buildWhere } = require('@build')
const { Op } = require('@src/utils/const')

describe('Test `where` builder', () => {
  test('should convert empty params to ""', () => {
    expect(buildWhere(normalizeWhere())).toBe('')
  })
  test('should convert single key-value to WHERE SQL', () => {
    expect(
      buildWhere(
        normalizeWhere({
          id: 12
        })
      )
    ).toBe('WHERE id = 12')
  })

  test('should convert array type to WHERE SQL', () => {
    expect(
      buildWhere(
        normalizeWhere({
          id: [1, 2, 3]
        })
      )
    ).toBe('WHERE id IN (1, 2, 3)')

    expect(
      buildWhere(
        normalizeWhere({
          id: ['1', '2', '3']
        })
      )
    ).toBe("WHERE id IN ('1', '2', '3')")
  })

  test('should convert mixed object to WHERE SQL', () => {
    expect(
      buildWhere(
        normalizeWhere({
          id: 12,
          name: ['jonge', 'den']
        })
      )
    ).toBe("WHERE id = 12 AND name IN ('jonge', 'den')")
  })

  test.only('operator assert and convertion', () => {
    expect(
      buildWhere(
        normalizeWhere([
          { key: 'id', value: 2, op: Op.EQUAL },
          { key: 'id', value: 2, op: Op.N_EQUAL },
          { key: 'id', value: 2, op: Op.GRANT },
          { key: 'id', value: 2, op: Op.GRANT_EQUAL },
          { key: 'id', value: 2, op: Op.LOW },
          { key: 'id', value: 2, op: Op.LOW_EQUAL }
        ])
      )
    ).toBe(
      'WHERE `id` = 2 AND `id` != 2 AND `id` > 2 AND `id` >= 2 AND `id` < 2 AND `id` <= 2'
    )

    expect(
      buildWhere(
        normalizeWhere([
          { key: 'id', value: [2, 4], op: Op.BETWEEN },
          { key: 'id', value: [2, 4], op: Op.N_BETWEEN },
          { key: 'name', value: 'jonge', op: Op.LIKE },
          { key: 'name', value: 'jonge', op: Op.N_LIKE }
        ])
      )
    ).toBe(
      "WHERE `id` BETWEEN 2 AND 4 AND `id` NOT BETWEEN 2 AND 4 AND `name` LIKE 'jonge' AND `name` NOT LIKE 'jonge'"
    )
  })
})
