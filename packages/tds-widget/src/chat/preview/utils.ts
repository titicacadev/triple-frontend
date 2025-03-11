import { format, isSameDay } from 'date-fns'

import { RichItemText } from '../bubble/type'
import { MessagePayload } from '../types'

export const getTextMessage = (payload: MessagePayload) => {
  const replaceNewlinesWithSpaces = (text: string) =>
    text.replace(/(\r\n|\n|\r)/gm, ' ')

  switch (payload.type) {
    case 'text':
      return replaceNewlinesWithSpaces(payload.message)
    case 'images':
      return '사진을 보냈습니다.'
    case 'rich': {
      const textTypeMessage = payload.items.find(
        ({ type }) => type === 'text',
      ) as RichItemText
      return replaceNewlinesWithSpaces(textTypeMessage?.message ?? '')
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
