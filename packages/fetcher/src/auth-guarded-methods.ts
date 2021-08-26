import { authFetcherize } from './factories'
import { del, get, post, put } from './methods'

export const authGuardedFetchers = {
  get: authFetcherize(get, {
    refresh: () => post('/api/users/web-session/token'),
  }),
  post: authFetcherize(post, {
    refresh: () => post('/api/users/web-session/token'),
  }),
  put: authFetcherize(put, {
    refresh: () => post('/api/users/web-session/token'),
  }),
  del: authFetcherize(del, {
    refresh: () => post('/api/users/web-session/token'),
  }),
}
