export type RuntimeJsonObject = Record<string, unknown>

export type RuntimePageContract = {
  readonly contract_type: string
  readonly contract_version: string
  readonly site_code: string
  readonly surface_code: string
  readonly page_code: string
  readonly page_title: string
  readonly template_key: string
  readonly template_name: string
  readonly status: string
  readonly regions: readonly RuntimeRegion[]
}

export type RuntimeRegion = {
  readonly template_region_code: string
  readonly region_code: string
  readonly region_name: string
  readonly required: boolean
  readonly sort_order: number
  readonly status: string
  readonly blocks: readonly RuntimeBlock[]
}

export type RuntimeBlock = {
  readonly slot_code: string
  readonly block_code: string
  readonly block_type: string
  readonly renderer_key: RuntimeRendererKey | string
  readonly required: boolean
  readonly sort_order: number
  readonly status: string
  readonly is_filled: boolean
  readonly content: RuntimeJsonObject
  readonly layout: RuntimeJsonObject
}

export type RuntimeRendererKey =
  | 'pc_web.title'
  | 'pc_web.hero_banner'
  | 'pc_web.promotion_strip'
  | 'pc_web.entry_grid'
  | 'pc_web.offer_shelf_grid'
  | 'pc_web.rich_text'

export function isRuntimePageContract(value: unknown): value is RuntimePageContract {
  if (!isRecord(value)) {
    return false
  }

  return (
    typeof value.contract_type === 'string' &&
    typeof value.contract_version === 'string' &&
    typeof value.site_code === 'string' &&
    typeof value.surface_code === 'string' &&
    typeof value.page_code === 'string' &&
    typeof value.template_key === 'string' &&
    Array.isArray(value.regions)
  )
}

export function isRecord(value: unknown): value is RuntimeJsonObject {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

export function getString(
  source: RuntimeJsonObject | undefined,
  key: string,
): string | undefined {
  const value = source?.[key]
  return typeof value === 'string' ? value : undefined
}

export function getRecord(
  source: RuntimeJsonObject | undefined,
  key: string,
): RuntimeJsonObject | undefined {
  const value = source?.[key]
  return isRecord(value) ? value : undefined
}

export function getArray(
  source: RuntimeJsonObject | undefined,
  key: string,
): readonly unknown[] {
  const value = source?.[key]
  return Array.isArray(value) ? value : []
}
