import React, { PureComponent } from 'react'
import styled from 'styled-components'
import Container from '../elements/container'
import Text from '../elements/text'
import Rating from '../elements/rating'
import Image from '../elements/image'
import List from '../elements/list'
import ScrapButton from '../elements/scrap-button'
import Pricing from '../elements/pricing'
import { deriveCurrentStateAndCount } from '../utilities'

const ProductListItem = styled(List.Item)`
  min-height: 150px;
  padding: 20px 0;
  box-sizing: border-box;
`

export class ProductListElement extends PureComponent {
  render() {
    const {
      props: {
        product: {
          id,
          title,
          display: { image, subtitle, pricing },
        },
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
      <ProductListItem onClick={onClick}>
        <Image
          floated="right"
          size="small"
          width={90}
          src={image ? image.sizes.large.url : null}
          placeholder={!image}
          margin={{ left: 20 }}
        />
        <Text bold ellipsis size="large">
          {title}
        </Text>
        <Text alpha={0.7} size="small" margin={{ top: 5 }}>
          {subtitle}
        </Text>
        {reviewsCount || scrapsCount ? (
          <Container margin={{ top: 5 }}>
            <>
              {reviewsCount ? (
                <Rating size="small" score={reviewsRating} />
              ) : null}
              <Text inline size="small" alpha={0.4}>
                {[
                  reviewsCount ? ` (${reviewsCount})` : null,
                  scrapsCount ? `저장${scrapsCount}` : null,
                ]
                  .filter((count) => count)
                  .join(' · ')}
              </Text>
            </>
          </Container>
        ) : null}
        <ScrapButton
          top={23}
          scraped={scraped}
          resource={this.props.product}
          onScrapedChange={onScrapedChange}
        />
        <Pricing {...pricing} />
      </ProductListItem>
    )
  }
}
