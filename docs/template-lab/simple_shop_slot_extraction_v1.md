# Simple Shop Slot Extraction v1

## 1. 当前模板边界

购物网站最小页面集合：

- 首页
- 商品详情页
- 购物车页
- 结算页
- 注册页
- 登录页

第一阶段进入 Site Builder 拆建的页面：

- 首页
- 商品详情页 A：标准图册详情
- 商品详情页 B：多图展示详情

暂时固定为交易 / 账号模板的页面：

- 购物车页
- 结算页
- 注册页
- 登录页

原因：购物车、结算、注册、登录属于交易和账号流程，第一阶段不让商家装修，只保持统一视觉和固定链接。

## 2. 首页模板：pc_home_simple_shop_v1

样张路由：/template-lab/pc-home-pet-boutique

首页 Region / Slot：

| Region | Slot | 说明 |
|---|---|---|
| home.header | header.brand | 品牌名称 |
| home.header | header.login_link | 登录入口 |
| home.product_collection | product_collection.tabs | 全部商品 / 新品 / 热卖 / 推荐 / 大促 |
| home.hero | hero.title | 首页标题 |
| home.campaign | campaign.banner | 首页广告位 |
| home.product_category | product_category.nav | 商品分类导航 |
| home.product_category | cart.entry | 小黄车入口 |
| home.product_grid | product_grid.list | 商品列表和商品卡 |
| home.service | service.promise_bar | 满 99 包邮 / 48 小时发货 / 新客礼 |
| home.legal_footer | site.legal_footer | ICP / 公安备案占位 |

首页核心可变内容：

- 首页标题
- 首页广告位
- 商品集合导航
- 商品分类导航
- 商品列表
- 商品图、标题、分类、价格、原价划线、优惠、销量、付款人数、数量、加入购物车

## 3. 商品详情模板 A：pc_product_detail_gallery_v1

样张路由：/template-lab/pc-product-detail-simple

模板定位：标准商品详情页，左侧主图 + 缩略图，右侧购买信息。

| Region | Slot | 说明 |
|---|---|---|
| product.gallery | product.gallery.main | 商品主图 |
| product.gallery | product.gallery.thumbs | 商品缩略图，点击切换主图 |
| product.summary | product.summary.info | 商品分类、标题、描述 |
| product.summary | product.price | 实际价、原价划线 |
| product.summary | product.promotion | 标签和优惠 |
| product.summary | product.sales_stats | 已售数量、已付款人数 |
| product.summary | product.highlights | 商品卖点 |
| product.summary | product.quantity | 数量选择 |
| product.summary | product.cart_action | 加入购物车 |
| product.detail_content | product.detail_content.cards | 商品详情说明卡 |
| product.recommend | product.recommend_shelf | 相关推荐 |

## 4. 商品详情模板 B：pc_product_detail_image_matrix_v1

样张路由：/template-lab/pc-product-detail-image-matrix

模板定位：多图展示商品详情页。图片权重大，周围多角度图点击后切换主图。

| Region | Slot | 说明 |
|---|---|---|
| product.image_matrix | product.image_matrix.main | 多图主图 |
| product.image_matrix | product.image_matrix.side_images | 多角度图片，建议 6 张，最少 4 张 |
| product.summary | product.summary.info | 商品分类、标题、描述 |
| product.summary | product.price | 实际价、原价划线 |
| product.summary | product.promotion | 优惠信息 |
| product.summary | product.sales_stats | 已售数量、已付款人数 |
| product.summary | product.highlights | 商品卖点 |
| product.summary | product.quantity | 数量选择 |
| product.summary | product.cart_action | 加入购物车 |
| product.detail_content | product.detail_content.cards | 图文说明 |

发布校验：product.image_matrix.side_images 最少 4 张，建议 6 张；否则多图详情模板不允许发布。

## 5. 固定交易 / 账号模板

| 模板 | 说明 | 第一阶段是否拆 Slot |
|---|---|---|
| pc_cart_simple_v1 | 商品行、数量、单价、优惠、小计、购物车汇总、去结算 | 否 |
| pc_checkout_simple_v1 | 收货、配送、支付、订单确认、提交订单 | 否 |
| pc_register_simple_v1 | 手机号、验证码、密码、默认收货地址 | 否 |
| pc_login_simple_v1 | 手机号、密码、验证码登录、注册链接 | 否 |

## 6. Runtime Contract 目标

首页和商品详情页未来输出：

```text
regions[]
  blocks[]
    slot_code
    renderer_key
    content
    presentation
```

购物车、结算、注册、登录第一阶段不走 Site Builder Runtime Contract。

## 7. 下一步工程顺序

1. 确认本文档边界。
2. 在 d2c-site-builder-api 新增 pc_home_simple_shop_v1 模板定义。
3. 在 d2c-site-builder-api 新增 pc_product_detail_gallery_v1 模板定义。
4. 在 d2c-site-builder-api 新增 pc_product_detail_image_matrix_v1 模板定义。
5. Runtime Contract 增加 presentation 字段。
6. d2c-preview-web renderer 支持这些新模板。
7. d2c-site-builder-web 后台内容填写页支持首页和详情页 Slot。
