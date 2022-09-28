import { forwardRef, useRef } from 'react'
import styled from 'styled-components'

import Container from '../container'
import FlexBox from '../flex-box'
import { FrameRatioAndSizes, MEDIA_FRAME_OPTIONS } from '../../commons'
import { mergeRefs } from '../../utils/merge-refs'

import { useVideoControl } from './use-video-control'
import VideoFrame from './video-frame'
import Controls from './video-controls'

const MEDIA_CDN_URL_BASE = 'https://media.triple.guide'
const FORMATS = ['webm', 'mp4', 'ogv']

const VideoPlayer = styled(Container)`
  overflow: hidden;
  isolation: isolate;
`

const FallbackImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  transition: opacity 0.3s;
`

const PlayButton = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 0;
  outline: none;
  background: transparent;
`

const Pending = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-image: url('https://assets.triple.guide/images/img-video-loading@3x.png');
  background-size: cover;
  animation: rotation 2s infinite linear;

  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }
`

const StyledVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const PLAY_BUTTON_IMAGE_URL =
  'https://assets.triple.guide/images/btn-video-play@3x.png'

interface Props {
  src?: string
  srcType?: string
  cloudinaryBucket?: string
  cloudinaryId?: string
  fallbackImageUrl: string
  frame: FrameRatioAndSizes
  autoPlay?: boolean
  muted?: boolean
  loop?: boolean
  borderRadius?: number
  hideControls?: boolean
  initialControlsHidden?: boolean
  showNativeControls?: boolean
  removeFrame?: boolean
}

export const Video = forwardRef<HTMLVideoElement, Props>(
  (
    {
      src,
      srcType = 'video/mp4',
      cloudinaryBucket,
      cloudinaryId,
      fallbackImageUrl,
      frame = 'large',
      autoPlay = false,
      muted: initialMuted = false,
      loop = true,
      borderRadius = 6,
      hideControls = false,
      initialControlsHidden = false,
      showNativeControls = false,
      removeFrame = false,
    },
    ref,
  ) => {
    const videoRef = useRef<HTMLVideoElement>(null)
    const {
      mounted,
      oncePlayed,
      pending,
      currentTime,
      duration,
      muted,
      playing,
      progress,
      seek,
      handlers,
    } = useVideoControl({ videoRef, autoPlay, initialMuted })

    const matchData = (MEDIA_FRAME_OPTIONS[frame] || '').match(/^(\d+)%$/)

    if (!matchData) {
      return null
    }

    const [, heightOverWidthPercent] = matchData
    const widthOverHeight = 100 / parseInt(heightOverWidthPercent, 10)
    const manipulationParams = `c_fill,ar_${widthOverHeight},f_auto`

    return (
      <VideoPlayer position="relative" borderRadius={borderRadius}>
        {/* HTML video */}
        <VideoFrame frame={frame} removeFrame={removeFrame}>
          <StyledVideo
            ref={mergeRefs([videoRef, ref])}
            autoPlay={autoPlay}
            controls={showNativeControls}
            loop={loop}
            muted={muted || autoPlay}
            playsInline
            preload="metadata"
            {...handlers}
          >
            {mounted &&
              (!cloudinaryBucket || !cloudinaryId ? (
                <source src={src} type={srcType} />
              ) : (
                FORMATS.map((format) => (
                  <source
                    key={format}
                    src={`${MEDIA_CDN_URL_BASE}/${cloudinaryBucket}/video/upload/${manipulationParams}/${cloudinaryId}.${format}`}
                  />
                ))
              ))}
          </StyledVideo>
        </VideoFrame>
        {/* Video Overlay */}
        <Container
          position="absolute"
          positioning={{ top: 0, left: 0 }}
          width="100%"
          height="100%"
        >
          {fallbackImageUrl && (
            <FallbackImage
              style={{
                backgroundImage: `url('${fallbackImageUrl}')`,
                opacity: oncePlayed ? 0 : 1,
              }}
            />
          )}
          {!oncePlayed && !initialControlsHidden && (
            <PlayButton aria-label="재생" onClick={() => handlers.onPlay()}>
              <img alt="" src={PLAY_BUTTON_IMAGE_URL} width={60} height={60} />
            </PlayButton>
          )}
          {pending && (
            <FlexBox
              position="absolute"
              positioning={{ top: 0, left: 0 }}
              width="100%"
              height="100%"
              flex
              alignItems="center"
              justifyContent="center"
            >
              <Pending />
            </FlexBox>
          )}
          {oncePlayed && (
            <Controls
              currentTime={currentTime}
              duration={duration}
              hideControls={hideControls}
              muted={muted}
              playing={playing}
              progress={progress}
              seek={seek}
              videoRef={videoRef}
            />
          )}
        </Container>
      </VideoPlayer>
    )
  },
)

Video.displayName = 'Video'
