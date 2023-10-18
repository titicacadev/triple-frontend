import styled from 'styled-components'
import { borderRadiusMixin } from '@titicaca/kint5-core-elements'

const VideoContainer = styled.div<{ borderRadius: number }>`
  position: relative;
  margin: 30px 16px 0;
  height: 0;
  padding-bottom: 66.667%;
  ${borderRadiusMixin}
`

const VideoPlayer = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

export default function ExternalVideo({
  value: { provider, identifier },
}: {
  value: { provider: string; identifier: string }
}) {
  return provider === 'youtube' ? (
    <VideoContainer borderRadius={12}>
      <VideoPlayer
        className="chromatic-ignore"
        src={`https://www.youtube.com/embed/${identifier}?rel=0&amp;showinfo=0`}
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
      />
    </VideoContainer>
  ) : null
}
