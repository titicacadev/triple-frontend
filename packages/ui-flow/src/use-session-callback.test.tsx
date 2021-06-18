import * as React from 'react'
import { renderHook, act } from '@testing-library/react-hooks'
import {
  SessionContextProvider,
  HistoryProvider,
  useURIHash,
} from '@titicaca/react-contexts'
import { LoginCTAModalProvider } from '@titicaca/modals'

import { useSessionCallback } from './use-session-callback'

function Wrapper({
  sessionId,
  children,
}: React.PropsWithChildren<{ sessionId?: string }>) {
  return (
    <SessionContextProvider
      sessionId={sessionId}
      authBasePath="/login"
      initialUser={{ uid: '' }}
    >
      <HistoryProvider
        appUrlScheme="dev-soto"
        webUrlBase="https://triple-dev.titicaca-corp.com"
      >
        <LoginCTAModalProvider>{children}</LoginCTAModalProvider>
      </HistoryProvider>
    </SessionContextProvider>
  )
}

describe('useSessionCallback', () => {
  describe('when user has not logged in', () => {
    it('updates uri hash when callback is fired', () => {
      const { result } = renderHook(
        () => {
          const doAction = useSessionCallback(() => 'login')
          const uriHash = useURIHash()

          return { uriHash, doAction }
        },
        {
          wrapper: Wrapper,
        },
      )

      act(() => {
        result.current.doAction()
      })

      expect(result.current.uriHash).toBe('login-cta-modal')
    })

    it('returns undefined value', () => {
      const { result } = renderHook(
        () => {
          const doAction = useSessionCallback(() => 'login')
          const uriHash = useURIHash()

          return { uriHash, doAction }
        },
        {
          wrapper: Wrapper,
        },
      )

      act(() => expect(result.current.doAction()).toBe(undefined))
    })

    it('returns fallback value if provided', () => {
      const { result } = renderHook(
        () => {
          const doAction = useSessionCallback(() => 'login', 'fallback')
          const uriHash = useURIHash()

          return { uriHash, doAction }
        },
        {
          wrapper: Wrapper,
        },
      )

      act(() => expect(result.current.doAction()).toBe('fallback'))
    })
  })

  describe('when user has logged in', () => {
    it('does not update uri hash when callback is fired', () => {
      const { result } = renderHook(
        () => {
          const doAction = useSessionCallback(() => 'login')
          const uriHash = useURIHash()

          return { uriHash, doAction }
        },
        {
          wrapper: Wrapper,
          initialProps: { sessionId: 'session-id' },
        },
      )

      act(() => {
        result.current.doAction()
      })

      expect(result.current.uriHash).toBe('')
    })

    it('returns the return value of fn', () => {
      const { result } = renderHook(
        () => {
          const doAction = useSessionCallback(() => 'login')
          const uriHash = useURIHash()

          return { uriHash, doAction }
        },
        {
          wrapper: Wrapper,
          initialProps: { sessionId: 'session-id' },
        },
      )

      act(() => expect(result.current.doAction()).toBe('login'))
    })
  })
})
