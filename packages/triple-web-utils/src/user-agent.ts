import type { IResult } from 'ua-parser-js'

export function isMobile(userAgent: IResult) {
  const { device } = userAgent

  if (device.type === 'mobile' || device.type === 'tablet') {
    return true
  } else {
    return false
  }
}
