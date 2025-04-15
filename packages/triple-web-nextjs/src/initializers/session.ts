import 'server-only'

import { cookies } from 'next/headers'
import { fetchUser, type SessionValue } from '@titicaca/triple-web'

export async function getSession(): Promise<SessionValue> {
  const user = await fetchUser({ cookie: cookies().toString() })

  return {
    user,
  }
}
