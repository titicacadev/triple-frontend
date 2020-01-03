import React, { createContext, useContext } from 'react'
import { UAParser } from 'ua-parser-js'

interface UserAgentProps {
  isPublic: boolean
  isMobile: boolean
  os: {
    name: string | undefined
    version: string | undefined
  }
  app: {
    name: string
    version: string
  } | null
}

enum AppName {
  iOS = 'Triple-iOS',
  Android = 'Triple-Android',
}

const Context = createContext({
  isPublic: false,
  isMobile: false,
  os: { name: '', version: '' },
  app: { name: '', version: '' },
})
const { Provider, Consumer } = Context

export function withUserAgent(Component: React.ElementType) {
  return function UserAgentComponent(props: any) {
    return (
      <Consumer>
        {(values: UserAgentProps) => (
          <Component userAgent={values} {...props} />
        )}
      </Consumer>
    )
  }
}

export { Provider as UserAgentProvider }

export function useUserAgentContext() {
  return useContext(Context)
}

export function generateUserAgentValues(userAgent: string) {
  const app = parseApp(userAgent)
  return {
    isPublic: !app,
    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent,
    ),
    os: new UAParser(userAgent).getOS() as {
      name: string | undefined
      version: string | undefined
    },
    app,
  }
}

function parseApp(
  userAgent: string,
): {
  name: AppName
  version: string
} | null {
  const matchData = userAgent.match(/Triple-(iOS|Android)\/([^ ]+)/i)

  if (matchData) {
    return {
      name: AppName[matchData[1] as 'iOS' | 'Android'],
      version: matchData[2] || 'unknown',
    }
  }

  return null
}
