import { PoiGQL } from '@titicaca/graphql-type-definitions'

export type ActionButtonElement = React.ReactNode

export interface POIListElementBaseProps<T extends PoiGQL> {
  poi: T & {
    nameOverride?: string | null
  }
  onClick?: React.MouseEventHandler<HTMLLIElement>
}
