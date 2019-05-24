let seqInstance
let typeOrm
let rawInstance

module.exports = function (options = {}) {
  const orm = options.orm || 'raw'
  let config
  if (options.db) {
    config = options.db
    // assert mysql connection
    assertConfigInfo(config)
    config.user = config.username
    config.database = config.dbname
    delete config.username
    delete config.dbname
  } else {
    const {
      appName,
      dbKey
    } = options
    if (!appName) {
      throw new Error('please specify the application name, eg: "mfwtest.test"')
    }
    if (!dbKey) {
      throw new Error('please specify the database key, eg: "test"')
    }
    require('./utils/get-config')(appName, dbKey).then(info => {
      // assert mysql connection
      assertConfigInfo(info)
      config = {
        host: info.host,
        port: info.port,
        database: info.dbname,
        user: info.username,
        password: info.password
      }
      delete config.username
      delete config.dbname
      rawInstance.init(config)
    }).catch(e => {
      throw new Error(e)
    })
  }

  if (orm === 'raw') {
    if (!rawInstance) {
      rawInstance = require('./init')
      if (config) {
        rawInstance.init(config)
      }
    }
    return rawInstance
  } else if (orm === 'typeorm') {
    throw new Error('Not support `typeorm` now.')
    if (typeOrm) {
      return typeOrm
    }
    typeOrm = require('typeorm')
  } else {
    if (!seqInstance) {
      const Sequelize = require('sequelize')
      config.username = config.user
      delete config.user
      seqInstance = new Sequelize({
        dialect: 'mysql',
        ...config,
        pool: {
          max: config.poolSize || 20,
          min: 0,
          acquire: 30000,
          idle: 10000
        }
      })
    }

    return seqInstance
  }
}

function assertConfigInfo (config) {
  if (!config.user) {
    throw new Error('MySQL connection parameter `username` should not be empty!')
  }
  if (!config.password) {
    throw new Error('MySQL connection parameter `password` should not be empty!')
  }
  if (!config.host) {
    throw new Error('MySQL connection parameter `host` should not be empty!')
  }
  if (!config.port) {
    throw new Error('MySQL connection parameter `port` should not be empty!')
  }
  if (!config.database) {
    throw new Error('MySQL connection parameter `database` should not be empty!')
  }
}
