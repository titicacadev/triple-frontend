import * as React from 'react'
import ExtendedResourceListElement, {
  ResourceListElementProps,
} from '@titicaca/resource-list-element'
import { deriveCurrentStateAndCount } from '@titicaca/view-utilities'
import { ImageMeta } from '@titicaca/type-definitions'

interface Product {
  id: string
  title: string
  image?: ImageMeta
  subtitle?: string
  basePrice?: number | null
  salePrice?: number
}

export class ProductListElement<T extends Product> extends React.PureComponent<
  {
    product: T
    scraped?: boolean
    scrapsCount?: number
    resourceScraps?: { [key: string]: boolean }
  } & Pick<
    ResourceListElementProps<T>,
    'reviewsCount' | 'reviewsRating' | 'onClick' | 'onScrapedChange' | 'as'
  >
> {
  render() {
    const {
      props: {
        product: { id, title, image, subtitle, basePrice, salePrice },
        scraped: initialScraped,
        scrapsCount: initialScrapsCount,
        reviewsCount,
        reviewsRating,
        onClick,
        onScrapedChange,
        resourceScraps,
        as,
      },
    } = this

    const { state: scraped, count: scrapsCount } = deriveCurrentStateAndCount({
      initialState: initialScraped,
      initialCount: initialScrapsCount,
      currentState: (resourceScraps || {})[id],
    })

    return (
      <ExtendedResourceListElement
        resource={this.props.product}
        image={image}
        name={title}
        comment={subtitle}
        basePrice={basePrice}
        salePrice={salePrice}
        reviewsCount={reviewsCount}
        reviewsRating={reviewsRating}
        scraped={scraped}
        scrapsCount={scrapsCount}
        onScrapedChange={onScrapedChange}
        onClick={onClick}
        as={as}
      />
    )
  }
}
