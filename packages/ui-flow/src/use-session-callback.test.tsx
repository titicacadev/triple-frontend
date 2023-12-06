import { renderHook, act } from '@testing-library/react'
import { useLoginCtaModal } from '@titicaca/modals'
import {
  useSessionAvailability,
  useLogin,
  useLogout,
  useHashRouter,
} from '@titicaca/triple-web'

import { useSessionCallback } from './use-session-callback'

jest.mock('@titicaca/modals')
jest.mock('@titicaca/triple-web')

describe('useSessionCallback', () => {
  beforeEach(() => {
    ;(
      useLogin as unknown as jest.MockedFunction<
        () => ReturnType<typeof useLogin>
      >
    ).mockImplementation(() => jest.fn())
    ;(
      useLogout as unknown as jest.MockedFunction<
        () => ReturnType<typeof useLogout>
      >
    ).mockImplementation(() => jest.fn())
    ;(
      useLoginCtaModal as unknown as jest.MockedFunction<
        () => Pick<ReturnType<typeof useLoginCtaModal>, 'show'>
      >
    ).mockImplementation(() => ({ show: jest.fn() }))
  })

  describe('when user has not logged in', () => {
    beforeEach(() => {
      ;(
        useSessionAvailability as unknown as jest.MockedFunction<() => boolean>
      ).mockImplementation(() => false)
    })

    it('returns undefined value', () => {
      const { result } = renderHook(() => {
        const doAction = useSessionCallback(() => 'login')
        const { uriHash } = useHashRouter()

        return { uriHash, doAction }
      })

      act(() => expect(result.current.doAction()).toBeUndefined())
    })

    it('returns fallback value if provided', () => {
      const { result } = renderHook(() => {
        const doAction = useSessionCallback(() => 'login', {
          returnUrl: undefined,
          returnValue: 'fallback',
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any)
        const { uriHash } = useHashRouter()

        return { uriHash, doAction }
      })

      act(() => expect(result.current.doAction()).toBe('fallback'))
    })
  })

  describe('when user has logged in', () => {
    beforeEach(() => {
      ;(
        useSessionAvailability as unknown as jest.MockedFunction<() => boolean>
      ).mockImplementation(() => true)
    })

    it('returns the return value of fn', () => {
      const { result } = renderHook(() => {
        const doAction = useSessionCallback(() => 'login')
        const { uriHash } = useHashRouter()

        return { uriHash, doAction }
      })

      act(() => expect(result.current.doAction()).toBe('login'))
    })
  })
})
