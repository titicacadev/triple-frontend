import { PoiListElementType } from './types'
import {
  CompactPoiListElement,
  CompactPoiListElementProps,
} from './compact-poi-list-element'
import {
  ExtendedPoiListElement,
  ExtendedPoiListElementProps,
} from './extended-poi-list-element'

export type PoiListElementProps<T extends PoiListElementType> =
  | ({ compact: true } & CompactPoiListElementProps<T>)
  | ({ compact?: false; optimized?: boolean } & ExtendedPoiListElementProps<T>)

export function PoiListElement<T extends PoiListElementType>({
  compact,
  ...props
}: PoiListElementProps<T>) {
  return compact ? (
    <CompactPoiListElement {...props} />
  ) : (
    <ExtendedPoiListElement {...props} />
  )
}
