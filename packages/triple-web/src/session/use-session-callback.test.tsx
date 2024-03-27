import { renderHook } from '@testing-library/react'

import * as useLoginCtaModalModule from '../modal/use-login-cta-modal'

import { useSessionCallback } from './use-session-callback'
import * as useSessionAvailabilityModule from './use-session-availability'
import * as useLoginModule from './use-login'

jest.mock('../modal/use-login-cta-modal', () => ({
  __esModule: true,
  ...jest.requireActual('../modal/use-login-cta-modal'),
}))
jest.mock('./use-session-availability', () => ({
  __esModule: true,
  ...jest.requireActual('./use-session-availability'),
}))
jest.mock('./use-login', () => ({
  __esModule: true,
  ...jest.requireActual('./use-login'),
}))

const mockFn = jest.fn()
const mockLogin = jest.fn()
const mockShow = jest.fn()
const mockClose = jest.fn()
const mockUseSessionAvailability = jest.spyOn(
  useSessionAvailabilityModule,
  'useSessionAvailability',
)
const mockUseLogin = jest.spyOn(useLoginModule, 'useLogin')
const mockUseLoginCtaModal = jest.spyOn(
  useLoginCtaModalModule,
  'useLoginCtaModal',
)

beforeEach(() => {
  mockUseLogin.mockReturnValue(mockLogin)
  mockUseLoginCtaModal.mockReturnValue({ show: mockShow, close: mockClose })
})

afterEach(() => {
  jest.clearAllMocks()
})

test('when user has not logged in, it returns undefined value', () => {
  mockUseSessionAvailability.mockReturnValue(false)

  const { result } = renderHook(() => useSessionCallback(mockFn))

  const returnValue = result.current()

  expect(mockShow).toHaveBeenCalled()
  expect(returnValue).toBeUndefined()
})

test('when user has not logged in, returns fallback value if provided', () => {
  mockUseSessionAvailability.mockReturnValue(false)
  const fallbackValue = true

  const { result } = renderHook(() =>
    useSessionCallback(mockFn, {
      returnValue: fallbackValue,
    }),
  )

  const returnValue = result.current()

  expect(mockShow).toHaveBeenCalled()
  expect(returnValue).toBe(fallbackValue)
})

test('when user has logged in, returns the return value of fn', () => {
  mockUseSessionAvailability.mockReturnValue(true)
  const expectedReturnValue = 'expected'
  mockFn.mockReturnValue(expectedReturnValue)

  const { result } = renderHook(() => useSessionCallback(mockFn))

  const returnValue = result.current()

  expect(mockShow).not.toHaveBeenCalled()
  expect(returnValue).toBe(expectedReturnValue)
})
