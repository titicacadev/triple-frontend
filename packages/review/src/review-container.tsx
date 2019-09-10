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
import { useReviewContext } from './review-context'
import { ReviewsList } from './review-list'
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
function ReviewsPlaceholder({ children, withRating, onClick }) {
  return (
    <PlaceholderContainer margin={{ top: 20 }} onClick={onClick}>
      {withRating ? <Rating size="medium" onClick={onClick} /> : null}
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

export function ReviewContainer({
  shortened,
  regionId,
  isPublic,
  APP_URL_SCHEME,
  reviewsCount: initialReviewsCount,
  source,
  withRating,
  resourceType,
  reviewed,
  onFullListButtonClick,
  notifyReviewDeleted,
  showToast,
  children,
}: {
  shortened: boolean
  regionId: string
  isPublic: boolean
  APP_URL_SCHEME: string
  reviewsCount: number
  source: any
  withRating: boolean
  resourceType: string
  reviewed: boolean
  onFullListButtonClick?: any
  notifyReviewDeleted: any
  showToast: any
  children?: React.ReactNode
}) {
  const [reviews, setReviews] = React.useState([])
  const [myReview, setMyReview] = React.useState(undefined)
  const [orders, setOrders] = React.useState(getDefaultReviewOrders())
  const filterOptions = { from: 0, size: DEFAULT_SIZE }
  const { id } = source
  const { deriveCurrentStateAndCount }: any = useReviewContext()
  const { reviewsCount } = deriveCurrentStateAndCount({
    id,
    reviewsCount: initialReviewsCount,
    reviewed: reviewed,
  })

  const fetchReviews = async () => {
    const { key: orderKey } = orders.find(({ selected }) => selected)
    setOrders(
      orders.map((order) => ({
        ...order,
        selected: order.key === orderKey,
      })),
    )

    //@TODO pagination 처리 필요
    const { from, size } = filterOptions
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
      setReviews(reviewData)
    }
  }

  const handleWriteButtonClick = (
    e: React.SyntheticEvent,
    rating: number = 0,
  ) => {
    e.stopPropagation()

    if (!isPublic) {
      window.location.href = `${APP_URL_SCHEME}:///reviews/new?region_id=${regionId}&resource_type=${resourceType}&resource_id=${id}&rating=${rating}`
    }
  }

  const handleOrderSelect = (_, { key }) => {
    setOrders(
      orders.map((order) => ({
        ...order,
        selected: order.key === key,
      })),
    )
    fetchReviews()
  }

  if (isPublic && !Number(reviewsCount)) {
    return null
  }

  React.useEffect(() => {
    fetchReviews()
  }, [setReviews])

  return (
    <Section anchor={REVIEWS_SECTION_ID}>
      <WriteIcon
        src="https://assets.triple.guide/images/btn-com-write@2x.png"
        onClick={handleWriteButtonClick}
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
          <Options floated="right" data={orders} onSelect={handleOrderSelect} />
        </Container>
      ) : null}

      <ReviewsPlaceholder
        withRating={withRating}
        onClick={handleWriteButtonClick}
      >
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
          onMyReviewDeleted={() => setMyReview(null)}
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
