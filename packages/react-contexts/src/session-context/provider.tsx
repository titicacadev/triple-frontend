import { NextPageContext } from 'next'
import { PropsWithChildren } from 'react'

import { generateUserAgentValues } from '../user-agent-context'

import { InAppSessionContextProvider } from './app'
import { InBrowserSessionContextProvider } from './browser'
import { SessionContextProviderProps } from './types'

export default function SessionContextProvider({
  children,
  ...props
}: PropsWithChildren<SessionContextProviderProps>) {
  if (props.type === 'browser') {
    const { props: inBrowserProps } = props

    return (
      <InBrowserSessionContextProvider {...inBrowserProps}>
        {children}
      </InBrowserSessionContextProvider>
    )
  }

  const { props: inAppProps } = props

  return (
    <InAppSessionContextProvider {...inAppProps}>
      {children}
    </InAppSessionContextProvider>
  )
}

/** 
  next v13 app router를 사용하는 경우 '@titicaca/react-contexts/server'의 getSessionProviderProps를 사용하세요.
*/
SessionContextProvider.getInitialProps = async function (
  context: NextPageContext,
): Promise<SessionContextProviderProps> {
  const { req } = context
  const userAgent =
    req !== undefined
      ? req.headers['user-agent'] || ''
      : window.navigator.userAgent
  const { isPublic } = generateUserAgentValues(userAgent)

  if (isPublic === true) {
    const props = await InBrowserSessionContextProvider.getInitialProps(context)

    return { type: 'browser', props }
  }

  const props = await InAppSessionContextProvider.getInitialProps(context)

  return {
    type: 'app',
    props,
  }
}
