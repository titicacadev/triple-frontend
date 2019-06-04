import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  createContext,
  useContext,
} from 'react'

const Context = createContext()

export function ScrapsProvider({
  scrape: nativeScrape,
  unscrape: nativeUnscrape,
  notifyScraped,
  notifyUnscraped,
  subscribeScrapedChangeEvent,
  unsubscribeScrapedChangeEvent,
  children,
}) {
  const [scraps, setScraps] = useState({})
  const [updating, setUpdating] = useState()

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

  const insert = useCallback(
    (newScraps) => {
      const updated = { ...updating }

      Object.keys(newScraps).forEach((id) => delete updated[id])

      setScraps({ ...scraps, ...newScraps })
      setUpdating(updated)
    },
    [scraps, updating],
  )

  const scrape = useCallback(
    async ({ id, type }) => {
      if (typeof updating[id] !== 'undefined') {
        return
      }

      setUpdating({ [id]: true })

      const response = await nativeScrape({ id, type })

      if (response.ok) {
        notifyScraped(id)

        insert({ [id]: true })
      }
    },
    [insert, nativeScrape, notifyScraped, updating],
  )

  const unscrape = useCallback(
    async ({ id, type }) => {
      if (typeof updating[id] !== 'undefined') {
        return
      }

      setUpdating({ [id]: false })

      const response = await nativeUnscrape({ id, type })

      if (response.ok) {
        notifyUnscraped(id)

        insert({ [id]: false })
      }
    },
    [insert, nativeUnscrape, notifyUnscraped, updating],
  )

  const handleSubscribeEvent = useCallback(
    ({ scraped, id }) => insert({ [id]: scraped }),
    [insert],
  )

  useEffect(() => {
    subscribeScrapedChangeEvent(handleSubscribeEvent)

    return () => unsubscribeScrapedChangeEvent(handleSubscribeEvent)
  }, [
    handleSubscribeEvent,
    insert,
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
      scraps,
      scrape,
      unscrape,
      scrapeArticle,
      unscrapeArticle,
      scrapePoi,
      unscrapePoi,
      insert,
    }),
    [
      deriveCurrentStateAndCount,
      insert,
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
