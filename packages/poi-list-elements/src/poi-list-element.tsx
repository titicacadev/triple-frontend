import React from 'react'
import { PoiGQL } from '@titicaca/graphql-type-definitions'

import {
  ExtendedPoiListElement,
  ExtendedPoiListElementProps,
} from './extended-poi-list-element'
import {
  CompactPoiListElement,
  CompactPoiListElementProps,
} from './compact-poi-list-element'

export type PoiListElementProps<T extends PoiGQL> =
  | ({ compact: true } & CompactPoiListElementProps<T>)
  | ({ compact?: false; optimized?: boolean } & ExtendedPoiListElementProps<T>)

export function PoiListElement<T extends PoiGQL>({
  compact,
  ...props
}: PoiListElementProps<T>) {
  return compact ? (
    <CompactPoiListElement {...props} />
  ) : (
    <ExtendedPoiListElement {...props} />
  )
}
