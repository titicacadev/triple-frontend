import qs from 'qs'
import { UrlElements } from '@titicaca/view-utilities'
import {
  hasAccessibleTripleNativeClients,
  showToast,
} from '@titicaca/triple-web-to-native-interfaces'

const ALERT_MESSAGE = '클립보드에 복사되었습니다.'

export default async function copyToClipboard({ path, query }: UrlElements) {
  if (path === '/web-action/copy-to-clipboard' && query) {
    const { text } = qs.parse(query || '')

    if (text) {
      const copyText = createCopyText()

      copyText(text as string)
    }

    return true
  }

  return false
}

function createCopyText() {
  if (!hasAccessibleTripleNativeClients()) {
    return typeof navigator !== 'undefined' && navigator.clipboard
      ? copyWithClipboard
      : copyWithDomApi
  } else {
    return copyTextNativeInterface
  }
}

async function copyWithClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text)

    alert(ALERT_MESSAGE)
  } catch (error) {
    copyWithDomApi(text)
  }
}

function copyWithDomApi(text: string) {
  const inputElement = document.createElement('input')

  inputElement.value = text
  document.body.appendChild(inputElement)
  inputElement.select()
  document.execCommand('copy')
  document.body.removeChild(inputElement)

  alert(ALERT_MESSAGE)
}

function copyTextNativeInterface(text: string) {
  window.location.href = `${
    process.env.NEXT_PUBLIC_APP_URL_SCHEME
  }:///action/copy_to_clipboard?text=${encodeURIComponent(text)}`

  showToast(ALERT_MESSAGE)
}
