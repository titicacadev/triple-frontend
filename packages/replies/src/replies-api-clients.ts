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

  const { result } = response

  return result || []
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

  const { result } = response

  if (!result) {
    throw new Error('요청에 의한 응답이 없습니다.')
  }

  return result
}

export async function fetchChildrenReplies({
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

  const { result } = response

  if (!result) {
    return []
  }

  return result
}

export async function writeChildrenReply({
  messageId,
  content,
  contentFormat,
  mentionedUserUid,
}: {
  messageId: string
  content: string
  contentFormat: 'plaintext' | 'markdownText'
  mentionedUserUid: string
}) {
  const response = await authGuardedFetchers.post(
    generateUrl({
      path: `/api/reply/messages/${messageId}/messages`,
      query: qs.stringify({
        contentFormat,
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
