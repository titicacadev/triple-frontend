import React, { useCallback } from 'react'
import styled from 'styled-components'
import { Container, Card, Text, FlexBox, Button } from '@titicaca/core-elements'
import { gray100, white } from '@titicaca/color-palette'
import { useHistoryFunctions } from '@titicaca/react-contexts'
import type {
  TransportationType,
  Itinerary,
  ItineraryItemType,
} from '@titicaca/content-utilities'

import Map from './itinerary/map'
import useItinerary from './itinerary/use-computed-itineraries'
import {
  HotelCircleBadge,
  AttractionCircleBadge,
  RestaurantCircleBadge,
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
  Download,
} from './itinerary/icons'

interface Props {
  value: {
    itinerary: Itinerary
  }
  /**
   * 내 일정으로 담기 클릭 이벤트 핸들러
   */
  onClickSaveToItinerary: (
    /** 추천코스의 기준이 되는 regionId */
    regionId: string,
    /** 추천코스에 포함된 POI id 리스트 */
    poiIds: string[],
  ) => void
}

const Timeline = styled(FlexBox)`
  position: relative;
  width: 55px;

  :before {
    content: '';
    position: absolute;
    z-index: -1;
    border-right: 1px solid ${gray100};
    width: 50%;
    height: 100%;
    right: 50%;
  }
`

const PoiCard = styled(Card)`
  flex: 1;
  padding: 16px 15px;
`

const Stack = styled(Container)`
  div:first-child ${Timeline} {
    :before {
      margin-top: 5px;
    }
  }
`

const Time = styled(Text)`
  background-color: ${white};
`

const Duration = styled(Container)`
  position: relative;
  bottom: -10px;
  left: -5px;
`

const SaveToItineraryButton = styled(Button)`
  > * {
    vertical-align: middle;
  }
`

export default function ItineraryElement({
  value,
  onClickSaveToItinerary,
}: Props) {
  const { navigate } = useHistoryFunctions()
  const { courses, regionId, poiIds } = useItinerary(value)

  const generatePoiClickHandler = useCallback(
    (
      regionId: string,
      type: ItineraryItemType['poi']['type'],
      id: string,
    ) => () => {
      navigate(`/regions/${regionId}/${type}s/${id}`)
    },
    [navigate],
  )

  const handleMarkerClick = useCallback(
    ({ id, type, source: { regionId } }: ItineraryItemType['poi']) => {
      navigate(`/regions/${regionId}/${type}s/${id}`)
    },
    [navigate],
  )

  const handleSaveToItinerary = useCallback(() => {
    onClickSaveToItinerary(regionId, poiIds)
  }, [onClickSaveToItinerary, regionId, poiIds])

  return (
    <Container margin={{ top: 10, bottom: 10 }}>
      <Map {...value.itinerary} onClickMarker={handleMarkerClick} />
      <Container margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
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
                      padding={{ top: 20 }}
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
                <FlexBox
                  flexGrow={1}
                  as="a"
                  onClick={generatePoiClickHandler(regionId, type, id)}
                >
                  <PoiCard
                    shadow="medium"
                    radius={6}
                    margin={{ top: 5, bottom: 8 }}
                  >
                    <Text size={16} bold ellipsis>
                      {name}
                    </Text>
                    <Text
                      size={13}
                      color="gray500"
                      lineHeight={1.4}
                      padding={{ top: 6 }}
                      ellipsis
                    >
                      {description}
                    </Text>
                    {memo ? (
                      <Text size={14} margin={{ top: 10 }}>
                        {memo}
                      </Text>
                    ) : null}
                  </PoiCard>
                </FlexBox>
              </FlexBox>
            )
          })}
        </Stack>
        <SaveToItineraryButton
          fluid
          basic
          bold
          inverted
          margin={{ top: 20 }}
          onClick={handleSaveToItinerary}
        >
          <Download />
          <Text inline size={14} margin={{ left: 3 }} color="white">
            내 일정으로 담기
          </Text>
        </SaveToItineraryButton>
      </Container>
    </Container>
  )
}

function PoiCircleBadge(type: ItineraryItemType['poi']['type']) {
  switch (type) {
    case 'hotel':
      return HotelCircleBadge
    case 'attraction':
      return AttractionCircleBadge
    case 'restaurant':
      return RestaurantCircleBadge
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
    default:
      return () => null
  }
}
