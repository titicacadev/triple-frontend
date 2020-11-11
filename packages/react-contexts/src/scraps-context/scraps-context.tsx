import React, {
  ComponentType,
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react'
import { DeepPartial } from 'utility-types'
import {
  notifyScraped,
  notifyUnscraped,
  subscribeScrapedChangeEvent,
  unsubscribeScrapedChangeEvent,
} from '@titicaca/triple-web-to-native-interfaces'

import { Target } from './types'
import {
  scrape as nativeScrape,
  unscrape as nativeUnscrape,
} from './api-client'
import { NO_CONTEXT_ERROR_MESSAGE } from './constants'

type Scraps = { [key: string]: boolean }

interface ScrapsContext {
  scraps: Scraps
  deriveCurrentStateAndCount: (params: {
    id: string
    scraped?: boolean
    scrapsCount?: number
  }) => { scraped: boolean; scrapsCount: number }
  scrape: (target: Target) => Promise<void>
  /** @deprecated Use `scrape()` instead */
  scrapeArticle: (id: string) => Promise<void>
  /** @deprecated Use `scrape()` instead */
  scrapePoi: (id: string) => Promise<void>
  unscrape: (target: Target) => Promise<void>
  /** @deprecated Use `unscrape()` instead */
  unscrapeArticle: (id: string) => Promise<void>
  /** @deprecated Use `unscrape()` instead */
  unscrapePoi: (id: string) => Promise<void>
}

const Context = createContext<ScrapsContext | null>(null)

const START_SCRAPE = 'START_SCRAPE'
const SCRAPE = 'SCRAPE'
const SCRAPE_FAILED = 'SCRAPE_FAILED'
const START_UNSCRAPE = 'START_UNSCRAPE'
const UNSCRAPE = 'UNSCRAPE'
const UNSCRAPE_FAILED = 'UNSCRAPE_FAILED'

type ActionType =
  | typeof START_SCRAPE
  | typeof SCRAPE
  | typeof SCRAPE_FAILED
  | typeof START_UNSCRAPE
  | typeof UNSCRAPE
  | typeof UNSCRAPE_FAILED

const reducer = (
  {
    scraps,
    updating,
  }: {
    scraps: Scraps
    updating: {
      [id: string]: boolean
    }
  },
  action: { type: ActionType; id: string },
) => {
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  const { [action.id]: _, ...restUpdating } = updating

  switch (action.type) {
    case START_SCRAPE:
      return {
        scraps,
        updating: { ...updating, [action.id]: true },
      }

    case SCRAPE:
      return {
        scraps: { ...scraps, [action.id]: true },
        updating: restUpdating,
      }

    case SCRAPE_FAILED:
      return { scraps, updating: restUpdating }

    case START_UNSCRAPE:
      return {
        scraps,
        updating: { ...updating, [action.id]: false },
      }

    case UNSCRAPE:
      return {
        scraps: { ...scraps, [action.id]: false },
        updating: restUpdating,
      }

    case UNSCRAPE_FAILED:
      return { scraps, updating: restUpdating }
  }
}

interface ScrapsProviderProps {
  scraps?: Scraps
  beforeScrapedChange?: (target: Target, scraped: boolean) => boolean
  afterScrapedChange?: (target: Target, scraped: boolean) => void
}

export function ScrapsProvider({
  scraps: initialScraps,
  beforeScrapedChange,
  afterScrapedChange,
  children,
}: PropsWithChildren<ScrapsProviderProps>) {
  const [{ scraps, updating }, dispatch] = useReducer(reducer, {
    scraps: initialScraps || {},
    updating: {},
  })

  const deriveCurrentStateAndCount: ScrapsContext['deriveCurrentStateAndCount'] = useCallback(
    ({ id, scraped, scrapsCount: originalScrapsCount }) => {
      const currentState =
        typeof updating[id] !== 'undefined' ? updating[id] : scraps[id]
      const scrapsCount = Number(originalScrapsCount || 0)

      if (typeof scraped !== 'boolean' || typeof currentState !== 'boolean') {
        /* At least one of the status are unknown: Reduces to a bitwise OR operation */
        return {
          scraped: !!scraped || !!currentState,
          scrapsCount: scrapsCount,
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

  const scrape = useCallback(
    async ({ id, type }) => {
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

      const response = await nativeScrape({ id, type })

      if (response.ok) {
        notifyScraped(id)

        afterScrapedChange && afterScrapedChange({ id, type }, true)

        dispatch({ type: SCRAPE, id })
      } else {
        dispatch({ type: SCRAPE_FAILED, id })
      }
    },
    [updating, beforeScrapedChange, afterScrapedChange],
  )

  const unscrape = useCallback(
    async ({ id, type }) => {
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

      const response = await nativeUnscrape({ id, type })

      if (response.ok) {
        notifyUnscraped(id)

        afterScrapedChange && afterScrapedChange({ id, type }, false)

        dispatch({ type: UNSCRAPE, id })
      } else {
        dispatch({ type: UNSCRAPE_FAILED, id })
      }
    },
    [updating, beforeScrapedChange, afterScrapedChange],
  )

  const handleSubscribeEvent = useCallback(
    ({ scraped, id }) => dispatch({ type: scraped ? SCRAPE : UNSCRAPE, id }),
    [],
  )

  useEffect(() => {
    subscribeScrapedChangeEvent(handleSubscribeEvent)

    return () => unsubscribeScrapedChangeEvent(handleSubscribeEvent)
  }, [handleSubscribeEvent])

  const value: ScrapsContext = useMemo(
    () => ({
      deriveCurrentStateAndCount,
      scrape,
      scrapeArticle: (id) => scrape({ id, type: 'article' }),
      scrapePoi: (id) => scrape({ id, type: 'poi' }),
      scraps,
      unscrape,
      unscrapeArticle: (id) => unscrape({ id, type: 'article' }),
      unscrapePoi: (id) => unscrape({ id, type: 'poi' }),
    }),
    [deriveCurrentStateAndCount, scrape, scraps, unscrape],
  )

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export function useScrapsContext() {
  const context = useContext(Context)

  if (!context) {
    throw new Error(NO_CONTEXT_ERROR_MESSAGE)
  }
  return context
}

export interface WithScrapsBaseProps {
  deriveCurrentScrapedStateAndCount: ScrapsContext['deriveCurrentStateAndCount']
  scraps: Scraps
  scrapActions: Omit<ScrapsContext, 'deriveCurrentStateAndCount' | 'scraps'>
}

export function withScraps<P extends DeepPartial<WithScrapsBaseProps>>(
  Component: ComponentType<P>,
) {
  return function ScrapsComponent(props: Omit<P, keyof WithScrapsBaseProps>) {
    const {
      deriveCurrentStateAndCount,
      scraps,
      ...actions
    } = useScrapsContext()

    return (
      <Component
        {...({
          ...props,
          deriveCurrentScrapedStateAndCount: deriveCurrentStateAndCount,
          scraps,
          scrapActions: actions,
        } as P)}
      />
    )
  }
}
