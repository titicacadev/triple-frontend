import { createContext, MouseEventHandler, useContext } from 'react'
import { GlobalSizes } from '@titicaca/type-definitions'

import { MetaDataInterface } from '../types'

export interface ChatContextValue {
  textBubbleFontSize: GlobalSizes | number
  textBubbleMaxWidthOffset: number
  mediaUrlBase: string
  cloudinaryName: string
  /**
   * message payload가 RICH 타입이고,
   * BUTTON 타입의 rich item을 눌렀을 때,
   * 라우팅 하기 전 작동하는 콜백 함수
   */
  onRichBubbleButtonBeforeRouting?: () => void
  onImageBubbleClick: (imageInfos: MetaDataInterface[]) => void
  /**
   * 텍스트 버블의 자식의 클릭 이벤트를 delegation 하는 함수
   */
  onTextBubbleClick?: MouseEventHandler
}

export const ChatContext = createContext<ChatContextValue | undefined>(
  undefined,
)

export function useChat() {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error()
  }
  return context
}
