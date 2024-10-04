import {
  hasAccessibleTripleNativeClients,
  shareLink,
} from '@titicaca/triple-web-to-native-interfaces'

import { createClipboardCopier } from './copy'

const DEFAULT_IMAGE =
  'https://assets.triple.guide/images/default-cover-image.jpg'

interface SharingParams {
  title?: string | null
  description?: string | null
  image?: string | null
  webUrl?: string | null
  appUrl: string
}

export function createShareUrl() {
  if (!hasAccessibleTripleNativeClients()) {
    return typeof navigator !== 'undefined' && 'share' in navigator
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

  const clipboardCopier = createClipboardCopier()

  return clipboardCopier({
    text: webUrl || window.location.href,
    message,
  })
}

function shareNativeInterface({
  params,
  webButtonTitle,
  appButtonTitle,
}: {
  params: SharingParams
  webButtonTitle: string
  appButtonTitle: string
}) {
  const { title, description, image, webUrl, appUrl } = params

  return shareLink({
    link: webUrl as string,
    title: title as string,
    description: description as string,
    imageUrl: image || DEFAULT_IMAGE,
    buttons: [
      {
        title: webButtonTitle,
        webUrl: webUrl as string,
      },
      {
        title: appButtonTitle,
        webUrl: webUrl as string,
        appUrl,
      },
    ],
  })
}
