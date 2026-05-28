import { useState } from 'react'

import type { ShopProduct } from '../model/simpleShopTemplateData'

type ProductDetailGalleryCardProps = {
  readonly product: ShopProduct
}

export function ProductDetailGalleryCard({
  product,
}: ProductDetailGalleryCardProps) {
  const images = product.gallery.length > 0 ? product.gallery : [product.image]
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const activeImage = images[activeImageIndex] ?? product.image

  return (
    <section className="tpl-detail-layout">
      <div className="tpl-gallery">
        <div className="tpl-main-image">
          <img alt={product.title} src={activeImage} />
        </div>

        <div className="tpl-thumb-row">
          {images.map((image, index) => (
            <button
              className={activeImageIndex === index ? 'active' : undefined}
              key={`${image}-${index}`}
              onClick={() => setActiveImageIndex(index)}
              type="button"
            >
              <img alt={`${product.title} 详情图 ${index + 1}`} src={image} />
            </button>
          ))}
        </div>
      </div>

      <aside className="tpl-product-summary">
        <p className="tpl-kicker">{product.category}</p>
        <h1>{product.title}</h1>
        <p className="tpl-description">{product.description}</p>

        <div className="tpl-price-row">
          <strong>{product.salePrice}</strong>
          <span>{product.originalPrice}</span>
        </div>

        <div className="tpl-promo-row">
          <span>{product.badge}</span>
          <strong>{product.promo}</strong>
        </div>

        <div className="tpl-sales-row">
          <span>已售 {product.soldCount}</span>
          <span>{product.paidBuyers} 人已付款</span>
        </div>

        <div className="tpl-highlight-list">
          {product.highlights.map((highlight) => (
            <span key={highlight}>{highlight}</span>
          ))}
        </div>

        <label className="tpl-quantity">
          <span>数量</span>
          <select defaultValue="1">
            {[1, 2, 3, 4, 5].map((quantity) => (
              <option key={quantity} value={quantity}>
                {quantity}
              </option>
            ))}
          </select>
        </label>

        <button className="tpl-primary-action" type="button">
          加入购物车
        </button>
      </aside>
    </section>
  )
}
