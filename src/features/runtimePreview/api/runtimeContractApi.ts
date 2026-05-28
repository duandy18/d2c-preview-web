import { appConfig } from '../../../app/config/appConfig'
import {
  type RuntimePageContract,
  isRuntimePageContract,
} from '../model/runtimeContractModel'

export type FetchRuntimePageContractParams = {
  readonly siteCode: string
  readonly surfaceCode: string
  readonly pageCode: string
  readonly signal?: AbortSignal
}

export async function fetchRuntimePageContract({
  siteCode,
  surfaceCode,
  pageCode,
  signal,
}: FetchRuntimePageContractParams): Promise<RuntimePageContract> {
  const path =
    `/runtime/site-builder/sites/${encodeURIComponent(siteCode)}` +
    `/surfaces/${encodeURIComponent(surfaceCode)}` +
    `/pages/${encodeURIComponent(pageCode)}`

  const response = await fetch(`${appConfig.runtimeApiBaseUrl}${path}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
    signal,
  })

  if (!response.ok) {
    throw new Error(`Runtime contract request failed: ${response.status}`)
  }

  const data: unknown = await response.json()

  if (!isRuntimePageContract(data)) {
    throw new Error('Runtime contract response shape is invalid.')
  }

  return data
}
