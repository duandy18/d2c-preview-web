import '../styles/simpleShopTemplatePages.css'

export function LoginSimplePage() {
  return (
    <main className="tpl-page">
      <header className="tpl-header">
        <a className="tpl-logo" href="/template-lab/pc-login-simple">
          Paw Home
        </a>
        <span>登录页模板</span>
      </header>

      <section className="tpl-login-layout">
        <div className="tpl-page-title tpl-login-title">
          <p className="tpl-kicker">Sign in</p>
          <h1>登录账号</h1>
          <span>继续结算、查看订单、复用默认收货地址。</span>
        </div>

        <section className="tpl-login-card">
          <div className="tpl-login-tabs" aria-label="登录方式">
            <button className="active" type="button">
              密码登录
            </button>
            <button type="button">验证码登录</button>
          </div>

          <div className="tpl-login-form">
            <label>
              手机号
              <input defaultValue="138****8888" inputMode="tel" />
            </label>

            <label>
              密码
              <input defaultValue="password123" type="password" />
            </label>

            <div className="tpl-login-options">
              <label>
                <input defaultChecked type="checkbox" />
                <span>记住我</span>
              </label>
              <button type="button">忘记密码？</button>
            </div>

            <button className="tpl-login-submit" type="button">
              登录
            </button>
          </div>

          <div className="tpl-login-register">
            <span>还没有账号？</span>
            <a href="/template-lab/pc-register-simple">立即注册并填写收货地址</a>
          </div>
        </section>
      </section>
    </main>
  )
}
