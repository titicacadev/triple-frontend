import { withCustomOptions } from './polyline-base'

export * from './polyline-base'

/**
 * Line-Style Polyline
 *
 * e.g. 체크리스트 v2 일정짜기 결과 페이지
 */
export const DotPolyline = withCustomOptions({
  icons: [
    {
      icon: {
        path: 'M 0,-1 0,1',
        strokeOpacity: 1,
        strokeWeight: 3,
        scale: 1,
      },
      offset: '2px 2px',
      repeat: '8px',
    },
  ],
})

/**
 * Dot-style Polyline
 * e.g. 체크리스트 v2 경로상 추천 결과 페이지
 */
export const Polyline = withCustomOptions({
  strokeColor: '#FF0000',
  strokeOpacity: 0.8,
})
