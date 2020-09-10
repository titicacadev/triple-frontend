import { css } from 'styled-components'

import { MarginPadding } from '../commons'
import { unit } from '../utils/unit'

export const positioningMixin = css<{
  positioning?: MarginPadding
}>`
  ${({ positioning }) =>
    positioning
      ? (Object.keys(positioning) as Array<keyof MarginPadding>)
          .map(
            (key) =>
              positioning[key] !== undefined &&
              `${key}: ${unit(positioning[key] as string | number)};`,
          )
          .filter(Boolean)
          .join('\n')
      : ''}
`
