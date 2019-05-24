调研
---

> 统计截止 2019-03-19。

|orm|创建时间|stars|issues|语言|读写分离|分库分表|
|--|--|--|--|--|--|--|
|[typeorm](https://github.com/typeorm/typeorm)|2016|11K|618|TS/JS|unknown|unknown|
|[sequelize](https://github.com/sequelize/sequelize)|2010|17K|384|JS|支持|需要利用 hooks 来自己实现|



两者底层都依赖 [mysql2](https://github.com/sidorares/node-mysql2) 提供 driver。


mysql 和 mysql2 的对比报告：

module|init(s)|escapes(ops/s)|inserts(ops/s)|selects(ops/s)
--|--|--|--|--
mysql|0.399|243, 0134|10, 152|270, 270
mysql2|0.167|256, 0819|11, 291|639, 386


测试用例[点击这里获取](https://github.com/NoName4Me/node-mysql-benchmarks)。