const { Orm } = require('./init')

const User = Orm.define('t_user', ['id', 'name', 'age', 'addr'])

module.exports = User
