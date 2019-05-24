const { build } = require('./build')
const {
  normalizeWhere,
  normalizeWhereNot,
  normalizeField,
  normalizeLimit,
  normalizeTable,
  normalizeOrderBy,
  normalizeGroupBy
} = require('./normalize')
const { Keyword, Op } = require('../utils/const')
const pool = require('../init/pool')

class Query {
  constructor (table) {
    this._table = normalizeTable(table)
    this._where = []
    this._field = normalizeField()
    this._groupBy = normalizeGroupBy()
    this._orderBy = normalizeOrderBy()
    this._type = Keyword.SELECT
  }

  /**
   * query conditions, default 'AND'
   *
   * @param {*} params { id: 2 }: where id = 2
   */
  where (params = {}) {
    this._where = normalizeWhere(params)
    return this
  }

  /**
   * query conditions, default 'OR'
   *
   * @param {*} params { id: 2 }: where id = 2
   */
  whereOr (params = {}) {
    this._where = normalizeWhere(params, Op.OR)
    return this
  }

  /**
   * query conditions, default 'AND' and negative
   *
   * @param {*} params { id: 2 }: where id != 2
   */
  whereNot (params = {}) {
    this._where = normalizeWhereNot(params)
    return this
  }

  /**
   * config Query fields
   *
   * @param {String, String[]} fields query fields
   */
  field (params = Keyword.ALL) {
    this._field = normalizeField(params)
    return this
  }

  /**
   * LIMIT offset, count
   *
   * @param {Number} offset
   * @param {Number} count
   */
  limit (offset, count) {
    this._limit = normalizeLimit(offset, count)
    return this
  }

  /**
   * ORDER BY
   *
   * @param {String|String[]} params 'col1', or ['col1', 'col2']
   * @param {String} order 'DESC' | 'ASC'
   */
  orderBy (params, order = Keyword.DESC) {
    this._orderBy = normalizeOrderBy(params, order)
    return this
  }

  /**
   * GROUP BY
   *
   * @param {String} field column name
   */
  groupBy (field) {
    this._groupBy = normalizeGroupBy(field)
    return this
  }

  /**
   * SELECT FROM
   *
   * @param {*} params
   */
  select (params = Keyword.ALL) {
    this._field = normalizeField(params)
    this._type = Keyword.SELECT
    return this
  }

  /**
   * UPDATE
   *
   * @param {*} params
   */
  update (params) {
    this._data = params
    this._type = Keyword.UPDATE
    return this
  }

  /**
   * INSERT INTO
   *
   * @param {*} params
   */
  insert (params) {
    this._data = params
    this._type = Keyword.INSERT
    return this
  }

  /**
   * DELETE FROM
   *
   * @param {*} params
   */
  delete (params) {
    this._where = normalizeWhere(params)
    this._type = Keyword.DELETE
    return this
  }

  /**
   * do execute SQL based chain input before it
   *
   * @param {*} connection
   */
  run (connection) {
    const sql = build(this)
    console.debug('execute: ', sql)

    return new Promise(async (resolve, reject) => {
      try {
        let result
        if (connection) {
          [result] = await connection.query(sql)
        } else {
          [result] = await pool.query(sql)
        }
        resolve(result)
      } catch (e) {
        reject(e)
      }
    })
  }
  // test only
  getSQL () {
    return build(this)
  }

  // ['select', 'insert', 'delete', 'update']
}

module.exports = Query
