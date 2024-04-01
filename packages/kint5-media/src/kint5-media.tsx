import { SyntheticEvent } from 'react'
import {
  Video,
  ImageSourceType,
  Image,
  MarginPadding,
  OptimizedImgProps,
  Container,
  ThumbnailBorder,
  TripleKoreaBi,
} from '@titicaca/kint5-core-elements'
import { ImageMeta, FrameRatioAndSizes } from '@titicaca/type-definitions'

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

  return (
    <Container css={{ position: 'relative' }}>
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
              <>
                <Image.Img
                  src={sizes.large.url}
                  alt={title || description || undefined}
                  css={{ display: 'block', zIndex: 1 }}
                />
                <TripleKoreaBi
                  color="#B6BBC1"
                  css={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 40,
                    height: 16,
                  }}
                />
              </>
            )}
          </Image.FixedRatioFrame>
        </Image>
      )}
      <ThumbnailBorder css={{ borderRadius }} />
    </Container>
  )
}
