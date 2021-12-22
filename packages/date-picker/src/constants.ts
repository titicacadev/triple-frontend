import moment from 'moment'
import MomentLocaleUtils from 'react-day-picker/moment'

export const LOCALE = 'ko'
export const WEEKDAY_SHORT_LABEL = moment.localeData('ko').weekdaysShort()
export const LOCALE_UTILS = { ...MomentLocaleUtils, formatMonthTitle }

function formatMonthTitle(d: Date, locale: string = LOCALE): string {
  moment.locale(locale)
  return moment(d).format('YYYY년 Mo')
}
