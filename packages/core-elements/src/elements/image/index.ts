import Image from './image'
import ImageImg from './img'
import ImageSourceUrl from './source-url'
import ImageOverlay from './overlay'
import ImageLinkIndicator from './link-indicator'
import ImageFixedRatioFrame from './fixed-ratio-frame'
import ImageFixedDimensionsFrame from './fixed-dimensions-frame'
import ImageCircular from './circular'
import ImagePlaceholder from './placeholder'

/**
 * @deprecated children: string
 */
// TODO: 두번째 타입 없애기
export type ImageSourceType =
  | React.ComponentType<{ sourceUrl: string }>
  | ((props: { children: string }) => any)

export {
  Image,
  ImageImg,
  ImageSourceUrl,
  ImageOverlay,
  ImageLinkIndicator,
  ImageFixedRatioFrame,
  ImageFixedDimensionsFrame,
  ImageCircular,
  ImagePlaceholder,
}
