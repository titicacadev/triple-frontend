import moment from 'moment-timezone'

moment.updateLocale('ko', {
  relativeTime: {
    s: '방금',
  },
})
moment.relativeTimeRounding(Math.floor)
moment.relativeTimeThreshold('s', 60)
moment.relativeTimeThreshold('m', 60)
moment.relativeTimeThreshold('h', 24)
moment.locale('ko')

export default function ReviewTimestamp({ children }) {
  const createdAt = moment(children)

  if (
    moment()
      .subtract(1, 'minute')
      .isBefore(createdAt)
  ) {
    return createdAt.fromNow(true)
  } else if (
    moment()
      .subtract(1, 'week')
      .isBefore(createdAt)
  ) {
    return createdAt.fromNow()
  }

  return createdAt.format('YYYY.M.D')
}
