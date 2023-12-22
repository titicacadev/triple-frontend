import { generateUrl } from '@titicaca/view-utilities'
import qs from 'qs'

export interface OutlinkParams {
  /**
   * Outlink로 만들 absolute URL.
   */
  url: string
  /**
   * - browser: 해당 url을 아웃링크로 실행합니다.
   */
  target?: 'browser'
  /**
   *
   */
  title?: string
}

export function makeOutlink(scheme: string, params: OutlinkParams) {
  return generateUrl({
    scheme,
    path: '/outlink',
    query: qs.stringify({
      url: params.url,
      target: params.target,
      title: params.title,
    }),
  })
}
