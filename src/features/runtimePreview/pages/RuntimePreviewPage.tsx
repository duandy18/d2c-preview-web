import { useEffect, useState } from 'react'

import { fetchRuntimePageContract } from '../api/runtimeContractApi'
import type { RuntimePageContract } from '../model/runtimeContractModel'
import { PcWebRuntimeRenderer } from '../renderers/PcWebRuntimeRenderer'

type RuntimePreviewPageProps = {
  readonly searchParams: URLSearchParams
}

type PreviewState =
  | { readonly status: 'loading'; readonly key: string }
  | { readonly status: 'error'; readonly key: string; readonly message: string }
  | {
      readonly status: 'ready'
      readonly key: string
      readonly contract: RuntimePageContract
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
  const previewKey = `${siteCode}:${surfaceCode}:${pageCode}`

  const [state, setState] = useState<PreviewState>(() => ({
    status: 'loading',
    key: previewKey,
  }))

  useEffect(() => {
    const controller = new AbortController()
    const requestKey = previewKey

    fetchRuntimePageContract({
      siteCode,
      surfaceCode,
      pageCode,
      signal: controller.signal,
    })
      .then((contract) => {
        setState({ status: 'ready', key: requestKey, contract })
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) {
          return
        }

        const message =
          error instanceof Error ? error.message : 'Runtime contract 加载失败。'
        setState({ status: 'error', key: requestKey, message })
      })

    return () => {
      controller.abort()
    }
  }, [pageCode, previewKey, siteCode, surfaceCode])

  const isStale = state.key !== previewKey

  if (isStale || state.status === 'loading') {
    return (
      <main className="preview-page">
        <section className="preview-card">
          <p className="eyebrow">D2C Preview Web</p>
          <h1>正在加载预览合同</h1>
          <p className="lead">正在读取 draft-preview Runtime Contract。</p>
        </section>
      </main>
    )
  }

  if (state.status === 'error') {
    return (
      <main className="preview-page">
        <section className="preview-card preview-error">
          <p className="eyebrow">D2C Preview Web</p>
          <h1>预览合同加载失败</h1>
          <p className="lead">{state.message}</p>
          <p className="runtime-debug-line">
            site={siteCode} surface={surfaceCode} page={pageCode}
          </p>
        </section>
      </main>
    )
  }

  return <PcWebRuntimeRenderer contract={state.contract} />
}
