import { useScrap } from '../scrap'

import type { ScrapButtonProps } from './types'

export function useScrapButton({
  resource: { id, type, scraped },
  eventParams,
}: ScrapButtonProps) {
  const { onScrape, onUnscrape, deriveCurrentStateAndCount } = useScrap()
  const { scraped: actualScraped } = deriveCurrentStateAndCount({ id, scraped })

  const handleToggleScrape = () => {
    const toggleScrape = actualScraped ? onUnscrape : onScrape
    toggleScrape({ id, type, eventParams })
  }

  return [actualScraped, handleToggleScrape] as const
}
