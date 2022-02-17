import qs from 'qs'
import { UrlElements } from '@titicaca/view-utilities/src/url'

import { ContextOptions } from './types'

export default async function newWindow(
  { path, query }: UrlElements,
  { routeExternally }: ContextOptions,
) {
  if (path === '/web-action/new-window' && query) {
    const { href } = qs.parse(query) as {
      href?: string
    }
    if (href && routeExternally) {
      routeExternally({ href, target: 'new' })
      return true
    }
  }
  return false
}
