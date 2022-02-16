import { ContextOptions } from '@titicaca/standard-action-handler/src/types'
import qs from 'qs'

import { TargetType } from './types'
import { UrlElements } from './../../view-utilities/src/url'

export default async function newWindow(
  { path, query }: UrlElements,
  { routeExternally }: ContextOptions,
) {
  if (path === '/web-action/new-window' && query) {
    const { href, target } = qs.parse(query) as {
      href?: string
      target?: TargetType
    }
    if (href && target && routeExternally) {
      routeExternally({ href, target })
      return true
    }
  }
  return false
}
