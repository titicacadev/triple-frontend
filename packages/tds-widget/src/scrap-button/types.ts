import { Target } from '../scrap/types'

export interface ScrapableResource {
  id: string
  type: string
  scraped?: boolean
}

export interface ScrapIconProps {
  pressed: boolean
  size: number
}

export interface ScrapButtonProps {
  resource: ScrapableResource
  size?: number
  onScrape?: ({ id, type }: Target) => Promise<void>
  onUnscrape?: ({ id, type }: Target) => Promise<void>
}
