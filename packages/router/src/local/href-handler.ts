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

    const finalHref = addBasePath(href)

    if (target === 'new' && app) {
      stopDefaultHandler()

      openInlink(finalHref, {
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
