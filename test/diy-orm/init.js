// module.exports = require('@src/init')({
//   user: 'root',
//   password: 'hiJonge',
//   host: '127.0.0.1',
//   port: 3306,
//   database: 'jonge',
//   poolSize: 20
// })

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
