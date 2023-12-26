import {
  START_SCRAPE,
  SCRAPE,
  SCRAPE_FAILED,
  START_UNSCRAPE,
  UNSCRAPE,
  UNSCRAPE_FAILED,
} from './constants'
import type { Scraps } from './types'

type ActionType =
  | typeof START_SCRAPE
  | typeof SCRAPE
  | typeof SCRAPE_FAILED
  | typeof START_UNSCRAPE
  | typeof UNSCRAPE
  | typeof UNSCRAPE_FAILED

export const reducer = (
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
