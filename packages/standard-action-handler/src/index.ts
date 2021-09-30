import Handler from './handler'
import serial from './serial'
import invokeCta from './invoke-cta'
import showToast from './show-toast'
import fetchApi from './fetch-api'
import share from './share'
import { ContextOptions } from './types'

export function initialize(options: ContextOptions) {
  const handler = new Handler({
    handlers: [serial, invokeCta, showToast, fetchApi, share],
    options,
  })

  return handler.toFunction()
}
