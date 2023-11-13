import { FlexBox } from '@titicaca/core-elements'
import styled from 'styled-components'

import { Bubble } from './bubble'
import { BlindedBubbleProp } from './type'

const ExclamationMarkIcon = styled.span<{ color?: 'gray' | 'white' }>`
  ${({ color = 'gray' }) =>
    `background-image: url('https://assets.triple.guide/images/ico_exclamation_mark_${color}.svg');`}

  width: 16px;
  height: 16px;
`

export default function BlindedBubble({
  my,
  blindedText,
  ...props
}: BlindedBubbleProp) {
  return (
    <Bubble my={my} css={{ margin: my ? '0 0 0 8px' : undefined }} {...props}>
      <FlexBox flex alignItems="center" gap="4px">
        <ExclamationMarkIcon
          color={my ? 'white' : 'gray'}
          style={{ flex: '0 0 16px' }}
        />
        <span>{blindedText ?? '관리자에 의해 삭제되었습니다'}</span>
      </FlexBox>
    </Bubble>
  )
}
