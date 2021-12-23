import UAParser from 'ua-parser-js'

interface Os {
  name?: string
  version?: string
}

export interface UserAgentValue {
  isMobile: boolean
  os: Os
}

export function generateUserAgentValues(userAgent: string): UserAgentValue {
  return {
    isMobile:
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        userAgent,
      ),
    os: new UAParser(userAgent).getOS() as Os,
  }
}
