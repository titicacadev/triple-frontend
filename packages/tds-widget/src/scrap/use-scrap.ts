import { useCallback, useEffect, useReducer } from 'react'
import {
  TransitionType,
  useClientApp,
  useClientAppActions,
  useLoginCtaModal,
  useSessionAvailability,
  useTrackEventWithMetadata,
  useTransitionModal,
} from '@titicaca/triple-web'

import type { Scraps, Target } from './types'
import { reducer } from './use-reducer'
import { fetchScrape, fetchUnscrape } from './services'
import {
  START_SCRAPE,
  SCRAPE,
  SCRAPE_FAILED,
  START_UNSCRAPE,
  UNSCRAPE,
  UNSCRAPE_FAILED,
} from './constants'

export interface UseScrapParams {
  initialScraps?: Scraps
}

export function useScrap(params?: UseScrapParams) {
  const app = useClientApp()
  const {
    notifyScraped,
    notifyUnscraped,
    subscribeScrapedChangeEvent,
    unsubscribeScrapedChangeEvent,
  } = useClientAppActions()
  const sessionAvailable = useSessionAvailability()
  const { show: showLoginCta } = useLoginCtaModal()
  const { show: showTransitionModal } = useTransitionModal()
  const trackEventWithMetadata = useTrackEventWithMetadata()

  const [{ scraps, updating }, dispatch] = useReducer(reducer, {
    scraps: params?.initialScraps ?? {},
    updating: {},
  })

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
    async ({
      id,
      type,
      eventParams = {
        ga: ['POI저장', `${id}`],
        fa: {
          action: 'POI저장',
          item_id: id,
          content_type: type,
        },
      },
    }: Target) => {
      if (typeof updating[id] !== 'undefined') {
        return
      }

      if (!app) {
        return showTransitionModal(TransitionType.Scrap)
      }

      if (!sessionAvailable) {
        return showLoginCta({ triggeredEventAction: 'POI저장' })
      }

      dispatch({ type: START_SCRAPE, id })

      const response = await fetchScrape({ id, type })

      if (response.ok) {
        notifyScraped?.(id)
        trackEventWithMetadata(eventParams)
        dispatch({ type: SCRAPE, id })
      } else {
        dispatch({ type: SCRAPE_FAILED, id })
      }
    },
    [
      updating,
      app,
      sessionAvailable,
      showTransitionModal,
      showLoginCta,
      notifyScraped,
      trackEventWithMetadata,
    ],
  )

  const onUnscrape = useCallback(
    async ({
      id,
      type,
      eventParams = {
        ga: ['POI저장취소', `${id}`],
        fa: {
          action: 'POI저장취소',
          item_id: id,
          content_type: type,
        },
      },
    }: Target) => {
      if (typeof updating[id] !== 'undefined') {
        return
      }

      if (!app) {
        return showTransitionModal(TransitionType.Scrap)
      }

      if (!sessionAvailable) {
        return showLoginCta({ triggeredEventAction: 'POI저장취소' })
      }

      dispatch({ type: START_UNSCRAPE, id })

      const response = await fetchUnscrape({ id, type })

      if (response.ok) {
        notifyUnscraped?.(id)
        trackEventWithMetadata(eventParams)
        dispatch({ type: UNSCRAPE, id })
      } else {
        dispatch({ type: UNSCRAPE_FAILED, id })
      }
    },
    [
      updating,
      app,
      sessionAvailable,
      showTransitionModal,
      showLoginCta,
      notifyUnscraped,
      trackEventWithMetadata,
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

    subscribeScrapedChangeEvent?.(handleSubscribeEvent)

    return () => unsubscribeScrapedChangeEvent?.(handleSubscribeEvent)
  }, [dispatch, subscribeScrapedChangeEvent, unsubscribeScrapedChangeEvent])

  return { deriveCurrentStateAndCount, onScrape, onUnscrape }
}
