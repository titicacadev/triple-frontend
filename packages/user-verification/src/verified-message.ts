import { useEnv } from '@titicaca/react-contexts'
import {
  useTripleClientMetadata,
  useTripleClientActions,
} from '@titicaca/react-triple-client-interfaces'
import { useCallback, useEffect } from 'react'

/**
 * verifications-web에서 전송하는 인증 결과 타입
 * 현재는 성공했을 때만 전송하므로 타입이 유일하다.
 */
export interface VerifiedMessage {
  type: 'USER_VERIFIED'
  phoneNumber: string
}

export function useSendVerifiedMessage() {
  const { webUrlBase } = useEnv()
  const app = useTripleClientMetadata()
  const { broadcastMessage } = useTripleClientActions()

  const sendVerifiedMessage = useCallback(
    (message: VerifiedMessage) => {
      if (app) {
        broadcastMessage && broadcastMessage(message)
      } else {
        const parentWindow: Window | null = window.opener

        if (parentWindow) {
          parentWindow.postMessage(message, webUrlBase)
        }
      }
    },
    [app, webUrlBase, broadcastMessage],
  )

  return sendVerifiedMessage
}

/**
 * 인증 완료 메시지를 기다리고 있다가 메시지가 오면 callback 함수를 실행하는 훅
 * callback의 레퍼런스가 바뀌어도 반영되지 않습니다.
 */
export function useVerifiedMessageListener(
  handleVerifiedMessage: (message: VerifiedMessage) => void,
) {
  const app = useTripleClientMetadata()
  const { subscribe, unsubscribe } = useTripleClientActions()

  useEffect(() => {
    if (!app) {
      const handleMessage = ({ data }: MessageEvent) => {
        handleVerifiedMessage(data)
      }

      window.addEventListener('message', handleMessage)

      return () => {
        window.removeEventListener('message', handleMessage)
      }
    } else if (subscribe && unsubscribe) {
      subscribe('receiveMessage', handleVerifiedMessage)

      return () => {
        unsubscribe('receiveMessage', handleVerifiedMessage)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
