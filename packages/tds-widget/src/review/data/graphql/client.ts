import { ClientError, request } from 'graphql-request'
import { sessionRefresh } from '@titicaca/fetcher'
import { ACCESS_TOKEN_EXPIRED_EXCEPTION } from '@titicaca/fetcher/src/response-handler'

import { Requester, getSdk } from './generated'

const requester: Requester = (doc, vars) =>
  request({
    document: doc,
    url: '/api/graphql',
    variables: vars ?? undefined,
  })

export const client = getSdk(requester)

export async function reviewClient<T>(query: () => Promise<T>) {
  try {
    const response = await query()
    return response
  } catch (e) {
    if (e instanceof ClientError && e.response.status === 401) {
      if (e.response.exception === ACCESS_TOKEN_EXPIRED_EXCEPTION) {
        const refreshResponse = await sessionRefresh({})
        if (refreshResponse) {
          const newResponse = await query()
          return newResponse
        }
      }
    }
    throw e
  }
}
