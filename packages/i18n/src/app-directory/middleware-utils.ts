import type { NextRequest } from 'next/server'

import {
  CUSTOM_LANG_HEADER,
  FALLBACK_LANGUAGE,
  LANGUAGES,
  LANGUAGE_COOKIE_NAME,
  LANG_QUERY_STRING_NAME,
} from './constants'

const ONE_YEAR_SEC = 31_536_000

export function getCustomLangHeader(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const lang = searchParams.get(LANG_QUERY_STRING_NAME) ?? FALLBACK_LANGUAGE

  return {
    [CUSTOM_LANG_HEADER]: lang,
  }
}

export function setLanguageCookie(req: NextRequest) {
  const langCookie = req.cookies.get(LANGUAGE_COOKIE_NAME)
  const langQuery =
    req.nextUrl.searchParams.get(LANG_QUERY_STRING_NAME) ?? FALLBACK_LANGUAGE

  if (langCookie?.value === langQuery) {
    return null
  }

  return {
    'Set-Cookie': `${LANGUAGE_COOKIE_NAME}=${langQuery}; Path=/; Max-Age=${ONE_YEAR_SEC}`,
  }
}

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
