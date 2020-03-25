import { POI } from '@titicaca/poi-list-elements'

import { PoiType } from './types'

const FETCH_POIS = 'nearby-pois/FETCH_POIS'
const APPEND_POIS = 'nearby-pois/APPEND_POIS'
const SET_CURRENT_TAB = 'nearby-pois/SET_CURRENT_TAB'

type NearbyPoisAction = ReturnType<
  typeof fetchPois | typeof appendPois | typeof setCurrentTab
>

export interface NearbyPoisState {
  attraction: {
    pois: POI[]
    fetching: boolean
    hasMore: boolean | undefined
  }
  restaurant: {
    pois: POI[]
    fetching: boolean
    hasMore: boolean | undefined
  }
  currentTab: PoiType
}

export function fetchPois({ type }: { type: PoiType }) {
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
  type: PoiType
  pois: POI[]
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

export function setCurrentTab({ type }: { type: PoiType }) {
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
          pois: [...state[action.payload.type].pois, ...action.payload.pois],
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
