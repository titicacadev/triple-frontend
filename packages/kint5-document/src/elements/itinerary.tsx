import { useCallback } from 'react'
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
import { useNavigate } from '@titicaca/router'
import { useEventTrackingContext } from '@titicaca/react-contexts'
import { useTranslation } from '@titicaca/next-i18next'
import { useTripleClientMetadata } from '@titicaca/react-triple-client-interfaces'

import { useAddItinerariesToTripHandler } from '../prop-context/add-itineraries-to-trip-handler'

import ItineraryMap from './itinerary/itinerary-map'
import useItinerary from './itinerary/use-computed-itineraries'
import { Bus, Walk, Train, Plane } from './itinerary/icons'
import { ItineraryOrder } from './itinerary/itinerary-order'

interface Props {
  value: {
    itinerary: Itinerary
  }
}

export default function ItineraryElement({ value }: Props) {
  const { t } = useTranslation('common-web')
  const { trackEvent } = useEventTrackingContext()
  const { courses, poiIds, regionId, hideAddButton, hasItineraries, items } =
    useItinerary(value)
  const navigate = useNavigate()
  const app = useTripleClientMetadata()
  const onAddItinerariesToTrip = useAddItinerariesToTripHandler()

  const generatePoiClickHandler = useCallback(
    ({
      type,
      id,
      name,
    }: {
      type: ItineraryItemType['poi']['type']
      id: string
      name: string
    }) =>
      () => {
        trackEvent({
          ga: ['POI_선택', `${type}_${id}_${name}`],
          fa: {
            action: 'POI_선택',
            item_id: id,
            item_name: name,
            type,
          },
        })
        navigate(`/pois/${id}`)
      },
    [navigate, trackEvent],
  )

  const handleMarkerClick = useCallback(
    ({ id }: ItineraryItemType['poi']) => {
      navigate(`/poi/${id}`)
    },
    [navigate],
  )

  const handleSaveToItinerary = useCallback(() => {
    trackEvent({
      fa: {
        action: '내일정으로담기_선택',
      },
    })

    onAddItinerariesToTrip?.({ poiId: poiIds, defaultRegionId: regionId })
  }, [poiIds, regionId, onAddItinerariesToTrip, trackEvent])

  return (
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
            const areaName = items[index].poi.source?.areas?.[0]?.name
            const hasDuration = !isLast && transportation !== undefined
            const TransportIcon = getTransportationIcon(transportation)
            const shouldShowTransportationInfo = hasDuration && TransportIcon

            return (
              <FlexBox
                flex
                key={index}
                gap="4px"
                css={{
                  ...(!shouldShowTransportationInfo && { marginBottom: 18 }),
                }}
              >
                <FlexBox flex css={{ position: 'relative' }}>
                  <FlexBox
                    flex
                    flexGrow={1}
                    justifyContent="center"
                    alignItems="center"
                    flexDirection="column"
                  >
                    <FlexBox
                      flex
                      flexGrow={1}
                      alignItems="center"
                      flexDirection="column"
                    >
                      <ItineraryOrder itineraryItemType={type} index={index} />
                    </FlexBox>
                  </FlexBox>
                </FlexBox>
                <FlexBoxItem
                  flexGrow={1}
                  as="a"
                  onClick={generatePoiClickHandler({
                    type,
                    id,
                    name,
                  })}
                >
                  <FlexBox
                    flex
                    alignItems="center"
                    css={{
                      border: '1px solid var(--color-kint5-gray30)',
                      padding: '12px 12px 12px 16px',
                      borderRadius: 16,
                    }}
                  >
                    <FlexBox flex flexDirection="column" gap="4px">
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
                        {areaName ? (
                          <Text
                            css={{
                              fontSize: 12,
                              color: 'var(--color-kint5-gray60)',
                            }}
                          >
                            &nbsp;·&nbsp;{areaName}
                          </Text>
                        ) : null}
                      </FlexBox>
                    </FlexBox>
                  </FlexBox>
                  {shouldShowTransportationInfo ? (
                    <FlexBox
                      flex
                      alignItems="center"
                      gap="4px"
                      css={{ margin: '18px 0', paddingLeft: 14 }}
                    >
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
                </FlexBoxItem>
              </FlexBox>
            )
          })}
        </Container>
        {!hideAddButton && isValidAppVersionForItinerary(app?.appVersion) ? (
          <button
            onClick={handleSaveToItinerary}
            disabled={!hasItineraries}
            css={{
              padding: 14,
              backgroundColor: 'var(--color-kint5-brand1)',
              color: 'var(--color-kint5-gray0)',
              fontWeight: 700,
              width: '100%',
              marginTop: 16,
              borderRadius: 28,
            }}
          >
            {t(['nae-iljeongeuro-damgi', '내 일정으로 담기'])}
          </button>
        ) : null}
      </Container>
    </Container>
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

function isValidAppVersionForItinerary(appVersion: string | undefined) {
  if (process.env.NEXT_PUBLIC_IS_PRODUCTION !== 'true') {
    return true
  }

  if (!appVersion) {
    return false
  }

  const [major, minor] = appVersion.split('.')
  const majorVersion = Number(major)
  const minorVersion = Number(minor)

  if (majorVersion > 1) {
    return true
  }

  if (majorVersion === 1) {
    return minorVersion >= 2
  }

  return false
}
