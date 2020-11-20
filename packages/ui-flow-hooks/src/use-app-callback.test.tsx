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

describe('useAppCallback', () => {
  describe('when user is in app', () => {
    const wrapper = ({ children }) => (
      <UserAgentProvider value={{ isPublic: false }}>
        <SessionContextProvider authBasePath="/login">
          <HistoryProvider
            appUrlScheme="dev-soto"
            webUrlBase="https://triple-dev.titicaca-corp.com"
          >
            {children}
          </HistoryProvider>
        </SessionContextProvider>
      </UserAgentProvider>
    )

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
        { wrapper },
      )

      act(() => {
        result.current.doAction()
      })

      expect(result.current.uriHash).toBe('')
    })
  })

  describe('when user is not in app', () => {
    const wrapper = ({ children }) => (
      <UserAgentProvider value={{ isPublic: true }}>
        <SessionContextProvider authBasePath="/login">
          <HistoryProvider
            appUrlScheme="dev-soto"
            webUrlBase="https://triple-dev.titicaca-corp.com"
          >
            {children}
          </HistoryProvider>
        </SessionContextProvider>
      </UserAgentProvider>
    )

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
        { wrapper },
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
