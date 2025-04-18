import { ChatMessageInterface } from '../../types'

export const DEFAULT_MESSAGE_PROPERTIES: Partial<ChatMessageInterface> = {
  displayTarget: 'all',
}

export const REACTION_ENABLED_MESSAGE_PROPERTIES: Partial<ChatMessageInterface> =
  {
    ...DEFAULT_MESSAGE_PROPERTIES,
    reactions: {
      thanks: {
        count: 0,
        haveMine: false,
      },
    },
  }
