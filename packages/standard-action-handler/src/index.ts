import Handler from './handler'
import serial from './serial'
import invokeCta from './invoke-cta'
import { ContextOptions } from './types'

export function initialize(options: ContextOptions) {
  const handler = new Handler({ handlers: [serial, invokeCta], options })

  return handler.toFunction()
}
