import { authGuardedFetchers, captureHttpError } from '@titicaca/fetcher'
import { generateUrl } from '@titicaca/view-utilities'
import qs from 'qs'

import { Reply } from './types'

export async function fetchReplies({
  resourceId,
  resourceType,
  size,
}: {
  resourceId: string
  resourceType: 'review' | 'itinerary'
  size?: number
}) {
  const response = await authGuardedFetchers.get<Reply[]>(
    generateUrl({
      path: `/api/reply/messages`,
      query: qs.stringify({
        page: 0,
        resourceId,
        resourceType,
        size: size || 10,
      }),
    }),
  )

  if (response === 'NEED_LOGIN') {
    return
  }

  captureHttpError(response)

  const { result } = response

  return result
}
