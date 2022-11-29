import { i18nFetcherize } from './factories'
import { fetcher } from './fetcher'
import { del, get, post, put } from './methods'

export const i18nFetchers = {
  fetcher: i18nFetcherize((href, options) => fetcher(href, options ?? {})),
  get: i18nFetcherize(get),
  post: i18nFetcherize(post),
  put: i18nFetcherize(put),
  del: i18nFetcherize(del),
}
