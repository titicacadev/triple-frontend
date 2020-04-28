import { ScrapButtonProps } from '@titicaca/scrap-button'
import { ListingPOI } from '@titicaca/type-definitions'

export type ActionButtonElement = React.ReactNode

export interface POIListElementBaseProps<T extends ListingPOI> {
  poi: T
  onClick?: React.MouseEventHandler<HTMLLIElement>
  onScrapedChange?: ScrapButtonProps<T>['onScrapedChange']
  resourceScraps?: { [key: string]: boolean }
}
