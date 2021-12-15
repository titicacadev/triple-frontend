import { IncomingMessage } from 'http'

import { hasAccessibleTripleNativeClients } from '@titicaca/triple-web-to-native-interfaces'
import { NextPageContext } from 'next'
import React, { PropsWithChildren } from 'react'

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
  const isAppRequest =
    req !== undefined
      ? checkReqFromApp(req)
      : hasAccessibleTripleNativeClients()

  if (isAppRequest) {
    const props = await InAppSessionContextProvider.getInitialProps(context)

    return { type: 'app', props }
  }

  const props = await InBrowserSessionContextProvider.getInitialProps(context)

  return { type: 'browser', props }
}

function checkReqFromApp(req: IncomingMessage) {
  const { app } = generateUserAgentValues(req.headers['user-agent'] || '')

  return app !== null
}
