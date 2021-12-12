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

export async function registerReply({
  resourceId,
  resourceType,
  messageId,
  content,
  mentionedUserUid,
  registerType,
}: {
  resourceId?: string
  resourceType?: ResourceType
  messageId: string
  content: string
  mentionedUserUid: string
  registerType: 'writeReply' | 'writeChildReply' | 'modifyReply'
}) {
  const { fetcher, path } = defineRegisterRequest({ registerType, messageId })

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

function defineRegisterRequest({
  registerType,
  messageId,
}: {
  registerType: 'writeReply' | 'writeChildReply' | 'modifyReply'
  messageId: string
}) {
  const registerRequest = {
    writeReply: {
      fetcher: authGuardedFetchers.post,
      path: `/api/reply/messages`,
    },
    writeChildReply: {
      fetcher: authGuardedFetchers.post,
      path: `/api/reply/messages/${messageId}/messages`,
    },
    modifyReply: {
      fetcher: authGuardedFetchers.put,
      path: `/api/reply/messages/${messageId}`,
    },
  }

  const { fetcher, path } = registerRequest[registerType]

  return { fetcher, path }
}
