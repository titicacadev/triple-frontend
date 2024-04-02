import { SyntheticEvent } from 'react'
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
  const { push } = useHistoryFunctions()
  const uriHash = useUriHash()

  const mediaPopupHash = `${MEDIA_POPUP_HASH}.${id}`

  return (
    <>
      <Container
        css={{ position: 'relative' }}
        onClick={() => {
          push(mediaPopupHash)
        }}
      >
        {type === 'video' && video ? (
          <Video
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
        )}
        <ThumbnailBorder css={{ borderRadius }} />
      </Container>
      <MediaPopup open={uriHash === mediaPopupHash} media={[media]} />
    </>
  )
}
