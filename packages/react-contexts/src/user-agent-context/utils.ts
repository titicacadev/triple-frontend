import UAParser from 'ua-parser-js'

enum AppName {
  iOS = 'Triple-iOS',
  Android = 'Triple-Android',
}

export type App = {
  name: AppName
  version: string
} | null

export interface OS {
  name?: string
  version?: string
}

function parseApp(userAgent: string): App {
  const matchData = userAgent.match(/Triple-(iOS|Android)\/([^ ]+)/i)

  if (matchData) {
    return {
      name: AppName[matchData[1] as 'iOS' | 'Android'],
      version: matchData[2] || 'unknown',
    }
  }

  return null
}

export function generateUserAgentValues(userAgent: string) {
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
