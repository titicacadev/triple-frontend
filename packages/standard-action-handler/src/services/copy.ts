import {
  hasAccessibleTripleNativeClients,
  showToast,
} from '@titicaca/triple-web-to-native-interfaces'

export function createClipboardCopier() {
  if (!hasAccessibleTripleNativeClients()) {
    return typeof navigator !== 'undefined' && navigator.clipboard
      ? copyWithClipboard
      : copyWithDomApi
  } else {
    return copyTextNativeInterface
  }
}

async function copyWithClipboard({
  text,
  message,
}: {
  text: string
  message: string
}) {
  await navigator.clipboard.writeText(text)

  alert(message)
}

function copyWithDomApi({ text, message }: { text: string; message: string }) {
  const inputElement = document.createElement('input')

  inputElement.value = text
  document.body.appendChild(inputElement)
  inputElement.select()
  document.execCommand('copy')
  document.body.removeChild(inputElement)

  alert(message)
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
