import { NearByPoiType, ListingPoi } from './types'

const FETCH_POIS = 'nearby-pois/FETCH_POIS'
const APPEND_POIS = 'nearby-pois/APPEND_POIS'
const SET_CURRENT_TAB = 'nearby-pois/SET_CURRENT_TAB'

type NearbyPoisAction = ReturnType<
  typeof setFetchingStatus | typeof appendPois | typeof setCurrentTab
>

export interface NearbyPoisState {
  attraction: {
    pois: ListingPoi[]
    fetching: boolean
    hasMore: boolean | undefined
  }
  restaurant: {
    pois: ListingPoi[]
    fetching: boolean
    hasMore: boolean | undefined
  }
  currentTab: NearByPoiType
}

export function setFetchingStatus({ type }: { type: NearByPoiType }) {
  return {
    type: FETCH_POIS,
    payload: { type },
  } as const
}

export function appendPois({
  type,
  pois,
  hasMore,
}: {
  type: NearByPoiType
  pois: ListingPoi[]
  hasMore: boolean
}) {
  return {
    type: APPEND_POIS,
    payload: {
      type,
      pois,
      hasMore,
    },
  } as const
}

export function setCurrentTab({ type }: { type: NearByPoiType }) {
  return {
    type: SET_CURRENT_TAB,
    payload: { type },
  } as const
}

export default function nearbyPoisReducer(
  state: NearbyPoisState,
  action: NearbyPoisAction,
) {
  switch (action.type) {
    case FETCH_POIS:
      return {
        ...state,
        [action.payload.type]: {
          ...state[action.payload.type],
          fetching: true,
        },
      }
    case APPEND_POIS:
      return {
        ...state,
        [action.payload.type]: {
          ...state[action.payload.type],
          fetching: false,
          pois: deduplicateAndMergePoiList(
            state[action.payload.type].pois,
            action.payload.pois,
          ),
          hasMore: action.payload.hasMore,
        },
      }
    case SET_CURRENT_TAB:
      return {
        ...state,
        currentTab: action.payload.type,
      }
  }
}

function deduplicateAndMergePoiList(
  prevPoiList: ListingPoi[],
  nextPoiList: ListingPoi[],
): ListingPoi[] {
  const mergedPoiList = [...prevPoiList, ...nextPoiList]

  const poiMap = new Map([
    ...prevPoiList.map(poi => [poi.id, poi]),
    ...nextPoiList.map(poi => [poi.id, poi])
  ]);
 
  return Array.from(poiMap.values())
}
