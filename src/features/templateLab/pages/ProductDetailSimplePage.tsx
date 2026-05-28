import { detailProduct, recommendedProducts } from '../model/simpleShopTemplateData'
import { ProductDetailGalleryCard } from '../productDetailCards/ProductDetailGalleryCard'
import '../styles/simpleShopTemplatePages.css'

export function ProductDetailSimplePage() {
  return (
    <main className="tpl-page">
      <header className="tpl-header">
        <a className="tpl-logo" href="/template-lab/pc-product-detail-simple">
          Paw Home
        </a>
        <span>商品详情模板 A · 标准图册</span>
      </header>

      <ProductDetailGalleryCard product={detailProduct} />

      <section className="tpl-detail-content">
        <h2>商品详情</h2>
        <div className="tpl-detail-cards">
          <article>
            <strong>适合家庭</strong>
            <p>适合一只或多只猫咪家庭日常使用，除臭稳定，补货频率清晰。</p>
          </article>
          <article>
            <strong>使用建议</strong>
            <p>建议保持 5 至 7 厘米猫砂厚度，每日清理结团，每周按需补砂。</p>
          </article>
          <article>
            <strong>优惠说明</strong>
            <p>当前参与满 99 减 20 活动，可与部分组合商品一起购买。</p>
          </article>
        </div>
      </section>

      <section className="tpl-recommend">
        <div className="tpl-section-title">
          <h2>相关推荐</h2>
          <span>适合一起购买</span>
        </div>

        <div className="tpl-recommend-grid">
          {recommendedProducts.map((product) => (
            <article key={product.id}>
              <img alt={product.title} src={product.image} />
              <strong>{product.title}</strong>
              <div>
                <span>{product.salePrice}</span>
                <del>{product.originalPrice}</del>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
