import { request } from 'graphql-request'

import { Requester, getSdk } from './generated'

interface GetClientArgs {
  lang: string
}

const cachedClient: Record<string, ReturnType<typeof getSdk>> = {}

export function getClient({ lang }: GetClientArgs) {
  // eslint-disable-next-line no-console
  console.log(cachedClient)
  if (cachedClient[lang]) {
    return cachedClient[lang]
  }

  const requestHeaders =
    lang === 'ko'
      ? undefined
      : {
          'X-Service-Origin': 'global',
          'X-Triple-User-Lang': lang,
        }

  const requester: Requester = (doc, vars) =>
    request({
      document: doc,
      url: '/api/graphql',
      variables: vars ?? undefined,
      requestHeaders,
    })

  cachedClient[lang] = getSdk(requester)
  return cachedClient[lang]
}
