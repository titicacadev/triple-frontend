import { renderHook, act } from '@testing-library/react-hooks'
import { useLoginCtaModal } from '@titicaca/modals'
import {
  useSessionAvailability,
  useSessionControllers,
  useUriHash,
} from '@titicaca/react-contexts'

import { useSessionCallback } from './use-session-callback'

jest.mock('@titicaca/react-contexts')
jest.mock('@titicaca/modals')

describe('useSessionCallback', () => {
  beforeEach(() => {
    ;(
      useSessionControllers as unknown as jest.MockedFunction<
        () => Pick<ReturnType<typeof useSessionControllers>, 'login'>
      >
    ).mockImplementation(() => ({ login: jest.fn() }))
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
        const uriHash = useUriHash()

        return { uriHash, doAction }
      })

      act(() => expect(result.current.doAction()).toBe(undefined))
    })

    it('returns fallback value if provided', () => {
      const { result } = renderHook(() => {
        const doAction = useSessionCallback(() => 'login', {
          returnUrl: undefined,
          returnValue: 'fallback',
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any)
        const uriHash = useUriHash()

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
        const uriHash = useUriHash()

        return { uriHash, doAction }
      })

      act(() => expect(result.current.doAction()).toBe('login'))
    })
  })
})
