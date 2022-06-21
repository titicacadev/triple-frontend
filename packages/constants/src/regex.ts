/**
 * 삼성 스마트폰 천지인 middle dot 입력 이슈
 * https://github.com/titicacadev/triple-hotels-web/issues/1923
 */
const KOREAN_MIDDLE_DOT_UNICODES = '\u318D\u119E\u11A2\u2022\u2025\u00B7\uFE55'
const KOREAN_VOWEL_UNICODES = '\u314F-\u3163'

/**
 * TODO:
 * > 미묘하게 중복되는 정규식을 한 번에 관리할 만한 방법이 있을까요?
 * > 예를 들어 한글 문자열이라던지..
 * - https://github.com/titicacadev/triple-frontend/pull/1010#pullrequestreview-517340132
 */
export const ENNAME_REGEX = /^[A-Z\s]+$/
export const KONAME_REGEX = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]+$/
export const NAME_REGEX = /^([가-힣]{1,100}|[a-zA-Z]{2,32})$/
export const FULL_NAME_REGEX =
  /^([가-힣]{2,100}|[a-zA-Z]{2,32}\s?[a-zA-Z]{2,32})$/

export const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
export const PHONE_REGEX =
  /^(010[-. ]?([0-9]{4})|(011|016|017|018|019)[-. ]?([0-9]{3,4}))[-. ]?([0-9]{4})$/
export const DATE_REGEX =
  /^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])$/
export const CARD_NUMBER_REGEX = /^[1-9][0-9]{11,15}$/
export const CARD_PASSWORD_NUMBER_REGEX = /^[0-9]{2}$/
export const ONLY_MONTH_DAY_DATE_REGEX =
  /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/
export const ZIP_CODE_REGEX = /^[0-9]{5}$/
export const ADDRESS_REGEX = /^([a-zA-Z]|[0-9]|[ ]){1,35}$/

export const SLASH_HYPHEN_REGEX = /(\/|-)/g
export const KOREAN_REGEX = /[ㄱ-ㅎㅏ-ㅣ가-힣]+/g
export const PASSPORT_NUMBER_REGEX = /[^A-Z0-9]+/g
export const ALPHABET_REGEX = /([^a-zA-Z])+/g
export const PASSPORT_NAME_REGEX = new RegExp(
  `([^ㄱ-ㅎ가-힣${KOREAN_VOWEL_UNICODES}${KOREAN_MIDDLE_DOT_UNICODES}|a-zA-Z])+`,
  'g',
)
