import { useMemo, useState } from 'react'

import type { ShopProduct } from '../model/simpleShopTemplateData'

type ProductDetailImageMatrixCardProps = {
  readonly product: ShopProduct
}

const fallbackGallery = [
  'https://images.unsplash.com/photo-1545249390-6bdfa286032f?auto=format&fit=crop&w=1400&q=85',
  'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=1400&q=85',
  'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1400&q=85',
  'https://images.unsplash.com/photo-1601758063541-d2f50b4aafb2?auto=format&fit=crop&w=1400&q=85',
  'https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=1400&q=85',
  'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?auto=format&fit=crop&w=1400&q=85',
] as const

export function ProductDetailImageMatrixCard({
  product,
}: ProductDetailImageMatrixCardProps) {
  const images = useMemo(() => {
    return Array.from(
      new Set([product.image, ...product.gallery, ...fallbackGallery]),
    ).slice(0, 6)
  }, [product.gallery, product.image])

  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const activeImage = images[activeImageIndex] ?? product.image

  return (
    <section className="tpl-image-matrix-section">
      <div className="tpl-section-title">
        <h2>多图商品详情模板</h2>
        <span>点击周围图片切换主图</span>
      </div>

      <article className="tpl-image-matrix-card">
        <div className="tpl-image-matrix-viewer">
          <figure className="tpl-image-matrix-main">
            <img alt={`${product.title} 主图`} src={activeImage} />
            <figcaption>{getImageCaption(activeImageIndex)}</figcaption>
          </figure>

          <div className="tpl-image-matrix-thumbs" aria-label="商品多角度图片">
            {images.map((image, index) => (
              <button
                className={activeImageIndex === index ? 'active' : undefined}
                key={`${image}-${index}`}
                onClick={() => setActiveImageIndex(index)}
                type="button"
              >
                <img alt={`${product.title} 多角度图 ${index + 1}`} src={image} />
                <span>{getImageCaption(index)}</span>
              </button>
            ))}
          </div>
        </div>

        <aside className="tpl-image-matrix-info">
          <p className="tpl-kicker">{product.category}</p>
          <h3>{product.title}</h3>

          <div className="tpl-compact-price-row">
            <strong>{product.salePrice}</strong>
            <del>{product.originalPrice}</del>
          </div>

          <div className="tpl-compact-promo-row">
            <span>{product.promo}</span>
            <span>已售 {product.soldCount}</span>
            <span>{product.paidBuyers} 人已付款</span>
          </div>

          <p>{product.description}</p>

          <div className="tpl-compact-highlight-row">
            {product.highlights.map((highlight) => (
              <em key={highlight}>{highlight}</em>
            ))}
          </div>

          <div className="tpl-compact-action-row">
            <label>
              数量
              <select defaultValue="1">
                {[1, 2, 3, 4, 5].map((quantity) => (
                  <option key={quantity} value={quantity}>
                    {quantity}
                  </option>
                ))}
              </select>
            </label>

            <button type="button">加入购物车</button>
          </div>
        </aside>
      </article>
    </section>
  )
}

function getImageCaption(index: number): string {
  const captions = [
    '主图',
    '场景',
    '细节',
    '包装',
    '搭配',
    '参考',
  ]

  return captions[index] ?? `图片 ${index + 1}`
}
