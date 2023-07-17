'use server'

import { cookies } from 'next/headers'

import { InAppSessionContextProviderProps } from '../types'

import { getUser } from './get-user'

export async function getAppSessionProviderProps({
  preventSessionFixation,
}: {
  preventSessionFixation: boolean
}): Promise<InAppSessionContextProviderProps> {
  const initialSessionId = getAppSessionId()
  const user = initialSessionId ? await getUser() : undefined

  return {
    initialSessionId,
    initialUser: user,
    preventSessionFixation,
  }
}

function getAppSessionId() {
  return cookies().get('x-soto-session')?.value
}
