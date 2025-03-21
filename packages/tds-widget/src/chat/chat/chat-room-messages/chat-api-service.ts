import qs from 'qs'

import {
  ChatMessageInterface,
  ChatUserInterface,
  HasUnreadOfRoomInterface,
  ReactionType,
  UserType,
} from '../../types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type BodyType = BodyInit | { [key: string]: any } | undefined

export interface ChatFetcherOptions<B = BodyType> {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  body?: B
  parseBody?: boolean
  [key: string]: unknown
}

export type ChatFetcher<
  B = BodyType,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T = any,
> = (url: string, options?: ChatFetcherOptions<B>) => Promise<T>

interface ReactionPayload {
  messageId: number
  reactionType: ReactionType
}

interface Sender {
  id: ChatUserInterface['id']
  profile: {
    name: ChatUserInterface['profile']['name']
  }
}

export class ChatApiService<T = UserType> {
  private fetcher: ChatFetcher

  public constructor(fetcher: ChatFetcher) {
    this.fetcher = fetcher
  }

  public getMessages({
    roomId,
    backward,
    lastMessageId,
  }: {
    roomId: string
    backward?: boolean
    lastMessageId: number | string | null
  }): Promise<ChatMessageInterface<T>[]> {
    return this.fetcher(
      `/rooms/${roomId}/messages?${qs.stringify({ backward, lastMessageId })}`,
    )
  }

  public sendMessage({
    roomId,
    payload,
    sender,
  }: {
    roomId: string
    payload: ChatMessageInterface<T>['payload']
    sender?: Sender
  }): Promise<ChatMessageInterface<T>[]> {
    return this.fetcher(`/rooms/${roomId}/send`, {
      method: 'POST',
      body: { payload, sender },
    })
  }

  /**
   * unread 관련
   */
  public fetchGetUnreadRoom({
    roomId,
    lastSeenMessageId,
  }: {
    roomId: string
    lastSeenMessageId: number
  }): Promise<HasUnreadOfRoomInterface> {
    return this.fetcher(
      `/rooms/${roomId}/has-unread?lastSeenMessageId=${lastSeenMessageId}`,
    )
  }

  public updateLastSeenMessageId({
    roomId,
    lastSeenMessageId,
  }: {
    roomId: string
    lastSeenMessageId: number
  }): Promise<{ result: boolean }> {
    return this.fetcher(`/rooms/${roomId}/last-message`, {
      method: 'POST',
      body: { lastSeenMessageId },
    })
  }

  /**
   * reaction 관련
   */
  public addReaction({ messageId, reactionType }: ReactionPayload) {
    return this.fetcher('/reactions', {
      method: 'POST',
      body: { messageId, reactionType },
    })
  }

  public removeReaction({ messageId, reactionType }: ReactionPayload) {
    return this.fetcher(`/reactions/${reactionType}/messages/${messageId}`, {
      method: 'DELETE',
      parseBody: false,
    })
  }
}
