import React, { useReducer, useCallback, useEffect } from 'react'
import { useI18n } from '@titicaca/i18n'
import { Section, Button, List, Tabs } from '@titicaca/core-elements'
import { H1, Paragraph } from '@titicaca/triple-document'
import { useEventTrackingContext } from '@titicaca/react-contexts'

import { PoiType, PointGeoJSON } from './types'
import nearbyPoisReducer, {
  NearbyPoisState,
  setCurrentTab,
  appendPois,
} from './reducer'
import { fetchPois } from './service'
import PoiEntry from './poi-entry'

const INITIAL_STATE: NearbyPoisState = {
  attraction: {
    pois: [],
    hasMore: undefined,
    fetching: false,
  },
  restaurant: {
    pois: [],
    hasMore: undefined,
    fetching: false,
  },
  currentTab: 'attraction',
}

const EVENT_LABELS: { [key in PoiType]: string } = {
  attraction: '관광',
  restaurant: '맛집',
}

const DEFAULT_PAGE_SIZE = 3
const SUBSEQUENT_PAGE_SIZE = 10

export default function NearbyPois({
  poiId,
  regionId,
  initialTab,
  scraps,
  onScrapedChange,
  geolocation: {
    coordinates: [lon, lat],
  },
  ...props
}: {
  poiId: string
  regionId: string
  initialTab?: PoiType
  scraps: { [key: string]: boolean }
  onScrapedChange: (props: {
    id: string
    type: string
    scraped: boolean
  }) => void
  geolocation: PointGeoJSON
} & Parameters<typeof Section>['0']) {
  const [{ currentTab, ...state }, dispatch] = useReducer(nearbyPoisReducer, {
    ...INITIAL_STATE,
    ...(initialTab && { currentTab: initialTab }),
  })
  const { pois, hasMore, fetching } = state[currentTab]
  const { trackSimpleEvent } = useEventTrackingContext()

  const { t } = useI18n()

  useEffect(() => {
    async function fetchAndSetPois() {
      const [attractions, restaurants] = await Promise.all(
        (['attraction', 'restaurant'] as PoiType[]).map((type) =>
          fetchPois({
            type,
            excludedIds: [poiId],
            regionId,
            lon,
            lat,
            size: DEFAULT_PAGE_SIZE,
          }),
        ),
      )

      dispatch(
        appendPois({
          type: 'attraction',
          pois: attractions,
          hasMore: attractions.length === DEFAULT_PAGE_SIZE,
        }),
      )

      dispatch(
        appendPois({
          type: 'restaurant',
          pois: restaurants,
          hasMore: attractions.length === DEFAULT_PAGE_SIZE,
        }),
      )
    }

    fetchAndSetPois()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleLoadMore = useCallback(async () => {
    trackSimpleEvent({
      action: '근처추천장소_장소더보기',
      label: EVENT_LABELS[currentTab],
    })

    const additionalPois = await fetchPois({
      regionId,
      lat,
      lon,
      type: currentTab,
      excludedIds: [poiId],
      from: pois.length,
      size: SUBSEQUENT_PAGE_SIZE,
    })

    dispatch(
      appendPois({
        type: currentTab,
        pois: additionalPois,
        hasMore: additionalPois.length === SUBSEQUENT_PAGE_SIZE,
      }),
    )
  }, [poiId, regionId, lat, lon, currentTab, pois, dispatch, trackSimpleEvent])

  const handleTabChange = useCallback(
    (e?: React.SyntheticEvent, newTab?: string) => {
      if (newTab) {
        trackSimpleEvent({
          action: '근처추천장소_탭선택',
          label: EVENT_LABELS[newTab as PoiType],
          /* eslint-disable-next-line @typescript-eslint/camelcase */
          tab_name: EVENT_LABELS[newTab as PoiType],
        })

        dispatch(setCurrentTab({ type: newTab as PoiType }))
      }
    },
    [trackSimpleEvent, dispatch],
  )

  return (
    <Section anchor="nearby-pois" /* minHeight={404} */ {...props}>
      <H1 margin={{ bottom: 20 }}>
        {t('common:nearbyPois', '근처의 추천 장소')}
      </H1>

      <Tabs
        type="basic"
        value={currentTab}
        options={[
          { label: t('common:attraction', '관광'), value: 'attraction' },
          { label: t('common:restaurant', '맛집'), value: 'restaurant' },
        ]}
        onChange={handleTabChange}
      />

      {pois.length === 0 && hasMore === false ? (
        <Paragraph center margin={{ top: 70 }}>
          {t('common:noNearbyPlaces', '장소가 없습니다.')}
        </Paragraph>
      ) : (
        <List divided margin={{ top: 10 }}>
          {pois.map((poi, i) => (
            <PoiEntry
              key={poi.id}
              index={i}
              poi={poi}
              scraps={scraps}
              onScrapedChange={onScrapedChange}
              eventLabel={EVENT_LABELS[currentTab]}
            />
          ))}

          {hasMore && (
            <Button
              basic
              fluid
              compact
              color="gray"
              size="small"
              margin={{ top: 10 }}
              disabled={fetching}
              onClick={handleLoadMore}
            >
              {t('common:moreNearbyplaces', '더 많은 장소 보기')}
            </Button>
          )}
        </List>
      )}
    </Section>
  )
}
