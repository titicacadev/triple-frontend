import * as React from 'react'
import styled from 'styled-components'
import humps from 'humps'
import {
  Section,
  Container,
  Text,
  Button,
  Label,
  HR1,
} from '@titicaca/core-elements'
import { formatNumber } from '@titicaca/view-utilities'
import ReviewsPlaceholder from './review-placeholder-with-rating'
import {
  fetchReviews as fetchReviewsApi,
  FetchReviewsInterface,
} from './review-api-clients'
import ReviewsList from './review-list'
import { ReviewProps } from './index'
const REVIEWS_SECTION_ID = 'reviews'
const ORDER_BY_RECOMMENDATION = ''
const ORDER_BY_RECENCY = 'latest'
const DEFAULT_SIZE = 30

const WriteIcon = styled.img`
  margin-top: -5px;
  width: 34px;
  height: 34px;
  float: right;
`

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

// @TODO 리뷰마다 ordering 기준 다를 수 있는지 확인
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

export class ReviewContainer extends React.PureComponent<ReviewProps> {
  state = {
    reviews: [],
    myReview: undefined,
    orders: getDefaultReviewOrders(),
    reviewFrom: 0,
  }

  componentDidMount() {
    this.fetchReviews()
  }

  fetchReviews = async () => {
    const {
      state: { orders },
      props: { resourceId, resourceType },
    } = this

    const { key: orderKey } = orders.find(({ selected }) => selected)
    this.setState({
      orders: orders.map((order) => ({
        ...order,
        selected: order.key === orderKey,
      })),
    })

    // @TODO pagination 처리 필요
    const {
      state: { reviewFrom: from },
    } = this
    const params: FetchReviewsInterface = {
      resourceId,
      resourceType,
      from,
      order: orderKey,
      size: DEFAULT_SIZE,
    }
    const response = await fetchReviewsApi(params)

    if (response.ok) {
      const reviewData = humps.camelizeKeys(await response.json()).reviews
      this.setState({ reviews: reviewData })
    }
  }

  handleWriteButtonClick = (e: React.SyntheticEvent, rating: number = 0) => {
    e.stopPropagation()
    const {
      props: { isPublic, appUrlScheme, regionId, resourceType, resourceId },
    } = this

    if (!isPublic) {
      window.location.href = `${appUrlScheme}:///reviews/new?region_id=${regionId}&resource_type=${resourceType}&resource_id=${resourceId}&rating=${rating}`
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
        resourceType,
        regionId,
        appUrlScheme,
        resourceId,
        appNativeActions: { notifyReviewDeleted, showToast },
        shortened,
        onFullListButtonClick,
        uriHash,
      },
    } = this

    if (isPublic && !reviewsCount) {
      return null
    }

    return (
      <Section anchor={REVIEWS_SECTION_ID}>
        <Container>
          {shortened && (
            <WriteIcon
              src="https://assets.triple.guide/images/btn-com-write@2x.png"
              onClick={this.handleWriteButtonClick}
            />
          )}

          <Text
            bold
            size="huge"
            ReviewsPlaceholdercolor="gray"
            alpha={1}
            inline
          >
            리뷰
          </Text>

          {(reviewsCount || 0) > 0 ? (
            <Text bold size="huge" color="blue" alpha={1} inline>
              {` ${formatNumber(reviewsCount)}`}
            </Text>
          ) : null}
        </Container>
        {shortened && (
          <>
            <ReviewsPlaceholder
              resourceType={resourceType}
              appUrlScheme={appUrlScheme}
              onClick={this.handleWriteButtonClick}
            />
            {(reviewsCount || 0) > 0 && <HR1 />}
          </>
        )}

        {(reviewsCount || 0) > 1 ? (
          <>
            <Container margin={{ top: 23 }} clearing>
              <Options
                floated="right"
                data={orders}
                onSelect={this.handleOrderSelect}
              />
            </Container>
          </>
        ) : null}

        {((reviews || []).length > 0 || myReview) && (
          <ReviewsList
            isPublic={isPublic}
            resourceType={resourceType}
            regionId={regionId}
            appUrlScheme={appUrlScheme}
            margin={{ top: (reviewsCount || 0) > 1 ? 18 : 30 }}
            reviews={shortened ? reviews.slice(0, myReview ? 2 : 3) : reviews}
            myReview={myReview}
            onMyReviewDeleted={() => this.setState({ myReview: null })}
            resourceId={resourceId}
            notifyReviewDeleted={notifyReviewDeleted}
            showToast={showToast}
            uriHash={uriHash}
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
