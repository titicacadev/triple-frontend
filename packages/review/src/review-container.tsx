import * as React from 'react'
import styled from 'styled-components'
import humps from 'humps'
import {
  Section,
  Container,
  Rating,
  Text,
  Button,
  Label,
} from '@titicaca/triple-design-system'
import { formatNumber } from '@titicaca/view-utilities'
import { fetchReviews as fetchReviewsApi } from './review-api-clients'
import ReviewsList from './review-list'
const REVIEWS_SECTION_ID = 'reviews'
const ORDER_BY_RECOMMENDATION = 'recommendation'
const ORDER_BY_RECENCY = 'recency'
const DEFAULT_SIZE = 30

const PlaceholderContainer = styled(Container)`
  width: 100%;
  text-align: center;
`
const WriteIcon = styled.img`
  margin-top: -5px;
  width: 34px;
  height: 34px;
  float: right;
`
function ReviewsPlaceholder({ children, onClick }) {
  return (
    <PlaceholderContainer margin={{ top: 20 }} onClick={onClick}>
      <Rating size="medium" onClick={onClick} />
      <Text
        margin={{ top: 12 }}
        size="large"
        color="gray"
        alpha={1}
        lineHeight={1.5}
      >
        {children}
      </Text>
    </PlaceholderContainer>
  )
}

const OptionsContainer = styled.div<{ floated?: string }>`
  float: ${({ floated }) => floated || 'none'};
  margin: 0;
  padding: 0;

  div:not(:first-child) {
    margin-left: 12px;
  }
`
function Options({ floated, data, onSelect }) {
  return (
    <OptionsContainer floated={floated}>
      {data.map((item) => (
        <Label key={item.key} radio selected={item.selected}>
          <span onClick={onSelect && ((e) => onSelect(e, item))}>
            {item.text}
          </span>
        </Label>
      ))}
    </OptionsContainer>
  )
}

//@TODO 리뷰마다 ordering 기준 다를 수 있는지 확인
function getDefaultReviewOrders(selectedKey = ORDER_BY_RECOMMENDATION) {
  return [
    { key: ORDER_BY_RECOMMENDATION, text: '추천순' },
    { key: ORDER_BY_RECENCY, text: '최신순' },
  ].map(({ key, ...rest }) => ({
    key,
    ...rest,
    selected: key === selectedKey,
  }))
}

export class ReviewContainer extends React.PureComponent<{
  shortened: boolean
  regionId: string
  isPublic: boolean
  APP_URL_SCHEME: string
  reviewsCount: number
  source: any
  resourceType: string
  reviewed: boolean
  onFullListButtonClick?: any
  notifyReviewDeleted: any
  showToast: any
  children?: React.ReactNode
}> {
  state = {
    reviews: [],
    myReview: undefined,
    orders: getDefaultReviewOrders(),
    filterOptions: { from: 0, size: DEFAULT_SIZE },
  }

  componentDidMount() {
    this.fetchReviews()
  }

  fetchReviews = async () => {
    const {
      state: { orders },
      props: {
        source: { id },
        resourceType,
      },
    } = this

    const { key: orderKey } = orders.find(({ selected }) => selected)
    this.setState({
      orders: orders.map((order) => ({
        ...order,
        selected: order.key === orderKey,
      })),
    })

    //@TODO pagination 처리 필요
    const { from, size } = this.state.filterOptions
    const response = await fetchReviewsApi({
      id,
      resourceType,
      from,
      order: orderKey,
      size,
    })

    if (response.ok) {
      const reviewData = humps.camelizeKeys(await response.json()).reviews

      console.log('reviews', reviewData)
      this.setState({ reviews: reviewData })
    }
  }

  handleWriteButtonClick = (e: React.SyntheticEvent, rating: number = 0) => {
    e.stopPropagation()
    const {
      props: {
        isPublic,
        APP_URL_SCHEME,
        regionId,
        resourceType,
        source: { id },
      },
    } = this

    if (!isPublic) {
      window.location.href = `${APP_URL_SCHEME}:///reviews/new?region_id=${regionId}&resource_type=${resourceType}&resource_id=${id}&rating=${rating}`
    }
  }

  handleOrderSelect = (_, { key }) => {
    const {
      state: { orders },
    } = this
    this.setState({
      orders: orders.map((order) => ({
        ...order,
        selected: order.key === key,
      })),
    })
    this.fetchReviews()
  }

  render() {
    const {
      state: { orders, reviews, myReview },
      props: {
        reviewsCount,
        isPublic,
        children,
        resourceType,
        regionId,
        APP_URL_SCHEME,
        source,
        notifyReviewDeleted,
        showToast,
        shortened,
        onFullListButtonClick,
      },
    } = this

    if (isPublic && !reviewsCount) {
      return null
    }

    return (
      <Section anchor={REVIEWS_SECTION_ID}>
        <WriteIcon
          src="https://assets.triple.guide/images/btn-com-write@2x.png"
          onClick={this.handleWriteButtonClick}
        />

        <Text bold size="huge" color="gray" alpha={1} inline>
          리뷰
        </Text>

        {(reviewsCount || 0) > 0 ? (
          <Text bold size="huge" color="blue" alpha={1} inline>
            {` ${formatNumber(reviewsCount)}`}
          </Text>
        ) : null}

        {(reviewsCount || 0) > 1 ? (
          <Container margin={{ top: 23 }} clearing>
            <Options
              floated="right"
              data={orders}
              onSelect={this.handleOrderSelect}
            />
          </Container>
        ) : null}

        <ReviewsPlaceholder onClick={this.handleWriteButtonClick}>
          {children}
        </ReviewsPlaceholder>

        {((reviews || []).length > 0 || myReview) && (
          <ReviewsList
            isPublic={isPublic}
            resourceType={resourceType}
            regionId={regionId}
            APP_URL_SCHEME={APP_URL_SCHEME}
            margin={{ top: (reviewsCount || 0) > 1 ? 18 : 30 }}
            reviews={reviews.slice(0, myReview ? 2 : 3)}
            myReview={myReview}
            onMyReviewDeleted={() => this.setState({ myReview: null })}
            source={source}
            notifyReviewDeleted={notifyReviewDeleted}
            showToast={showToast}
          />
        )}

        {reviewsCount > 3 && shortened && (
          <Container margin={{ top: 50 }}>
            <Button
              basic
              fluid
              compact
              size="small"
              onClick={() => onFullListButtonClick()}
            >
              {reviewsCount - 3}개 리뷰 더보기
            </Button>
          </Container>
        )}
      </Section>
    )
  }
}
