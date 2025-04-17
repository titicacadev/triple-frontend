import {
  isBefore,
  subMinutes,
  formatDistanceToNow,
  setDefaultOptions,
  subWeeks,
  format,
} from 'date-fns'
import { ko } from 'date-fns/locale'

setDefaultOptions({
  locale: {
    ...ko,
    formatDistance: (token, count, options) => {
      if (token === 'lessThanXMinutes' && count === 1) {
        return '방금'
      }
      if (token === 'xMinutes') {
        return `${count}분${options?.addSuffix ? ' 전' : ''}`
      }
      if (token === 'aboutXHours') {
        return `${count}시간${options?.addSuffix ? ' 전' : ''}`
      } else if (token === 'xDays' && count <= 7) {
        return `${count}일${options?.addSuffix ? ' 전' : ''}`
      }
      return ko.formatDistance(token, count, options)
    },
  },
})

export function formatTimestamp(date: string | Date) {
  if (isBefore(subMinutes(new Date(), 1), date)) {
    return formatDistanceToNow(date)
  } else if (isBefore(subWeeks(new Date(), 1), date)) {
    return formatDistanceToNow(date, { addSuffix: true })
  }
  return format(date, 'y.M.d')
}
