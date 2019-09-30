import React, { createContext, useContext } from 'react'
import { UAParser } from 'ua-parser-js'

const Context = createContext('')
const { Provider, Consumer } = Context

function isPublic(userAgent: string): boolean {
  return !userAgent || !userAgent.match(/Triple-(iOS|Android)/i)
}

export function withUserAgent(Component: React.ElementType) {
  return function UserAgentComponent(props: any) {
    return (
      <Consumer>
        {(values: any) => <Component userAgent={values} {...props} />}
      </Consumer>
    )
  }
}

export { Provider as UserAgentProvider }

export function useUserAgentContext() {
  return useContext(Context)
}

export function generateUserAgentValues(userAgent: string) {
  return {
    isPublic: isPublic(userAgent),
    os: new UAParser(userAgent).getOS(),
  }
}
