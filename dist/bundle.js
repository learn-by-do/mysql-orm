'use strict'

const config = require('./utils/get-config')

let seqInstance
// let typeOrm
let rawInstance

module.exports = function (options) {
  const orm = options.orm

  if ((orm === 'raw')) {
    if (!rawInstance) {
      rawInstance = require('./init')
    }
    return rawInstance
  } else if (orm === 'typeorm') {
    throw new Error('Not support `typeorm` now.')
    // if (typeOrm) {
    //   return typeOrm
    // }
    // typeOrm = require('typeorm')
  } else {
    if (!seqInstance) {
      const Sequelize = require('sequelize')
      seqInstance = new Sequelize(config)
    }

    return seqInstance
  }
}
