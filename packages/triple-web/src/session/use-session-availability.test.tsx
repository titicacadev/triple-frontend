import { renderHook } from '@testing-library/react'

import { useSessionAvailability } from './use-session-availability'
import { SessionProvider } from './context'

test('session이 있는 경우 true를 반환해야 합니다.', () => {
  const { result } = renderHook(() => useSessionAvailability(), {
    wrapper: ({ children }) => (
      <SessionProvider
        initialSession={{
          user: {
            country: '',
            email: '',
            lang: '',
            mileage: { badges: [], level: 0, point: 0 },
            name: '',
            photo: '',
            provider: 'APPLE',
            uid: '',
            unregister: false,
          },
        }}
      >
        {children}
      </SessionProvider>
    ),
  })

  expect(result.current).toBe(true)
})

test('session이 없는 경우 false를 반환해야 합니다.', () => {
  const { result } = renderHook(() => useSessionAvailability(), {
    wrapper: ({ children }) => (
      <SessionProvider initialSession={{ user: null }}>
        {children}
      </SessionProvider>
    ),
  })

  expect(result.current).toBe(false)
})
