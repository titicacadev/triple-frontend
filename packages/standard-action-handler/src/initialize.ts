import Handler from './handler'
import serial from './serial'
import invokeCta from './invoke-cta'
import showToast from './show-toast'
import fetchApi from './fetch-api'
import share from './share'
import copyToClipboard from './copy-to-clipboard'
import newWindow from './new-window'
import imageDownload from './image-download'
import scrollToElement from './scroll-to-element'
import converse from './converse'
import { ContextOptions } from './types'
import requireTripleClient from './require-triple-client'

export function initialize(
  t: (key: string, values?: object) => string,
  options: ContextOptions,
) {
  const handler = new Handler({
    handlers: [
      serial,
      invokeCta,
      showToast,
      fetchApi,
      share,
      copyToClipboard,
      newWindow,
      imageDownload,
      scrollToElement,
      converse,
      requireTripleClient,
    ],
    t,
    options,
  })

  return handler.toFunction()
}
