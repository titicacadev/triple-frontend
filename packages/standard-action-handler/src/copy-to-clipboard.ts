import qs from 'qs'
import { UrlElements } from '@titicaca/view-utilities'

import { createClipboardCopier } from './services/copy'

const ALERT_MESSAGE = '클립보드에 복사되었습니다.'

export default async function copyToClipboard({ path, query }: UrlElements) {
  if (path === '/web-action/copy-to-clipboard' && query) {
    const { text } = qs.parse(query || '') as { text?: string }

    if (text) {
      const textClipboardCopier = createClipboardCopier()

      textClipboardCopier({ text, message: ALERT_MESSAGE })
    }

    return true
  }

  return false
}
