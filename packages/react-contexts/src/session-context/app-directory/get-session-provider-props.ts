'use server'

import { SessionContextProviderProps } from '../types'

import { getBrowserSessionProviderProps } from './get-browser-session-provider-props'
import { getAppSessionProviderProps } from './get-app-session-provider-props'

/**
  (구)SessionContextProvider.getInitialProps의 next v13 app router 버전입니다. 
*/
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
