'use server'

import { AppName } from '@titicaca/react-triple-client-interfaces/lib/types'
import { getTripleClientMetadata } from '@titicaca/react-triple-client-interfaces/server'

import { SessionContextProviderProps } from '../types'

import { getBrowserSessionProviderProps } from './browser'
import { getAppSessionProviderProps } from './app'

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
