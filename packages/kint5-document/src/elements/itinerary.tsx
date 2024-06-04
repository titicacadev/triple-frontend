import { MouseEvent, useCallback } from 'react'
import {
  Container,
  Text,
  FlexBox,
  FlexBoxItem,
} from '@titicaca/kint5-core-elements'
import type {
  TransportationType,
  Itinerary,
  ItineraryItemType,
} from '@titicaca/content-type-definitions'
import { useNavigate } from '@titicaca/kint5-router'
import { useEventTrackingContext } from '@titicaca/react-contexts'
import { useTranslation } from '@titicaca/next-i18next'
import { useTripleClientMetadata } from '@titicaca/react-triple-client-interfaces'
import { TransitionType } from '@titicaca/kint5-modals'
import { useAppCallback } from '@titicaca/ui-flow'
import { StaticIntersectionObserver } from '@titicaca/intersection-observer'

import { useAddItinerariesToTripHandler } from '../prop-context/add-itineraries-to-trip-handler'

import ItineraryMap from './itinerary/itinerary-map'
import useItinerary from './itinerary/use-computed-itineraries'
import { Bus, Walk, Train, Plane } from './itinerary/icons'
import { ItineraryOrder } from './itinerary/itinerary-order'
import { ItineraryElementType } from './itinerary/types'
import { isValidAppVersion } from './itinerary/app-version-check'
import { FindDirectionsButton } from './itinerary/find-directions-button'

interface Props {
  value: {
    itinerary: Itinerary
  }
  articleId?: string
  itineraryDay: number
}

export default function ItineraryElement({
  value,
  articleId,
  itineraryDay,
}: Props) {
  const { t } = useTranslation('common-web')
  const { trackEvent } = useEventTrackingContext()
  const { courses, itemIds, regionId, hideAddButton, hasItineraries } =
    useItinerary(value)
  const navigate = useNavigate()
  const app = useTripleClientMetadata()
  const onAddItinerariesToTrip = useAddItinerariesToTripHandler()

  const generateItemClickHandler = useCallback(
    ({
      type,
      id,
      name,
    }: {
      type: ItineraryElementType
      id: string
      name: string
    }) =>
      (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()

        const action =
          type === 'festa' ? '추천일정_페스타_선택' : '추천일정_POI_선택'

        trackEvent({
          fa: {
            action,
            item_id: id,
            item_name: name,
            type,
          },
        })
        navigate(`/${type === 'festa' ? 'festas' : 'pois'}/${id}`)
      },
    [navigate, trackEvent],
  )

  const handleMarkerClick = useCallback(
    (item: ItineraryItemType) => {
      const url = item.poi ? `/pois/${item.poi.id}` : `/festas/${item.festa.id}`

      navigate(url)
    },
    [navigate],
  )

  const handleSaveToItinerary = useAppCallback(
    TransitionType.General,
    useCallback(() => {
      trackEvent({
        fa: {
          action: '추천일정담기_선택',
          day: itineraryDay,
          ...(articleId && { article_id: articleId }),
        },
      })

      onAddItinerariesToTrip?.({
        itemIds,
        defaultRegionId: regionId,
        itineraryDay,
      })
    }, [
      itemIds,
      regionId,
      articleId,
      itineraryDay,
      onAddItinerariesToTrip,
      trackEvent,
    ]),
  )

  const onItineraryElementExposure = ({
    isIntersecting,
  }: IntersectionObserverEntry) => {
    if (!isIntersecting) {
      return
    }

    trackEvent({
      fa: {
        action: '추천일정_노출',
        day: itineraryDay,
        ...(articleId && { article_id: articleId }),
      },
    })
  }

  return (
    <StaticIntersectionObserver onChange={onItineraryElementExposure}>
      <Container
        css={{
          margin: '10px 0',
        }}
      >
        <ItineraryMap {...value.itinerary} onClickMarker={handleMarkerClick} />
        <Container
          css={{
            margin: '24px 16px 16px 20px',
          }}
        >
          <Container
            css={{
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                zIndex: -1,
                backgroundColor: 'var(--color-kint5-gray30)',
                width: 1,
                height: 'calc(100% - 60px)',
                top: 5,
                left: 15.5,
              },
            }}
          >
            {courses.map((course, index) => {
              const {
                id,
                name,
                type,
                description,
                transportation,
                duration,
                isLast,
              } = course
              const hasDuration = !isLast && transportation !== undefined
              const TransportIcon = getTransportationIcon(transportation)
              const hasTransportationInfo =
                hasDuration && TransportIcon !== null

              return (
                <FlexBox flex key={index} gap="4px">
                  <FlexBox
                    flex
                    alignItems="flex-start"
                    css={{ position: 'relative' }}
                  >
                    <ItineraryOrder itineraryItemType={type} index={index} />
                  </FlexBox>
                  <FlexBoxItem flexGrow={1}>
                    <a
                      href={type === 'festa' ? `/festas/${id}` : `/pois/${id}`}
                      onClick={generateItemClickHandler({
                        type,
                        id,
                        name,
                      })}
                      css={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        gap: 4,
                        border: '1px solid var(--color-kint5-gray30)',
                        padding: '12px 12px 12px 16px',
                        borderRadius: 16,
                      }}
                    >
                      <Text maxLines={1}>{name}</Text>
                      <FlexBox flex>
                        <Text
                          maxLines={1}
                          css={{
                            fontSize: 12,
                            color: 'var(--color-kint5-gray60)',
                          }}
                        >
                          {description}
                        </Text>
                      </FlexBox>
                    </a>
                    <FlexBox
                      flex
                      alignItems="center"
                      gap="4px"
                      css={{
                        paddingLeft: 14,
                      }}
                    >
                      {hasTransportationInfo ? (
                        <FlexBox flex css={{ margin: '18px 0' }}>
                          <TransportIcon width={20} height={20} />
                          <Text
                            css={{
                              fontSize: 13,
                              color: 'var(--color-kint5-gray60)',
                            }}
                          >
                            {duration}
                          </Text>
                        </FlexBox>
                      ) : null}
                      <FindDirectionsButton
                        currentCourse={courses[index]}
                        nextCourse={courses[index + 1]}
                        hasTransportationInfo={hasTransportationInfo}
                      />
                    </FlexBox>
                  </FlexBoxItem>
                </FlexBox>
              )
            })}
          </Container>
          {!hideAddButton &&
          (!app || isValidAppVersion(app.appVersion, 'savingItineraries')) ? (
            <button
              onClick={handleSaveToItinerary}
              disabled={!hasItineraries}
              css={{
                padding: 14,
                backgroundColor: 'var(--color-kint5-brand1)',
                color: 'var(--color-kint5-gray0)',
                fontWeight: 700,
                width: '100%',
                marginTop: 32,
                borderRadius: 28,
              }}
            >
              {t(['nae-iljeongeuro-damgi', '내 일정으로 담기'])}
            </button>
          ) : null}
        </Container>
      </Container>
    </StaticIntersectionObserver>
  )
}

function getTransportationIcon(type?: TransportationType) {
  switch (type) {
    case 'bus':
      return Bus
    case 'walk':
      return Walk
    case 'plane':
      return Plane
    case 'train':
      return Train
    default:
      return null
  }
}
