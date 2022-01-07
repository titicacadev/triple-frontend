import {
  hasAccessibleTripleNativeClients,
  showToast,
  shareLink,
} from '@titicaca/triple-web-to-native-interfaces'

const DEFAULT_IMAGE =
  'https://assets.triple.guide/images/default-cover-image.jpg'

interface SharingParams {
  title?: string | null
  description?: string | null
  image?: string | null
  webUrl?: string | null
  appUrl: string
}

export function createClipboardCopier() {
  if (!hasAccessibleTripleNativeClients()) {
    return copyTextToClipboard
  } else {
    return copyTextNativeInterface
  }
}

function copyTextToClipboard({
  text,
  message,
}: {
  text: string
  message: string
}) {
  const clipboardCopier = createToClipboard()

  return clipboardCopier({
    text,
    message,
  })
}

function createToClipboard() {
  return typeof navigator !== 'undefined' && navigator.clipboard
    ? copyWithClipboard
    : copyWithDomApi
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

export function createShareUrl() {
  if (!hasAccessibleTripleNativeClients()) {
    return typeof navigator !== 'undefined' && navigator.share
      ? navigatorShare
      : copyUrlToClipboard
  } else {
    return shareNativeInterface
  }
}

function navigatorShare({ params }: { params: SharingParams }) {
  const { title, description, webUrl } = params

  navigator.share({
    title: title as string,
    text: description as string,
    url: webUrl as string,
  })
}

function copyUrlToClipboard({
  params,
  message,
}: {
  params: SharingParams
  message: string
}) {
  const { webUrl } = params

  const clipboardCopier = createToClipboard()

  return clipboardCopier({
    text: webUrl || window.location.href,
    message,
  })
}

function shareNativeInterface({ params }: { params: SharingParams }) {
  const { title, description, image, webUrl, appUrl } = params

  return shareLink({
    link: webUrl as string,
    title: title as string,
    description: description as string,
    imageUrl: image || DEFAULT_IMAGE,
    buttons: [
      {
        title: '웹에서 보기',
        webUrl: webUrl as string,
      },
      {
        title: '트리플에서 보기',
        webUrl: webUrl as string,
        appUrl,
      },
    ],
  })
}
