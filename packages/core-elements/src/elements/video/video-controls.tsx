import { useState, useCallback, RefObject, useEffect } from 'react'
import styled from 'styled-components'
import { debounce } from '@titicaca/view-utilities'
import { getColor } from '@titicaca/color-palette'

import { formatTime } from './utils'
import Seeker from './seeker'
import MuteUnmuteButton from './mute-unmute-button'
import PlayPauseButton from './play-pause-button'

const ControlsContainer = styled.div<{ visible: boolean }>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  opacity: ${({ visible }) => (visible ? '1' : '0')};
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
  currentTime: string
  duration: number
  muted: boolean
  playing: boolean
  progress: number
  seek: string
  hideControls: boolean
  videoRef: RefObject<HTMLVideoElement>
}

export default function Controls({
  currentTime,
  duration,
  muted,
  playing,
  progress,
  seek,
  hideControls,
  videoRef,
}: Props) {
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

  const handleControls = useCallback(() => {
    if (!visible) {
      setVisible(true)
      handleFadeOut()
    }
  }, [visible, handleFadeOut])

  useEffect(() => {
    if (playing) {
      handleFadeOut()
    }
  }, [handleFadeOut, playing])

  return (
    <ControlsContainer visible={visible} onClick={handleControls}>
      {!hideControls && (
        <>
          <CurrentTime>{currentTime || '00:00'}</CurrentTime>
          {duration ? <Duration>{formatTime(duration)}</Duration> : null}
          {duration ? <Progress max={duration} value={progress} /> : null}
          <Seeker
            seek={seek}
            visible={visible}
            duration={duration}
            onChange={handleSeekerChange}
          />
        </>
      )}
      <PlayPauseButton
        playing={playing}
        visible={visible}
        onClick={() => {
          playing ? videoRef.current?.pause() : videoRef.current?.play()
        }}
      />
      <MuteUnmuteButton
        muted={muted}
        visible={visible}
        onClick={() => {
          if (videoRef.current) {
            videoRef.current.muted = !muted
          }
        }}
      />
    </ControlsContainer>
  )
}
