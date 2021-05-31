import { TranslatedProperty } from '@titicaca/type-definitions'

export type ActionButtonElement = React.ReactNode

export interface POIListElementBaseProps<T> {
  poi: T & {
    region?: {
      source: {
        names: TranslatedProperty
      }
    }
  }
  onClick?: React.MouseEventHandler<HTMLLIElement>
}
