import type { NextRequest } from 'next/server'

import { FALLBACK_LANGUAGE, LANGUAGES, LANGUAGE_COOKIE_NAME } from './constants'

export function getValidLangUrlWithCookie(req: NextRequest) {
  const {
    cookies,
    url,
    nextUrl: { pathname, search },
  } = req

  const cookieLang = getLanguageFromCookie(
    cookies.get(LANGUAGE_COOKIE_NAME)?.value,
  )

  return new URL(`/${cookieLang}${pathname}${search}`, url)
}

export function isInvalidLangParam(req: NextRequest) {
  const {
    nextUrl: { pathname },
  } = req

  const langParam = pathname
    .split('/')
    .filter((pathSegment) => pathSegment !== '')[0]

  return (
    (langParam === undefined || !LANGUAGES.includes(langParam)) &&
    !pathname.startsWith('/_next')
  )
}

function getLanguageFromCookie(value: string | undefined) {
  return value !== undefined && LANGUAGES.includes(value)
    ? value
    : FALLBACK_LANGUAGE
}
