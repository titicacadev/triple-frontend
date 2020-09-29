export interface FAParams {
  category: string
  event_name: string // eslint-disable-line @typescript-eslint/camelcase
  [key: string]: any
}

export type GAParams = (string | undefined)[]
