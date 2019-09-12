import * as React from 'react'
import ExtendedResourceListElement from '@titicaca/resource-list-element'
import { deriveCurrentStateAndCount } from '@titicaca/view-utilities'

export class ProductListElement extends React.PureComponent<{
  product?: { id; title; image; subtitle; basePrice; salePrice }
  scraped?: any
  scrapsCount?: number
  reviewsCount?: number
  reviewsRating?: number
  onClick?: (e?: React.SyntheticEvent) => any
  onScrapedChange?: (e?: React.SyntheticEvent, value?: any) => any
  resourceScraps?: any
}> {
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
