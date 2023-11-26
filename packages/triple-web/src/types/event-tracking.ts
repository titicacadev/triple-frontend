export interface EventTrackingUtmValue {
  source?: string
  medium?: string
  campaign?: string
  term?: string
  content?: string
}

export interface EventTrackingValue {
  page: {
    label: string
    path: string
  }
  utm: EventTrackingUtmValue
  onError?: (error: Error) => void
}
