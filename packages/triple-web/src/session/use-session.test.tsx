import { renderHook } from '@testing-library/react'

import { useSession } from './use-session'
import { SessionProvider } from './context'
import { SessionValue } from './types'

test('SessionContext가 정의된 경우 값을 반환해야 합니다.', () => {
  const mockValue: SessionValue = {
    user: null,
  }

  const { result } = renderHook(() => useSession(), {
    wrapper: ({ children }) => (
      <SessionProvider initialSession={{ user: null }}>
        {children}
      </SessionProvider>
    ),
  })

  expect(result.current).toBe(mockValue)
})

test('SessionContext가 정의되지 않은 경우 오류를 발생시켜야 합니다.', () => {
  expect(() => {
    renderHook(() => useSession())
  }).toThrow('SessionContext가 없습니다.')
})
