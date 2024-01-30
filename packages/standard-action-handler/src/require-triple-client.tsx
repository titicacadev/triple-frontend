import qs from 'qs'
import { TransitionType } from '@titicaca/modals'
import { parseUrl } from '@titicaca/view-utilities'

import { WebActionParams } from './types'

export default async function requireTripleClient({
  url: { path, query } = {},
  options: { navigate, app, showTransitionModal } = {},
  handler,
}: WebActionParams) {
  if (path === '/web-action/require-triple-client' && query) {
    if (!app) {
      if (showTransitionModal) {
        showTransitionModal(TransitionType.General)
      }
    } else {
      const { url } = qs.parse(query)
      if (typeof url !== 'string') {
        return false
      }
      const parsedUrl = parseUrl(url)
      if (parsedUrl.path?.match(/^\/web-action\//) && handler) {
        await handler.execute(url)
      } else if (navigate) {
        navigate(url)
      }
      return true
    }
  }
  return false
}
