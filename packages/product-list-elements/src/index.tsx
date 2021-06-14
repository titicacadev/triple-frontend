import * as React from 'react'
import ExtendedResourceListElement, {
  ResourceListElementProps,
} from '@titicaca/resource-list-element'
import { ImageMeta } from '@titicaca/type-definitions'

interface Product {
  id: string
  title: string
  image?: ImageMeta
  subtitle?: string
  basePrice?: number | null
  salePrice?: number
}

export function ProductListElement<T extends Product>({
  product,
  product: { title, image, subtitle, basePrice, salePrice },
  scraped,
  scrapsCount,
  reviewsCount,
  reviewsRating,
  onClick,
  as,
}: {
  product: T
  scraped?: boolean
  scrapsCount?: number
} & Pick<
  ResourceListElementProps<T>,
  'reviewsCount' | 'reviewsRating' | 'onClick' | 'as'
>) {
  return (
    <ExtendedResourceListElement
      resource={product}
      image={image}
      name={title}
      comment={subtitle}
      basePrice={basePrice}
      salePrice={salePrice}
      reviewsCount={reviewsCount}
      reviewsRating={reviewsRating}
      scraped={scraped}
      scrapsCount={scrapsCount}
      onClick={onClick}
      as={as}
    />
  )
}
