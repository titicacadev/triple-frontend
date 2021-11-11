import { authGuardedFetchers, captureHttpError } from '@titicaca/fetcher'
import { generateUrl } from '@titicaca/view-utilities'
import qs from 'qs'

import { ResourceType, Reply, ReplyBoard } from './types'

export async function fetchReplies({
  resourceId,
  resourceType,
  page = 0,
  size = 10,
}: {
  resourceId: string
  resourceType: ResourceType
  size?: number
  page?: number
}): Promise<Reply[]> {
  const response = await authGuardedFetchers.get<Reply[]>(
    generateUrl({
      path: `/api/reply/messages`,
      query: qs.stringify({
        page,
        resourceId,
        resourceType,
        size,
      }),
    }),
  )

  if (response === 'NEED_LOGIN') {
    throw new Error('로그인이 필요한 호출입니다.')
  }

  captureHttpError(response)

  if (response.ok === false) {
    return []
  }

  const { parsedBody } = response

  return parsedBody
}

export async function writeReply({
  resourceId,
  resourceType,
  content,
  mentionedUserUid,
}: {
  resourceId: string
  resourceType: string
  content: string
  mentionedUserUid?: string
}) {
  const response = await authGuardedFetchers.post<Reply>(
    generateUrl({
      path: `/api/reply/messages`,
      query: qs.stringify({
        contentFormat: 'plaintext',
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
    throw new Error('로그인이 필요한 호출입니다.')
  }

  captureHttpError(response)
}

export async function fetchReplyBoard({
  resourceType,
  resourceId,
}: {
  resourceType: string
  resourceId: string
}): Promise<ReplyBoard> {
  const response = await authGuardedFetchers.get<ReplyBoard>(
    `/api/reply/resources/${resourceType}/${resourceId}/board`,
  )

  if (response === 'NEED_LOGIN') {
    throw new Error('로그인이 필요한 호출입니다.')
  }

  captureHttpError(response)

  if (response.ok === false) {
    const { status, url } = response
    throw new Error(`${status} - ${url}`)
  }

  const { parsedBody } = response
  return parsedBody
}

export async function fetchChildReplies({
  id,
  page = 0,
  size = 2,
}: {
  id: string
  page?: number
  size?: number
}): Promise<Reply[]> {
  const response = await authGuardedFetchers.get<Reply[]>(
    generateUrl({
      path: `/api/reply/messages/${id}/messages`,
      query: qs.stringify({
        page,
        size,
      }),
    }),
  )

  if (response === 'NEED_LOGIN') {
    throw new Error('로그인이 필요한 호출입니다.')
  }

  captureHttpError(response)

  if (response.ok === false) {
    return []
  }

  const { parsedBody } = response

  return parsedBody
}

export async function writeChildReply({
  messageId,
  content,
  mentionedUserUid,
}: {
  messageId: string
  content: string
  mentionedUserUid: string
}) {
  const response = await authGuardedFetchers.post(
    generateUrl({
      path: `/api/reply/messages/${messageId}/messages`,
      query: qs.stringify({
        contentFormat: 'plaintext',
      }),
    }),
    {
      body: {
        content,
        mentionedUserUid,
      },
    },
  )

  if (response === 'NEED_LOGIN') {
    throw new Error('로그인이 필요한 호출입니다.')
  }

  captureHttpError(response)
}
