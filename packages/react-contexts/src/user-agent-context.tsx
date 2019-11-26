import React, { createContext, useContext } from 'react'
import { UAParser } from 'ua-parser-js'

interface UserAgentProps {
  isPublic: boolean
  isMobile: boolean
  os: {
    name: string
    version: string
  }
  app: {
    name: string
    version: string
  } | null
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
    os: new UAParser(userAgent).getOS(),
    app,
  }
}

function parseApp(
  userAgent: string,
): {
  name: 'Triple-iOS' | 'Triple-Android'
  version: string
} | null {
  const matchData = userAgent.match(/Triple-(iOS|Android)\/([^ ]+)/i)

  if (matchData) {
    return {
      name: `Triple-${matchData[1]}` as any,
      version: matchData[2] || 'unknown',
    }
  }

  return null
}
