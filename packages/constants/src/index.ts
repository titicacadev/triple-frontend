export const SESSION_KEY = 'x-soto-session'

/** Regex */
export const FULL_NAME_REGEX = /^([가-힣]{2,100}|[a-zA-Z]{2,32}\s?[a-zA-Z]{2,32})$/
export const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
export const ENNAME_REGEX = /^[A-Z\s]+$/

export const NAME_REGEX = /^([가-힣]{2,100}|[a-zA-Z]{2,32}\s?[a-zA-Z]{2,32})$/
export const PHONE_REGEX = /^(010[-. ]?([0-9]{3,4})|(011|016|017|018|019)[-. ]?([0-9]{3,4}))[-. ]?([0-9]{4})$/
export const DATE_REGEX = /^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])$/
export const CARD_NUMBER_REGEX = /^[1-9][0-9]{11,15}$/
export const CARD_PASSWORD_NUMBER_REGEX = /^[0-9]{2}$/
export const ONLY_MONTH_DAY_DATE_REGEX = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/
export const ZIP_CODE_REGEX = /^[0-9]{5}$/
export const ADDRESS_REGEX = /^([a-zA-Z]|[0-9]|[ ]){1,35}$/
export const KONAME_REGEX = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]+$/

export const SLASH_HYPHEN_REGEX = /(\/|-)/g
export const KOREAN_REGEX = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]+/g
export const PASSPORT_NUMBER_REGEX = /[^A-Z0-9]+/g
