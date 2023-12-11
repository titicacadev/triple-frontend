import { renderHook } from '@testing-library/react'

import { TransitionType } from '../../constants'
import { ClientAppName } from '../../types'
import * as useTransitionModalModule from '../modal/use-transition-modal'

import * as useClientAppModule from './use-client-app'
import { useClientAppCallback } from './use-client-app-callback'

jest.mock('../modal/use-transition-modal', () => ({
  __esModule: true,
  ...jest.requireActual('../modal/use-transition-modal'),
}))
jest.mock('./use-client-app', () => ({
  __esModule: true,
  ...jest.requireActual('./use-client-app'),
}))

const mockFn = jest.fn()
const mockShow = jest.fn()
const mockClose = jest.fn()
const mockUseTransitionModal = jest.spyOn(
  useTransitionModalModule,
  'useTransitionModal',
)
const mockUseClientApp = jest.spyOn(useClientAppModule, 'useClientApp')

beforeEach(() => {
  mockUseTransitionModal.mockReturnValue({ show: mockShow, close: mockClose })
})

afterEach(() => {
  jest.clearAllMocks()
})

test('일반 브라우저에서 앱 전환 모달 표시 함수를 호출합니다.', () => {
  mockUseClientApp.mockReturnValue(null)

  const { result } = renderHook(() =>
    useClientAppCallback(TransitionType.General, mockFn),
  )

  result.current()

  expect(mockShow).toHaveBeenCalledTimes(1)
})

test('앱에서 앱 전환 모달 표시 함수를 호출하지 않습니다.', () => {
  mockUseClientApp.mockReturnValue({
    device: {
      autoplay: 'always',
      networkType: 'unknown',
    },
    metadata: {
      name: ClientAppName.Android,
      version: '1.0.0',
    },
  })

  const { result } = renderHook(() =>
    useClientAppCallback(TransitionType.General, mockFn),
  )

  result.current()

  expect(mockShow).toHaveBeenCalledTimes(0)
})
