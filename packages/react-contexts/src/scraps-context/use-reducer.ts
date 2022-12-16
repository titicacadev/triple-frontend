import { useReducer, useMemo, createContext } from 'react'

export interface Scraps {
  [key: string]: boolean
}

export const START_SCRAPE = 'START_SCRAPE'
export const SCRAPE = 'SCRAPE'
export const SCRAPE_FAILED = 'SCRAPE_FAILED'
export const START_UNSCRAPE = 'START_UNSCRAPE'
export const UNSCRAPE = 'UNSCRAPE'
export const UNSCRAPE_FAILED = 'UNSCRAPE_FAILED'

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

export function useScrapsReducer({
  initialScraps,
}: {
  initialScraps?: Scraps
}) {
  const [{ scraps, updating }, dispatch] = useReducer(reducer, {
    scraps: initialScraps || {},
    updating: {},
  })

  return useMemo(() => ({ scraps, updating, dispatch }), [scraps, updating])
}

export const ScrapsReducerContext =
  createContext<ReturnType<typeof useScrapsReducer> | null>(null)
