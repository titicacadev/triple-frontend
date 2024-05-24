interface I18nizeHrefArgs {
  lang: string
  path: string
  webUrlBase?: string
  basePath?: string
}

export function i18nizeHref({
  lang,
  path,
  webUrlBase: webUrlBaseArg,
  basePath: basePathArg,
}: I18nizeHrefArgs) {
  const webUrlBase = webUrlBaseArg || process.env.NEXT_PUBLIC_WEB_URL_BASE
  const basePath = basePathArg || process.env.NEXT_PUBLIC_BASE_PATH

  return `${webUrlBase}/${lang}${basePath}${path}`
}
