import React, { useState, useEffect, useCallback } from 'react'
import { Text, LayeringMixinProps } from '@titicaca/core-elements'
import { CSSTransition } from 'react-transition-group'

import {
  CHATBOT_CLOSED_STORAGE_KEY,
  EVENT_CHATBOT_CTA_READY,
} from './constants'
import { InventoryItem, CTAProps } from './interfaces'
import {
  ChatbotContainer,
  ChatBalloon,
  ChatbotAction,
  ChatbotCloseButton,
  ChatbotIcon,
} from './elements'

interface ChatbotCTAProps extends CTAProps {
  available?: boolean
  inventoryId: string
  installUrl: string
}

/**
 * 챗봇 스타일의 하단 배너 CTA를 build/destroy 에니메이션과 함께 띄웁니다.
 *
 * @param available CTA 가 표시되어야하는지의 여부 (기본값 false) (controlled)
 * @param inventoryId 표시할 이미지의 인벤토리 ID
 * @param installUrl 앱 설치 URL
 */
export default function ChatbotCTA({
  available = false,
  inventoryId,
  installUrl,
  onShow,
  onClick,
  onDismiss,
  zTier,
  zIndex,
}: ChatbotCTAProps & LayeringMixinProps) {
  const [inventoryItem, setInventoryItem] = useState<InventoryItem>()
  const [visibility, setVisibility] = useState(false)
  const { detailedDesc = '', text = '' } = inventoryItem || {}

  useEffect(() => {
    const visited = window.sessionStorage.getItem(CHATBOT_CLOSED_STORAGE_KEY)

    if (!visited && !visibility && available && inventoryItem) {
      setVisibility(true)
      window.dispatchEvent(new Event(EVENT_CHATBOT_CTA_READY))
    }
  }, [available, inventoryItem, onShow, visibility])

  useEffect(() => {
    async function fetchInventory() {
      const response = await fetch(`/api/inventories/v1/${inventoryId}/items`, {
        credentials: 'same-origin',
      })

      if (response.ok) {
        const { items } = (await response.json()) as { items: InventoryItem[] }
        const [item] = items

        if (item) {
          setInventoryItem({
            detailedDesc: (item.detailedDesc || '').replace('\\n', '\n'),
            text: item.text,
          })
        }
      }
    }

    available && inventoryId && !detailedDesc && fetchInventory()
  }, [available, detailedDesc, inventoryId, text])

  useEffect(() => {
    if (inventoryItem?.detailedDesc && visibility) {
      onShow && onShow(inventoryItem)
    }
  }, [inventoryItem, onShow, visibility])

  const handleClick = useCallback(() => {
    onClick && onClick(inventoryItem)
  }, [onClick, inventoryItem])

  const handleDismiss = useCallback(() => {
    setVisibility(false)
    window.sessionStorage.setItem(CHATBOT_CLOSED_STORAGE_KEY, 'true')

    onDismiss && onDismiss(inventoryItem)
  }, [onDismiss, inventoryItem])

  return (
    <CSSTransition
      in={visibility}
      appear
      classNames="chatbot-slide"
      timeout={500}
    >
      <ChatbotContainer
        visibility={visibility ? 1 : 0}
        zTier={zTier}
        zIndex={zIndex}
      >
        <ChatBalloon>
          <Text size={18} bold lineHeight="24px">
            {detailedDesc}
          </Text>
          <ChatbotAction href={installUrl} onClick={handleClick}>
            {text}
          </ChatbotAction>
          <ChatbotCloseButton onClick={handleDismiss}>닫기</ChatbotCloseButton>
        </ChatBalloon>
        <ChatbotIcon href={installUrl} onClick={handleClick}>
          트리플
        </ChatbotIcon>
      </ChatbotContainer>
    </CSSTransition>
  )
}
