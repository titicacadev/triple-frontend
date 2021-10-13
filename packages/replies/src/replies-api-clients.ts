import { get } from '@titicaca/fetcher'
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
  const response = await get<ReplyType[]>(
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

  const { ok, result, error } = response

  if (!ok && !result) {
    throw error || new Error(`Fail to fetch replies`)
  }

  return result
}
