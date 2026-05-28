import { useMemo, useState } from 'react'

import '../styles/petBoutiqueHome.css'
import { TemplateLegalFooter } from '../components/TemplateLegalFooter'

type CollectionFilter = 'all' | 'new' | 'hot' | 'recommend' | 'campaign'

type ProductCollection = Exclude<CollectionFilter, 'all'>

type CategoryFilter =
  | 'all'
  | 'cat-litter'
  | 'cat-food'
  | 'cat-cans'
  | 'cleaning'
  | 'snack'

type Product = {
  readonly id: string
  readonly title: string
  readonly category: string
  readonly categoryKey: Exclude<CategoryFilter, 'all'>
  readonly collections: readonly ProductCollection[]
  readonly badge: string
  readonly originalPrice: string
  readonly salePrice: string
  readonly promo: string
  readonly soldCount: string
  readonly paidBuyers: string
  readonly image: string
}

const navItems: readonly { label: string; value: CollectionFilter }[] = [
  { label: '全部商品', value: 'all' },
  { label: '新品上架', value: 'new' },
  { label: '热卖', value: 'hot' },
  { label: '店主推荐', value: 'recommend' },
  { label: '大促活动', value: 'campaign' },
]

const categories: readonly { label: string; value: CategoryFilter }[] = [
  { label: '全部商品', value: 'all' },
  { label: '猫砂', value: 'cat-litter' },
  { label: '猫粮', value: 'cat-food' },
  { label: '猫罐头', value: 'cat-cans' },
  { label: '清洁护理', value: 'cleaning' },
  { label: '零食冻干', value: 'snack' },
]

const products: readonly Product[] = [
  {
    id: 'cat-litter-tofu-hot',
    title: '豆腐混合猫砂 6L',
    category: '猫砂',
    categoryKey: 'cat-litter',
    collections: ['hot', 'campaign'],
    badge: '热卖',
    originalPrice: '¥49',
    salePrice: '¥39',
    promo: '满 99 减 20',
    soldCount: '2,314',
    paidBuyers: '1,086',
    image:
      'https://images.unsplash.com/photo-1545249390-6bdfa286032f?auto=format&fit=crop&w=1000&q=85',
  },
  {
    id: 'cat-litter-bentonite-new',
    title: '膨润土除臭猫砂',
    category: '猫砂',
    categoryKey: 'cat-litter',
    collections: ['new', 'campaign'],
    badge: '新品',
    originalPrice: '¥59',
    salePrice: '¥45',
    promo: '新品直降',
    soldCount: '864',
    paidBuyers: '421',
    image:
      'https://images.unsplash.com/photo-1601758063541-d2f50b4aafb2?auto=format&fit=crop&w=1000&q=85',
  },
  {
    id: 'cat-food-adult-recommend',
    title: '全价成猫主粮 2kg',
    category: '猫粮',
    categoryKey: 'cat-food',
    collections: ['hot', 'recommend'],
    badge: '店主推荐',
    originalPrice: '¥159',
    salePrice: '¥128',
    promo: '第二件 8 折',
    soldCount: '1,728',
    paidBuyers: '932',
    image:
      'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1000&q=85',
  },
  {
    id: 'cat-food-kitten-new',
    title: '低敏幼猫主粮 1.5kg',
    category: '猫粮',
    categoryKey: 'cat-food',
    collections: ['new', 'recommend'],
    badge: '新品',
    originalPrice: '¥139',
    salePrice: '¥118',
    promo: '首发立减',
    soldCount: '536',
    paidBuyers: '248',
    image:
      'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=1000&q=85',
  },
  {
    id: 'cat-cans-chicken-new',
    title: '鸡肉慕斯罐 12 入',
    category: '猫罐头',
    categoryKey: 'cat-cans',
    collections: ['new', 'campaign'],
    badge: '新品',
    originalPrice: '¥109',
    salePrice: '¥89',
    promo: '买 2 减 ¥10',
    soldCount: '1,102',
    paidBuyers: '519',
    image:
      'https://images.unsplash.com/photo-1571566882372-1598d88abd90?auto=format&fit=crop&w=1000&q=85',
  },
  {
    id: 'cat-cans-tuna-hot',
    title: '金枪鱼主食罐 6 入',
    category: '猫罐头',
    categoryKey: 'cat-cans',
    collections: ['hot', 'recommend'],
    badge: '热卖',
    originalPrice: '¥99',
    salePrice: '¥78',
    promo: '组合优惠',
    soldCount: '936',
    paidBuyers: '472',
    image:
      'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?auto=format&fit=crop&w=1000&q=85',
  },
  {
    id: 'cleaning-spray-recommend',
    title: '家庭除味喷雾',
    category: '清洁护理',
    categoryKey: 'cleaning',
    collections: ['recommend'],
    badge: '推荐',
    originalPrice: '¥79',
    salePrice: '¥59',
    promo: '组合价',
    soldCount: '689',
    paidBuyers: '318',
    image:
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1000&q=85',
  },
  {
    id: 'cleaning-wipes-new',
    title: '宠物湿巾 80 抽',
    category: '清洁护理',
    categoryKey: 'cleaning',
    collections: ['new', 'campaign'],
    badge: '新品',
    originalPrice: '¥39',
    salePrice: '¥29',
    promo: '加购优惠',
    soldCount: '754',
    paidBuyers: '366',
    image:
      'https://images.unsplash.com/photo-1560807707-8cc77767d783?auto=format&fit=crop&w=1000&q=85',
  },
  {
    id: 'snack-freeze-dried-new',
    title: '冻干鸡肉零食',
    category: '零食冻干',
    categoryKey: 'snack',
    collections: ['new', 'recommend'],
    badge: '新品',
    originalPrice: '¥89',
    salePrice: '¥69',
    promo: '新品尝鲜价',
    soldCount: '1,283',
    paidBuyers: '602',
    image:
      'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=1000&q=85',
  },
  {
    id: 'snack-cat-strip-campaign',
    title: '深海鱼猫条 30 支',
    category: '零食冻干',
    categoryKey: 'snack',
    collections: ['hot', 'campaign'],
    badge: '大促',
    originalPrice: '¥69',
    salePrice: '¥49',
    promo: '买 3 免 1',
    soldCount: '2,046',
    paidBuyers: '1,144',
    image:
      'https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=1000&q=85',
  },
  {
    id: 'cat-food-combo-campaign',
    title: '猫粮罐头补货组合',
    category: '猫粮',
    categoryKey: 'cat-food',
    collections: ['campaign', 'recommend'],
    badge: '大促',
    originalPrice: '¥239',
    salePrice: '¥199',
    promo: '组合省 ¥40',
    soldCount: '812',
    paidBuyers: '386',
    image:
      'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?auto=format&fit=crop&w=1000&q=85',
  },
  {
    id: 'cat-litter-combo-recommend',
    title: '多猫家庭猫砂组合',
    category: '猫砂',
    categoryKey: 'cat-litter',
    collections: ['recommend'],
    badge: '店主推荐',
    originalPrice: '¥129',
    salePrice: '¥99',
    promo: '多件更省',
    soldCount: '1,376',
    paidBuyers: '688',
    image:
      'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=1000&q=85',
  },
]

const services = ['满 99 包邮', '48 小时发货', '新客礼'] as const

function getCollectionTitle(activeCollection: CollectionFilter) {
  return navItems.find((item) => item.value === activeCollection)?.label ?? '全部商品'
}

function getCategoryTitle(activeCategory: CategoryFilter) {
  return categories.find((item) => item.value === activeCategory)?.label ?? '全部分类'
}

function matchesCollection(product: Product, activeCollection: CollectionFilter) {
  if (activeCollection === 'all') {
    return true
  }

  return product.collections.includes(activeCollection)
}

function matchesCategory(product: Product, activeCategory: CategoryFilter) {
  if (activeCategory === 'all') {
    return true
  }

  return product.categoryKey === activeCategory
}

export function PetBoutiqueHomePage() {
  const [activeCollection, setActiveCollection] =
    useState<CollectionFilter>('all')
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all')

  const visibleProducts = useMemo(() => {
    return products.filter(
      (product) =>
        matchesCollection(product, activeCollection) &&
        matchesCategory(product, activeCategory),
    )
  }, [activeCategory, activeCollection])

  const collectionTitle = getCollectionTitle(activeCollection)
  const categoryTitle = getCategoryTitle(activeCategory)

  return (
    <main className="mshop">
      <header className="mshop-header">
        <a className="mshop-logo" href="#top">
          Paw Home
        </a>
        <a className="mshop-login-link" href="/template-lab/pc-login-simple">
          登录
        </a>
      </header>

      <nav className="mshop-tabs" aria-label="商品集合导航">
        {navItems.map((item) => (
          <button
            className={activeCollection === item.value ? 'active' : undefined}
            key={item.value}
            onClick={() => setActiveCollection(item.value)}
            type="button"
          >
            {item.label}
          </button>
        ))}
      </nav>

      <section className="mshop-hero" id="top">
        <p>宠物日常刚需</p>
        <h1>猫咪用品，一站补齐。</h1>
      </section>

      <section className="mshop-ad" id="campaign">
        <div>
          <span>大促活动</span>
          <strong>满 99 减 20</strong>
          <p>猫砂猫粮组合优惠</p>
        </div>
        <button
          onClick={() => {
            setActiveCollection('campaign')
            setActiveCategory('all')
          }}
          type="button"
        >
          去选购
        </button>
      </section>

      <div className="mshop-category-bar">
        <section className="mshop-category-row" id="categories" aria-label="商品分类">
        {categories.map((category) => (
          <button
            className={[
              activeCategory === category.value ? 'active' : '',
              category.value === 'all' ? 'primary-category' : '',
            ].filter(Boolean).join(' ') || undefined}
            key={category.value}
            onClick={() => setActiveCategory(category.value)}
            type="button"
          >
            {category.label}
          </button>
        ))}
      </section>
        <a className="mshop-category-cart" href="#cart" aria-label="进入购物车">
          <svg viewBox="0 0 32 32" role="presentation" aria-hidden="true">
            <path
              className="mshop-cart-body"
              d="M6.3 7.4h2.1c.8 0 1.5.6 1.7 1.4l.3 1.3h14.9c.8 0 1.4.8 1.2 1.6l-1.8 7.1c-.3 1.2-1.4 2.1-2.7 2.1H13c-1.3 0-2.4-.9-2.7-2.2L8.7 10.4 8.3 9H6.3c-.5 0-.9-.4-.9-.8s.4-.8.9-.8Z"
            />
            <path
              className="mshop-cart-cut"
              d="M13.2 13.4h9.7l-.9 3.6h-8.1l-.7-3.6Z"
            />
            <circle className="mshop-cart-wheel" cx="14.2" cy="24.3" r="1.8" />
            <circle className="mshop-cart-wheel" cx="22.4" cy="24.3" r="1.8" />
          </svg>
        </a>
      </div>

      <section className="mshop-products" id="products">
          <div className="mshop-section-title">
            <h2>{collectionTitle}</h2>
            <span>
              {categoryTitle} · {visibleProducts.length} 件商品
            </span>
          </div>

        {visibleProducts.length === 0 ? (
          <div className="mshop-empty">当前选择下暂无商品</div>
        ) : (
          <div className="mshop-product-grid">
            {visibleProducts.map((product) => (
              <article className="mshop-product-card" key={product.id}>
                <div className="mshop-product-image">
                  <img alt={product.title} src={product.image} />
                  <span>{product.badge}</span>
                </div>

                <div className="mshop-product-body">
                  <p>{product.category}</p>
                  <h3>{product.title}</h3>

                  <div className="mshop-buy-row">
                    <div className="mshop-price-row">
                      <strong>{product.salePrice}</strong>
                      <span>{product.originalPrice}</span>
                    </div>

                    <label className="mshop-quantity-select">
                      <span>数量</span>
                      <select
                        aria-label={`${product.title} 购买数量`}
                        defaultValue="1"
                      >
                        {[1, 2, 3, 4, 5].map((quantity) => (
                          <option key={quantity} value={quantity}>
                            {quantity}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <div className="mshop-promo">{product.promo}</div>

                  <div className="mshop-product-stats">
                    <span>已售 {product.soldCount}</span>
                    <span>{product.paidBuyers} 人已付款</span>
                  </div>

                  <button type="button">加入购物车</button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="mshop-services">
        {services.map((service) => (
          <span key={service}>{service}</span>
        ))}
      </section>

      <footer className="mshop-footer">Paw Home · 宠物日常用品</footer>
          <TemplateLegalFooter />
</main>
  )
}
