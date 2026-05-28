export type ShopProduct = {
  readonly id: string
  readonly title: string
  readonly category: string
  readonly badge: string
  readonly originalPrice: string
  readonly salePrice: string
  readonly promo: string
  readonly soldCount: string
  readonly paidBuyers: string
  readonly image: string
  readonly gallery: readonly string[]
  readonly description: string
  readonly highlights: readonly string[]
}

export const detailProduct: ShopProduct = {
  id: 'cat-litter-tofu-hot',
  title: '豆腐混合猫砂 6L',
  category: '猫砂',
  badge: '热卖',
  originalPrice: '¥49',
  salePrice: '¥39',
  promo: '满 99 减 20',
  soldCount: '2,314',
  paidBuyers: '1,086',
  image:
    'https://images.unsplash.com/photo-1545249390-6bdfa286032f?auto=format&fit=crop&w=1200&q=85',
  gallery: [
    'https://images.unsplash.com/photo-1545249390-6bdfa286032f?auto=format&fit=crop&w=1400&q=85',
    'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=1400&q=85',
    'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1400&q=85',
    'https://images.unsplash.com/photo-1601758063541-d2f50b4aafb2?auto=format&fit=crop&w=1400&q=85',
    'https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=1400&q=85',
    'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?auto=format&fit=crop&w=1400&q=85',
  ],
  description:
    '低粉尘、高结团、除臭稳定，适合多猫家庭日常囤货。颗粒轻盈不易带出，日常铲屎更省心。',
  highlights: ['低粉尘不呛鼻', '快速结团易铲', '适合多猫家庭', '满减活动中'],
}

export const recommendedProducts: readonly ShopProduct[] = [
  detailProduct,
  {
    id: 'cat-food-adult-recommend',
    title: '全价成猫主粮 2kg',
    category: '猫粮',
    badge: '店主推荐',
    originalPrice: '¥159',
    salePrice: '¥128',
    promo: '第二件 8 折',
    soldCount: '1,728',
    paidBuyers: '932',
    image:
      'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1200&q=85',
    gallery: [],
    description: '日常主粮配方，适合成年猫长期稳定复购。',
    highlights: ['全价配方', '适合长期复购', '第二件更省'],
  },
  {
    id: 'cat-cans-chicken-new',
    title: '鸡肉慕斯罐 12 入',
    category: '猫罐头',
    badge: '新品',
    originalPrice: '¥109',
    salePrice: '¥89',
    promo: '买 2 减 ¥10',
    soldCount: '1,102',
    paidBuyers: '519',
    image:
      'https://images.unsplash.com/photo-1571566882372-1598d88abd90?auto=format&fit=crop&w=1200&q=85',
    gallery: [],
    description: '细腻慕斯质地，适合挑嘴猫补水加餐。',
    highlights: ['慕斯质地', '补水加餐', '买 2 减 ¥10'],
  },
]

export const cartItems: readonly {
  readonly product: ShopProduct
  readonly quantity: number
}[] = [
  { product: detailProduct, quantity: 2 },
  { product: recommendedProducts[1], quantity: 1 },
  { product: recommendedProducts[2], quantity: 1 },
]

export function parsePrice(value: string): number {
  return Number(value.replace(/[¥,]/g, ''))
}

export function formatPrice(value: number): string {
  return `¥${value.toFixed(0)}`
}

export function calcCartSubtotal(): number {
  return cartItems.reduce(
    (sum, item) => sum + parsePrice(item.product.salePrice) * item.quantity,
    0,
  )
}

export function calcCartOriginalTotal(): number {
  return cartItems.reduce(
    (sum, item) => sum + parsePrice(item.product.originalPrice) * item.quantity,
    0,
  )
}
