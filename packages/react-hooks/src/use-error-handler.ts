import { useState } from 'react'

/**
 * 콜백 함수에서 발생한 에러를 React ErrorBoundary가 잡을 수 있도록 해주는 함수
 */
export function useErrorHandler() {
  const [error, setError] = useState<unknown>(null)

  if (error) {
    throw error
  }

  return setError
}
