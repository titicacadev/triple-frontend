import React, { createContext, useContext } from 'react'
import { UAParser } from 'ua-parser-js'

enum AppName {
  iOS = 'Triple-iOS',
  Android = 'Triple-Android',
}

interface OS {
  name?: string
  version?: string
}

type App = {
  name: AppName
  version: string
} | null

interface UserAgentContext {
  isPublic: boolean
  isMobile: boolean
  os: OS
  app: App
}

const Context = createContext<UserAgentContext>({
  isPublic: false,
  isMobile: false,
  os: { name: '', version: '' },
  app: null,
})
const { Provider, Consumer } = Context

export function withUserAgent<P extends { userAgent: UserAgentContext }>(
  Component: React.ComponentType<P>,
): React.FC<Omit<P, 'userAgent'>> {
  return function UserAgentComponent(props) {
    return (
      <Consumer>
        {(userAgent) => (
          <Component
            {...({
              ...props,
              userAgent,
            } as P)}
          />
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
    os: new UAParser(userAgent).getOS() as OS,
    app,
  }
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
