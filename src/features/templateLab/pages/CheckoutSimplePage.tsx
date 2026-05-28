import {
  calcCartOriginalTotal,
  calcCartSubtotal,
  cartItems,
  formatPrice,
  parsePrice,
} from '../model/simpleShopTemplateData'
import '../styles/simpleShopTemplatePages.css'

export function CheckoutSimplePage() {
  const subtotal = calcCartSubtotal()
  const originalTotal = calcCartOriginalTotal()
  const discount = originalTotal - subtotal
  const shipping = subtotal >= 99 ? 0 : 12
  const total = subtotal + shipping

  return (
    <main className="tpl-page">
      <header className="tpl-header">
        <a className="tpl-logo" href="/template-lab/pc-checkout-simple">
          Paw Home
        </a>
        <span>结算模板</span>
      </header>

      <section className="tpl-checkout-layout">
        <div className="tpl-checkout-main">
          <div className="tpl-page-title">
            <p className="tpl-kicker">Checkout</p>
            <h1>确认订单</h1>
            <span>结算页用于确认收货、配送、支付和提交订单。</span>
          </div>

          <section className="tpl-form-card">
            <h2>收货信息</h2>
            <div className="tpl-form-grid">
              <label>
                收货人
                <input defaultValue="Andy" />
              </label>
              <label>
                手机号
                <input defaultValue="138****8888" />
              </label>
              <label className="full">
                收货地址
                <input defaultValue="北京市 朝阳区 宠物生活街 88 号" />
              </label>
            </div>
          </section>

          <section className="tpl-form-card">
            <h2>配送与支付</h2>
            <div className="tpl-form-grid">
              <label>
                配送方式
                <select defaultValue="express">
                  <option value="express">普通快递 · 48 小时内发货</option>
                  <option value="same-city">同城配送</option>
                </select>
              </label>
              <label>
                支付方式
                <select defaultValue="online">
                  <option value="online">在线支付</option>
                  <option value="cod">货到付款</option>
                </select>
              </label>
              <label className="full">
                订单备注
                <input placeholder="例如：请放门口，猫砂不要压坏包装" />
              </label>
            </div>
          </section>
        </div>

        <aside className="tpl-checkout-confirm-card">
          <h2>订单确认</h2>

          <div className="tpl-checkout-line-head">
            <span>商品</span>
            <span>数量</span>
            <span>小计</span>
          </div>

          {cartItems.map((item) => {
            const lineTotal = parsePrice(item.product.salePrice) * item.quantity

            return (
              <div className="tpl-checkout-item" key={item.product.id}>
                <img alt={item.product.title} src={item.product.image} />
                <div>
                  <strong>{item.product.title}</strong>
                  <span>{item.product.promo}</span>
                </div>
                <span className="quantity">× {item.quantity}</span>
                <b>{formatPrice(lineTotal)}</b>
              </div>
            )
          })}

          <div className="summary-line">
            <span>商品原价</span>
            <strong>{formatPrice(originalTotal)}</strong>
          </div>
          <div className="summary-line">
            <span>商品优惠</span>
            <strong>-{formatPrice(discount)}</strong>
          </div>
          <div className="summary-line">
            <span>运费</span>
            <strong>{shipping === 0 ? '包邮' : formatPrice(shipping)}</strong>
          </div>
          <div className="summary-line total">
            <span>应付合计</span>
            <strong>{formatPrice(total)}</strong>
          </div>

          <button className="tpl-submit-order-button" type="button">
            提交订单
          </button>
        </aside>
      </section>
    </main>
  )
}
