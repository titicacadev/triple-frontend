import MomentLocaleUtils from 'react-day-picker/moment'

import { formatMonthTitle } from './utils'

export const LOCALE = 'ko'
export const WEEKDAY_SHORT_LABEL = ['일', '월', '화', '수', '목', '금', '토']
export const LOCALE_UTILS = { ...MomentLocaleUtils, formatMonthTitle }
