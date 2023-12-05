export interface Scraps {
  [key: string]: boolean
}

export interface Target {
  id: string
  type: unknown
}

export interface ScrapProps {
  scraps?: Scraps
  beforeScrapedChange?: (target: Target, scraped: boolean) => boolean
  afterScrapedChange?: (target: Target, scraped: boolean) => void
}
