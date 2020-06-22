import { ScrapButtonProps } from '@titicaca/scrap-button'

export type ActionButtonElement = React.ReactNode

export interface POIListElementBaseProps<T> {
  poi: T
  onClick?: React.MouseEventHandler<HTMLLIElement>
  onScrapedChange?: ScrapButtonProps<T>['onScrapedChange']
  resourceScraps?: { [key: string]: boolean }
}
