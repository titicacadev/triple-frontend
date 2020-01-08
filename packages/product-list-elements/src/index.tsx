import * as React from 'react'
import ExtendedResourceListElement from '@titicaca/resource-list-element'
import { deriveCurrentStateAndCount } from '@titicaca/view-utilities'

interface Product {
  id: string
  title: string
  image?: {
    sizes: {
      smallSquare?: { url: string }
      small_square?: { url: string }
    }
  }
  subtitle?: string
  basePrice?: number | null
  salePrice?: number
}

export class ProductListElement extends React.PureComponent<{
  product: Product
  scraped?: boolean
  scrapsCount?: number
  reviewsCount?: number
  reviewsRating?: number
  onClick?: React.MouseEventHandler<HTMLLIElement>
  onScrapedChange?: (e?: React.SyntheticEvent, value?: any) => any
  resourceScraps?: { [key: string]: boolean }
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
