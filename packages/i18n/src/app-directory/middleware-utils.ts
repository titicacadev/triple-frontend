import type { NextRequest } from 'next/server'

import {
  FALLBACK_LANGUAGE,
  LANGUAGES,
  LANGUAGE_COOKIE_NAME,
  LANG_QUERY_STRING_NAME,
} from './constants'

export function getValidLangUrlWithCookie(req: NextRequest) {
  const { cookies, url: currentUrl } = req

  const cookieLang = getLanguageFromCookie(
    cookies.get(LANGUAGE_COOKIE_NAME)?.value,
  )

  const newUrl = new URL(currentUrl)
  newUrl.searchParams.set(LANG_QUERY_STRING_NAME, cookieLang)
  return newUrl
}

export function isInvalidLangQuery({
  req,
  healthCheckPath,
}: {
  req: NextRequest
  healthCheckPath: string
}) {
  const {
    nextUrl: { pathname, searchParams },
  } = req

  if (pathname.includes(healthCheckPath)) {
    return
  }

  const langQuery = searchParams.get(LANG_QUERY_STRING_NAME)

  return (
    (langQuery === null || !LANGUAGES.includes(langQuery)) &&
    !pathname.startsWith('/_next')
  )
}

function getLanguageFromCookie(value: string | undefined) {
  return value !== undefined && LANGUAGES.includes(value)
    ? value
    : FALLBACK_LANGUAGE
}
