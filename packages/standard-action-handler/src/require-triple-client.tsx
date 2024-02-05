import qs from 'qs'
import { TransitionType } from '@titicaca/modals'

import { WebActionParams } from './types'

export default async function requireTripleClient({
  url: { path, query } = {},
  options: { app, showTransitionModal } = {},
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
      if (handler) {
        await handler.execute(url)
        return true
      }
    }
  }
  return false
}
