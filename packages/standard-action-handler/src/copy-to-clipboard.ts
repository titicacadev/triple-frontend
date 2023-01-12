import { getTranslation } from '@titicaca/next-i18next'
import qs from 'qs'

import { createClipboardCopier } from './services/copy'
import { WebActionParams } from './types'

export default async function copyToClipboard({
  url: { query, path } = {},
}: WebActionParams) {
  if (path === '/web-action/copy-to-clipboard' && query) {
    const t = getTranslation('common-web')
    const { text } = qs.parse(query || '') as { text?: string }

    if (text && t) {
      const textClipboardCopier = createClipboardCopier()

      textClipboardCopier({
        text,
        message: t([
          'keulribbodeue-bogsadoeeossseubnida.',
          '클립보드에 복사되었습니다.',
        ]),
      })
    }

    return true
  }

  return false
}
