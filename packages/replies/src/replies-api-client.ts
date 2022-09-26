import {
  authGuardedFetchers,
  captureHttpError,
  HttpResponse,
} from '@titicaca/fetcher'
import { generateUrl } from '@titicaca/view-utilities'
import qs from 'qs'

import { ResourceType, Reply } from './types'

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

  const confirmedResponse = confirmAuthorization<Reply[]>(response)
  const replies = parseRepliesListResponse(confirmedResponse)

  return replies
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

  const confirmedResponse = confirmAuthorization<Reply[]>(response)
  const replies = parseRepliesListResponse(confirmedResponse)

  return replies
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

  const confirmedResponse = confirmAuthorization<Reply>(response)
  const reply = parseReplyResponse(confirmedResponse)

  return reply
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

  const confirmedResponse = confirmAuthorization<Reply>(response)
  const reply = parseReplyResponse(confirmedResponse)

  return reply
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

  const confirmedResponse = confirmAuthorization<Reply>(response)
  const reply = parseReplyResponse(confirmedResponse)

  return reply
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

  const confirmedResponse = confirmAuthorization<Reply>(response)
  const reply = parseReplyResponse(confirmedResponse)

  return reply
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

function parseRepliesListResponse(
  response: HttpResponse<Reply[], unknown>,
): Reply[] {
  if (response.ok) {
    const { parsedBody } = response
    const sortedReplies = parsedBody.map((reply) => sortChildren(reply))

    return sortedReplies
  } else {
    return []
  }
}

function parseReplyResponse(
  response: HttpResponse<Reply, unknown>,
): Reply | undefined {
  if (response.ok) {
    const { parsedBody } = response

    return sortChildren(parsedBody)
  }
}

function confirmAuthorization<T>(
  response: 'NEED_LOGIN' | HttpResponse<T, unknown>,
): HttpResponse<T, unknown> {
  if (response === 'NEED_LOGIN') {
    throw new Error('로그인이 필요한 호출입니다.')
  }

  captureHttpError(response)

  return response
}

function sortChildren(reply: Reply): Reply {
  const sortedChildReplies = reply.children.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  )

  const result = {
    ...reply,
    children: sortedChildReplies,
  }

  return result
}
