import { parseApp } from '@titicaca/view-utilities'
import UAParser from 'ua-parser-js'

interface Os {
  name?: string
  version?: string
}

export interface UserAgentValue {
  isPublic: boolean
  isMobile: boolean
  os: Os
  app: ReturnType<typeof parseApp>
}

export function generateUserAgentValues(userAgent: string): UserAgentValue {
  const app = parseApp(userAgent)

  return {
    isPublic: !app,
    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent,
    ),
    os: new UAParser(userAgent).getOS() as Os,
    app,
  }
}
