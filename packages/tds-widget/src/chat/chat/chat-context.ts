import {
  createContext,
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  useContext,
} from 'react'
import { GlobalSizes } from '@titicaca/type-definitions'

import { MetaDataInterface, PostMessageActionType } from '../types'

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
  onImageBubbleClick?: (imageInfos: MetaDataInterface[]) => void
  /**
   * 텍스트 버블의 자식의 클릭 이벤트를 delegation 하는 함수
   */
  onTextBubbleClick?: MouseEventHandler
  setPostMessage?: Dispatch<SetStateAction<PostMessageActionType | null>>
}

export const ChatContext = createContext<ChatContextValue | undefined>(
  undefined,
)

export function useChat() {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error('chat context 가 존재하지 않습니다.')
  }
  return context
}
