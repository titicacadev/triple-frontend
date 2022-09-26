import { authFetcherize } from './factories'
import { fetcher } from './fetcher'
import { del, get, post, put } from './methods'

const authFetcherizeOptions: Parameters<typeof authFetcherize>[1] = {
  refresh: (options) => post('/api/users/web-session/token', options),
}

export const authGuardedFetchers = {
  fetcher: authFetcherize(
    (href, options) => fetcher(href, options || {}),
    authFetcherizeOptions,
  ),
  get: authFetcherize(get, authFetcherizeOptions),
  post: authFetcherize(post, authFetcherizeOptions),
  put: authFetcherize(put, authFetcherizeOptions),
  del: authFetcherize(del, authFetcherizeOptions),
}
