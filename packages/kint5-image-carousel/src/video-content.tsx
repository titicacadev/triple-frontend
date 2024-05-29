import { Video, useMuteButtonPosition } from '@titicaca/kint5-core-elements'
import { FrameRatioAndSizes, GlobalSizes } from '@titicaca/type-definitions'
import { MouseEventHandler, useRef } from 'react'
import { useDeviceContext } from '@titicaca/react-contexts'

import { CarouselImageMeta } from './types'

interface Props {
  medium: CarouselImageMeta
  globalSize?: GlobalSizes
  globalFrame?: FrameRatioAndSizes
  hideControls?: boolean
  showNativeControls?: boolean
  onClick?: MouseEventHandler
}

function VideoContent({
  medium,
  globalSize,
  globalFrame,
  hideControls,
  showNativeControls,
  onClick,
}: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  const { muteButtonPosition } = useMuteButtonPosition()
  const {
    deviceState: { autoplay, networkType },
  } = useDeviceContext()

  const videoAutoPlay =
    autoplay === 'always' ||
    (autoplay === 'wifi_only' && networkType === 'wifi')

  const { frame: imageFrame, size: imageSize } = medium
  const size = globalSize || imageSize
  const frame = size ? undefined : globalFrame || imageFrame

  const handler: MouseEventHandler = (e) => {
    if (videoRef.current) {
      const target = e.target as HTMLDivElement
      const isVideoControlVisible =
        window.getComputedStyle(target).opacity !== '0'

      // 비디오 컨트롤(재생버튼, etc.)이 보이지 않는 경우
      // 비디오 영역을 한 번 클릭(터치)했을 때 팝업이 뜨지 않도록 합니다.
      if (videoRef.current.currentTime > 0 && !isVideoControlVisible) {
        return
      }
    }

    onClick?.(e)
  }

  return (
    <Video
      ref={videoRef}
      borderRadius={0}
      frame={frame || 'large'}
      fallbackImageUrl={medium.sizes.large.url}
      src={medium.video?.large.url}
      autoPlay={videoAutoPlay}
      hideControls={!!hideControls}
      showNativeControls={showNativeControls}
      onClick={handler}
      muteButtonPosition={muteButtonPosition}
    />
  )
}

export default VideoContent
