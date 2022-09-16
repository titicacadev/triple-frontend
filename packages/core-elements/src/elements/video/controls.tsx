import { useState, useCallback, RefObject, useEffect } from 'react'
import styled from 'styled-components'
import { debounce } from '@titicaca/view-utilities'
import { getColor } from '@titicaca/color-palette'

import Seeker from './seeker'
import PlayPauseButton from './play-pause-button'
import MuteUnmuteButton from './mute-unmute-button'
import { formatTime } from './utils'
import { useVideoControl } from './use-video-control'

const ControlsContainer = styled.div<{ visible: boolean }>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: ${({ visible }) => (visible ? '1' : '0')};
  background-color: rgba(0, 0, 0, 0.4);

  transition: opacity 0.3s;
`

const CurrentTime = styled.div`
  position: absolute;
  color: #ffffff;
  font-size: 10px;
  left: 0;
  bottom: 12px;
  width: 45px;
  text-align: center;
`

const Duration = styled.div`
  position: absolute;
  font-size: 10px;
  color: #ffffff;
  right: 0px;
  bottom: 12px;
  width: 45px;
  text-align: center;
`

const Progress = styled.progress`
  position: absolute;
  left: 45px;
  right: 45px;
  bottom: 10px;
  padding: 0;
  margin: 0;
  width: calc(100% - 90px);
  appearance: none;

  &::-webkit-progress-bar {
    position: absolute;
    bottom: 5px;
    height: 3px;
    border-radius: 2.5px;
    background-color: rgba(255, 255, 255, 0.5);
  }

  &::-webkit-progress-value {
    border-radius: 2.5px;
    background-color: rgba(${getColor('blue')});
  }
`

interface Props {
  hideControls?: boolean
  initialHidden?: boolean
  initialMuted?: boolean
  videoRef: RefObject<HTMLVideoElement>
}

export default function Controls({
  hideControls,
  initialHidden,
  initialMuted,
  videoRef,
}: Props) {
  const { duration, currentTime, progress, seek, playing, muted } =
    useVideoControl({
      videoRef,
      initialMuted,
    })
  const [oncePlayed, setOncePlayed] = useState(false)

  const [visible, setVisible] = useState(false)

  // TODO: useDebouncedState 사용하기
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleFadeOut = useCallback(
    debounce(() => setVisible(false), 2500),
    [],
  )

  const handleSeekerChange = useCallback(
    (e) => {
      if (videoRef.current) {
        videoRef.current.currentTime = parseFloat(e.target.value)
      }

      handleFadeOut()
    },
    [videoRef, handleFadeOut],
  )

  const handleSeekerClick = useCallback(
    (e) => {
      e.stopPropagation()
      handleFadeOut()
    },
    [handleFadeOut],
  )

  const handleControls = useCallback(() => {
    if (visible) {
      setVisible(false)
    } else {
      setVisible(true)
      handleFadeOut()
    }
  }, [visible, handleFadeOut])

  useEffect(() => {
    if (playing) {
      handleFadeOut()
    }
  }, [handleFadeOut, playing])

  useEffect(() => {
    if (playing) {
      setOncePlayed(true)
    }
  }, [playing])

  const playPauseVisible = oncePlayed ? visible : !initialHidden

  return (
    <>
      <ControlsContainer visible={visible} onClick={handleControls}>
        {!hideControls && (
          <>
            <CurrentTime>{currentTime || '00:00'}</CurrentTime>
            {duration ? <Duration>{formatTime(duration)}</Duration> : null}
            {duration ? <Progress max={duration} value={progress} /> : null}
            <Seeker
              visible={visible}
              seek={seek}
              duration={duration}
              onClick={handleSeekerClick}
              onChange={handleSeekerChange}
            />
          </>
        )}
      </ControlsContainer>
      <PlayPauseButton
        videoRef={videoRef}
        playing={playing}
        visible={playPauseVisible}
        onPlayPause={handleFadeOut}
      />
      <MuteUnmuteButton
        videoRef={videoRef}
        muted={muted}
        visible={visible}
        onMuteUnmute={handleFadeOut}
      />
    </>
  )
}
