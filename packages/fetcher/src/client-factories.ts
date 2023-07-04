import { GetServerSidePropsContext } from 'next'

import { BaseFetcher } from './factories'

export function i18nFetcherize<Fetcher extends BaseFetcher>(
  fetcher: Fetcher,
  ctx: GetServerSidePropsContext,
): Fetcher {
  const {
    req: { headers },
  } = ctx
  const langHeader = (headers['x-triple-user-lang'] ?? 'ko') as string
  const countryHeader = (headers['x-triple-user-country'] ?? 'kr') as string

  return ((href, optionsParams) => {
    const { headers, ...options } = optionsParams ?? {}

    return fetcher(href, {
      ...options,
      headers: {
        ...headers,
        'x-triple-user-lang': langHeader,
        'x-triple-user-country': countryHeader,
      },
    })
  }) as Fetcher
}
