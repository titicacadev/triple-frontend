import React from 'react'
import { ListingPOI } from '@titicaca/type-definitions'

import {
  CompactPoiListElement,
  CompactPoiListElementProps,
} from './compact-poi-list-element'
import {
  ExtendedPoiListElement,
  ExtendedPoiListElementProps,
} from './extended-poi-list-element'

export type PoiListElementProps<T extends ListingPOI> =
  | ({ compact: true } & CompactPoiListElementProps<T>)
  | ({ compact?: false; optimized?: boolean } & ExtendedPoiListElementProps<T>)

export function PoiListElement<T extends ListingPOI>({
  compact,
  ...props
}: PoiListElementProps<T>) {
  return compact ? (
    <CompactPoiListElement {...props} />
  ) : (
    <ExtendedPoiListElement {...props} />
  )
}
