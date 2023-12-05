import { useTrackEventWithMetadata } from '@titicaca/triple-web'

import { useScrap } from '../scrap/use-scrap'

import type { ScrapButtonProps } from './types'
import { useScrapControl } from './scrap-button-controls'

export function useScraped({
  resource: { id, type, scraped },
}: ScrapButtonProps) {
  const { onScrape, onUnscrape, deriveCurrentStateAndCount } = useScrap()
  const scrapControlActions = useScrapControl()
  const { scraped: actualScraped } = deriveCurrentStateAndCount({ id, scraped })
  const trackEventWithMetadata = useTrackEventWithMetadata()

  const scrape = scrapControlActions?.onScrape ?? onScrape
  const unscrape = scrapControlActions?.onUnscrape ?? onUnscrape

  const handleToggleScrape = () => {
    const toggleScrape = actualScraped ? unscrape : scrape
    toggleScrape({ id, type })

    if (scrapControlActions !== undefined) {
      return
    }

    const action = actualScraped ? 'POI저장취소' : 'POI저장'

    trackEventWithMetadata({
      ga: [action, `${id}`],
      fa: {
        action,
        item_id: id,
        content_type: type,
      },
    })
  }

  return [actualScraped, handleToggleScrape] as const
}
