import { FlexBox } from '@titicaca/core-elements'
import styled from 'styled-components'

import { useChat } from '../chat'
import { TextBubble } from '../bubbles/text'
import { BackgroundColor } from '../types'

const ExclamationMarkIcon = styled.span<{ color?: 'gray' | 'white' }>`
  background-image: url('https://assets.triple.guide/images/ico_exclamation_mark_${({
    color = 'gray',
  }) => color}.svg');
  width: 16px;
  height: 16px;
`
export default function BlindedBubble({
  my,
  blindedText,
  bubbleColor,
}: {
  my: boolean
  blindedText?: string
  bubbleColor?: { backgroundColor: BackgroundColor; text: string }
}) {
  const { textBubbleMaxWidthOffset } = useChat()
  return (
    <TextBubble
      maxWidthOffset={textBubbleMaxWidthOffset}
      my={my}
      margin={my ? { left: 8 } : undefined}
      bubbleColor={bubbleColor}
    >
      <FlexBox flex alignItems="center" gap="4px">
        <ExclamationMarkIcon
          color={my ? 'white' : 'gray'}
          style={{ flex: '0 0 16px' }}
        />
        <span>{blindedText ?? '관리자에 의해 삭제되었습니다'}</span>
      </FlexBox>
    </TextBubble>
  )
}
