import moment from 'moment'
import { getTranslation } from '@titicaca/next-i18next'

export function i18nFormatRelativeTime(dateTimeString: string) {
  const t = getTranslation('common-web')

  const dateTime = moment.utc(dateTimeString)
  const now = moment.utc()
  const diff = moment.duration(now.diff(dateTime))

  if (diff.as('hours') < 1) {
    const minutes = Math.floor(diff.as('minutes'))
    return t('{{minutes}}분 전', {
      minutes,
    })
  }

  if (diff.as('hours') < 24) {
    const hours = Math.floor(diff.as('hours'))
    return t('{{hours}}시간 전', {
      hours,
    })
  }

  if (diff.as('days') < 7) {
    const days = Math.floor(diff.as('days'))
    return t('{{days}}일 전', {
      days,
    })
  }

  return dateTime.format(t('YYYY년 MM월 DD일'))
}
