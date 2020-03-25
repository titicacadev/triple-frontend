import React, { useReducer, useCallback, useEffect } from 'react'
import { useI18n } from '@titicaca/i18n'
import { Section, Button, List, Tabs } from '@titicaca/core-elements'
import { PoiListElement } from '@titicaca/poi-list-elements'
import { H1, Paragraph } from '@titicaca/triple-document'
import {
  useEventTrackingContext,
  useHistoryContext,
} from '@titicaca/react-contexts'
import IntersectionObserver from '@titicaca/intersection-observer'

import { PoiType } from './types'
import nearbyPoisReducer, {
  NearbyPoisState,
  setCurrentTab,
  appendPois,
} from './reducer'
import { fetchPois } from './service'

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

export type PointGeoJSON = {
  coordinates: number[]
  type: string
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
  initialTab: PoiType
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
  const { trackEvent, trackSimpleEvent } = useEventTrackingContext()
  const { navigate } = useHistoryContext()

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
        onChange={(e?: React.SyntheticEvent, newTab?: PoiType) => {
          if (newTab) {
            trackSimpleEvent({
              action: '근처추천장소_탭선택',
              label: EVENT_LABELS[currentTab],
              /* eslint-disable-next-line @typescript-eslint/camelcase */
              tab_name: EVENT_LABELS[currentTab],
            })

            dispatch(setCurrentTab({ type: newTab as PoiType }))
          }
        }}
      />

      {pois.length === 0 && hasMore === false ? (
        <Paragraph center margin={{ top: 70 }}>
          {t('common:noNearbyPlaces', '장소가 없습니다.')}
        </Paragraph>
      ) : (
        <List divided margin={{ top: 10 }}>
          {pois.map((poi, i) => (
            <IntersectionObserver
              safe
              key={poi.id}
              onChange={({ isIntersecting }: { isIntersecting: boolean }) => {
                if (isIntersecting) {
                  trackEvent({
                    fa: {
                      action: '근처추천장소_POI노출',
                      label: `${EVENT_LABELS[currentTab]}_${i}_${poi.id}`,
                      /* eslint-disable-next-line @typescript-eslint/camelcase */
                      item_id: poi.id,
                    },
                  })
                }
              }}
            >
              <div>
                <PoiListElement
                  poi={poi}
                  onScrapedChange={(
                    e?: React.SyntheticEvent,
                    params?: {
                      id: string
                      type: string
                      scraped: boolean
                    },
                  ) => {
                    if (params) {
                      onScrapedChange(
                        params as {
                          id: string
                          type: string
                          scraped: boolean
                        },
                      )
                    }
                  }}
                  resourceScraps={scraps}
                  onClick={() => {
                    trackSimpleEvent({
                      action: '근처추천장소_POI선택',
                      label: `${EVENT_LABELS[currentTab]}_${i + 1}_${poi.id}`,
                    })

                    navigate(
                      `/regions/${poi.source.regionId}/${poi.type}s/${poi.id}`,
                    )
                  }}
                />
              </div>
            </IntersectionObserver>
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
