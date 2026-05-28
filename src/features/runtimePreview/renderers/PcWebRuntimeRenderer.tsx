import {
  getArray,
  getRecord,
  getString,
  isRecord,
  type RuntimeBlock,
  type RuntimeJsonObject,
  type RuntimePageContract,
  type RuntimeRegion,
} from '../model/runtimeContractModel'

type PcWebRuntimeRendererProps = {
  readonly contract: RuntimePageContract
}

export function PcWebRuntimeRenderer({ contract }: PcWebRuntimeRendererProps) {
  const regions = [...contract.regions].sort(bySortOrder)

  return (
    <main className="pc-web-preview">
      <header className="pc-web-preview-header">
        <p className="preview-label">Draft Preview</p>
        <h1>{contract.page_title || contract.template_name}</h1>
        <p>
          {contract.template_name} · {contract.contract_version}
        </p>
      </header>

      {regions.map((region) => (
        <RegionRenderer key={region.region_code} region={region} />
      ))}
    </main>
  )
}

function RegionRenderer({ region }: { readonly region: RuntimeRegion }) {
  const blocks = [...region.blocks].sort(bySortOrder)

  return (
    <section className="runtime-region" data-region-code={region.region_code}>
      <div className="runtime-region-heading">
        <span>{region.region_name}</span>
        <code>{region.region_code}</code>
      </div>

      <div className="runtime-block-stack">
        {blocks.length === 0 ? (
          <div className="runtime-empty-block">这个区域还没有可渲染内容。</div>
        ) : (
          blocks.map((block) => (
            <BlockRenderer key={block.block_code} block={block} />
          ))
        )}
      </div>
    </section>
  )
}

function BlockRenderer({ block }: { readonly block: RuntimeBlock }) {
  switch (block.renderer_key) {
    case 'pc_web.title':
      return <TitleBlock block={block} />
    case 'pc_web.hero_banner':
      return <HeroBannerBlock block={block} />
    case 'pc_web.promotion_strip':
      return <PromotionStripBlock block={block} />
    case 'pc_web.entry_grid':
      return <EntryGridBlock block={block} />
    case 'pc_web.offer_shelf_grid':
      return <OfferShelfGridBlock block={block} />
    case 'pc_web.rich_text':
      return <RichTextBlock block={block} />
    default:
      return <UnsupportedBlock block={block} />
  }
}

function TitleBlock({ block }: { readonly block: RuntimeBlock }) {
  const title = getString(block.content, 'title')
  const subtitle = getString(block.content, 'subtitle')

  return (
    <article className="runtime-title-block">
      <p className="runtime-block-code">{block.slot_code}</p>
      <h2>{title || '未填写标题'}</h2>
      {subtitle ? <p>{subtitle}</p> : null}
    </article>
  )
}

function HeroBannerBlock({ block }: { readonly block: RuntimeBlock }) {
  const image = getRecord(block.content, 'image')
  const imageUrl = getString(image, 'url')
  const imageAlt = getString(image, 'alt') || ''
  const title = getString(block.content, 'title')
  const href = resolveLinkTarget(getRecord(block.content, 'link_target'))

  return (
    <article className="runtime-hero-block">
      {imageUrl ? <img src={imageUrl} alt={imageAlt} /> : null}
      <div className="runtime-hero-overlay">
        <p className="runtime-block-code">{block.slot_code}</p>
        <h2>{title || '未填写首屏标题'}</h2>
        {href ? <a href={href}>查看详情</a> : null}
      </div>
    </article>
  )
}

function PromotionStripBlock({ block }: { readonly block: RuntimeBlock }) {
  const text = getString(block.content, 'text') || '未填写促销文案'
  const href = resolveLinkTarget(getRecord(block.content, 'link_target'))

  return (
    <article className="runtime-promotion-strip">
      <span>{text}</span>
      {href ? <a href={href}>立即查看</a> : null}
    </article>
  )
}

function EntryGridBlock({ block }: { readonly block: RuntimeBlock }) {
  const entries = getArray(block.content, 'entries').filter(isRecord)

  return (
    <article className="runtime-entry-grid">
      {entries.length === 0 ? (
        <div className="runtime-empty-block">快捷入口还没有内容。</div>
      ) : (
        entries.map((entry, index) => {
          const image = getRecord(entry, 'image')
          const href = resolveLinkTarget(getRecord(entry, 'link_target'))
          const title = getString(entry, 'title') || `入口 ${index + 1}`
          const subtitle = getString(entry, 'subtitle')
          const imageUrl = getString(image, 'url')
          const imageAlt = getString(image, 'alt') || title

          return (
            <a
              className="runtime-entry-card"
              href={href || '#'}
              key={`${title}-${index}`}
            >
              {imageUrl ? <img src={imageUrl} alt={imageAlt} /> : null}
              <strong>{title}</strong>
              {subtitle ? <span>{subtitle}</span> : null}
            </a>
          )
        })
      )}
    </article>
  )
}

function OfferShelfGridBlock({ block }: { readonly block: RuntimeBlock }) {
  const title = getString(block.content, 'title') || '商品货架'
  const source = getRecord(block.content, 'source')
  const sourceType = getString(source, 'type') || 'unknown'
  const sourceRef = getString(source, 'ref') || '未配置'

  return (
    <article className="runtime-offer-shelf">
      <div className="runtime-shelf-heading">
        <div>
          <p className="runtime-block-code">{block.slot_code}</p>
          <h2>{title}</h2>
        </div>
        <code>
          {sourceType}:{sourceRef}
        </code>
      </div>

      <div className="runtime-offer-placeholder-grid">
        {[1, 2, 3, 4].map((item) => (
          <div className="runtime-offer-placeholder-card" key={item}>
            <div />
            <strong>商品占位 {item}</strong>
            <span>等待正式商品系统接入</span>
          </div>
        ))}
      </div>
    </article>
  )
}

function RichTextBlock({ block }: { readonly block: RuntimeBlock }) {
  const title = getString(block.content, 'title')
  const body = getString(block.content, 'body') || ''

  return (
    <article className="runtime-rich-text">
      {title ? <h2>{title}</h2> : null}
      {body.split('\n').map((paragraph, index) =>
        paragraph.trim() ? <p key={index}>{paragraph}</p> : null,
      )}
    </article>
  )
}

function UnsupportedBlock({ block }: { readonly block: RuntimeBlock }) {
  return (
    <article className="runtime-unsupported-block">
      <p>暂不支持的 renderer</p>
      <code>{block.renderer_key}</code>
      <pre>{JSON.stringify(block.content, null, 2)}</pre>
    </article>
  )
}

function bySortOrder(
  left: Pick<RuntimeRegion | RuntimeBlock, 'sort_order'>,
  right: Pick<RuntimeRegion | RuntimeBlock, 'sort_order'>,
) {
  return left.sort_order - right.sort_order
}

function resolveLinkTarget(linkTarget: RuntimeJsonObject | undefined): string | undefined {
  if (!linkTarget) {
    return undefined
  }

  const type = getString(linkTarget, 'type')

  if (type === 'custom_path') {
    return getString(linkTarget, 'path')
  }

  if (type === 'category') {
    const ref = getString(linkTarget, 'ref')
    return ref ? `/pc-web/category/${encodeURIComponent(ref)}` : undefined
  }

  return undefined
}
