export interface EventTrackingValue {
  page: {
    label: string
    path: string
  }
  onError?: (error: Error) => void
}
