export declare const window: {
  ga?: (
    method: 'send' | 'set',
    type: 'pageview' | 'event' | 'page',
    ...data: (string | undefined)[]
  ) => void
  fbq?: (
    type: 'track' | 'trackCustom',
    action: string,
    payload?: { [key: string]: unknown },
  ) => void
} & Window
