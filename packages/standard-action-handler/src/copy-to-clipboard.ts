import qs from 'qs'
import { UrlElements } from '@titicaca/view-utilities'
import {
  hasAccessibleTripleNativeClients,
  showToast,
} from '@titicaca/triple-web-to-native-interfaces'

import { copyToClipboard } from './utils'

const ALERT_MESSAGE = '클립보드에 복사되었습니다.'

export default async function copyTextToClipboard({
  path,
  query,
}: UrlElements) {
  if (path === '/web-action/copy-to-clipboard' && query) {
    const { text } = qs.parse(query || '')

    if (text) {
      const copyText = createCopyText()

      copyText({ text: text as string, message: ALERT_MESSAGE })
    }

    return true
  }

  return false
}

function createCopyText() {
  if (!hasAccessibleTripleNativeClients()) {
    return copyToClipboard
  } else {
    return copyTextNativeInterface
  }
}

function copyTextNativeInterface({
  text,
  message,
}: {
  text: string
  message: string
}) {
  window.location.href = `${
    process.env.NEXT_PUBLIC_APP_URL_SCHEME
  }:///action/copy_to_clipboard?text=${encodeURIComponent(text)}`

  showToast(message)
}
