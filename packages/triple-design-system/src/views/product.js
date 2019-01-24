import React, { PureComponent } from 'react'
import styled from 'styled-components'
import Container from '../elements/container'
import Text from '../elements/text'
import Rating from '../elements/rating'
import Image from '../elements/image'
import List from '../elements/list'
import ScrapButton from '../elements/scrap-button'

const ProductListItem = styled(List.Item)`
  min-height: 150px;
  padding: 20px 0;
  box-sizing: border-box;
`

const PricingContainer = styled.div`
  font-family: sans-serif;
  clear: both;
  text-align: right;
  font-size: 18px;
  font-weight: bold;
  color: #3a3a3a;
  padding-top: 18px;

  small {
    color: rgba(58, 58, 58, 0.3);
    font-weight: normal;
    font-size: 12px;
    display: inline-block;
    text-decoration: line-through;
    margin-right: 6px;
  }
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
        <PricingContainer>
          <small>{pricing.basePrice}</small>
          {pricing.salePrice}원
        </PricingContainer>
      </ProductListItem>
    )
  }
}

function deriveCurrentStateAndCount({
  initialState,
  initialCount,
  currentState,
}) {
  if (typeof initialState !== 'boolean' || typeof currentState !== 'boolean') {
    /* At least one of the status are unknown: Reduces to a bitwise OR operation */
    return {
      state: !!initialState || !!currentState,
      count: Number(initialCount || 0),
    }
  }

  return {
    state: currentState,
    count:
      initialState === currentState
        ? initialCount
        : currentState
          ? Number(initialCount || 0) + 1
          : Number(initialCount || 0) - 1,
  }
}
