import { useState, useEffect, useCallback, useRef } from 'react'
import { Text, LayeringMixinProps } from '@titicaca/tds-ui'
import { CSSTransition } from 'react-transition-group'
import { InventoryItemMeta } from '@titicaca/type-definitions'
import { useSessionStorage } from '@titicaca/react-hooks'
import { useTranslation } from '@titicaca/triple-web'

import {
  CHATBOT_CLOSED_STORAGE_KEY,
  EVENT_CHATBOT_CTA_READY,
} from './constants'
import { CtaProps } from './interfaces'
import {
  ChatbotContainer,
  ChatBalloon,
  ChatbotAction,
  ChatbotCloseButton,
  ChatbotIcon,
} from './elements'

interface ChatbotCtaProps extends CtaProps {
  available?: boolean
  inventoryId: string
  installUrl: string
  unmountOnExit?: boolean
}

/**
 * 챗봇 스타일의 하단 배너 CTA를 build/destroy 에니메이션과 함께 띄웁니다.
 *
 * @param available CTA 가 표시되어야하는지의 여부 (기본값 false) (controlled)
 * @param inventoryId 표시할 이미지의 인벤토리 ID
 * @param installUrl 앱 설치 URL
 * @param unmountOnExit 표시되지 않는 상태일 때 컴포넌트 마운트 해제
 */
export function ChatbotCta({
  available = false,
  inventoryId,
  installUrl,
  onShow,
  onClick,
  onDismiss,
  zTier,
  zIndex,
  unmountOnExit,
}: ChatbotCtaProps & LayeringMixinProps) {
  const t = useTranslation()

  const [inventoryItem, setInventoryItem] = useState<InventoryItemMeta>()
  const [visibility, setVisibility] = useState(false)
  const chatbotContainerRef = useRef<HTMLDivElement>(null)

  const { detailedDesc = '', text = '' } = inventoryItem || {}

  const [visited, setVisited] = useSessionStorage(CHATBOT_CLOSED_STORAGE_KEY)

  useEffect(() => {
    if (visited === 'true') {
      return
    }
    if (available && inventoryItem) {
      setVisibility(true)
      window.dispatchEvent(new Event(EVENT_CHATBOT_CTA_READY))
    }
  }, [available, inventoryItem, onShow, visited])

  useEffect(() => {
    async function fetchInventory() {
      const response = await fetch(`/api/inventories/v1/${inventoryId}/items`, {
        credentials: 'same-origin',
      })

      if (response.ok) {
        const { items } = (await response.json()) as {
          items: InventoryItemMeta[]
        }
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
    onDismiss && onDismiss(inventoryItem)

    setVisited('true')
  }, [onDismiss, inventoryItem, setVisited])

  return (
    <CSSTransition
      nodeRef={chatbotContainerRef}
      in={visibility}
      appear
      classNames="chatbot-slide"
      timeout={500}
      mountOnEnter={unmountOnExit}
      unmountOnExit={unmountOnExit}
    >
      <ChatbotContainer
        ref={chatbotContainerRef}
        $visibility={visibility ? 1 : 0}
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
          <ChatbotCloseButton onClick={handleDismiss}>
            {t('닫기')}
          </ChatbotCloseButton>
        </ChatBalloon>
        <ChatbotIcon href={installUrl} onClick={handleClick}>
          {t('트리플')}
        </ChatbotIcon>
      </ChatbotContainer>
    </CSSTransition>
  )
}
