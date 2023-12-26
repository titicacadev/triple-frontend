import { GetTrackProps } from 'react-compound-slider'
import styled from 'styled-components'

export const TrackContainer = styled.div<{ left: number; right: number }>`
  position: absolute;
  padding: 20px 0;
  margin-top: -20px;
`

export const ActiveTrack = styled.div`
  height: 3px;
  border-radius: 4px;
  background-color: #368fff;
  transform: translate(0, -50%);
`

interface Props {
  active: boolean
  left: number
  right: number
  getTrackProps: GetTrackProps
}

export default function Track({ active, left, right, getTrackProps }: Props) {
  return (
    <TrackContainer
      style={{
        left: `${left}%`,
        right: `${100 - right}%`,
      }}
      {...getTrackProps()}
    >
      {active ? <ActiveTrack /> : null}
    </TrackContainer>
  )
}
