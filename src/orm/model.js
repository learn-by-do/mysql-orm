const Query = require('../query-helper')

function createModel (table, fields) {
  const model = class {
    static insert (data, transaction) {
      const q = new Query(table)
      return q.insert(data).run(transaction)
    }

    static update (data, condition, transaction) {
      const q = new Query(table)
      return q
        .update(data)
        .where(condition)
        .run(transaction)
    }

    static select (fieldList = fields, { where, limit, order, group }, transaction) {
      const q = new Query(table)
      let qInstance = q.select(fieldList || fields)

      if (where) {
        qInstance.where(where)
      }

      if (limit) {
        qInstance.limit(...[].concat(limit))
      }

      if (order) {
        if (Array.isArray(order) || typeof order === 'string') {
          qInstance.orderBy(order)
        } else {
          qInstance.orderBy(order.by, order.type)
        }
      }

      if (group) {
        qInstance.groupBy(group)
      }

      return qInstance.run(transaction)
    }

    static delete (condition, transaction) {
      const q = new Query(table)
      return q.delete(condition).run(transaction)
    }

    static find (params, transaction) {
      return model.select('', params, transaction)
    }
  }
  return model
}

exports.createModel = createModel
