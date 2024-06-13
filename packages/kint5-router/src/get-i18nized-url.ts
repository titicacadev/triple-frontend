interface GetI18nizedUrlParams {
  lang: string
  path: string
  baseUrl?: string
  basePath?: boolean
}

export function getI18nizedUrl({
  lang,
  path,
  baseUrl,
  basePath,
}: GetI18nizedUrlParams) {
  const webUrlBase = baseUrl || process.env.NEXT_PUBLIC_WEB_URL_BASE

  if (basePath) {
    return `${webUrlBase}/${lang}${process.env.NEXT_PUBLIC_BASE_PATH}${path}`
  }

  return `${webUrlBase}/${lang}${path}`
}
