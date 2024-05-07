import { SyntheticEvent, useRef } from 'react'
import {
  Video,
  ImageSourceType,
  Image,
  MarginPadding,
  OptimizedImgProps,
  Container,
  ThumbnailBorder,
} from '@titicaca/kint5-core-elements'
import { ImageMeta, FrameRatioAndSizes } from '@titicaca/type-definitions'
import { MEDIA_POPUP_HASH, MediaPopup } from '@titicaca/kint5-media-popup'
import { useHistoryFunctions, useUriHash } from '@titicaca/react-contexts'

export type MediaMeta = ImageMeta

export default function Media({
  optimized = false,
  media,
  autoPlay,
  loop = true,
  hideControls,
  showNativeControls,
  ImageSource,
  borderRadius,
  margin,
  frame,
  onClick,
  ...props
}: {
  optimized?: boolean
  media: ImageMeta
  autoPlay?: boolean
  loop?: boolean
  hideControls?: boolean
  showNativeControls?: boolean
  ImageSource?: ImageSourceType
  borderRadius?: number
  margin?: MarginPadding
  frame?: FrameRatioAndSizes
  onClick?: (e: SyntheticEvent, media: ImageMeta) => void
} & Omit<OptimizedImgProps, 'cloudinaryBucket' | 'cloudinaryId'>) {
  const {
    id,
    type,
    sizes,
    cloudinaryBucket,
    cloudinaryId,
    video,
    frame: mediaFrame,
    sourceUrl,
    title,
    description,
  } = media
  const videoRef = useRef<HTMLVideoElement>(null)
  const { push } = useHistoryFunctions()
  const uriHash = useUriHash()

  const mediaPopupHash = `${MEDIA_POPUP_HASH}.${id}`

  return (
    <>
      <Container
        css={{ position: 'relative' }}
        onClick={(e) => {
          if (videoRef.current) {
            const target = e.target as HTMLDivElement
            const isVideoControlVisible =
              window.getComputedStyle(target).opacity !== '0'

            // 비디오 컨트롤(재생버튼, etc.)이 보이지 않는 경우
            // 비디오 영역을 한 번 클릭(터치)했을 때 팝업이 뜨지 않도록 합니다.
            if (!isVideoControlVisible) {
              return
            }
          }

          push(mediaPopupHash)
        }}
      >
        {type === 'video' && video ? (
          <Video
            ref={videoRef}
            borderRadius={borderRadius}
            frame={mediaFrame || frame || 'large'}
            fallbackImageUrl={sizes.large.url}
            src={video.large.url}
            cloudinaryBucket={cloudinaryBucket}
            cloudinaryId={cloudinaryId}
            autoPlay={autoPlay}
            loop={loop}
            hideControls={!!hideControls}
            showNativeControls={showNativeControls}
          />
        ) : (
          <>
            <Image borderRadius={borderRadius}>
              <Image.FixedRatioFrame
                margin={margin}
                frame={mediaFrame || frame}
                onClick={onClick && ((e: SyntheticEvent) => onClick(e, media))}
              >
                {sourceUrl ? (
                  <Image.SourceUrl>
                    {ImageSource ? (
                      <ImageSource sourceUrl={sourceUrl} />
                    ) : (
                      sourceUrl
                    )}
                  </Image.SourceUrl>
                ) : null}

                {media && optimized ? (
                  <Image.OptimizedImg
                    cloudinaryId={cloudinaryId || id}
                    cloudinaryBucket={cloudinaryBucket}
                    alt={title || description || undefined}
                    {...props}
                  />
                ) : (
                  <Image.Img
                    src={sizes.large.url}
                    alt={title || description || undefined}
                    css={{ display: 'block' }}
                  />
                )}
              </Image.FixedRatioFrame>
            </Image>
            <ThumbnailBorder css={{ borderRadius }} />
          </>
        )}
      </Container>
      <MediaPopup
        open={uriHash === mediaPopupHash}
        media={[media]}
        videoAutoPlay={autoPlay}
      />
    </>
  )
}
