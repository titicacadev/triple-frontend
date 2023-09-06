import { SyntheticEvent, useCallback } from 'react'
import { useTranslation } from '@titicaca/next-i18next'
import styled from 'styled-components'
import { Button, Container, Rating, Text } from '@titicaca/core-elements'
import { useAppCallback, useSessionCallback } from '@titicaca/ui-flow'
import { TransitionType } from '@titicaca/modals'
import { useEventTrackingContext } from '@titicaca/react-contexts'

import { useClientActions } from '../services'

import type { SortingOption } from './sorting-context'

const PlaceholderContainer = styled(Container)`
  width: 100%;
  text-align: center;
`

const GuideImage = styled.img`
  content: url('https://assets.triple.guide/images/img-card-guide-review@3x.png');
  display: block;
  width: 50px;
  height: 50px;
  margin: auto;
`

const NavigateToReviewsListButton = styled(Button)`
  padding: 10px 20px;
`

const RecentTripContainer = styled(Container)`
  text-align: center;
  padding-top: 180px;
  padding-bottom: 60px;

  @media only screen and (max-width: 667px) {
    padding-top: 120px;
  }
`

export interface ReviewsPlaceholderProps {
  isMorePage: boolean
  hasReviews: boolean
  resourceId: string
  resourceType: string
  regionId: string | undefined
  recentTrip: boolean
  placeholderText?: string
  sortingOption: SortingOption
}

export function ReviewsPlaceholder({
  isMorePage,
  hasReviews,
  resourceId,
  resourceType,
  regionId,
  recentTrip,
  placeholderText,
  sortingOption,
}: ReviewsPlaceholderProps) {
  const { trackEvent } = useEventTrackingContext()
  const { writeReview, navigateReviewList } = useClientActions()

  const handleFullClick = useAppCallback(
    TransitionType.OpenReviewList,
    useSessionCallback(
      useCallback(() => {
        navigateReviewList({
          resourceId,
          resourceType,
          recentTrip: false,
          sortingOption,
        })
      }, [navigateReviewList, resourceId, resourceType, sortingOption]),
      { triggeredEventAction: '리뷰_리스트더보기_선택' },
    ),
  )

  const handleWriteClick = useAppCallback(
    TransitionType.ReviewWrite,
    useSessionCallback(
      useCallback(
        (rating = 0) => {
          trackEvent({
            ga: ['리뷰_리뷰쓰기'],
            fa: {
              action: '리뷰_리뷰쓰기',
              item_id: resourceId,
            },
          })

          writeReview({
            resourceType,
            resourceId,
            regionId,
            rating,
          })
        },
        [regionId, resourceId, resourceType, trackEvent, writeReview],
      ),
      { triggeredEventAction: '리뷰_리뷰쓰기' },
    ),
  )

  const handleClick = (rating?: number) => {
    trackEvent({
      ga: ['리뷰_리스트더보기_선택'],
      fa: {
        action: '리뷰_리스트더보기_선택',
        item_id: resourceId,
        tab_name: sortingOption === 'latest' ? '최신순' : '추천순',
      },
    })
    if (recentTrip) {
      handleFullClick()
    } else {
      handleWriteClick(rating)
    }
  }

  return (
    <PlaceholderContainer
      css={{
        margin: '20px 0 0',
      }}
      onClick={!isMorePage ? () => handleClick() : undefined}
    >
      {!recentTrip ? (
        resourceType === 'article' ? (
          <GuideImage />
        ) : (
          <Rating size="medium" onClick={(_, rating) => handleClick(rating)} />
        )
      ) : null}

      {recentTrip ? (
        <RecentTripPlaceholder
          isMorePage={isMorePage}
          hasReviews={hasReviews}
          onClick={() => handleClick()}
        />
      ) : (
        <DefaultPlaceholder placeholderText={placeholderText} />
      )}
    </PlaceholderContainer>
  )
}

function DefaultPlaceholder({
  placeholderText,
}: {
  placeholderText: string | undefined
}) {
  const { t } = useTranslation('common-web')

  return (
    <Text
      margin={{ top: 8 }}
      size="large"
      color="gray"
      alpha={1}
      lineHeight={1.5}
    >
      {placeholderText ??
        t([
          'igosyi-ceos-beonjjae-ribyureul-olryeojuseyo.',
          '이곳의 첫 번째 리뷰를 올려주세요.',
        ])}
    </Text>
  )
}

function RecentTripPlaceholder({
  isMorePage,
  hasReviews,
  onClick,
}: {
  isMorePage: boolean
  hasReviews: boolean
  onClick?: (e: SyntheticEvent, rating?: number) => void
}) {
  const { t } = useTranslation('common-web')

  return isMorePage ? (
    <RecentTripContainer>
      <img
        width={44}
        height={44}
        src="https://assets.triple.guide/images/ico_empty_review@4x.png"
        alt="write-review-icon"
      />
      <Text
        size={18}
        padding={{ top: 20, bottom: 8 }}
        bold
        lineHeight="21px"
        textAlign="center"
      >
        {t([
          'seontaeghan-jogeonyi-ribyuga-eobsseubnida.',
          '선택한 조건의 리뷰가 없습니다.',
        ])}
      </Text>
      <Text size={14} lineHeight="19px" textAlign="center" color="gray500">
        {t([
          'danyeoon-yeohaengjiyi-ribyureul-namgyeoboseyo.',
          '다녀온 여행지의\n리뷰를 남겨보세요.',
        ])}
      </Text>
    </RecentTripContainer>
  ) : (
    <Container
      css={{
        padding: '60px 0',
      }}
    >
      <Text size={14} color="gray500">
        {t([
          'seontaeghan-jogeonyi-ribyuga-eobsseubnida.',
          '선택한 조건의 리뷰가 없습니다.',
        ])}
      </Text>
      {hasReviews ? (
        <NavigateToReviewsListButton
          inverted
          margin={{ top: 10 }}
          onClick={onClick}
        >
          <Text size={13} color="white" bold>
            {t(['jeonce-ribyu-bogi', '전체 리뷰 보기'])}
          </Text>
        </NavigateToReviewsListButton>
      ) : null}
    </Container>
  )
}
