import { renderHook } from '@testing-library/react'

import { useUserAgent } from './use-user-agent'
import { UserAgentContext } from './context'
import { UserAgentValue } from './types'

test('UserAgentContext가 정의된 경우 값을 반환해야 합니다.', () => {
  const mockValue: UserAgentValue = {
    browser: { name: 'Chrome', version: '91.0.4472.124', major: undefined },
    cpu: { architecture: 'amd64' },
    device: { model: undefined, type: 'desktop', vendor: undefined },
    engine: { name: 'Blink', version: '91.0.4472.124' },
    isMobile: false,
    os: { name: 'Windows', version: '10.0' },
    ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
  }

  const { result } = renderHook(() => useUserAgent(), {
    wrapper: ({ children }) => (
      <UserAgentContext.Provider value={mockValue}>
        {children}
      </UserAgentContext.Provider>
    ),
  })

  expect(result.current).toBe(mockValue)
})

test('UserAgentContext가 정의되지 않은 경우 오류를 발생시켜야 합니다.', () => {
  expect(() => {
    renderHook(() => useUserAgent())
  }).toThrow('UserAgentContext가 없습니다.')
})
