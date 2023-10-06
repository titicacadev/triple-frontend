import moment from 'moment'
import MomentLocaleUtils from 'react-day-picker/moment'

import { formatMonthTitle } from './utils'

export const LOCALE = 'ko'
export const WEEKDAY_SHORT_LABEL = moment.localeData('ko').weekdaysShort()
export const LOCALE_UTILS = { ...MomentLocaleUtils, formatMonthTitle }
