# Orm 使用文档

## 示例

假设有一张表 `t_user`：

id|name|age|addr|createAt|updateAt
--|--|--|--|--|--
`int`|`varchar`|`varchar`|`varchar`|`datetime`|`datetime`

```js
const { Orm } = require('mysql-orm')()

const User = Orm.define('t_user', ['id', 'name', 'age', 'addr'])
```

### 插入

```js
await User.insert({
  name: 'INSERT test',
  age: 11,
  addr: 'hell'
});
```

### 查询

```js
User.find({ // SELECT all columns defined in `define()`
  where: { id: 2 }
});

User.select([{id: 'uid'}, 'name'], { // SELECT id as uid, name
  where: { id: 2 }
});
```

### 更新

```js
User.update({ name: 'new name' }, { id: 2 })
```

### 删除

```js
User.delete({ id: 2 })
```

### 事务

```js
const { transaction } = require('mysql-orm')();

const t = await transaction();
const [{ insertId }] = await User.insert(
  { name: "TRANSACTION test", age: 23}, t
);

await t.commit();      // 提交
// await t.rollback(); // 回滚
t.release();           // 回收资源
```

## API

```js
const { Orm } = require('mysql-orm')()
const model = Orm.define('your_table', ['table', 'column'])
```

### Orm.define

`Orm.define(tableName: String, ?columns: String[])`

定义表结构：表名和表字段列表（字段名可以不是表的全量字段），支持别名。

```js
Orm.define('t_user', [
  { id: 'uid' }, // 别名
  { column: 'createAt', alias: 'ctime' }, // 别名
  'name', 'age'
}])

// model.find() 查询结果
// [{ uid: 1, ctime: '2019-03-27 09:00:00', name: 'jonge', age: 44 }, ...]
```

### model.insert

`model.insert(data, ?transaction)`

* data: 要插入数据的 key-value 对象
* transaction: 执行事务时会用到

```js
model.insert({
  name: 'jonge',
  age: 99
})
```

### model.select

`model.select(columns, condition, ?transaction)`

* columns: 要查询的表字段，格式参考`Orm.define` 接口
* condition: { where, limit, orderBy, groupBy }
* transaction: 执行事务时会用到

```js
model.select(
  ['name','age'],
  {
    where: [{ key: 'name', op: 'LIKE', value: '%Jon' }],
    orderBy: 'age', // 或 ['age'] 或 [{ by: ['age'], type: 'ASC' }]
    limit: 10, // 或 [0, 10]
    // groupBy: 'age'
  })
```

### model.find

`model.find(condition, ?transaction)` 等于 `model.select(columns, condition, ?transaction)`，其中 `columns` 是 `Orm.define()` 中定义的字段。

### model.delete

`model.delete(condition, ?transaction)`

* condition: 参考[builder](./builder.md) 的 `.where()`。
* transaction: 执行事务时会用到

```js
model.select({ 
  id: 2
 })
```
