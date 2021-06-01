import React from 'react'
import { PoiResponse } from '@titicaca/type-definitions'

import {
  CompactPoiListElement,
  CompactPoiListElementProps,
} from './compact-poi-list-element'
import {
  ExtendedPoiListElement,
  ExtendedPoiListElementProps,
} from './extended-poi-list-element'

export type PoiListElementProps<T extends PoiResponse> =
  | ({ compact: true } & CompactPoiListElementProps<T>)
  | ({ compact?: false; optimized?: boolean } & ExtendedPoiListElementProps<T>)

export function PoiListElement<T extends PoiResponse>({
  compact,
  ...props
}: PoiListElementProps<T>) {
  return compact ? (
    <CompactPoiListElement {...props} />
  ) : (
    <ExtendedPoiListElement {...props} />
  )
}
