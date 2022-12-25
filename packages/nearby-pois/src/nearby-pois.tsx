import { useReducer, useCallback, useEffect } from 'react'
import { useTranslation } from '@titicaca/next-i18next'
import {
  Section,
  Button,
  List,
  Tabs,
  H1,
  Paragraph,
} from '@titicaca/core-elements'
import { useEventTrackingContext } from '@titicaca/react-contexts'
import { PointGeoJson } from '@titicaca/type-definitions'

import { NearByPoiType } from './types'
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

const EVENT_LABELS: { [key in NearByPoiType]: string } = {
  attraction: '관광',
  restaurant: '맛집',
}

const DEFAULT_PAGE_SIZE = 3
const SUBSEQUENT_PAGE_SIZE = 10

function NearbyPois({
  poiId,
  regionId,
  initialTab,
  geolocation: {
    coordinates: [lon, lat],
  },
  optimized,
  ...props
}: {
  poiId: string
  regionId?: string
  initialTab?: NearByPoiType
  geolocation: PointGeoJson
  optimized?: boolean
} & Parameters<typeof Section>['0']) {
  const { t } = useTranslation('common-web')

  const [{ currentTab, ...state }, dispatch] = useReducer(nearbyPoisReducer, {
    ...INITIAL_STATE,
    ...(initialTab && { currentTab: initialTab }),
  })
  const { pois, hasMore, fetching } = state[currentTab]
  const { trackSimpleEvent } = useEventTrackingContext()

  useEffect(() => {
    async function fetchAndSetPois() {
      const [attractions, restaurants] = await Promise.all(
        (['attraction', 'restaurant'] as NearByPoiType[]).map((type) =>
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
          hasMore: restaurants.length === DEFAULT_PAGE_SIZE,
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
    (newTab: string) => {
      trackSimpleEvent({
        action: '근처추천장소_탭선택',
        label: EVENT_LABELS[newTab as NearByPoiType],
        tab_name: EVENT_LABELS[newTab as NearByPoiType],
      })

      dispatch(setCurrentTab({ type: newTab as NearByPoiType }))
    },
    [trackSimpleEvent, dispatch],
  )

  return (
    <Section
      anchor="nearby-pois"
      {...props}
      css={{
        minHeight: 404,
      }}
    >
      <H1
        css={{
          margin: '0 0 20px',
        }}
      >
        {t('geunceoyi-cuceon-jangso')}
      </H1>

      <Tabs variant="basic" value={currentTab} onChange={handleTabChange}>
        <Tabs.TabList>
          <Tabs.Tab value="attraction">
            {t('gwangwang')}
          </Tabs.Tab>
          <Tabs.Tab value="restaurant">
            {t('masjib')}
          </Tabs.Tab>
        </Tabs.TabList>
        <Tabs.TabPanel value={currentTab}>
          {pois.length === 0 && hasMore === false ? (
            <Paragraph center margin={{ top: 70 }}>
              {t('jangsoga-eobsseubnida.')}
            </Paragraph>
          ) : (
            <>
              <List divided margin={{ top: 10 }}>
                {pois.map((poi, i) => (
                  <PoiEntry
                    key={poi.id}
                    index={i}
                    poi={poi}
                    eventLabel={EVENT_LABELS[currentTab]}
                    optimized={optimized}
                  />
                ))}
              </List>
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
                  {t('deo-manheun-jangso-bogi')}
                </Button>
              )}
            </>
          )}
        </Tabs.TabPanel>
      </Tabs>
    </Section>
  )
}

export default NearbyPois
