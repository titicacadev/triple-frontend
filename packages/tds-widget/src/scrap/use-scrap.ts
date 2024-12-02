import { useCallback, useContext } from 'react'
import {
  useClientApp,
  useClientAppActions,
  useLoginCtaModal,
  useSessionAvailability,
  useTrackEventWithMetadata,
  useAppInstallCtaModal,
} from '@titicaca/triple-web'

import type { Target } from './types'
import { fetchScrape, fetchUnscrape } from './services'
import {
  START_SCRAPE,
  SCRAPE,
  SCRAPE_FAILED,
  START_UNSCRAPE,
  UNSCRAPE,
  UNSCRAPE_FAILED,
} from './constants'
import { ScrapContext, ScrapDispatchContext } from './context'

export function useScrap(param?: { scrapableInApp?: boolean }) {
  const scrapsContext = useContext(ScrapContext)
  const dispatch = useContext(ScrapDispatchContext)

  if (!scrapsContext || !dispatch) {
    throw new Error('ScrapProvider가 없습니다.')
  }

  const { scraps, updating, beforeScrapedChange, onScrapeFailed } =
    scrapsContext

  const app = useClientApp()
  const { notifyScraped, notifyUnscraped } = useClientAppActions()
  const sessionAvailable = useSessionAvailability()
  const { show: showLoginCta } = useLoginCtaModal()
  const { show: showAppInstallCtaModal } = useAppInstallCtaModal()
  const trackEventWithMetadata = useTrackEventWithMetadata()

  const scrapableInApp =
    param?.scrapableInApp !== undefined ? param.scrapableInApp : true

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
      if (
        beforeScrapedChange &&
        beforeScrapedChange({ id, type }, true) === false
      ) {
        return
      }

      if (typeof updating[id] !== 'undefined') {
        return
      }

      if (scrapableInApp && !app) {
        return showAppInstallCtaModal({ triggeredEventAction: 'POI저장' })
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
        onScrapeFailed?.({ id, type }, false, response.parsedBody.message)
        dispatch({ type: SCRAPE_FAILED, id })
      }
    },
    [
      beforeScrapedChange,
      updating,
      scrapableInApp,
      app,
      sessionAvailable,
      dispatch,
      showAppInstallCtaModal,
      showLoginCta,
      notifyScraped,
      trackEventWithMetadata,
      onScrapeFailed,
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
      if (
        beforeScrapedChange &&
        beforeScrapedChange({ id, type }, true) === false
      ) {
        return
      }

      if (typeof updating[id] !== 'undefined') {
        return
      }

      if (scrapableInApp && !app) {
        return showAppInstallCtaModal({ triggeredEventAction: 'POI저장' })
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
        onScrapeFailed?.({ id, type }, true, response.parsedBody.message)
        dispatch({ type: UNSCRAPE_FAILED, id })
      }
    },
    [
      beforeScrapedChange,
      updating,
      scrapableInApp,
      app,
      sessionAvailable,
      dispatch,
      showAppInstallCtaModal,
      showLoginCta,
      notifyUnscraped,
      trackEventWithMetadata,
      onScrapeFailed,
    ],
  )

  return { deriveCurrentStateAndCount, onScrape, onUnscrape }
}
