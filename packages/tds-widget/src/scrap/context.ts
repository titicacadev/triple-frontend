import { Dispatch, createContext } from 'react'

import { Scraps } from './types'
import { ActionType } from './reducer'

export const ScrapContext = createContext<
  | {
      scraps: Scraps
      updating: {
        [id: string]: boolean
      }
    }
  | undefined
>(undefined)
export const ScrapDispatchContext = createContext<
  Dispatch<{ type: ActionType; id: string }> | undefined
>(undefined)
