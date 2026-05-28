import { RuntimePreviewPage } from '../../features/runtimePreview/pages/RuntimePreviewPage'
import { AppShell } from '../../shared/ui/AppShell'

export function AppRouter() {
  const currentUrl = new URL(window.location.href)

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
        <h1>发布前真实预览前端</h1>
        <p className="lead">
          只读取 d2c-site-builder-api 的 draft-preview Runtime Contract。
          不配置数据库，不服务真实顾客，不替代 d2c-web。
        </p>
        <a
          className="primary-link"
          href="/preview?site=default&surface=pc-web&page=home"
        >
          打开默认首页预览
        </a>
      </main>
    </AppShell>
  )
}
