import React, { useState, useEffect, useCallback } from 'react'
import { Text } from '@titicaca/core-elements'
import { CSSTransition } from 'react-transition-group'

import {
  ChatbotContainer,
  ChatBalloon,
  ChatbotAction,
  CharbotCloseButton,
  ChatbotIcon,
} from './elements'

type CTAData = {
  detailedDesc?: string
  text?: string
}

export const CHATBOT_CLOSED_STORAGE_KEY = 'triple_chatbotad_closed'

export default function ChatbotCTA({
  inventoryId,
  installUrl,
  onDismiss = () => {},
}: {
  inventoryId: string
  installUrl: string
  onDismiss?: () => void
}) {
  const [{ detailedDesc = '', text = '' } = {}, setCTAData] = useState<
    CTAData
  >()
  const [visibility, setVisibility] = useState(false)

  useEffect(() => {
    const visited = window.sessionStorage.getItem(CHATBOT_CLOSED_STORAGE_KEY)

    if (!visited && !visibility) {
      setVisibility(true)
    }
  }, [visibility])

  useEffect(() => {
    async function fetchInventory() {
      const response = await fetch(`/api/inventories/v1/${inventoryId}/items`, {
        credentials: 'same-origin',
      })

      if (response.ok) {
        const { items } = await response.json()

        if (items.length > 0) {
          const { detailedDesc = '', text = '' } = (items[0] as CTAData) || {}

          setCTAData({
            detailedDesc: detailedDesc.replace('\\n', '\n'),
            text,
          })
        }
      }
    }

    inventoryId && fetchInventory()
  }, [inventoryId])

  const handleDismiss = useCallback(() => {
    setVisibility(false)
    window.sessionStorage.setItem(CHATBOT_CLOSED_STORAGE_KEY, 'true')

    onDismiss()
  }, [onDismiss])

  return (
    <CSSTransition in={visibility} appear classNames="fade" timeout={500}>
      <ChatbotContainer visibility={visibility ? 'true' : 'false'}>
        <ChatBalloon>
          <Text size={18} bold lineHeight="24px">
            {detailedDesc}
          </Text>
          <ChatbotAction href={installUrl}>{text}</ChatbotAction>
          <CharbotCloseButton onClick={handleDismiss}>닫기</CharbotCloseButton>
        </ChatBalloon>
        <ChatbotIcon href={installUrl}>트리플</ChatbotIcon>
      </ChatbotContainer>
    </CSSTransition>
  )
}
