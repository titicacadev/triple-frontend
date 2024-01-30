import qs from 'qs'
import { TransitionType } from '@titicaca/modals'

import { WebActionParams } from './types'

export default async function requireTripleClient({
  url: { path, query } = {},
  options: { navigate, app, showTransitionModal } = {},
}: WebActionParams) {
  if (path === '/web-action/require-triple-client') {
    if (!app) {
      if (showTransitionModal) {
        showTransitionModal(TransitionType.General)
        return true
      }
    } else {
      if (!query) {
        return true
      }
      const { url } = qs.parse(query)
      if (navigate && typeof url === 'string') {
        navigate(url)
        return true
      }
    }
  }
  return false
}
