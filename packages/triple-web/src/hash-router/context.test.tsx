import { renderHook, act, waitFor } from '@testing-library/react'
import { ReactNode } from 'react'

import { UserAgentContext } from '../user-agent/context'
import { UserAgentValue } from '../user-agent/types'

import { HashRouterProvider } from './context'
import { useHashRouter } from './use-hash-router'

const mockUserAgent = (osName: string = 'iOS'): UserAgentValue => ({
  browser: { name: 'Safari', version: '14.0', major: undefined },
  cpu: { architecture: 'arm64' },
  device: { model: 'iPhone', type: 'mobile', vendor: 'Apple' },
  engine: { name: 'WebKit', version: '605.1.15' },
  isMobile: true,
  os: { name: osName, version: '14.0' },
  ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)',
})

function createWrapper(osName: string = 'iOS') {
  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <UserAgentContext.Provider value={mockUserAgent(osName)}>
        <HashRouterProvider>{children}</HashRouterProvider>
      </UserAgentContext.Provider>
    )
  }
  Wrapper.displayName = `HashRouterTestWrapper(${osName})`
  return Wrapper
}

describe('HashRouterProvider', () => {
  beforeEach(() => {
    window.location.hash = ''
    window.history.replaceState(null, '', window.location.pathname)
  })

  afterEach(() => {
    window.location.hash = ''
  })

  describe('초기화 상태를 테스트합니다.', () => {
    test('초기 hash 값을 올바르게 설정해야 합니다', async () => {
      window.location.hash = '#test'

      const { result } = renderHook(() => useHashRouter(), {
        wrapper: createWrapper(),
      })

      await waitFor(() => {
        expect(result.current.uriHash).toBe('test')
      })
    })

    test('빈 hash로 시작해야 합니다', async () => {
      const { result } = renderHook(() => useHashRouter(), {
        wrapper: createWrapper(),
      })

      await waitFor(() => {
        expect(result.current.uriHash).toBe('')
      })
    })
  })

  describe('addUriHash', () => {
    test('iOS에서는 기본적으로 replace 방식으로 hash를 추가해야 합니다', async () => {
      const pushStateSpy = jest.spyOn(window.history, 'pushState')
      const replaceStateSpy = jest.spyOn(window.history, 'replaceState')

      const { result } = renderHook(() => useHashRouter(), {
        wrapper: createWrapper('iOS'),
      })

      act(() => {
        result.current.addUriHash('modal1')
      })

      await waitFor(() => {
        expect(result.current.uriHash).toBe('modal1')
      })

      expect(window.location.hash).toBe('#modal1')
      expect(pushStateSpy).not.toHaveBeenCalled()
      expect(replaceStateSpy).toHaveBeenCalled()

      pushStateSpy.mockRestore()
      replaceStateSpy.mockRestore()
    })

    test('Android에서는 기본적으로 push 방식으로 hash를 추가해야 합니다', async () => {
      const pushStateSpy = jest.spyOn(window.history, 'pushState')
      const replaceStateSpy = jest.spyOn(window.history, 'replaceState')

      const { result } = renderHook(() => useHashRouter(), {
        wrapper: createWrapper('Android'),
      })

      act(() => {
        result.current.addUriHash('modal1')
      })

      await waitFor(() => {
        expect(result.current.uriHash).toBe('modal1')
      })

      expect(pushStateSpy).toHaveBeenCalled()
      expect(replaceStateSpy).not.toHaveBeenCalled()

      pushStateSpy.mockRestore()
      replaceStateSpy.mockRestore()
    })

    test('type을 push로 지정하면 push 방식으로 hash를 추가해야 합니다', async () => {
      const pushStateSpy = jest.spyOn(window.history, 'pushState')
      const replaceStateSpy = jest.spyOn(window.history, 'replaceState')

      const { result } = renderHook(() => useHashRouter(), {
        wrapper: createWrapper('iOS'),
      })

      act(() => {
        result.current.addUriHash('modal1', 'push')
      })

      await waitFor(() => {
        expect(result.current.uriHash).toBe('modal1')
      })

      expect(pushStateSpy).toHaveBeenCalled()
      expect(replaceStateSpy).not.toHaveBeenCalled()

      pushStateSpy.mockRestore()
      replaceStateSpy.mockRestore()
    })

    test('type을 replace로 지정하면 replace 방식으로 hash를 추가해야 합니다', async () => {
      const pushStateSpy = jest.spyOn(window.history, 'pushState')
      const replaceStateSpy = jest.spyOn(window.history, 'replaceState')

      const { result } = renderHook(() => useHashRouter(), {
        wrapper: createWrapper('Android'),
      })

      act(() => {
        result.current.addUriHash('modal1', 'replace')
      })

      await waitFor(() => {
        expect(result.current.uriHash).toBe('modal1')
      })

      expect(pushStateSpy).not.toHaveBeenCalled()
      expect(replaceStateSpy).toHaveBeenCalled()

      pushStateSpy.mockRestore()
      replaceStateSpy.mockRestore()
    })

    test('중복된 hash를 추가하지 않아야 합니다', async () => {
      // eslint-disable-next-line no-console
      const originalWarn = console.warn
      const mockWarn = jest.fn()
      // eslint-disable-next-line no-console
      console.warn = mockWarn

      const { result } = renderHook(() => useHashRouter(), {
        wrapper: createWrapper(),
      })

      act(() => {
        result.current.addUriHash('modal1')
      })

      await waitFor(() => {
        expect(result.current.uriHash).toBe('modal1')
      })

      act(() => {
        result.current.addUriHash('modal1')
      })

      await waitFor(() => {
        expect(result.current.uriHash).toBe('modal1')
      })

      expect(window.location.hash).toBe('#modal1')

      // eslint-disable-next-line no-console
      console.warn = originalWarn
    })

    test('빈 hash에 hash를 추가할 수 있어야 합니다', async () => {
      const { result } = renderHook(() => useHashRouter(), {
        wrapper: createWrapper(),
      })

      act(() => {
        result.current.addUriHash('modal1')
      })

      await waitFor(() => {
        expect(result.current.uriHash).toBe('modal1')
      })

      expect(window.location.hash).toBe('#modal1')
    })

    test('기존 hash에 새로운 hash를 추가할 수 있어야 합니다', async () => {
      const { result } = renderHook(() => useHashRouter(), {
        wrapper: createWrapper(),
      })

      act(() => {
        result.current.addUriHash('modal1')
      })

      await waitFor(() => {
        expect(result.current.uriHash).toBe('modal1')
      })

      act(() => {
        result.current.addUriHash('drawer')
      })

      await waitFor(() => {
        expect(result.current.uriHash).toBe('modal1&drawer')
      })

      expect(window.location.hash).toBe('#modal1&drawer')
    })
  })

  describe('removeUriHash', () => {
    test('iOS에서는 기본적으로 replace 방식으로 hash를 제거해야 합니다', async () => {
      window.location.hash = '#modal1&modal2'

      const backSpy = jest.spyOn(window.history, 'back')
      const replaceStateSpy = jest.spyOn(window.history, 'replaceState')

      const { result } = renderHook(() => useHashRouter(), {
        wrapper: createWrapper('iOS'),
      })

      await waitFor(() => {
        expect(result.current.uriHash).toBe('modal1&modal2')
      })

      act(() => {
        result.current.removeUriHash()
      })

      await waitFor(() => {
        expect(result.current.uriHash).toBe('modal1')
      })

      expect(window.location.hash).toBe('#modal1')
      expect(backSpy).not.toHaveBeenCalled()
      expect(replaceStateSpy).toHaveBeenCalled()

      backSpy.mockRestore()
      replaceStateSpy.mockRestore()
    })

    test('Android에서는 기본적으로 pop 방식으로 hash를 제거해야 합니다', async () => {
      const backSpy = jest.spyOn(window.history, 'back')
      const replaceStateSpy = jest.spyOn(window.history, 'replaceState')

      const { result } = renderHook(() => useHashRouter(), {
        wrapper: createWrapper('Android'),
      })

      // push로 hash 추가하여 스택 생성
      act(() => {
        result.current.addUriHash('modal1')
      })

      await waitFor(() => {
        expect(result.current.uriHash).toBe('modal1')
      })

      act(() => {
        result.current.addUriHash('modal2')
      })

      await waitFor(() => {
        expect(result.current.uriHash).toBe('modal1&modal2')
      })

      act(() => {
        result.current.removeUriHash()
      })

      await waitFor(() => {
        expect(backSpy).toHaveBeenCalled()
      })

      expect(replaceStateSpy).not.toHaveBeenCalled()

      backSpy.mockRestore()
      replaceStateSpy.mockRestore()
    })

    test('type을 pop으로 지정하면 pop 방식으로 hash를 제거해야 합니다', async () => {
      const backSpy = jest.spyOn(window.history, 'back')
      const replaceStateSpy = jest.spyOn(window.history, 'replaceState')

      const { result } = renderHook(() => useHashRouter(), {
        wrapper: createWrapper('iOS'),
      })

      // push로 hash 추가하여 스택 생성
      act(() => {
        result.current.addUriHash('modal1', 'push')
      })

      await waitFor(() => {
        expect(result.current.uriHash).toBe('modal1')
      })

      act(() => {
        result.current.removeUriHash('pop')
      })

      await waitFor(() => {
        expect(backSpy).toHaveBeenCalled()
      })

      expect(replaceStateSpy).not.toHaveBeenCalled()

      backSpy.mockRestore()
      replaceStateSpy.mockRestore()
    })

    test('type을 replace로 지정하면 replace 방식으로 hash를 제거해야 합니다', async () => {
      window.location.hash = '#modal1&modal2'

      const backSpy = jest.spyOn(window.history, 'back')
      const replaceStateSpy = jest.spyOn(window.history, 'replaceState')

      const { result } = renderHook(() => useHashRouter(), {
        wrapper: createWrapper('Android'),
      })

      await waitFor(() => {
        expect(result.current.uriHash).toBe('modal1&modal2')
      })

      act(() => {
        result.current.removeUriHash('replace')
      })

      await waitFor(() => {
        expect(result.current.uriHash).toBe('modal1')
      })

      expect(window.location.hash).toBe('#modal1')
      expect(backSpy).not.toHaveBeenCalled()
      expect(replaceStateSpy).toHaveBeenCalled()

      backSpy.mockRestore()
      replaceStateSpy.mockRestore()
    })

    test('마지막 hash를 제거해야 합니다', async () => {
      window.location.hash = '#modal1&modal2'

      const { result } = renderHook(() => useHashRouter(), {
        wrapper: createWrapper(),
      })

      await waitFor(() => {
        expect(result.current.uriHash).toBe('modal1&modal2')
      })

      act(() => {
        result.current.removeUriHash()
      })

      await waitFor(() => {
        expect(result.current.uriHash).toBe('modal1')
      })

      expect(window.location.hash).toBe('#modal1')
    })

    test('hash가 없을 때는 아무것도 하지 않아야 합니다', async () => {
      const { result } = renderHook(() => useHashRouter(), {
        wrapper: createWrapper(),
      })

      act(() => {
        result.current.removeUriHash()
      })

      await waitFor(() => {
        expect(result.current.uriHash).toBe('')
      })

      expect(window.location.hash).toBe('')
    })

    test('마지막 하나 남은 hash를 제거하면 빈 hash가 되어야 합니다', async () => {
      window.location.hash = '#modal1'

      const { result } = renderHook(() => useHashRouter(), {
        wrapper: createWrapper(),
      })

      await waitFor(() => {
        expect(result.current.uriHash).toBe('modal1')
      })

      act(() => {
        result.current.removeUriHash()
      })

      await waitFor(() => {
        expect(result.current.uriHash).toBe('')
      })

      expect(window.location.hash).toBe('')
    })
  })

  describe('hasUriHash', () => {
    test('존재하는 hash를 확인할 수 있어야 합니다', async () => {
      window.location.hash = '#modal1&drawer=open'

      const { result } = renderHook(() => useHashRouter(), {
        wrapper: createWrapper(),
      })

      await waitFor(() => {
        expect(result.current.hasUriHash('modal1')).toBe(true)
      })

      expect(result.current.hasUriHash('drawer')).toBe(true)
    })

    test('존재하지 않는 hash는 false를 반환해야 합니다', async () => {
      window.location.hash = '#modal1'

      const { result } = renderHook(() => useHashRouter(), {
        wrapper: createWrapper(),
      })

      await waitFor(() => {
        expect(result.current.hasUriHash('drawer')).toBe(false)
      })

      expect(result.current.hasUriHash('modal2')).toBe(false)
    })

    test('빈 hash에서는 항상 false를 반환해야 합니다', async () => {
      const { result } = renderHook(() => useHashRouter(), {
        wrapper: createWrapper(),
      })

      await waitFor(() => {
        expect(result.current.hasUriHash('modal1')).toBe(false)
      })

      expect(result.current.hasUriHash('anything')).toBe(false)
    })

    test('startsWith를 사용하여 부분 매칭해야 합니다', async () => {
      window.location.hash = '#drawer=open'

      const { result } = renderHook(() => useHashRouter(), {
        wrapper: createWrapper(),
      })

      await waitFor(() => {
        expect(result.current.hasUriHash('drawer')).toBe(true)
      })

      expect(result.current.hasUriHash('drawer=')).toBe(true)
    })
  })

  describe('replaceUriHash', () => {
    test('기존 hash를 새로운 hash로 대체해야 합니다', async () => {
      window.location.hash = '#modal1&drawer=open'

      const { result } = renderHook(() => useHashRouter(), {
        wrapper: createWrapper(),
      })

      await waitFor(() => {
        expect(result.current.uriHash).toBe('modal1&drawer=open')
      })

      act(() => {
        result.current.replaceUriHash('modal1', 'modal2')
      })

      await waitFor(() => {
        expect(result.current.uriHash).toBe('modal2&drawer=open')
      })

      expect(window.location.hash).toBe('#modal2&drawer=open')
    })

    test('존재하지 않는 hash를 대체하려고 하면 경고를 출력해야 합니다', async () => {
      window.location.hash = '#modal1'
      // eslint-disable-next-line no-console
      const originalWarn = console.warn
      const mockWarn = jest.fn()
      // eslint-disable-next-line no-console
      console.warn = mockWarn

      const { result } = renderHook(() => useHashRouter(), {
        wrapper: createWrapper(),
      })

      await waitFor(() => {
        expect(result.current.uriHash).toBe('modal1')
      })

      act(() => {
        result.current.replaceUriHash('drawer', 'modal2')
      })

      await waitFor(() => {
        expect(result.current.uriHash).toBe('modal1')
      })

      // eslint-disable-next-line no-console
      console.warn = originalWarn
    })

    test('hash가 없으면 아무것도 하지 않아야 합니다', async () => {
      const { result } = renderHook(() => useHashRouter(), {
        wrapper: createWrapper(),
      })

      act(() => {
        result.current.replaceUriHash('modal1', 'modal2')
      })

      await waitFor(() => {
        expect(result.current.uriHash).toBe('')
      })
    })
  })

  describe('브라우저 네이티브 뒤로가기', () => {
    test('popstate 이벤트로 uriHash가 업데이트되어야 합니다', async () => {
      window.location.hash = '#modal1&modal2'

      const { result } = renderHook(() => useHashRouter(), {
        wrapper: createWrapper(),
      })

      await waitFor(() => {
        expect(result.current.uriHash).toBe('modal1&modal2')
      })

      act(() => {
        window.location.hash = '#modal1'
        window.dispatchEvent(new PopStateEvent('popstate'))
      })

      await waitFor(() => {
        expect(result.current.uriHash).toBe('modal1')
      })
    })

    test('hashchange 이벤트로 uriHash가 업데이트되어야 합니다', async () => {
      const { result } = renderHook(() => useHashRouter(), {
        wrapper: createWrapper(),
      })

      act(() => {
        window.location.hash = '#test'
        window.dispatchEvent(new Event('hashchange'))
      })

      await waitFor(() => {
        expect(result.current.uriHash).toBe('test')
      })
    })
  })

  describe('useHashRouter hook', () => {
    test('HashRouterContext가 없으면 에러를 던져야 합니다', () => {
      expect(() => {
        renderHook(() => useHashRouter())
      }).toThrow('HashRouterContext가 존재하지 않습니다.')
    })
  })
})
