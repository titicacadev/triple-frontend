import * as React from 'react'
import { renderHook, act } from '@testing-library/react-hooks'
import {
  UserAgentProvider,
  HistoryProvider,
  SessionContextProvider,
  useURIHash,
} from '@titicaca/react-contexts'
import { TransitionType } from '@titicaca/modals'

import { useAppCallback } from './use-app-callback'

function Wrapper({
  isPublic,
  children,
}: React.PropsWithChildren<{ isPublic: boolean }>) {
  return (
    <UserAgentProvider value={{ isPublic, isMobile: false, app: null, os: {} }}>
      <SessionContextProvider authBasePath="/login" initialUser={{ uid: '' }}>
        <HistoryProvider
          appUrlScheme="dev-soto"
          webUrlBase="https://triple-dev.titicaca-corp.com"
        >
          {children}
        </HistoryProvider>
      </SessionContextProvider>
    </UserAgentProvider>
  )
}

describe('useAppCallback', () => {
  describe('when user is in app', () => {
    it('does not update uri hash', () => {
      const { result } = renderHook(
        () => {
          const doAction = useAppCallback(
            TransitionType.General,
            () => 'doSomething',
          )
          const uriHash = useURIHash()

          return { doAction, uriHash }
        },
        { wrapper: Wrapper, initialProps: { isPublic: false } },
      )

      act(() => {
        result.current.doAction()
      })

      expect(result.current.uriHash).toBe('')
    })
  })

  describe('when user is not in app', () => {
    it('updates uri hash', () => {
      const { result } = renderHook(
        () => {
          const doAction = useAppCallback(
            TransitionType.General,
            () => 'doSomething',
          )
          const uriHash = useURIHash()

          return { doAction, uriHash }
        },
        { wrapper: Wrapper, initialProps: { isPublic: true } },
      )

      act(() => {
        result.current.doAction()
      })

      expect(result.current.uriHash).toBe(
        `transition.${TransitionType.General}`,
      )
    })
  })
})
