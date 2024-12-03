import { Analytics } from 'firebase/analytics'

export interface EventTrackingUtmValue {
  source?: string
  medium?: string
  campaign?: string
  term?: string
  content?: string

  partner?: string
}

export interface EventTrackingValue {
  page: {
    label: string
    path: string
  }
  utm: EventTrackingUtmValue
  onError?: (error: Error) => void
  firebaseAnalytics: Analytics
}

export interface EventMetadataValue {
  [key: string]: string
}

export type { TrackEventParams } from './utils/track-event'
