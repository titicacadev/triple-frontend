import { generateUrl, strictQuery } from '@titicaca/view-utilities'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import qs from 'qs'

import { generateUserAgentValues } from '../user-agent-context'

import { SESSION_ID_KEY } from './app'

export function putInvalidSessionIdRemover({
  res: { setHeader },
  req: {
    headers: { 'user-agent': userAgent = '' },
  },
  query,
  resolvedUrl,
}: GetServerSidePropsContext): () => Extract<
  GetServerSidePropsResult<unknown>,
  { redirect: unknown }
> {
  const { isPublic } = generateUserAgentValues(userAgent)

  const handleInvalidSessionInBrowser = () => {
    setHeader(
      'set-cookie',
      `${SESSION_ID_KEY}=; path=/; expires=${new Date(0).toUTCString()};`,
    )

    throw new Error('유효하지 않은 인증 정보입니다.')
  }

  const handleInvalidSessionInApp: ReturnType<
    typeof putInvalidSessionIdRemover
  > = () => {
    const { redirected } = strictQuery(query).boolean('redirected').use()

    if (redirected === true) {
      throw new Error('세션 새로고침 이후에도 유효하지 않은 인증 정보입니다.')
    }

    return {
      redirect: {
        destination: generateUrl({
          path: '/landing/refresh',
          query: qs.stringify({
            returnUrl: generateUrl(
              {
                query: 'redirected=true',
              },
              addBasePath(resolvedUrl),
            ),
          }),
        }),
        basePath: false,
        permanent: false,
      },
    }
  }

  return isPublic ? handleInvalidSessionInBrowser : handleInvalidSessionInApp
}

function addBasePath(href: string) {
  const rootOrRootWithQueryRegEx = /^\/($|\?)/
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

  return rootOrRootWithQueryRegEx.test(href)
    ? `${basePath}${href.slice(1)}`
    : `${basePath}${href}`
}
