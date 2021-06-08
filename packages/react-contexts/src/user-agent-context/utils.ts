import UAParser from 'ua-parser-js'

enum AppName {
  iOS = 'Triple-iOS',
  Android = 'Triple-Android',
}

interface App {
  name: AppName
  version: string
}

interface OS {
  name?: string
  version?: string
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

export interface UserAgentValue {
  isPublic: boolean
  isMobile: boolean
  os: OS
  app: App | null
}

export function generateUserAgentValues(userAgent: string): UserAgentValue {
  const app = parseApp(userAgent)

  return {
    isPublic: !app,
    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent,
    ),
    os: new UAParser(userAgent).getOS() as OS,
    app,
  }
}
