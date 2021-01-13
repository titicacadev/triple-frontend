import React, { useCallback } from 'react'
import styled from 'styled-components'
import { Container, Card, Text, FlexBox, Button } from '@titicaca/core-elements'
import { gray100, white } from '@titicaca/color-palette'
import { useHistoryFunctions } from '@titicaca/react-contexts'
import { PoiType } from '@titicaca/type-definitions'

import { Day, TransportationType } from './itinerary/types'
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
    itinerary: Day
  }
}

interface Props {
  value: {
    itinerary: Day
  }
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
  font-weight: 700;
  background-color: ${white};
`

const Duration = styled(Container)`
  position: relative;
  bottom: -10px;
  left: -5px;
`

/**
 * TODO: Button 컴포넌트에 icon=download 추가
 *
 */
const SaveToItineraryButton = styled(Button)`
  > * {
    vertical-align: middle;
  }
`

const Description = styled(Text)`
  font-weight: 500;
`

function PoiCircleBadge(type: PoiType) {
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
    case TransportationType.CAR:
      return Car
    case TransportationType.BUS:
      return Bus
    case TransportationType.WALK:
      return Walk
    case TransportationType.PLANE:
      return Plane
    case TransportationType.TRAIN:
      return Train
    case TransportationType.TRAM:
      return Tram
    case TransportationType.CABLE:
      return Cable
    default:
      return () => null
  }
}

export default function RecommendedRoutesElement({ value }: Props) {
  const { navigate } = useHistoryFunctions()
  const { courses, saveToItinerary } = useItinerary(value)

  const generatePoiClickHandler = useCallback(
    (regionId: string, type: PoiType, id: string) => () => {
      navigate(`/regions/${regionId}/${type}s/${id}`)
    },
    [navigate],
  )

  const handleSaveToItinerary = useCallback(() => {
    /** TODO: add to event tracking */
    saveToItinerary()
  }, [saveToItinerary])

  return (
    <Container margin={{ top: 10, bottom: 10 }}>
      <Map {...value.itinerary} />
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
                    <Description
                      size={13}
                      bold
                      color="gray500"
                      lineHeight={1.4}
                      padding={{ top: 6 }}
                      ellipsis
                    >
                      {description}
                    </Description>
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
          <Text inline size={14} margin={{ left: 3 }} color={white}>
            내 일정으로 담기
          </Text>
        </SaveToItineraryButton>
      </Container>
    </Container>
  )
}
