'use server'

import { headers, cookies } from 'next/headers'

import { InBrowserSessionContextProviderProps } from '../types'

import { getUser } from './get-user'

export async function getBrowserSessionProviderProps(): Promise<InBrowserSessionContextProviderProps> {
  const initialSessionAvailability = getWebSessionAvailability()
  const user = initialSessionAvailability ? await getUser() : undefined

  return {
    initialSessionAvailability,
    initialUser: user,
  }
}

function getWebSessionAvailability() {
  const headerInstance = headers()
  const cookieStore = cookies()

  if (process.env.NODE_ENV !== 'production') {
    return cookieStore.has('TP_SE')
  }

  return headerInstance.has('x-triple-web-login')
}
