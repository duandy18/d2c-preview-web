import { detailProduct } from '../model/simpleShopTemplateData'
import { ProductDetailImageMatrixCard } from '../productDetailCards/ProductDetailImageMatrixCard'
import '../styles/simpleShopTemplatePages.css'

export function ProductDetailImageMatrixPage() {
  return (
    <main className="tpl-page">
      <header className="tpl-header">
        <a className="tpl-logo" href="/template-lab/pc-product-detail-image-matrix">
          Paw Home
        </a>
        <span>商品详情模板 B · 多图展示</span>
      </header>

      <ProductDetailImageMatrixCard product={detailProduct} />

      <section className="tpl-detail-content">
        <h2>图文说明</h2>
        <div className="tpl-detail-cards">
          <article>
            <strong>多角度展示</strong>
            <p>主图展示核心视觉，周围图片用于展示场景、细节、包装和搭配。</p>
          </article>
          <article>
            <strong>适合图片强商品</strong>
            <p>适合需要通过多张图片解释质感、场景、尺寸、包装的商品。</p>
          </article>
          <article>
            <strong>购买决策集中</strong>
            <p>价格、优惠、销量、数量和加入购物车集中在右侧，减少跳转。</p>
          </article>
        </div>
      </section>
    </main>
  )
}
