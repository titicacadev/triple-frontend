import { UserAgentValue } from '../types'

const MOBILE_REGEX =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i

export function validateMobile(userAgent: UserAgentValue['ua']): boolean {
  return MOBILE_REGEX.test(userAgent)
}
