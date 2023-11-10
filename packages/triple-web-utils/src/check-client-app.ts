import { clientAppRegex } from './regex'

export function checkClientApp(userAgent: string) {
  return clientAppRegex.test(userAgent)
}
