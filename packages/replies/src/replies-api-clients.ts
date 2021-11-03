import { authGuardedFetchers, captureHttpError } from '@titicaca/fetcher'
import { generateUrl } from '@titicaca/view-utilities'
import qs from 'qs'

import { ResourceType, Reply, ReplyBoard } from './types'

export async function fetchReplies({
  resourceId,
  resourceType,
  size,
  page,
}: {
  resourceId: string
  resourceType: ResourceType
  size?: number
  page?: number
}) {
  const response = await authGuardedFetchers.get<Reply[]>(
    generateUrl({
      path: `/api/reply/messages`,
      query: qs.stringify({
        page: page || 0,
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

export async function writeReply({
  contentFormat = 'plaintext',
  resourceId,
  resourceType,
  content,
  mentionedUserUid,
}: {
  contentFormat?: 'plaintext' | 'markdownText'
  resourceId: string
  resourceType: string
  content: string
  mentionedUserUid?: string
}) {
  const response = await authGuardedFetchers.post<Reply>(
    generateUrl({
      path: `/api/reply/messages`,
      query: qs.stringify({
        contentFormat,
      }),
    }),
    {
      body: {
        resourceId,
        resourceType,
        content,
        mentionedUserUid,
      },
    },
  )

  if (response === 'NEED_LOGIN') {
    return
  }

  captureHttpError(response)
}

export async function fetchReplyBoard({
  resourceType,
  resourceId,
}: {
  resourceType: string
  resourceId: string
}) {
  const response = await authGuardedFetchers.get<ReplyBoard>(
    `/api/reply/resources/${resourceType}/${resourceId}/board`,
  )

  if (response === 'NEED_LOGIN') {
    return
  }

  const { result } = response

  return result
}
