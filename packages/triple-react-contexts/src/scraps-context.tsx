import * as React from 'react'

interface ScrapsContextActions {
  deriveCurrentStateAndCount: Function
  scrape: Function
  scrapeArticle: Function
  scrapePoi: Function
  scraps: { [key: string]: boolean }
  unscrape: Function
  unscrapeArticle: Function
  unscrapePoi: Function
}

const Context = React.createContext<ScrapsContextActions>(undefined)

const START_SCRAPE = 'START_SCRAPE'
const SCRAPE = 'SCRAPE'
const SCRAPE_FAILED = 'SCRAPE_FAILED'
const START_UNSCRAPE = 'START_UNSCRAPE'
const UNSCRAPE = 'UNSCRAPE'
const UNSCRAPE_FAILED = 'UNSCRAPE_FAILED'

const reducer = ({ scraps, updating }, action) => {
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
}) {
  const [{ scraps, updating }, dispatch] = React.useReducer(reducer, {
    scraps: initialScraps || {},
    updating: {},
  })

  const deriveCurrentStateAndCount = React.useCallback(
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

  const scrapeArticle = React.useCallback(
    (id) => scrape({ id, type: 'article' }),
    [scrape],
  )
  const unscrapeArticle = React.useCallback(
    (id) => unscrape({ id, type: 'article' }),
    [unscrape],
  )

  const scrapePoi = React.useCallback((id) => scrape({ id, type: 'poi' }), [
    scrape,
  ])
  const unscrapePoi = React.useCallback((id) => unscrape({ id, type: 'poi' }), [
    unscrape,
  ])

  const value = React.useMemo(
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
  return React.useContext(Context)
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
