export type AppConfig = {
  readonly runtimeApiBaseUrl: string
  readonly appBasePath: string
}

function normalizeBaseUrl(
  value: string | undefined,
  fallback: string,
): string {
  const raw = value?.trim() || fallback
  return raw.endsWith('/') ? raw.slice(0, -1) : raw
}

function normalizeBasePath(value: string | undefined): string {
  const raw = value?.trim() || '/'
  return raw.startsWith('/') ? raw : `/${raw}`
}

export const appConfig: AppConfig = {
  runtimeApiBaseUrl: normalizeBaseUrl(
    import.meta.env.VITE_RUNTIME_API_BASE_URL,
    'http://127.0.0.1:8035',
  ),
  appBasePath: normalizeBasePath(import.meta.env.VITE_APP_BASE_PATH),
}
