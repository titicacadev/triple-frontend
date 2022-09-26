import { parse } from 'qs'
import { parseUrl, generateUrl } from '@titicaca/view-utilities'

export function canonizeTargetAddress({
  href,
  webUrlBase,
  expandInlinkStrictly,
  allowRawOutlink,
}: {
  href: string
  webUrlBase: string
  /**
   * /inlink를 풀어야 하는지 여부를 결정합니다. true로 설정하면 /inlink의 path
   * 부분을 반환합니다.
   */
  expandInlinkStrictly: boolean
  /**
   * Canonized URL을 사용하는 곳에서 /outlink 형식의 링크를 지원하는지 여부를
   * 명시합니다. In-app 브라우저에서는 사용 가능하나, 일반 브라우저에서는
   * 불가능하므로 일반 브라우저에서 동작하는 경우 false를 할당합니다.
   *
   * 이 경우, /outlink의 url 인자로 전달된 주소를 반환하여 해당 페이지로의
   * Navigation이 일어날 수 있도록 합니다.
   */
  allowRawOutlink?: boolean
}): string {
  const { host: webUrlBaseHost } = parseUrl(webUrlBase)
  const { host, path, query, ...rest } = parseUrl(href)

  if (host && webUrlBaseHost === host) {
    return generateUrl({ path, query, ...rest, scheme: undefined })
  } else if (host) {
    return href
  } else if (path === '/inlink') {
    const { path, _web_expand: expandable } = parse(query as string)
    const forceExpand = expandable !== undefined

    return !expandInlinkStrictly || forceExpand ? (path as string) : href
  } else if (!allowRawOutlink && path === '/outlink') {
    const { url } = parse(query as string)

    return canonizeTargetAddress({
      href: url as string,
      webUrlBase,
      expandInlinkStrictly,
    })
  }

  return href
}
