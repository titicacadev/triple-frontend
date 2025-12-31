import styled, { CSSProp } from 'styled-components'
import { ComponentPropsWithoutRef } from 'react'
import { shouldForwardProp } from '@titicaca/core-elements'

export const TrackContainer = styled.div.withConfig({
  shouldForwardProp,
})<{ css?: CSSProp }>`
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

export default function Track({
  active,
  left,
  right,
  ...rest
}: {
  active: boolean
  left: number
  right: number
} & ComponentPropsWithoutRef<'div'>) {
  return (
    <TrackContainer
      {...rest}
      css={{
        left: `${left}%`,
        right: `${100 - right}%`,
      }}
    >
      {active ? <ActiveTrack /> : null}
    </TrackContainer>
  )
}
