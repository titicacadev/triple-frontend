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

export async function replyActions({
  resourceId,
  resourceType,
  currentMessageId,
  parentMessageId,
  content,
  mentionedUserUid,
}: {
  resourceId?: string
  resourceType?: ResourceType
  currentMessageId: string
  parentMessageId: string
  content: string
  mentionedUserUid: string
}) {
  const { fetcher, path } = deriveRegisterRequest({
    currentMessageId,
    parentMessageId,
    mentionedUserUid,
  })

  const response = await fetcher(
    generateUrl({
      path,
      query: qs.stringify({ contentFormat: 'plaintext' }),
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

function deriveRegisterRequest({
  currentMessageId,
  parentMessageId,
  mentionedUserUid,
}: {
  currentMessageId: string
  parentMessageId: string
  mentionedUserUid: string
}) {
  const type = parentMessageId
    ? mentionedUserUid && !currentMessageId
      ? 'writeChildReply'
      : 'modifyReply'
    : 'writeReply'

  const registerRequest: {
    [key: string]: { fetcher: Function; path: string }
  } = {
    writeReply: {
      fetcher: authGuardedFetchers.post,
      path: `/api/reply/messages`,
    },
    writeChildReply: {
      fetcher: authGuardedFetchers.post,
      path: `/api/reply/messages/${parentMessageId}/messages`,
    },
    modifyReply: {
      fetcher: authGuardedFetchers.put,
      path: `/api/reply/messages/${currentMessageId}`,
    },
  }

  const { fetcher, path } = registerRequest[type]

  return { fetcher, path }
}
