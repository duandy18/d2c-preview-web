# d2c-preview-web

D2C Site Builder 发布前真实预览前端。

## 边界

- 只读取 draft-preview Runtime Contract
- 不配置数据库
- 不保存预览状态
- 不服务真实顾客
- 不读取 published Runtime Contract
- 不替代 d2c-web

## 本地启动

pnpm install
cp .env.example .env.local
pnpm dev

默认访问：

http://127.0.0.1:5301/preview?site=default&surface=pc-web&page=home
