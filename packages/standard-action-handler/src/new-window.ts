import qs from 'qs'
import { parseUrl } from '@titicaca/view-utilities'

import { WebActionParams } from './types'

export default async function newWindow({
  url: { path, query } = {},
  options: { openInlink, openOutlink, app } = {},
}: WebActionParams) {
  if (path === '/web-action/new-window' && query) {
    const { href } = qs.parse(query) as {
      href?: string
    }

    if (href) {
      if (app) {
        const { host } = parseUrl(href)

        if (host) {
          openOutlink?.(href)
        } else {
          openInlink?.(href)
        }
      } else {
        window.open(href, '_blank')
      }

      return true
    }
  }
  return false
}
