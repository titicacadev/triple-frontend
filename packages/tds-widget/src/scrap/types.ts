import type { TrackEventParams } from '@titicaca/triple-web'

export interface Scraps {
  [key: string]: boolean
}

export interface Target {
  id: string
  type: unknown
  eventParams?: TrackEventParams
}
