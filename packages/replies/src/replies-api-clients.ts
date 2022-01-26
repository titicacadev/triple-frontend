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

export async function authorMessage({
  resourceId,
  resourceType,
  currentMessageId,
  parentMessageId,
  content,
  mentionedUserUid,
}: {
  resourceId: string
  resourceType: ResourceType
  currentMessageId?: string
  parentMessageId?: string
  content: string
  mentionedUserUid?: string
}) {
  const authoringRequestType = deriveAuthoringRequestType({
    currentMessageId,
    parentMessageId,
    mentionedUserUid,
  })

  if (authoringRequestType === 'writeReply') {
    const response = await writeReply({
      resourceId,
      resourceType,
      content,
      mentionedUserUid,
    })

    return { response, authoringRequestType }
  }

  if (authoringRequestType === 'writeChildReply') {
    const response = await writeChildReply({
      parentMessageId,
      content,
      mentionedUserUid,
    })

    return { response, authoringRequestType }
  }

  if (authoringRequestType === 'editReply') {
    const response = await editReply({
      currentMessageId,
      content,
      mentionedUserUid,
    })

    return { response, authoringRequestType }
  }
}

function deriveAuthoringRequestType({
  currentMessageId,
  parentMessageId,
  mentionedUserUid,
}: {
  currentMessageId?: string
  parentMessageId?: string
  mentionedUserUid?: string
}) {
  const type = parentMessageId
    ? mentionedUserUid && !currentMessageId
      ? 'writeChildReply'
      : 'editReply'
    : 'writeReply'

  return type
}

async function writeReply({
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

  if (response.ok) {
    const { parsedBody } = response

    return parsedBody
  }
}

async function writeChildReply({
  parentMessageId,
  content,
  mentionedUserUid,
}: {
  parentMessageId?: string
  content: string
  mentionedUserUid?: string
}) {
  const response = await authGuardedFetchers.post<Reply>(
    generateUrl({
      path: `/api/reply/messages/${parentMessageId}/messages`,
      query: qs.stringify({ contentFormat: 'plaintext' }),
    }),
    {
      body: {
        messageId: parentMessageId,
        content,
        mentionedUserUid,
      },
    },
  )

  if (response === 'NEED_LOGIN') {
    throw new Error('로그인이 필요한 호출입니다.')
  }

  captureHttpError(response)

  if (response.ok) {
    const { parsedBody } = response

    return parsedBody
  }
}

async function editReply({
  currentMessageId,
  content,
  mentionedUserUid,
}: {
  currentMessageId?: string
  content: string
  mentionedUserUid?: string
}) {
  const response = await authGuardedFetchers.put<Reply>(
    generateUrl({
      path: `/api/reply/messages/${currentMessageId}`,
      query: qs.stringify({ contentFormat: 'plaintext' }),
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

  if (response.ok) {
    const { parsedBody } = response

    return parsedBody
  }
}

export async function deleteReply({
  currentMessageId,
}: {
  currentMessageId?: string
}) {
  const response = await authGuardedFetchers.del<Reply>(
    `/api/reply/messages/${currentMessageId}`,
    {
      body: {
        messageId: currentMessageId,
      },
    },
  )

  if (response === 'NEED_LOGIN') {
    throw new Error('로그인이 필요한 호출입니다.')
  }

  captureHttpError(response)

  if (response.ok) {
    const { parsedBody } = response

    return parsedBody
  }
}

export async function likeReply({ messageId }: { messageId: string }) {
  const response = await authGuardedFetchers.put(
    `/api/reply/messages/${messageId}/like`,
    {
      body: {
        messageId,
      },
    },
  )

  if (response === 'NEED_LOGIN') {
    throw new Error('로그인이 필요한 호출입니다.')
  }

  captureHttpError(response)
}

export async function unlikeReply({ messageId }: { messageId: string }) {
  const response = await authGuardedFetchers.del(
    `/api/reply/messages/${messageId}/like`,
    {
      body: {
        messageId,
      },
    },
  )

  if (response === 'NEED_LOGIN') {
    throw new Error('로그인이 필요한 호출입니다.')
  }

  captureHttpError(response)
}
