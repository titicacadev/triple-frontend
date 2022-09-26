import { AppName, App } from './types'

/**
 * user agent에서 트리플 앱 정보를 파싱합니다.
 * @param userAgent 파싱할 user agent
 * @returns 앱 이름과 버전
 */
export function parseTripleClientUserAgent(userAgent: string): App | null {
  const matchData = userAgent.match(/Triple-(iOS|Android)\/([^ ]+)/i)

  if (matchData) {
    return {
      appName: AppName[matchData[1] as 'iOS' | 'Android'],
      appVersion: matchData[2] || 'unknown',
    }
  }

  return null
}
