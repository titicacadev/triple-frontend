export enum AppName {
  iOS = 'Triple-iOS',
  Android = 'Triple-Android',
}

interface App {
  name: AppName
  version: string
}

/**
 * user agent에서 트리플 앱 정보를 파싱합니다.
 * @param userAgent 파싱할 user agent
 * @returns 앱 이름과 버전
 */
export function parseApp(userAgent: string): App | null {
  const matchData = userAgent.match(/Triple-(iOS|Android)\/([^ ]+)/i)

  if (matchData) {
    return {
      name: AppName[matchData[1] as 'iOS' | 'Android'],
      version: matchData[2] || 'unknown',
    }
  }

  return null
}
