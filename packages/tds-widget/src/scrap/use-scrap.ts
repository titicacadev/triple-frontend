import { useCallback, useEffect } from 'react'
import { useTripleClientActions } from '@titicaca/react-triple-client-interfaces'

import type { ScrapProps, Target } from './types'
import { useScrapsReducer } from './use-reducer'
import { fetchScrape, fetchUnscrape } from './services'
import {
  START_SCRAPE,
  SCRAPE,
  SCRAPE_FAILED,
  START_UNSCRAPE,
  UNSCRAPE,
  UNSCRAPE_FAILED,
} from './constants'

export function useScrap({
  scraps: initialScraps = {},
  beforeScrapedChange,
  afterScrapedChange,
}: ScrapProps = {}) {
  const {
    notifyScraped,
    notifyUnscraped,
    subscribeScrapedChangeEvent,
    unsubscribeScrapedChangeEvent,
  } = useTripleClientActions()
  const { scraps, updating, dispatch } = useScrapsReducer({ initialScraps })

  const deriveCurrentStateAndCount = useCallback(
    ({
      id,
      scraped,
      scrapsCount: originalScrapsCount,
    }: {
      id: string
      scraped?: boolean
      scrapsCount?: number
    }) => {
      const currentState =
        typeof updating[id] !== 'undefined' ? updating[id] : scraps[id]
      const scrapsCount = Number(originalScrapsCount || 0)

      if (typeof scraped !== 'boolean' || typeof currentState !== 'boolean') {
        /* At least one of the status are unknown: Reduces to a bitwise OR operation */
        return {
          scraped: !!scraped || !!currentState,
          scrapsCount,
        }
      }

      return {
        scraped: currentState,
        scrapsCount:
          scraped === currentState
            ? scrapsCount
            : currentState
            ? scrapsCount + 1
            : scrapsCount - 1,
      }
    },
    [scraps, updating],
  )

  const onScrape = useCallback(
    async ({ id, type }: Target) => {
      if (typeof updating[id] !== 'undefined') {
        return
      }

      if (
        beforeScrapedChange &&
        beforeScrapedChange({ id, type }, true) === false
      ) {
        return
      }

      dispatch({ type: START_SCRAPE, id })

      const response = await fetchScrape({ id, type })

      if (response.ok) {
        notifyScraped && notifyScraped(id)

        afterScrapedChange && afterScrapedChange({ id, type }, true)

        dispatch({ type: SCRAPE, id })
      } else {
        dispatch({ type: SCRAPE_FAILED, id })
      }
    },
    [
      updating,
      beforeScrapedChange,
      dispatch,
      notifyScraped,
      afterScrapedChange,
    ],
  )

  const onUnscrape = useCallback(
    async ({ id, type }: Target) => {
      if (typeof updating[id] !== 'undefined') {
        return
      }

      if (
        beforeScrapedChange &&
        beforeScrapedChange({ id, type }, false) === false
      ) {
        return
      }

      dispatch({ type: START_UNSCRAPE, id })

      const response = await fetchUnscrape({ id, type })

      if (response.ok) {
        notifyUnscraped && notifyUnscraped(id)

        afterScrapedChange && afterScrapedChange({ id, type }, false)

        dispatch({ type: UNSCRAPE, id })
      } else {
        dispatch({ type: UNSCRAPE_FAILED, id })
      }
    },
    [
      updating,
      beforeScrapedChange,
      dispatch,
      notifyUnscraped,
      afterScrapedChange,
    ],
  )

  useEffect(() => {
    const handleSubscribeEvent = ({
      id,
      scraped,
    }: {
      id: string
      scraped: boolean
    }) => dispatch({ type: scraped ? SCRAPE : UNSCRAPE, id })

    subscribeScrapedChangeEvent &&
      subscribeScrapedChangeEvent(handleSubscribeEvent)

    return () =>
      unsubscribeScrapedChangeEvent &&
      unsubscribeScrapedChangeEvent(handleSubscribeEvent)
  }, [dispatch, subscribeScrapedChangeEvent, unsubscribeScrapedChangeEvent])

  return { deriveCurrentStateAndCount, onScrape, onUnscrape }
}
