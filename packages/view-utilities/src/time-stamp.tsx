import React from 'react'
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

export function formatTimestamp(date: string) {
  const createdAt = moment(date)

  if (moment().subtract(1, 'minute').isBefore(createdAt)) {
    return createdAt.fromNow(true)
  } else if (moment().subtract(1, 'week').isBefore(createdAt)) {
    return createdAt.fromNow()
  }

  return createdAt.format('YYYY.M.D')
}

export function timeStamp({ date }: { date: string }) {
  return <>{formatTimestamp(date)}</>
}
