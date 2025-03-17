import { format, isSameDay } from 'date-fns'

import { ChatMessagePayload, ChatMessagePayloadType } from '../types'

export const getTextMessage = (payload: ChatMessagePayload) => {
  const replaceNewlinesWithSpaces = (text: string) =>
    text.replace(/(\r\n|\n|\r)/gm, ' ')

  switch (payload.type) {
    case ChatMessagePayloadType.TEXT:
      return replaceNewlinesWithSpaces(payload.message)
    case ChatMessagePayloadType.IMAGES:
      return '사진을 보냈습니다.'
    case ChatMessagePayloadType.RICH: {
      const textTypeMessage = payload.items.find((item) => item.type === 'text')
      return replaceNewlinesWithSpaces(
        (textTypeMessage &&
          'message' in textTypeMessage &&
          textTypeMessage.message) ||
          '',
      )
    }
    default:
      return ''
  }
}

export function convertDateTime(
  createdAt: string,
  formatType?: string,
): string {
  const dateTime = new Date(createdAt)
  const DATE_FORMAT = 'yyyy.MM.dd'

  if (isSameDay(dateTime, new Date())) {
    return format(dateTime, 'a h:mm')
  } else {
    return format(dateTime, formatType ?? DATE_FORMAT)
  }
}
