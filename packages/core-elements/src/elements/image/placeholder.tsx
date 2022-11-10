import styled from 'styled-components'
import { brightGray } from '@titicaca/color-palette'

import { useContentAbsolute } from './fixed-ratio-frame'

export const Placeholder = styled.div<{
  src?: string
  absolute: boolean
}>`
  width: 100%;
  height: 100%;
  background-color: ${brightGray};

  ${({ src }) =>
    src &&
    `
      background-repeat: no-repeat;
      background-position: center;
      background-size: 40px 40px;
      background-image: url(${src});
    `};

  ${({ absolute }) =>
    absolute
      ? `
          position: absolute;
          top: 0;
          left: 0;
        `
      : ''}
`

export function ImagePlaceholder({ src }: { src?: string }) {
  const absolute = useContentAbsolute()

  return <Placeholder src={src} absolute={absolute} />
}
