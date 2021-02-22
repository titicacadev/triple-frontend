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
  isDefault?: boolean
}

function createNOOPFunctions(name: string) {
  return () => {
    if (process.env.NODE_ENV === 'development') {
      if (
        [
          'scrapeArticle',
          'unscrapeArticle',
          'scrapePoi',
          'unscrapePoi',
        ].includes(name)
      ) {
        // TODO: development 환경에서만 기록하는 logger 만들기
        // eslint-disable-next-line no-console
        console.warn(`${name} is deprecated. Please use scrape instead.`)
      }
    }
    return Promise.resolve()
  }
}

const Context = createContext<ScrapsContext>({
  scraps: {},
  deriveCurrentStateAndCount: ({ scraped = false, scrapsCount = 0 }) => ({
    scraped,
    scrapsCount,
  }),
  scrape: createNOOPFunctions('scrape'),
  unscrape: createNOOPFunctions('unscrape'),
  scrapeArticle: createNOOPFunctions('scrapeArticle'),
  unscrapeArticle: createNOOPFunctions('unscrapeArticle'),
  scrapePoi: createNOOPFunctions('scrapePoi'),
  unscrapePoi: createNOOPFunctions('unscrapePoi'),
  isDefault: true,
})

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

  useEffect(() => {
    const handleSubscribeEvent = ({
      scraped,
      id,
    }: {
      scraped: boolean
      id: string
    }) => dispatch({ type: scraped ? SCRAPE : UNSCRAPE, id })

    subscribeScrapedChangeEvent(handleSubscribeEvent)

    return () => unsubscribeScrapedChangeEvent(handleSubscribeEvent)
  }, [])

  const value: ScrapsContext = useMemo(
    () => ({
      deriveCurrentStateAndCount,
      scrape,
      scrapeArticle: (id) => {
        if (process.env.NODE_ENV === 'development') {
          // TODO: development 환경에서만 기록하는 logger 만들기
          // eslint-disable-next-line no-console
          console.warn(
            'scrapeArticle is deprecated. Please use scrape instead.',
          )
        }
        return scrape({ id, type: 'article' })
      },
      scrapePoi: (id) => {
        if (process.env.NODE_ENV === 'development') {
          // TODO: development 환경에서만 기록하는 logger 만들기
          // eslint-disable-next-line no-console
          console.warn('scrapePoi is deprecated. Please use scrape instead.')
        }
        return scrape({ id, type: 'poi' })
      },
      scraps,
      unscrape,
      unscrapeArticle: (id) => {
        if (process.env.NODE_ENV === 'development') {
          // TODO: development 환경에서만 기록하는 logger 만들기
          // eslint-disable-next-line no-console
          console.warn(
            'unscrapeArticle is deprecated. Please use scrape instead.',
          )
        }
        return unscrape({ id, type: 'article' })
      },
      unscrapePoi: (id) => {
        if (process.env.NODE_ENV === 'development') {
          // TODO: development 환경에서만 기록하는 logger 만들기
          // eslint-disable-next-line no-console
          console.warn('unscrapePoi is deprecated. Please use scrape instead.')
        }
        return unscrape({ id, type: 'poi' })
      },
    }),
    [deriveCurrentStateAndCount, scrape, scraps, unscrape],
  )

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export function useScrapsContext() {
  const { isDefault, ...rest } = useContext(Context)

  if (isDefault && process.env.NODE_ENV === 'development') {
    // TODO: development 환경에서만 기록하는 logger 만들기
    // eslint-disable-next-line no-console
    console.error('ScrapsProvider를 찾을 수 없습니다.')
  }

  return rest
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
