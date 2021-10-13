import { authGuardedFetchers, captureHttpError } from '@titicaca/fetcher'
import { generateUrl } from '@titicaca/view-utilities'
import qs from 'qs'

import { Reply as ReplyType } from './types'

export async function fetchReplies({
  resourceId,
  resourceType,
  size,
}: {
  resourceId: string
  resourceType: string
  size?: number
}) {
  const response = await authGuardedFetchers.get<ReplyType[]>(
    generateUrl({
      path: `/reply-api/messages`,
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

  const { ok, result } = response

  if (ok && result) {
    return result
  }
}
