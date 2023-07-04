'use server'

import { AppName } from '@titicaca/react-triple-client-interfaces'
import { getTripleClientMetadata } from '@titicaca/react-triple-client-interfaces/lib/get-triple-client-metadata'

import { SessionContextProviderProps } from '../types'

import { getBrowserSessionProviderProps } from './browser'
import { getAppSessionProviderProps } from './app'

export async function getSessionProviderProps(): Promise<SessionContextProviderProps> {
  const app = getTripleClientMetadata()

  if (app) {
    const preventSessionFixation = app.appName !== AppName.iOS

    return {
      type: 'app',
      props: {
        ...(await getAppSessionProviderProps(preventSessionFixation)),
      },
    }
  }

  return {
    type: 'browser',
    props: await getBrowserSessionProviderProps(),
  }
}
