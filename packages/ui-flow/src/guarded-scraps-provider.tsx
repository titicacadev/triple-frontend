import { PropsWithChildren } from 'react'
import {
  ScrapsProvider,
  useSessionAvailability,
} from '@titicaca/react-contexts'
import { useTripleClientMetadata } from '@titicaca/react-triple-client-interfaces'
import {
  useTransitionModal,
  TransitionType,
  useLoginCtaModal,
} from '@titicaca/modals'

/**
 * 전역 스크랩 context에 가드를 추가하는 컴포넌트
 *
 * 모웹이거나 세션ID가 없을 때 스크랩이 작동하면 안된다.
 */
export function GuardedScrapsProvider({
  children,
  beforeScrapedChange,
  ...props
}: PropsWithChildren<Parameters<typeof ScrapsProvider>[0]>) {
  const app = useTripleClientMetadata()
  const sessionAvailable = useSessionAvailability()
  const { show: showTransitionModal } = useTransitionModal()
  const { show: showLoginCta } = useLoginCtaModal()

  return (
    <ScrapsProvider
      beforeScrapedChange={(target, scraped) => {
        if (!app) {
          showTransitionModal(TransitionType.Scrap)
          return false
        }

        if (sessionAvailable === false) {
          showLoginCta()
          return false
        }

        if (beforeScrapedChange) {
          return beforeScrapedChange(target, scraped)
        }
        return true
      }}
      {...props}
    >
      {children}
    </ScrapsProvider>
  )
}
