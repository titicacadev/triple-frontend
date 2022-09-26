import { NextPageContext } from 'next'
import { PropsWithChildren } from 'react'

import { generateUserAgentValues } from '../user-agent-context'

import {
  InAppSessionContextProviderProps,
  InAppSessionContextProvider,
} from './app'
import {
  InBrowserSessionContextProviderProps,
  InBrowserSessionContextProvider,
} from './browser'

type SessionContextProviderProps =
  | {
      type: 'browser'
      props: InBrowserSessionContextProviderProps
    }
  | {
      type: 'app'
      props: InAppSessionContextProviderProps
    }

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

  return { type: 'app', props }
}
