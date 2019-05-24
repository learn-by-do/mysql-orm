const { Op } = require('../../utils/const')
const { escapeId, escape } = require('mysql2')
const { assertBuildinOperator } = require('../../utils/type')

/**
 * normalize where params into form of [{ke,value,op,relation}]
 *
 * @param {*} config query conditions
 * @param {String} relation 'AND' | 'OR'
 * @param {Boolean} negative turn '=' to '!=', 'IN' to 'NOT IN'
 */
function normalizeWhere (config, relation = Op.AND, negative = false) {
  if (!config) {
    return []
  }

  // [{ key, value, op }]
  if (Array.isArray(config)) {
    return config.map(item => {
      assertBuildinOperator(item.op)
      return {
        key: escapeId(item.key),
        op: item.op,
        value: Array.isArray(item.value)
          ? item.value.map(val => escape(val))
          : escape(item.value)
      }
    })
  }

  const keys = Object.keys(config)
  const tempalte = {
    key: '',
    value: '',
    relation: relation,
    op: negative ? Op.N_EQUAL : Op.EQUAL
  }

  const result = []
  keys.map(key => {
    const value = config[key]
    const oneWhere = {
      ...tempalte,
      key: escapeId(key),
      value: normalizeValue(value)
    }

    if (Array.isArray(value)) {
      oneWhere.op = negative ? Op.N_IN : Op.IN
    }
    result.push(oneWhere)
  })

  return result
}

/**
 * normalize where params into form of [{ke,value,op,relation}], negative methods
 *
 * @param {*} config query conditions
 * @param {String} relation 'AND' | 'OR'
 */
function normalizeWhereNot (config, relation = Op.AND) {
  return normalizeWhere(config, relation, true)
}

function normalizeValue (value) {
  if (Array.isArray(value)) {
    return `(${value.map(item => escape(item)).join(', ')})`
  }
  return escape(value)
}

exports.normalizeWhere = normalizeWhere
exports.normalizeWhereNot = normalizeWhereNot
