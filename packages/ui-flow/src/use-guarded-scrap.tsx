import { useSessionAvailability } from '@titicaca/react-contexts'
import { useTripleClientMetadata } from '@titicaca/react-triple-client-interfaces'
import {
  useTransitionModal,
  TransitionType,
  useLoginCtaModal,
} from '@titicaca/modals'
import { useScrap } from '@titicaca/tds-widget'

/**
 * 모웹이거나 세션ID가 없을 때 스크랩이 작동하면 안된다.
 */
export function useGuardedScrap({
  beforeScrapedChange,
  ...props
}: Parameters<typeof useScrap>[0]) {
  const app = useTripleClientMetadata()
  const sessionAvailable = useSessionAvailability()
  const { show: showTransitionModal } = useTransitionModal()
  const { show: showLoginCta } = useLoginCtaModal()

  const { deriveCurrentStateAndCount, onScrape, onUnscrape } = useScrap({
    beforeScrapedChange: (target, scraped) => {
      if (!app) {
        showTransitionModal(TransitionType.Scrap)
        return false
      }

      if (sessionAvailable === false) {
        showLoginCta(undefined, 'POI저장')
        return false
      }

      if (beforeScrapedChange) {
        return beforeScrapedChange(target, scraped)
      }
      return true
    },
    ...props,
  })

  return {
    onGuardedScrape: onScrape,
    onGuardedUnscrape: onUnscrape,
    deriveCurrentStateAndCount,
  }
}
