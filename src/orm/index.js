
const { createModel } = require('./model')

class Orm {
  /**
   * define a table
   *
   * @param {String} tableName
   * @param {String[]} columns say we have a table with columns: ['id', 'name', 'age', 'createAt', 'updateAt'],
   *                              `columns` canbe ['id', 'name', 'age', 'createAt'], every User.select() will return
   *                              [{ id: 1, name: 'jonge', age: 0, createAt: '2019-03-26 09:00:00' }, ...]
   *                              if `columns` is [{ column: 'id', alias: 'uid'}, 'name'], it will return
   *                              [{ uid: 1, name: 'jonge' }, ...], you can also custom the `columns` on every query by
   *                               `User.select(customFields, condition)`, [more in `Model.select()`](model#select)
   * @param {Object} options reserved, for future usage
   */
  static define (tableName, columns, options) {
    if (!tableName) {
      throw new Error('table name must be specified!')
    }

    if (!columns || !columns.length) {
      throw new Error('columns name must be specified!')
    }

    // TODO: get true table name, like t_user --> t_user_0, t_user_1 ...

    return createModel(tableName, columns)
  }
}

module.exports = Orm
