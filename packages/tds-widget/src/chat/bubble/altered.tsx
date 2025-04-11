import { FlexBox } from '@titicaca/tds-ui'
import { styled, css, CSSProp } from 'styled-components'

import ExclamationMarkIcon from '../icons/ExclamationMarkIcon'

import Bubble from './bubble'
import { BlindedBubbleProp } from './type'

const AlteredText = styled.span<{ color?: CSSProp }>`
  ${({ color }) =>
    color &&
    css`
      color: ${color};
    `}
`

export default function AlteredBubble({
  my,
  parentMessage,
  alternativeText,
  textColor,
  ...props
}: BlindedBubbleProp) {
  return (
    <Bubble my={my} {...props}>
      <FlexBox flex alignItems="center" gap="4px">
        <ExclamationMarkIcon color={textColor} />
        <AlteredText color={textColor}>
          {alternativeText ?? '관리자에 의해 삭제되었습니다'}
        </AlteredText>
      </FlexBox>
    </Bubble>
  )
}
