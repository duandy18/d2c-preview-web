import { appConfig } from '../../../app/config/appConfig'

type RuntimePreviewPageProps = {
  readonly searchParams: URLSearchParams
}

function getParam(
  searchParams: URLSearchParams,
  key: string,
  fallback: string,
): string {
  return searchParams.get(key)?.trim() || fallback
}

export function RuntimePreviewPage({
  searchParams,
}: RuntimePreviewPageProps) {
  const siteCode = getParam(searchParams, 'site', 'default')
  const surfaceCode = getParam(searchParams, 'surface', 'pc-web')
  const pageCode = getParam(searchParams, 'page', 'home')

  const runtimePath =
    `/runtime/site-builder/sites/${encodeURIComponent(siteCode)}` +
    `/surfaces/${encodeURIComponent(surfaceCode)}` +
    `/pages/${encodeURIComponent(pageCode)}`

  return (
    <main className="preview-page">
      <section className="preview-card">
        <p className="eyebrow">D2C Preview Web</p>
        <h1>Runtime Contract 发布前预览</h1>
        <p className="lead">
          当前先完成预览前端基础入口。下一刀接入 draft-preview
          Runtime Contract，并实现 PC Web renderer。
        </p>

        <div className="info-grid">
          <InfoCard label="site" value={siteCode} />
          <InfoCard label="surface" value={surfaceCode} />
          <InfoCard label="page" value={pageCode} />
        </div>

        <div className="api-box">
          <p>Runtime API</p>
          <code>
            {appConfig.runtimeApiBaseUrl}
            {runtimePath}
          </code>
        </div>
      </section>
    </main>
  )
}

type InfoCardProps = {
  readonly label: string
  readonly value: string
}

function InfoCard({ label, value }: InfoCardProps) {
  return (
    <div className="info-card">
      <p>{label}</p>
      <strong>{value}</strong>
    </div>
  )
}
