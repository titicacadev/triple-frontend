import React from 'react'
import { Text } from '@titicaca/core-elements'

import {
  ChatbotContainer,
  ChatBalloon,
  ChatbotAction,
  CharbotCloseButton,
  ChatbotIcon,
} from './elements'

export default function ChatbotCTA() {
  return (
    <ChatbotContainer>
      <ChatBalloon>
        <Text size={18} bold lineHeight="24px">
          아직 숙소 예약 안하셨다면,
          <br />
          앱에서 트리플 특가로 예약하세요!
        </Text>
        <ChatbotAction href="#">특가보러가기</ChatbotAction>
        <CharbotCloseButton>닫기</CharbotCloseButton>
      </ChatBalloon>
      <ChatbotIcon href="#">트리플</ChatbotIcon>
    </ChatbotContainer>
  )
}
