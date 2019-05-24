module.exports = require('@src/index')({
  orm: 'raw',
  db: {
    username: 'root',
    password: 'hiJonge',
    host: '127.0.0.1',
    port: 3306,
    dbname: 'jonge',
    poolSize: 20
  }
})
