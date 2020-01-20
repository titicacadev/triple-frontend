import { css, CSSObject } from 'styled-components'

/**
 * TODO:
 * - [ ] TF/Theme 가 설정되면 refactoring 예약
 */

/**
 * chrome dev tool 기준
 */
const breakpoints = {
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
}

const device = {
  laptop: `(min-width: ${breakpoints.laptop})`,
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

export const mediaQuery = (style: any, fontSize: number) => css`
  ${style}

  @media ${device.laptop} {
    font-size: ${fontSize}px;
  }
`

export const TextStyleMap = {
  /* 가계부 금액 */
  L6: textStyle(36, 47, -0.3),
  /* 서비스메인, 도시메인 타이틀 */
  M8: textStyle(28, 37, -0.3),
  /* 쿠폰 금액 */
  M6: textStyle(28, 35, -0.3),
  /* 타이틀 */
  M4: mediaQuery(textStyle(24, 33, -0.3), 32),
  /* 금액 가격 등 숫자 */
  M2: textStyle(22, 31, -0.2),
  /* 서비스메인 카드 타이틀 */
  M1: mediaQuery(textStyle(21, 29, -0.2), 28),
  /* 목록, 타이틀 */
  M: textStyle(20, 24, -0.2),
  /* 서비스메인 타이틀 */
  S9: mediaQuery(textStyle(19, 23, -0.2), 22),
  /* 서비스 메인 타이틀 */
  S8: textStyle(18, 21, -0.2),
  /* 상단 네비게이션바 타이틀 */
  S7: textStyle(17, 20, -0.1),
  /* 본문, 도시메인 카드 타이틀, POI 타이틀, 최근검색어 */
  S6: mediaQuery(textStyle(16, 19, -0.1), 18),
  /* 본문 */
  S5: textStyle(15, 19, -0.1),
  /* 본문, 날짜 */
  S4: textStyle(14, 24, -0.1),
  /* 도시메인카드 본문, 서브 설명 */
  S3: textStyle(13, 23, 0),
  /* 부가설명, 일정판 요일 */
  S2: mediaQuery(textStyle(12, 22, 0), 14),
}

export function getTextStyle(type: KeyOfTextStyle) {
  return TextStyleMap[type]
}

export type KeyOfTextStyle = keyof typeof TextStyleMap
export type TextStyleMapType = { [key in KeyOfTextStyle]: string }
