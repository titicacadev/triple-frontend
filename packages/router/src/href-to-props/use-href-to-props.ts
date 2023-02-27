import { useCallback } from 'react'
import qs, { ParsedQs } from 'qs'
import { useEnv } from '@titicaca/react-contexts'
import {
  checkIfRoutable,
  generateUrl,
  parseUrl,
} from '@titicaca/view-utilities'
import { useTripleClientMetadata } from '@titicaca/react-triple-client-interfaces'

import { AllowSource } from '../common/disabled-link-notifier'
import { TargetType } from '../common/target'

/**
 * 주어진 href가 절대 경로일 때 트리플의 URL이면 상대 경로로 바꿉니다.
 */
function removeTripleDomain({
  href,
  webUrlBase,
}: {
  href: string
  webUrlBase: string
}): string {
  const { host } = parseUrl(href)
  const { host: webUrlBaseHost } = parseUrl(webUrlBase)

  if (!host) {
    return href
  }

  // 절대 경로
  if (host === webUrlBaseHost) {
    // 트리플 URL
    return generateUrl(
      {
        scheme: undefined,
        host: undefined,
      },
      href,
    )
  }

  // 외부 URL
  return href
}

/**
 * query 파라미터의 타입을 string | undefined 타입으로 좁히는 함수
 * @param value query 파라미터로 들어있던 값
 */
function stringifyParsedQuery(
  value: string | string[] | ParsedQs | ParsedQs[] | undefined,
): string | undefined {
  if (Array.isArray(value)) {
    return stringifyParsedQuery(value)
  }

  if (typeof value === 'object') {
    throw new Error(`Query parameter is not string type. ${value}`)
  }

  return value
}

/**
 * inlink, outlink 등 앱 브릿지로 사용하는 URL의 query 속 실제 URL을 반환합니다.
 * 그 외의 URL은 원본을 그대로 반환합니다.
 */
function stripAppBridge(href: string): string {
  const { path, query } = parseUrl(href)

  if (path === '/inlink') {
    const { path } = qs.parse(query || '')

    const normalizedPath = stringifyParsedQuery(path)

    if (!normalizedPath) {
      throw new Error('inlink has no path.')
    }
    return normalizedPath
  }

  if (path === '/outlink') {
    const { url } = qs.parse(query || '')

    const normalizedUrl = stringifyParsedQuery(url)

    if (!normalizedUrl) {
      throw new Error('outlink has no url.')
    }
    return normalizedUrl
  }

  return href
}

/**
 * 다양한 종류의 URL을 a tag에 사용할 수 있는 값으로 다듬습니다.
 * @param href
 */
function canonizeHref({
  href,
  webUrlBase,
}: {
  href: string
  webUrlBase: string
}) {
  return removeTripleDomain({ href: stripAppBridge(href), webUrlBase })
}

/**
 * URL이 열리는 target을 설정합니다.
 *
 * * 'browser': 앱 내 브라우저가 아닌 앱 기본 브라우저에서 열립니다. 웹에선 새 창으로 열립니다.
 * * 'new': 새 창에서 열립니다.
 * * 'current': 현재 창에서 열립니다.
 *
 * outlink의 target search param이 browser로 설정되어 있으면 browser를 반환합니다.
 * 웹에선 현재창, 앱에선 새 창으로 설정합니다.
 * `navigate` 함수의 작동 방식을 옮겨온 것이기 때문에 이렇게 정해져있습니다.
 */
function getTarget({
  href,
  isPublic,
}: {
  href: string
  isPublic: boolean
}): TargetType {
  const { path, query } = parseUrl(href)

  if (path === '/outlink') {
    const { target } = qs.parse(query || '')

    if (target === 'browser') {
      return 'browser'
    }
  }

  return isPublic ? 'current' : 'new'
}

/**
 * allowSource를 결정합니다.
 *
 * routable한 링크는 모든 소스에서 열릴 수 있습니다.
 * routable하지 않으면 세션이 있는 app에서만 열립니다.
 * inlink이고 _web_expand 파라미터가 설정되어 있으면, routable 하지 않아도 웹에서 열립니다.
 */
function getAllowSource({
  href,
  webUrlBase,
}: {
  href: string
  webUrlBase: string
}): AllowSource {
  const { path, query } = parseUrl(href)

  if (path === '/inlink') {
    const { _web_expand: expandable } = qs.parse(query || '')

    if (expandable) {
      return 'all'
    }

    return checkIfRoutable({ href: stripAppBridge(href) })
      ? 'app'
      : 'app-with-session'
  }

  return checkIfRoutable({ href: canonizeHref({ href, webUrlBase }) })
    ? 'all'
    : 'app-with-session'
}

/**
 * href를 ExternalLink의 prop으로 변환하는 함수를 반환하는 훅
 * @returns href를 ExternalLink 컴포넌트의 prop으로 변환하는 함수
 */
export function useHrefToProps(params?: {
  /**
   * 변환 과정에서 발생한 에러 핸들러입니다.
   */
  onError?: (error: Error) => void
}): (
  /**
   * inlink나 outlink를 포함하는 href
   */
  href: string,
) => {
  /**
   * inlink, outlink는 각각 query에 들어있는 path나 URL을 빼냅니다.
   * 이후 트리플 도메인의 절대 경로(`https://triple.guide/...`)는 scheme과 host를 제거합니다.
   */
  href: string
  /**
   * 현재 환경이 웹일 땐 `current`, 앱일 땐 `new`를 반환합니다.
   * 단, outlink의 target query가 browser이면 `browser`를 반환합니다.
   */
  target: TargetType
  /**
   * | `checkIfRoutable` | inlink with `_web_expand` |       inlink       |       그 외        |
   * | ----------------: | :-----------------------: | :----------------: | :----------------: |
   * |              true |           `all`           |       `app`        |       `all`        |
   * |             false |    `app-with-session`     | `app-with-session` | `app-with-session` |
   */
  allowSource: AllowSource
} {
  const { webUrlBase } = useEnv()
  const app = useTripleClientMetadata()

  const { onError } = params || {}

  return useCallback(
    (href) => {
      try {
        return {
          href: canonizeHref({ href, webUrlBase }),
          target: getTarget({ href, isPublic: !app }),
          allowSource: getAllowSource({ href, webUrlBase }),
        }
      } catch (error) {
        if (onError) {
          onError(error as Error)
        }

        return { href, target: 'new', allowSource: 'app-with-session' }
      }
    },
    [app, onError, webUrlBase],
  )
}
