import { ContextOptions } from '@titicaca/standard-action-handler/src/types'
import qs from 'qs'

import { UrlElements } from './../../view-utilities/src/url'

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
