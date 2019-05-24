# builder 说明

> 支持基本的 CRUD。

它的实例提供简单的 CRUD API 封装（记作 builder），数据的返回格式参考 [mysql2](https://github.com/sidorares/node-mysql2) 文档。

## 示例

假设有一张表 `t_user`：

id|name|age|addr|createAt|updateAt
--|--|--|--|--|--
`int`|`varchar`|`varchar`|`varchar`|`datetime`|`datetime`

update/insert/delete 返回数据结构：

```js
{
  fieldCount: 0,
  affectedRows: 1,
  insertId: 55, // insert
  info: '',
  serverStatus: 2,
  warningStatus: 0
}
```

select 返回数据结构：

```js
[{
  id: 1,
  name: 'jonge',
  age: 27
}]
```

### 插入

```js
const { Query } = require('mysql-orm')()

const q = new Query('t_user')
let [{ insertId, affectedRows }] = await q
  .insert({
    name: 'INSERT test',
    age: 11,
    addr: 'hell'
  })
  .run()
```

### 查询

```js
const q = new Query('t_user')
let [data] = await q
  .select(['id', 'name'])
  .where([
    {
      key: 'name',
      value: 'SELECT test%',
      op: 'LIKE'
    }
  ])
  .limit(2)
  .orderBy('name', 'DESC')
  .run().then(([data]) => {
    // data : [{id, name}, {id, name}]
  })
```

### 更新

```js
const q = new Query('t_user')
q.update({
  name: 'new name',
  age: 44
})
.where({ id: 2 })
.run()
```

### 删除

```js
const q = new Query('t_user')
const [{ affectedRows }] = await q
  .delete()
  .where({ id: 2 })
  .run()
```


## API

### 初始化 query，指定表

```js
const q = new Query('table_name')
```

### 执行 SQL

`run(?connection)`

注意：所有的 CRUD 都必须在链式调用末尾使用 `.run()` 来真正触发 SQL 执行。

`run()` 用来启动查询，如果传入了 `connection`，则会使用该 `connection` 执行 SQL，即 `connection.query(sql)`。

### 条件

`where(Object|Array)`、`whereOr(Object|Array)`

> 转为 `WHERE` 语句。

* 快捷 `=` 和 `IN`

```js
// id = 2 AND name = 'jonge'
where({
  id: 2,
  name: 'jonge'
})

// id IN (1, 2, 3)
where({
  id: [1, 2, 3]
})
```

* 标准条件

```js
// id IN (1, 2) AND name LIKE 'jonge%'
where([{
  key: id,
  value: [1, 2],
  op: 'IN'
}, {
  key: name,
  value: 'jonge%',
  op: 'LIKE'
}])
```

`whereOr()` 和 `where()` 除了把 SQL 中的 `AND` 换为 `OR` 外，用法完全一样。


### 选择

`select(columns: String|Array|Object[])`

> 转为 `SELECT x`。

```js
select('name')         // SELCECT name

select(['id', 'name']) // SELECT id, name

select(['id', {        // SELECT id, createAt as ctime
  column: 'createAt',
  alias: 'ctime'
}])
```

### 排序

`orderBy(columns: String|String[], ?'ASC'|'DESC')`

> 转为 `ORDER BY x`。

```js
orderBy('name')           // ORDER BY `name`
orderBy('name', 'DESC')   // ORDER BY `name` DESC
orderBy(['name', 'age'])  // ORDER BY `name`, `age`
```

### 分组

`groupBy(column: String)`

> 转为 `GROUP BY`

```js
groupBy('age')  // GROUP BY `age`
```

### 翻页

`limit(offset: Number, ?count: Number)`

> 转为 `LIMIT x`。

```js
limit(2)     // LIMIT 2
limit(1, 10) // LIMIT 1, 10
```

### 插入

`insert(columns: Object)`

```js
// INSERT INTO table SET name = 'robot 1', age = 0
update({
  name: 'robot 1',
  age: 0
})
```

### 更新

`update(columns: Object)`

```js
// UPDATE table SET name = 'new name', age = 23
update({
  name: 'new name',
  age: 23
})
```

### 删除

`delete(?whereParams)`

可以在这里指定条件语句，但注意，如果在后面继续调用 `where`，后者会替换前者。

```js
// DELETE FROM table WHERE id = 2
delete({
  id: 2
})

// DELETE FROM table WHERE id = 3
where({ id: 2 }).delete({ id: 3 })
```
