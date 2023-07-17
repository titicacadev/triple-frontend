'use server'

import { AppName } from '@titicaca/react-triple-client-interfaces/common'
import { getTripleClientMetadata } from '@titicaca/react-triple-client-interfaces/server'

import { SessionContextProviderProps } from '../types'

import { getBrowserSessionProviderProps } from './get-browser-session-provider-props'
import { getAppSessionProviderProps } from './get-app-session-provider-props'

export async function getSessionProviderProps(): Promise<SessionContextProviderProps> {
  const app = getTripleClientMetadata()

  if (app) {
    const preventSessionFixation = app.appName !== AppName.iOS

    return {
      type: 'app',
      props: await getAppSessionProviderProps(preventSessionFixation),
    }
  }

  return {
    type: 'browser',
    props: await getBrowserSessionProviderProps(),
  }
}
