import * as React from 'react'
import ExtendedResourceListElement, {
  ResourceImage,
  ResourceListElementProps,
} from '@titicaca/resource-list-element'
import { deriveCurrentStateAndCount } from '@titicaca/view-utilities'

interface Product {
  id: string
  title: string
  image?: ResourceImage
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
    'reviewsCount' | 'reviewsRating' | 'onClick' | 'onScrapedChange'
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
      />
    )
  }
}
