'use server'

import { SessionContextProviderProps } from '../types'

import { getBrowserSessionProviderProps } from './get-browser-session-provider-props'
import { getAppSessionProviderProps } from './get-app-session-provider-props'

export async function getSessionProviderProps({
  isPublic,
  isAndroid,
}: {
  isPublic: boolean
  isAndroid: boolean
}): Promise<SessionContextProviderProps> {
  if (isPublic) {
    return {
      type: 'browser',
      props: await getBrowserSessionProviderProps(),
    }
  }

  return {
    type: 'app',
    props: await getAppSessionProviderProps({
      preventSessionFixation: isAndroid,
    }),
  }
}
