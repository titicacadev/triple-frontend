import {
  Attributes,
  ComponentType,
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
} from 'react'

import { ScrapProps } from '../scrap/types'
import { useScrap } from '../scrap/use-scrap'

const ScrapButtonControlContext =
  createContext<Parameters<typeof useScrap>[0]>(undefined)

export function ScrapButtonControls({
  scraps: initialScraps = {},
  beforeScrapedChange,
  afterScrapedChange,
  children,
}: PropsWithChildren<ScrapProps>) {
  const { deriveCurrentStateAndCount, onScrape, onUnscrape, enableTrackEvent } =
    useScrap({
      scraps: initialScraps,
      beforeScrapedChange,
      afterScrapedChange,
    })

  const values = useMemo(
    () => ({
      deriveCurrentStateAndCount,
      onScrape,
      onUnscrape,
      enableTrackEvent,
    }),
    [deriveCurrentStateAndCount, enableTrackEvent, onScrape, onUnscrape],
  )

  return (
    <ScrapButtonControlContext.Provider value={values}>
      {children}
    </ScrapButtonControlContext.Provider>
  )
}

export function withControls<P extends Attributes>(
  Component: ComponentType<P>,
) {
  function ComponentWithControls(props: P) {
    const controls = useContext(ScrapButtonControlContext)

    return <Component {...props} {...controls} />
  }

  return ComponentWithControls
}
