import { request } from 'graphql-request'

import { Requester, getSdk } from './generated'

interface GetClientArgs {
  lang: string
}

const cachedClient: Record<string, ReturnType<typeof getSdk>> = {}

export function getClient({ lang }: GetClientArgs) {
  if (cachedClient[lang]) {
    return cachedClient[lang]
  }

  const isKorean = lang === 'ko'

  const requestHeaders = {
    'X-Service-Origin': isKorean ? 'triple' : 'global',
    'X-Triple-User-Lang': lang,
  }

  const reqUrl = isKorean ? '/api/triple-graphql' : '/api/graphql'

  const requester: Requester = (doc, vars) =>
    request({
      document: doc,
      url: reqUrl,
      variables: vars ?? undefined,
      requestHeaders,
    })

  cachedClient[lang] = getSdk(requester)
  return cachedClient[lang]
}
