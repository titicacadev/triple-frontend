import { useTrackEventWithMetadata } from '@titicaca/triple-web'

import { useScrap } from '../scrap/use-scrap'

import type { ScrapButtonProps } from './types'

export function useScraped({
  resource: { id, type, scraped },
  onScrape: initialOnScrape,
  onUnscrape: initialOnUnscrape,
}: ScrapButtonProps) {
  const { onScrape, onUnscrape, deriveCurrentStateAndCount, enableTrackEvent } =
    useScrap()
  const { scraped: actualScraped } = deriveCurrentStateAndCount({ id, scraped })
  const trackEventWithMetadata = useTrackEventWithMetadata()

  const scrape = initialOnScrape ?? onScrape
  const unscrape = initialOnUnscrape ?? onUnscrape

  const handleToggleScrape = () => {
    const toggleScrape = actualScraped ? unscrape : scrape
    toggleScrape({ id, type })

    if (enableTrackEvent) {
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
  }

  return [actualScraped, handleToggleScrape] as const
}
