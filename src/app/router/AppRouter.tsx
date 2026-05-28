import { RuntimePreviewPage } from '../../features/runtimePreview/pages/RuntimePreviewPage'
import { CartSimplePage } from '../../features/templateLab/pages/CartSimplePage'
import { CheckoutSimplePage } from '../../features/templateLab/pages/CheckoutSimplePage'
import { LoginSimplePage } from '../../features/templateLab/pages/LoginSimplePage'
import { PetBoutiqueHomePage } from '../../features/templateLab/pages/PetBoutiqueHomePage'
import { ProductDetailImageMatrixPage } from '../../features/templateLab/pages/ProductDetailImageMatrixPage'
import { ProductDetailSimplePage } from '../../features/templateLab/pages/ProductDetailSimplePage'
import { RegisterSimplePage } from '../../features/templateLab/pages/RegisterSimplePage'
import { AppShell } from '../../shared/ui/AppShell'

export function AppRouter() {
  const currentUrl = new URL(window.location.href)

  const isHomeLabPath =
    currentUrl.pathname === '/template-lab/pc-home-pet-boutique' ||
    currentUrl.pathname.endsWith('/template-lab/pc-home-pet-boutique')

  if (isHomeLabPath) {
    return (
      <AppShell>
        <PetBoutiqueHomePage />
      </AppShell>
    )
  }

  const isProductDetailLabPath =
    currentUrl.pathname === '/template-lab/pc-product-detail-simple' ||
    currentUrl.pathname.endsWith('/template-lab/pc-product-detail-simple')

  if (isProductDetailLabPath) {
    return (
      <AppShell>
        <ProductDetailSimplePage />
      </AppShell>
    )
  }

  const isProductDetailImageMatrixLabPath =
    currentUrl.pathname === '/template-lab/pc-product-detail-image-matrix' ||
    currentUrl.pathname.endsWith('/template-lab/pc-product-detail-image-matrix')

  if (isProductDetailImageMatrixLabPath) {
    return (
      <AppShell>
        <ProductDetailImageMatrixPage />
      </AppShell>
    )
  }

  const isCartLabPath =
    currentUrl.pathname === '/template-lab/pc-cart-simple' ||
    currentUrl.pathname.endsWith('/template-lab/pc-cart-simple')

  if (isCartLabPath) {
    return (
      <AppShell>
        <CartSimplePage />
      </AppShell>
    )
  }

  const isCheckoutLabPath =
    currentUrl.pathname === '/template-lab/pc-checkout-simple' ||
    currentUrl.pathname.endsWith('/template-lab/pc-checkout-simple')

  if (isCheckoutLabPath) {
    return (
      <AppShell>
        <CheckoutSimplePage />
      </AppShell>
    )
  }

  const isRegisterLabPath =
    currentUrl.pathname === '/template-lab/pc-register-simple' ||
    currentUrl.pathname.endsWith('/template-lab/pc-register-simple')

  if (isRegisterLabPath) {
    return (
      <AppShell>
        <RegisterSimplePage />
      </AppShell>
    )
  }

  const isLoginLabPath =
    currentUrl.pathname === '/template-lab/pc-login-simple' ||
    currentUrl.pathname.endsWith('/template-lab/pc-login-simple')

  if (isLoginLabPath) {
    return (
      <AppShell>
        <LoginSimplePage />
      </AppShell>
    )
  }

  const isPreviewPath =
    currentUrl.pathname === '/preview' ||
    currentUrl.pathname.endsWith('/preview')

  if (isPreviewPath) {
    return (
      <AppShell>
        <RuntimePreviewPage searchParams={currentUrl.searchParams} />
      </AppShell>
    )
  }

  return (
    <AppShell>
      <main className="landing-page">
        <p className="eyebrow">D2C Preview Web</p>
        <h1>Template Lab</h1>
        <p className="lead">
          静态模板样张用于先看表现，认可后再反向工程提取 Slot。
        </p>
        <a className="primary-link" href="/template-lab/pc-home-pet-boutique">
          首页商品列表模板
        </a>
        <a className="primary-link" href="/template-lab/pc-product-detail-simple">
          商品详情模板 A：标准图册
        </a>
        <a
          className="primary-link"
          href="/template-lab/pc-product-detail-image-matrix"
        >
          商品详情模板 B：多图展示
        </a>
        <a className="primary-link" href="/template-lab/pc-cart-simple">
          购物车模板
        </a>
        <a className="primary-link" href="/template-lab/pc-checkout-simple">
          结算模板
        </a>
        <a className="primary-link" href="/template-lab/pc-register-simple">
          注册页模板
        </a>
        <a className="primary-link" href="/template-lab/pc-login-simple">
          登录页模板
        </a>
      </main>
    </AppShell>
  )
}
