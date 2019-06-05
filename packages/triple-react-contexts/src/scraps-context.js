import React, {
  useReducer,
  useEffect,
  useCallback,
  useMemo,
  createContext,
  useContext,
} from 'react'

const Context = createContext()

const reducer = ({ scraps, updating }, action) => {
  const { [action.id]: _, ...restUpdating } = updating

  switch (action.type) {
    case 'START_SCRAPE':
      return {
        scraps,
        updating: { ...updating, [action.id]: true },
      }

    case 'SCRAPE':
      return {
        scraps: { ...scraps, [action.id]: true },
        updating: restUpdating,
      }

    case 'SCRAPE_FAILED':
      return { scraps, updating: restUpdating }

    case 'START_UNSCRAPE':
      return {
        scraps,
        updating: { ...updating, [action.id]: false },
      }

    case 'UNSCRAPE':
      return {
        scraps: { ...scraps, [action.id]: false },
        updating: restUpdating,
      }

    case 'UNSCRAPE_FAILED':
      return { scraps, updating: restUpdating }
  }
}

export function ScrapsProvider({
  scrape: nativeScrape,
  unscrape: nativeUnscrape,
  notifyScraped,
  notifyUnscraped,
  subscribeScrapedChangeEvent,
  unsubscribeScrapedChangeEvent,
  children,
}) {
  const [{ scraps, updating }, dispatch] = useReducer(reducer, {
    scraps: {},
    updating: {},
  })

  const deriveCurrentStateAndCount = useCallback(
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

      dispatch({ type: 'START_SCRAPE', id })

      const response = await nativeScrape({ id, type })

      if (response.ok) {
        notifyScraped(id)

        dispatch({ type: 'SCRAPE', id })
      } else {
        dispatch({ type: 'SCRAPE_FAILED', id })
      }
    },
    [nativeScrape, notifyScraped, updating],
  )

  const unscrape = useCallback(
    async ({ id, type }) => {
      if (typeof updating[id] !== 'undefined') {
        return
      }

      dispatch({ type: 'START_UNSCRAPE', id })

      const response = await nativeUnscrape({ id, type })

      if (response.ok) {
        notifyUnscraped(id)

        dispatch({ type: 'UNSCRAPE', id })
      } else {
        dispatch({ type: 'UNSCRAPE_FAILED', id })
      }
    },
    [nativeUnscrape, notifyUnscraped, updating],
  )

  const handleSubscribeEvent = useCallback(
    ({ scraped, id }) =>
      dispatch({ type: scraped ? 'SCRAPE' : 'UNSCRAPE', id }),
    [],
  )

  useEffect(() => {
    subscribeScrapedChangeEvent(handleSubscribeEvent)

    return () => unsubscribeScrapedChangeEvent(handleSubscribeEvent)
  }, [
    handleSubscribeEvent,
    subscribeScrapedChangeEvent,
    unsubscribeScrapedChangeEvent,
  ])

  const scrapeArticle = useCallback((id) => scrape({ id, type: 'article' }), [
    scrape,
  ])
  const unscrapeArticle = useCallback(
    (id) => unscrape({ id, type: 'article' }),
    [unscrape],
  )

  const scrapePoi = useCallback((id) => scrape({ id, type: 'poi' }), [scrape])
  const unscrapePoi = useCallback((id) => unscrape({ id, type: 'poi' }), [
    unscrape,
  ])

  const value = useMemo(
    () => ({
      deriveCurrentStateAndCount,
      scrape,
      scrapeArticle,
      scrapePoi,
      scraps,
      unscrape,
      unscrapeArticle,
      unscrapePoi,
    }),
    [
      deriveCurrentStateAndCount,
      scrape,
      scrapeArticle,
      scrapePoi,
      scraps,
      unscrape,
      unscrapeArticle,
      unscrapePoi,
    ],
  )

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export function useScrapsContext() {
  return useContext(Context)
}

export function withScraps(Component) {
  return function ScrapsComponent(props) {
    return (
      <Context.Consumer>
        {({ deriveCurrentStateAndCount, scraps, ...actions }) => (
          <Component
            deriveCurrentScrapedStateAndCount={deriveCurrentStateAndCount}
            scraps={scraps}
            scrapActions={actions}
            {...props}
          />
        )}
      </Context.Consumer>
    )
  }
}
