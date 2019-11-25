import { Image } from './model'

interface ImagesState {
  loading: boolean
  images: Image[]
  total: number
  hasMore: boolean
}

const LOAD_IMAGES_REQUEST = 'LOAD_IMAGES_REQUEST'
const LOAD_IMAGES_SUCCESS = 'LOAD_IMAGES_SUCCESS'
const LOAD_IMAGES_FAIL = 'LOAD_IMAGES_FAIL'

export function loadImagesRequest() {
  return {
    type: LOAD_IMAGES_REQUEST,
  } as const
}

export function loadImagesSuccess(payload: { images: Image[]; total: number }) {
  return {
    type: LOAD_IMAGES_SUCCESS,
    payload,
  } as const
}

export function loadImagesFail(error: unknown) {
  return {
    type: LOAD_IMAGES_FAIL,
    error: true,
    payload: error,
  } as const
}

export default function reducer(
  state: ImagesState,
  action: ReturnType<
    typeof loadImagesRequest | typeof loadImagesSuccess | typeof loadImagesFail
  >,
): ImagesState {
  switch (action.type) {
    case LOAD_IMAGES_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case LOAD_IMAGES_SUCCESS:
      return {
        loading: false,
        images: state.images.concat(action.payload.images),
        total: action.payload.total,
        hasMore: action.payload.images.length > 0,
      }
    case LOAD_IMAGES_FAIL:
      return {
        ...state,
        loading: false,
      }
    default:
      return state
  }
}
