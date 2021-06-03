import { useEnv, useUserAgentContext } from '@titicaca/react-contexts'
import {
  broadcastMessage,
  subscribe,
  unsubscribe,
} from '@titicaca/triple-web-to-native-interfaces'
import { useCallback, useEffect } from 'react'

/**
 * verifications-web에서 전송하는 인증 결과 타입
 * 현재는 성공했을 때만 전송하므로 타입이 유일하다.
 */
export interface VerificationResultMessage {
  type: 'USER_VERIFIED'
  phoneNumber: string
}

export function useSendUserVerificationResult() {
  const { webUrlBase } = useEnv()
  const { isPublic } = useUserAgentContext()

  const sendVerificationResult = useCallback(
    (message: VerificationResultMessage) => {
      if (isPublic) {
        const parentWindow: Window | null = window.opener

        if (parentWindow) {
          parentWindow.postMessage(message, webUrlBase)
        }
      } else {
        broadcastMessage(message)
      }
    },
    [isPublic, webUrlBase],
  )

  return sendVerificationResult
}

/**
 * 인증 완료 메시지를 기다리고 있다가 메시지가 오면 callback 함수를 실행하는 훅
 * callback의 레퍼런스가 바뀌어도 반영되지 않습니다.
 */
export function useUserVerificationResultMessageCallback(
  callback: (message: VerificationResultMessage) => void,
) {
  const { isPublic } = useUserAgentContext()

  useEffect(() => {
    if (isPublic) {
      const handleMessage = ({
        data,
      }: MessageEvent<VerificationResultMessage>) => {
        callback(data)
      }

      window.addEventListener('message', handleMessage)

      return () => {
        window.removeEventListener('message', handleMessage)
      }
    }

    subscribe('receiveMessage', callback)

    return () => {
      unsubscribe('receiveMessage', callback)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
