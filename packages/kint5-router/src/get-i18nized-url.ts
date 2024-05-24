interface GetI18nizedUrlArgs {
  lang: string
  path: string
  baseUrl?: string
  basePath?: string
}

export function getI18nizedUrl({
  lang,
  path,
  baseUrl,
  basePath: basePathArg,
}: GetI18nizedUrlArgs) {
  const webUrlBase = baseUrl || process.env.NEXT_PUBLIC_WEB_URL_BASE
  const basePath = basePathArg || process.env.NEXT_PUBLIC_BASE_PATH

  return `${webUrlBase}/${lang}${basePath}${path}`
}
