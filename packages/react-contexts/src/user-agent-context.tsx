import React, { createContext, useContext, FC, ComponentType } from 'react'
import UAParser from 'ua-parser-js'
import { DeepPartial } from 'utility-types'

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

interface UserAgentContextValue {
  isPublic: boolean
  isMobile: boolean
  os: OS
  app: App
}

const Context = createContext<UserAgentContextValue>({
  isPublic: false,
  isMobile: false,
  os: { name: '', version: '' },
  app: null,
})
const { Provider, Consumer } = Context

export interface WithUserAgentBaseProps {
  userAgent: {
    isPublic: boolean
    isMobile: boolean
    os: OS
    app: App
  }
}

export function withUserAgent<P extends DeepPartial<WithUserAgentBaseProps>>(
  Component: ComponentType<P>,
): FC<Omit<P, keyof WithUserAgentBaseProps>> {
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
