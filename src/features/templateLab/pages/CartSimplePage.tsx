import { useMemo, useState } from 'react'

import {
  cartItems,
  formatPrice,
  parsePrice,
} from '../model/simpleShopTemplateData'
import '../styles/simpleShopTemplatePages.css'

type CartQuantityMap = Record<string, number>

function createInitialQuantities(): CartQuantityMap {
  return Object.fromEntries(
    cartItems.map((item) => [item.product.id, item.quantity]),
  )
}

export function CartSimplePage() {
  const [quantities, setQuantities] = useState<CartQuantityMap>(
    createInitialQuantities,
  )

  const cartLines = useMemo(() => {
    return cartItems.map((item) => {
      const quantity = quantities[item.product.id] ?? item.quantity
      const saleUnitPrice = parsePrice(item.product.salePrice)
      const originalUnitPrice = parsePrice(item.product.originalPrice)
      const lineSaleTotal = saleUnitPrice * quantity
      const lineOriginalTotal = originalUnitPrice * quantity
      const lineDiscount = Math.max(lineOriginalTotal - lineSaleTotal, 0)

      return {
        product: item.product,
        quantity,
        saleUnitPrice,
        originalUnitPrice,
        lineSaleTotal,
        lineOriginalTotal,
        lineDiscount,
      }
    })
  }, [quantities])

  const totalQuantity = cartLines.reduce((sum, line) => sum + line.quantity, 0)
  const originalTotal = cartLines.reduce(
    (sum, line) => sum + line.lineOriginalTotal,
    0,
  )
  const subtotal = cartLines.reduce((sum, line) => sum + line.lineSaleTotal, 0)
  const discount = Math.max(originalTotal - subtotal, 0)
  const shipping = subtotal >= 99 ? 0 : 12
  const total = subtotal + shipping

  function updateQuantity(productId: string, nextQuantity: number) {
    const normalizedQuantity = Math.max(1, Math.min(nextQuantity, 99))

    setQuantities((current) => ({
      ...current,
      [productId]: normalizedQuantity,
    }))
  }

  return (
    <main className="tpl-page">
      <header className="tpl-header">
        <a className="tpl-logo" href="/template-lab/pc-cart-simple">
          Paw Home
        </a>
        <span>购物车模板</span>
      </header>

      <section className="tpl-cart-page">
        <div className="tpl-cart-topbar">
          <div className="tpl-page-title">
            <p className="tpl-kicker">Shopping cart</p>
            <h1>购物车</h1>
            <span>
              共 {cartLines.length} 种商品，{totalQuantity} 件
            </span>
          </div>

          <a className="tpl-checkout-top-button" href="/template-lab/pc-checkout-simple">
            去结算
          </a>
        </div>

        <div className="tpl-cart-layout">
          <section className="tpl-cart-table-card">
            <div className="tpl-cart-table-head">
              <span>商品</span>
              <span>单价</span>
              <span>数量</span>
              <span>优惠</span>
              <span>小计</span>
            </div>

            {cartLines.map((line) => (
              <article className="tpl-cart-line" key={line.product.id}>
                <div className="tpl-cart-product-cell">
                  <img alt={line.product.title} src={line.product.image} />
                  <div>
                    <p>{line.product.category}</p>
                    <h2>{line.product.title}</h2>
                    <span>{line.product.promo}</span>
                  </div>
                </div>

                <div className="tpl-cart-unit-price">
                  <strong>{formatPrice(line.saleUnitPrice)}</strong>
                  <del>{formatPrice(line.originalUnitPrice)}</del>
                </div>

                <div className="tpl-cart-quantity-control">
                  <button
                    aria-label={`${line.product.title} 减少数量`}
                    onClick={() =>
                      updateQuantity(line.product.id, line.quantity - 1)
                    }
                    type="button"
                  >
                    -
                  </button>
                  <input
                    aria-label={`${line.product.title} 数量`}
                    inputMode="numeric"
                    min={1}
                    max={99}
                    type="number"
                    value={line.quantity}
                    onChange={(event) =>
                      updateQuantity(
                        line.product.id,
                        Number(event.target.value || 1),
                      )
                    }
                  />
                  <button
                    aria-label={`${line.product.title} 增加数量`}
                    onClick={() =>
                      updateQuantity(line.product.id, line.quantity + 1)
                    }
                    type="button"
                  >
                    +
                  </button>
                </div>

                <div className="tpl-cart-line-discount">
                  <strong>-{formatPrice(line.lineDiscount)}</strong>
                  <span>{line.product.promo}</span>
                </div>

                <div className="tpl-cart-line-total">
                  <strong>{formatPrice(line.lineSaleTotal)}</strong>
                  <del>{formatPrice(line.lineOriginalTotal)}</del>
                </div>
              </article>
            ))}
          </section>

          <aside className="tpl-cart-summary">
            <h2>购物车汇总</h2>

            <div>
              <span>商品件数</span>
              <strong>{totalQuantity} 件</strong>
            </div>
            <div>
              <span>商品原价</span>
              <strong>{formatPrice(originalTotal)}</strong>
            </div>
            <div>
              <span>商品优惠</span>
              <strong>-{formatPrice(discount)}</strong>
            </div>
            <div>
              <span>运费</span>
              <strong>{shipping === 0 ? '包邮' : formatPrice(shipping)}</strong>
            </div>
            <div className="total">
              <span>应付合计</span>
              <strong>{formatPrice(total)}</strong>
            </div>

            <a className="tpl-checkout-button" href="/template-lab/pc-checkout-simple">
              去结算
            </a>
          </aside>
        </div>
      </section>
    </main>
  )
}
