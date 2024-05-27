import qs from 'qs'

import { WebActionParams } from './types'

export default async function requireTripleClient({
  url: { path, query } = {},
  options: { app, showAppInstallCtaModal } = {},
  handler,
}: WebActionParams) {
  if (path === '/web-action/require-triple-client' && query) {
    if (!app) {
      if (showAppInstallCtaModal) {
        showAppInstallCtaModal()
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
