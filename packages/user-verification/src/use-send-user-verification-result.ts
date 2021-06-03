import { useEnv, useUserAgentContext } from '@titicaca/react-contexts'
import { broadcastMessage } from '@titicaca/triple-web-to-native-interfaces'
import { useCallback } from 'react'

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
