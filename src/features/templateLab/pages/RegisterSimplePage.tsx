import '../styles/simpleShopTemplatePages.css'

export function RegisterSimplePage() {
  return (
    <main className="tpl-page">
      <header className="tpl-header">
        <a className="tpl-logo" href="/template-lab/pc-register-simple">
          Paw Home
        </a>
        <span>注册页模板</span>
      </header>

      <section className="tpl-register-layout">
        <div className="tpl-register-main">
          <div className="tpl-page-title">
            <p className="tpl-kicker">Create account</p>
            <h1>注册账号并保存收货地址</h1>
            <span>
              任何人都可以浏览商品和加入购物车；进入结算时需要联系方式和收货地址。
            </span>
          </div>

          <section className="tpl-register-card">
            <h2>账号信息</h2>

            <div className="tpl-register-form-grid">
              <label>
                手机号
                <input defaultValue="138****8888" inputMode="tel" />
              </label>

              <label className="tpl-code-field">
                短信验证码
                <span>
                  <input defaultValue="123456" inputMode="numeric" />
                  <button type="button">获取验证码</button>
                </span>
              </label>

              <label>
                设置密码
                <input defaultValue="password123" type="password" />
              </label>

              <label>
                确认密码
                <input defaultValue="password123" type="password" />
              </label>
            </div>
          </section>

          <section className="tpl-register-card">
            <h2>默认收货地址</h2>

            <div className="tpl-register-form-grid">
              <label>
                收货人
                <input defaultValue="Andy" />
              </label>

              <label>
                联系电话
                <input defaultValue="138****8888" inputMode="tel" />
              </label>

              <label>
                所在地区
                <select defaultValue="beijing-chaoyang">
                  <option value="beijing-chaoyang">北京市 / 朝阳区</option>
                  <option value="beijing-haidian">北京市 / 海淀区</option>
                  <option value="shanghai-pudong">上海市 / 浦东新区</option>
                </select>
              </label>

              <label>
                地址标签
                <select defaultValue="home">
                  <option value="home">家</option>
                  <option value="office">公司</option>
                  <option value="other">其他</option>
                </select>
              </label>

              <label className="full">
                详细地址
                <input defaultValue="宠物生活街 88 号 2 单元 1201" />
              </label>
            </div>

            <label className="tpl-default-address">
              <input defaultChecked type="checkbox" />
              <span>设为默认收货地址，结算时自动使用</span>
            </label>
          </section>

          <button className="tpl-register-submit" type="button">
            创建账号并继续结算
          </button>
        </div>
      </section>
    </main>
  )
}
