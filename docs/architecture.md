# d2c-preview-web Architecture

d2c-preview-web 位于内容编辑和正式发布之间。

它只读取 d2c-site-builder-api 的 draft-preview Runtime Contract。
它不持久化状态，不连接数据库，不服务真实顾客端流量。
