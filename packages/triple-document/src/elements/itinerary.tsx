import { useCallback } from 'react'
import { styled } from 'styled-components'
import { Container, Text, FlexBox } from '@titicaca/tds-ui'
import type {
  TransportationType,
  Itinerary,
  ItineraryItemType,
  PoiType,
} from '@titicaca/content-type-definitions'
import { useNavigate } from '@titicaca/router'
import { useTrackEvent } from '@titicaca/triple-web'

import { useGuestMode } from '../prop-context/guest-mode'

import ItineraryMap from './itinerary/itinerary-map'
import useItinerary from './itinerary/use-computed-itineraries'
import {
  HotelCircleBadge,
  AttractionCircleBadge,
  RestaurantCircleBadge,
  FestaCircleBadge,
} from './itinerary/badge'
import { TagLabel } from './itinerary/tag-label'
import {
  Bus,
  Walk,
  Car,
  Train,
  Tram,
  Cable,
  Plane,
  Ship,
  Bike,
} from './itinerary/icons'
import SaveToItinerary, { Geotag } from './itinerary/save-to-itinerary'
import { ItineraryElementType } from './itinerary/types'
import PoiCard from './itinerary/poi-card'

interface Props {
  value: {
    itinerary: Itinerary
    geotag?: Geotag
  }
}

const Timeline = styled(FlexBox)`
  position: relative;
  min-width: 55px;

  &::before {
    content: '';
    position: absolute;
    z-index: -1;
    border-right: 1px solid var(--color-gray100);
    width: 50%;
    height: 100%;
    right: 50%;
  }
`

const Stack = styled(Container)`
  div:first-child ${Timeline} {
    &::before {
      margin-top: 5px;
    }
  }
`

const Time = styled(Text)`
  background-color: var(--color-white);
`

const Duration = styled(Container)`
  position: relative;
  bottom: -10px;
  left: -5px;
  flex-shrink: 0;
`

export default function ItineraryElement({ value }: Props) {
  const trackEvent = useTrackEvent()

  const guestMode = useGuestMode()
  const { courses, regionId, itemIds, hasItineraries, hideAddButton } =
    useItinerary({ itinerary: value.itinerary, guestMode })

  const { navigate } = useNavigate()

  const generatePoiClickHandler = useCallback(
    ({
      regionId,
      type,
      id,
      name,
    }: {
      regionId: string
      type: ItineraryElementType
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

        const url =
          type === 'festa'
            ? `/festas/${id}`
            : `${regionId ? `/regions/${regionId}` : ''}/${type}s/${id}`

        navigate(url)
      },
    [navigate, trackEvent],
  )

  const handleMarkerClick = useCallback(
    (item: ItineraryItemType) => {
      if (item.poi) {
        const { id, source, type } = item.poi
        navigate(
          `${source?.regionId ? `/regions/${regionId}` : ''}/${type}s/${id}`,
        )
      } else {
        const { id } = item.festa
        navigate(`/festas/${id}`)
      }
    },
    [navigate, regionId],
  )

  const itineraryGeotag =
    value.geotag ||
    (regionId ? { type: 'triple-region', id: regionId } : undefined)

  return (
    <Container
      css={{
        margin: '10px 0',
      }}
    >
      <ItineraryMap {...value.itinerary} onClickMarker={handleMarkerClick} />
      <Container
        css={{
          margin: '20px',
        }}
      >
        <Stack>
          {courses.map((course, index) => {
            const {
              id,
              regionId,
              name,
              type,
              description,
              transportation,
              duration,
              memo,
              schedule,
              isLast,
              comment,
              imageUrl,
            } = course
            const hasDuration = !isLast && transportation !== undefined
            const CircleBadge = PoiCircleBadge(type)
            const TransportIcon = TransportationIcon(transportation)

            return (
              <FlexBox flex key={index}>
                <Timeline flex>
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
                      css={{
                        padding: '20px 0 0',
                      }}
                    >
                      <CircleBadge>{index + 1}</CircleBadge>
                      {schedule ? (
                        <Time
                          bold
                          size={11}
                          color="gray300"
                          padding={{ top: 5, bottom: 5 }}
                          letterSpacing={-0.3}
                        >
                          {schedule}
                        </Time>
                      ) : null}
                    </FlexBox>
                    {hasDuration ? (
                      <Duration>
                        <TagLabel>
                          <TransportIcon />
                          {duration}
                        </TagLabel>
                      </Duration>
                    ) : null}
                  </FlexBox>
                </Timeline>
                <PoiCard
                  type={type as PoiType}
                  name={name}
                  description={description}
                  memo={memo}
                  comment={comment}
                  imageUrl={imageUrl}
                  onClickPoiCard={generatePoiClickHandler({
                    regionId,
                    type,
                    id,
                    name,
                  })}
                />
              </FlexBox>
            )
          })}
        </Stack>
        {hideAddButton || guestMode || !itineraryGeotag ? null : (
          <SaveToItinerary
            itemIds={itemIds}
            geotag={itineraryGeotag}
            disabled={!hasItineraries}
          />
        )}
      </Container>
    </Container>
  )
}

function PoiCircleBadge(type: ItineraryElementType) {
  switch (type) {
    case 'hotel':
      return HotelCircleBadge
    case 'attraction':
      return AttractionCircleBadge
    case 'restaurant':
      return RestaurantCircleBadge
    case 'festa':
      return FestaCircleBadge
  }

  throw new Error(`Unknown card type of poi "${type}"`)
}

function TransportationIcon(type?: TransportationType) {
  switch (type) {
    case 'car':
      return Car
    case 'bus':
      return Bus
    case 'walk':
      return Walk
    case 'plane':
      return Plane
    case 'train':
      return Train
    case 'tram':
      return Tram
    case 'cable':
      return Cable
    case 'ship':
      return Ship
    case 'bike':
      return Bike
    default:
      return () => null
  }
}
