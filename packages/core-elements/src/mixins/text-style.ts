import { css as _ } from 'styled-components'

/**
 * TODO:
 * - [ ] TF/Theme 가 설정되면 refactoring 예약
 */

/**
 * Create text style css
 * @param size font-size
 * @param lineHeight line-height
 * @param letterSpacing letter-spacing
 */
export const textStyle = (
  size: number,
  lineHeight: number,
  letterSpacing: number,
) => () =>
  _`
  font-size: ${size};
  line-height: ${lineHeight};
  letter-spacing: ${letterSpacing};`

export const TextStyleMap = {
  /* 가계부 금액 */
  l6: textStyle(36, 47, -0.3),
  /* 서비스메인, 도시메인 타이틀 */
  m8: textStyle(28, 37, -0.3),
  /* 쿠폰 금액 */
  m6: textStyle(28, 35, -0.3),
  /* 타이틀 */
  m4: textStyle(24, 33, -0.3),
  /* 금액 가격 등 숫자 */
  m2: textStyle(22, 31, -0.2),
  /* 서비스메인 카드 타이틀 */
  m1: textStyle(21, 29, -0.2),
  /* 목록, 타이틀 */
  m: textStyle(20, 24, -0.2),
  /* 서비스메인 타이틀 */
  s9: textStyle(19, 23, -0.2),
  /* 서비스 메인 타이틀 */
  s8: textStyle(18, 21, -0.2),
  /* 상단 네비게이션바 타이틀 */
  s7: textStyle(17, 20, -0.1),
  /* 본문, 도시메인 카드 타이틀, POI 타이틀, 최근검색어 */
  s6: textStyle(16, 19, -0.1),
  /* 본문 */
  s5: textStyle(15, 19, -0.1),
  /* 본문, 날짜 */
  s4: textStyle(14, 24, -0.1),
  /* 도시메인카드 본문, 서브 설명 */
  s3: textStyle(13, 23, 0),
  /* 부가설명, 일정판 요일 */
  s2: textStyle(12, 22, 0),
}

export interface TextStyleMap {
  textStyle: { [key in keyof typeof TextStyleMap]: string }
}
