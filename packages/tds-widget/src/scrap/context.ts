import { Dispatch, createContext } from 'react'

import { Scraps, Target } from './types'
import { ActionType } from './reducer'

export const ScrapContext = createContext<
  | {
      scraps: Scraps
      updating: {
        [id: string]: boolean
      }
      beforeScrapedChange?: (target: Target, scraped: boolean) => boolean
      onScrapeFailed?: (
        target: Target,
        scraped: boolean,
        errorMessage?: string,
      ) => void
    }
  | undefined
>(undefined)
export const ScrapDispatchContext = createContext<
  Dispatch<{ type: ActionType; id: string }> | undefined
>(undefined)
