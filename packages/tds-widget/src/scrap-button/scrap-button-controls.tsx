import { PropsWithChildren, createContext, useContext, useMemo } from 'react'

import { ScrapProps } from '../scrap/types'
import { useScrap } from '../scrap/use-scrap'

const ScrapButtonControlContext = createContext<
  ReturnType<typeof useScrap> | undefined
>(undefined)

export function ScrapButtonControls({
  scraps: initialScraps = {},
  beforeScrapedChange,
  afterScrapedChange,
  children,
}: PropsWithChildren<ScrapProps>) {
  const { deriveCurrentStateAndCount, onScrape, onUnscrape } = useScrap({
    scraps: initialScraps,
    beforeScrapedChange,
    afterScrapedChange,
  })

  const values = useMemo(
    () => ({
      deriveCurrentStateAndCount,
      onScrape,
      onUnscrape,
    }),
    [deriveCurrentStateAndCount, onScrape, onUnscrape],
  )

  return (
    <ScrapButtonControlContext.Provider value={values}>
      {children}
    </ScrapButtonControlContext.Provider>
  )
}

export function useScrapControl() {
  const context = useContext(ScrapButtonControlContext)

  if (!context) {
    return undefined
  }

  return context
}
