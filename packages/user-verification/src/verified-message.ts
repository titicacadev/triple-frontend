import { useEnv } from '@titicaca/react-contexts'
import {
  broadcastMessage,
  subscribe,
  unsubscribe,
} from '@titicaca/triple-web-to-native-interfaces'
import { useCallback, useEffect } from 'react'
import { useClientContext } from '@titicaca/react-client-interfaces'

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
  const app = useClientContext()

  const sendVerifiedMessage = useCallback(
    (message: VerifiedMessage) => {
      if (app) {
        broadcastMessage(message)
      } else {
        const parentWindow: Window | null = window.opener

        if (parentWindow) {
          parentWindow.postMessage(message, webUrlBase)
        }
      }
    },
    [app, webUrlBase],
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
  const app = useClientContext()

  useEffect(() => {
    if (!app) {
      const handleMessage = ({ data }: MessageEvent) => {
        handleVerifiedMessage(data)
      }

      window.addEventListener('message', handleMessage)

      return () => {
        window.removeEventListener('message', handleMessage)
      }
    }

    subscribe('receiveMessage', handleVerifiedMessage)

    return () => {
      unsubscribe('receiveMessage', handleVerifiedMessage)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
