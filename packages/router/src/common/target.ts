export type TargetType = 'current' | 'new' | 'browser'

export interface TargetProps {
  /**
   * 페이지를 이동할 목표를 설정합니다.
   * `current`, `new`, `browser` 세 가지를 사용할 수 있습니다.
   * 각각 현재 창, 새 창(새 웹뷰), 기본 브라우저(앱에서만 작동)를 의미합니다.
   */
  target: TargetType
}

export const ANCHOR_TARGET_MAP: {
  [key in TargetType]: string
} = {
  current: '_self',
  new: '_blank',
  browser: '_blank',
}
