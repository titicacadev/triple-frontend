import { GetServerSidePropsContext } from 'next'

import { SESSION_ID_KEY } from './app'

export function putInvalidSessionRemover({
  res: { setHeader },
}: GetServerSidePropsContext) {
  return () => {
    setHeader(
      'set-cookie',
      `${SESSION_ID_KEY}=; path=/; expires=${new Date(0).toUTCString()};`,
    )
  }
}
