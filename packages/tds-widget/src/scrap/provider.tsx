import { PropsWithChildren, useEffect, useReducer } from 'react'
import {
  subscribeScrapedChangeEvent,
  unsubscribeScrapedChangeEvent,
} from '@titicaca/triple-web-to-native-interfaces'

import { Scraps } from './types'
import { reducer } from './reducer'
import { SCRAPE, UNSCRAPE } from './constants'
import { ScrapContext, ScrapDispatchContext } from './context'

interface ScrapsProviderProps {
  initialScraps?: Scraps
}

export function ScrapsProvider({
  initialScraps,
  children,
}: PropsWithChildren<ScrapsProviderProps>) {
  const [value, dispatch] = useReducer(reducer, {
    scraps: initialScraps ?? {},
    updating: {},
  })

  useEffect(() => {
    const handleSubscribeEvent = ({
      id,
      scraped,
    }: {
      id: string
      scraped: boolean
    }) => dispatch({ type: scraped ? SCRAPE : UNSCRAPE, id })

    subscribeScrapedChangeEvent?.(handleSubscribeEvent)

    return () => unsubscribeScrapedChangeEvent?.(handleSubscribeEvent)
  }, [dispatch])

  return (
    <ScrapContext.Provider value={value}>
      <ScrapDispatchContext.Provider value={dispatch}>
        {children}
      </ScrapDispatchContext.Provider>
    </ScrapContext.Provider>
  )
}
