# mysql-orm

![](https://img.shields.io/badge/mysql-only-blue.svg?style=for-the-badge&logo=mysql&logoColor=white)

[![jest](https://jestjs.io/img/jest-badge.svg)](https://github.com/facebook/jest)

调研分析报告[点击这里](./doc/research.md)。

```bash
yarn

## run test
yarn test
```

## 使用

```js
npm i mysql-orm
```

对外暴露 4 个属性：

* pool: mysql2 创建的连接池，具体使用见[下方](#pool)
* Query: 类，提供快捷调用 CRUD 的 API，[文档点这里](./doc/builder.md)
* Orm: 详见[这里](./doc/orm.md)
* transaction: 用来执行事务，详见[事务](#transaction)，Query 和 Orm 使用事务见各自文档


### pool

返回的连接池，提供 3 个接口：

* `getConnection`：获取一个连接实例
* `query`: 直接执行 SQL 语句，一般用来执行复杂 SQL
* `close`: 关闭连接池

```js
const { pool } = require('mysql-orm')(
  type: 'raw'
);

pool.query('select 1 + 1').then((rows, fields) => {
  // 
})

// 或者自己指定数据库
const { pool } = require('mysql-orm')({
  type: 'raw',
  db: {
    username: '',
    password: '',
    host: '',
    port: '',
    poolSize: 20, // default
    dbname: '',
  }
})

const [data] = await pool.query('select 1 + 1')
```

### transaction

```js
const { transaction, pool } = require('mysql-orm')();

const t = await transaction();

const [{ insertId }] = await t.query(
  'INSERT INTO t_user SET name = "TRANSACTION test", age = 23'
);

await t.commit();      // 提交
// await t.rollback(); // 回滚
t.release();           // 回收资源
```

## 使用其它 ORM


