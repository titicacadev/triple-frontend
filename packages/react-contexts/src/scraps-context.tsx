import React from 'react'

type Scraps = { [key: string]: boolean }
type Target = { id: string; type: unknown }

interface ScrapsContext {
  scraps: Scraps
  deriveCurrentStateAndCount: (params: {
    id: string
    scraped: boolean
    scrapsCount: number
  }) => { scraped: boolean; scrapsCount: number }
  scrape: (target: Target) => Promise<void>
  scrapeArticle: (id: string) => Promise<void>
  scrapePoi: (id: string) => Promise<void>
  unscrape: (target: Target) => Promise<void>
  unscrapeArticle: (id: string) => Promise<void>
  unscrapePoi: (id: string) => Promise<void>
}

interface ScrapsProviderProps {
  scraps?: Scraps
  scrape: (target: Target) => Promise<Response>
  unscrape: (target: Target) => Promise<Response>
  notifyScraped: (id: string) => void
  notifyUnscraped: (id: string) => void
  subscribeScrapedChangeEvent: (
    handler: (target: { id: string; scraped: boolean }) => void,
  ) => void
  unsubscribeScrapedChangeEvent: (
    handler: (target: { id: string; scraped: boolean }) => void,
  ) => void
}

interface WrappingComponentBaseProps {
  deriveCurrentScrapedStateAndCount: ScrapsContext['deriveCurrentStateAndCount']
  scraps: Scraps
  scrapActions: Omit<ScrapsContext, 'deriveCurrentStateAndCount' | 'scraps'>
}

const Context = React.createContext<ScrapsContext>({
  scraps: {},
  deriveCurrentStateAndCount: () => ({ scraped: false, scrapsCount: 0 }),
  scrape: () => Promise.resolve(),
  scrapeArticle: () => Promise.resolve(),
  scrapePoi: () => Promise.resolve(),
  unscrape: () => Promise.resolve(),
  unscrapeArticle: () => Promise.resolve(),
  unscrapePoi: () => Promise.resolve(),
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

export function ScrapsProvider({
  scraps: initialScraps,
  scrape: nativeScrape,
  unscrape: nativeUnscrape,
  notifyScraped,
  notifyUnscraped,
  subscribeScrapedChangeEvent,
  unsubscribeScrapedChangeEvent,
  children,
}: React.PropsWithChildren<ScrapsProviderProps>) {
  const [{ scraps, updating }, dispatch] = React.useReducer(reducer, {
    scraps: initialScraps || {},
    updating: {},
  })

  const deriveCurrentStateAndCount: ScrapsContext['deriveCurrentStateAndCount'] = React.useCallback(
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

  const scrape = React.useCallback(
    async ({ id, type }) => {
      if (typeof updating[id] !== 'undefined') {
        return
      }

      dispatch({ type: START_SCRAPE, id })

      const response = await nativeScrape({ id, type })

      if (response.ok) {
        notifyScraped(id)

        dispatch({ type: SCRAPE, id })
      } else {
        dispatch({ type: SCRAPE_FAILED, id })
      }
    },
    [nativeScrape, notifyScraped, updating],
  )

  const unscrape = React.useCallback(
    async ({ id, type }) => {
      if (typeof updating[id] !== 'undefined') {
        return
      }

      dispatch({ type: START_UNSCRAPE, id })

      const response = await nativeUnscrape({ id, type })

      if (response.ok) {
        notifyUnscraped(id)

        dispatch({ type: UNSCRAPE, id })
      } else {
        dispatch({ type: UNSCRAPE_FAILED, id })
      }
    },
    [nativeUnscrape, notifyUnscraped, updating],
  )

  const handleSubscribeEvent = React.useCallback(
    ({ scraped, id }) => dispatch({ type: scraped ? SCRAPE : UNSCRAPE, id }),
    [],
  )

  React.useEffect(() => {
    subscribeScrapedChangeEvent(handleSubscribeEvent)

    return () => unsubscribeScrapedChangeEvent(handleSubscribeEvent)
  }, [
    handleSubscribeEvent,
    subscribeScrapedChangeEvent,
    unsubscribeScrapedChangeEvent,
  ])

  const value: ScrapsContext = React.useMemo(
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
  return React.useContext(Context)
}

export function withScraps<P extends Partial<WrappingComponentBaseProps>>(
  Component: React.ComponentType<P>,
) {
  return function ScrapsComponent(
    props: Omit<P, keyof WrappingComponentBaseProps>,
  ) {
    return (
      <Context.Consumer>
        {({ deriveCurrentStateAndCount, scraps, ...actions }) => (
          <Component
            {...({
              ...props,
              deriveCurrentScrapedStateAndCount: deriveCurrentStateAndCount,
              scraps,
              scrapActions: actions,
            } as P)}
          />
        )}
      </Context.Consumer>
    )
  }
}
