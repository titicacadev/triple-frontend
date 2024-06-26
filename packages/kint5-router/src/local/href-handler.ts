import { useRouter } from 'next/router'
import {
  useTripleClientMetadata,
  useTripleClientNavigate,
  AppSpecificLinkProps,
} from '@titicaca/react-triple-client-interfaces'

import { useWebUrlBaseAdder } from '../common/add-web-url-base'
import { HrefProps } from '../common/types'
import { TargetProps } from '../common/target'

import { useBasePathAdder } from './base-path'

export interface NextjsRoutingOptions {
  /**
   * 현재 창을 history에 남기지 않고 이동합니다. target="current"일 때만 작동합니다.
   */
  replace?: boolean
  /**
   * 현재창에서 라우팅할 때 페이지 스크롤을 상단으로 올릴지 여부를 결정합니다.
   * 기본 값 true
   */
  scroll?: boolean
  /**
   * 현재창에서 URL을 변경할 때 data fetching(getServerSideProps, getStaticProps, getInitialProps)을 하지 않습니다.
   * 기본 값 false
   */
  shallow?: boolean
}

export function useLocalHrefHandler() {
  const router = useRouter()
  const app = useTripleClientMetadata()
  const { openInlink, openOutlink } = useTripleClientNavigate()
  const addWebUrlBase = useWebUrlBaseAdder()
  const addBasePath = useBasePathAdder()

  const handleNextjsRouting = async (
    href: string,
    { replace, scroll = true, shallow = false }: NextjsRoutingOptions,
  ): Promise<void> => {
    const success = await router[replace ? 'replace' : 'push'](
      href,
      undefined,
      {
        scroll,
        shallow,
      },
    )
    if (success && scroll) {
      window.scrollTo(0, 0)
    }
  }

  const handleHrefLocally = async ({
    href,
    target,
    lnbTarget,
    noNavbar,
    shouldPresent,
    swipeToClose,
    replace,
    scroll,
    shallow,
    isKeyPressing,
    prependBasePath,
    stopDefaultHandler,
  }: HrefProps &
    TargetProps &
    NextjsRoutingOptions &
    AppSpecificLinkProps & {
      isKeyPressing: boolean
      stopDefaultHandler: () => void
    }) => {
    if (target === 'current' && isKeyPressing === false) {
      stopDefaultHandler()

      await handleNextjsRouting(href, { replace, scroll, shallow })

      return
    }

    const finalHref = prependBasePath ? addBasePath(href) : href

    if (target === 'new' && app) {
      stopDefaultHandler()

      // 인링크 및 딥링크는 앱에서 자체적으로 locale을 처리하므로,
      // locale path를 제거한 href를 전달합니다.
      const localePathRemovedHref = finalHref.replace(/^\/(ko|ja|en|zh-TW)/, '')

      openInlink(localePathRemovedHref, {
        lnbTarget,
        noNavbar,
        shouldPresent,
        swipeToClose,
      })

      return
    }

    if (target === 'browser' && app) {
      stopDefaultHandler()

      openOutlink(addWebUrlBase(finalHref), {
        target: 'browser',
      })
    }
  }

  return handleHrefLocally
}
