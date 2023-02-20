import { css } from 'styled-components'

import { GlobalSizes } from '../commons'

const SIZES: { [key in GlobalSizes]: string } = {
  mini: '12px',
  tiny: '13px',
  small: '14px',
  medium: '15px',
  large: '16px',
  big: '19px',
  huge: '21px',
  massive: '24px',
}

/**
 * Create text style css
 * @param fontSize font-size
 * @param lineHeight line-height
 * @param letterSpacing letter-spacing
 */
export const textStyle = (
  fontSize: number,
  lineHeight: number,
  letterSpacing: number,
) =>
  css`
    font-size: ${fontSize}px;
    line-height: ${lineHeight}px;
    letter-spacing: ${letterSpacing}px;
  `

/**
 * 기존 스펙 그대로 text style 을 생성하는 함수
 * @deprecated
 * @param fontSize
 * @param lineHeight
 * @param letterSpacing
 */
export const _unsafeTextStyle = (
  fontSize: GlobalSizes | number = 'large',
  lineHeight: number | string = 1.2,
  letterSpacing = 0,
) => {
  const size = typeof fontSize === 'string' ? SIZES[fontSize] : `${fontSize}px`
  return css`
    font-size: ${size};
    line-height: ${lineHeight};
    letter-spacing: ${letterSpacing}px;
  `
}

export const TextStyleMap = {
  /* 가계부 금액 */
  L6: textStyle(36, 47, -0.3),
  /* 서비스메인, 도시메인 타이틀 */
  M8: textStyle(28, 37, -0.3),
  /* 쿠폰 금액 */
  M6: textStyle(28, 35, -0.3),
  /* 타이틀 */
  M4: textStyle(24, 33, -0.3),
  /* 금액 가격 등 숫자 */
  M2: textStyle(22, 31, -0.2),
  /* 서비스메인 카드 타이틀 */
  M1: textStyle(21, 29, -0.2),
  /* 목록, 타이틀 */
  M: textStyle(20, 24, -0.2),
  /* 서비스메인 타이틀 */
  S9: textStyle(19, 23, -0.2),
  /* 서비스 메인 타이틀 */
  S8: textStyle(18, 21, -0.2),
  /* 상단 네비게이션바 타이틀 */
  S7: textStyle(17, 20, -0.1),
  /* 본문, 도시메인 카드 타이틀, POI 타이틀, 최근검색어 */
  S6: textStyle(16, 19, -0.1),
  /* 본문 */
  S5: textStyle(15, 19, -0.1),
  /* 본문, 날짜 */
  S4: textStyle(14, 24, -0.1),
  /* 도시메인카드 본문, 서브 설명 */
  S3: textStyle(13, 23, 0),
  /* 부가설명, 일정판 요일 */
  S2: textStyle(12, 22, 0),
}
/* eslint-enable @typescript-eslint/naming-convention */

export function getTextStyle(type: KeyOfTextStyleMap) {
  return TextStyleMap[type]
}

export type KeyOfTextStyleMap = keyof typeof TextStyleMap
export type TextStyleMapType = { [key in KeyOfTextStyleMap]: string }

interface Params {
  textStyle?: KeyOfTextStyleMap
  size?: GlobalSizes | number
  lineHeight?: number | string
  letterSpacing?: number
}

export const textStyleMixin = ({
  textStyle,
  size,
  lineHeight,
  letterSpacing,
}: Params) => {
  if (textStyle && (size || lineHeight || letterSpacing)) {
    // TODO: development 환경에서만 기록하는 logger 만들기
    // eslint-disable-next-line no-console
    console.warn(
      "🙅🏻‍♂️\n[Warn] Please don't use `size`, `lineHeight` and `letterSpacing` with `textStyle` together. \nIf they are used together, `size` and `lineHeight` will be omit. See \nhttps://github.com/titicacadev/triple-frontend/issues/401",
    )
  }

  return textStyle
    ? getTextStyle(textStyle)
    : _unsafeTextStyle(size, lineHeight, letterSpacing)
}
