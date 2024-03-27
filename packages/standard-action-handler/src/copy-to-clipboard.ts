import qs from 'qs'
import { t } from 'i18next'

import { createClipboardCopier } from './services/copy'
import { WebActionParams } from './types'

export default async function copyToClipboard({
  url: { query, path } = {},
}: WebActionParams) {
  if (path === '/web-action/copy-to-clipboard' && query) {
    const { text } = qs.parse(query || '') as { text?: string }

    if (text && t) {
      const textClipboardCopier = createClipboardCopier()

      textClipboardCopier({
        text,
        message: t('클립보드에 복사되었습니다.', { ns: 'triple-frontend' }),
      })
    }

    return true
  }

  return false
}
