import { renderHook, act } from '@testing-library/react-hooks'
import { useClientContext } from '@titicaca/react-client-interfaces'
import { TransitionType, useTransitionModal } from '@titicaca/modals'

import { useAppCallback } from './use-app-callback'

jest.mock('@titicaca/react-client-interfaces')
jest.mock('@titicaca/modals')

test('일반 브라우저에서 앱 전환 모달 표시 함수를 호출합니다.', () => {
  mockClientContext(null)
  const mockShow = mockTransitionModalContext()

  const { result } = renderHook(() => {
    const doAction = useAppCallback(TransitionType.General, () => 'doSomething')

    return { doAction }
  })

  act(() => {
    result.current.doAction()
  })

  expect(mockShow).toBeCalledTimes(1)
})

test('앱에서 앱 전환 모달 표시 함수를 호출하지 않습니다.', () => {
  mockClientContext({
    appName: 'Triple-Android',
    appVersion: '5.11.0',
  })
  const mockShow = mockTransitionModalContext()

  const { result } = renderHook(() => {
    const doAction = useAppCallback(TransitionType.General, () => 'doSomething')

    return { doAction }
  })

  act(() => {
    result.current.doAction()
  })

  expect(mockShow).toBeCalledTimes(0)
})

function mockClientContext(app: ReturnType<typeof useClientContext>) {
  const mockedUseClientContext = useClientContext as jest.MockedFunction<
    typeof useClientContext
  >

  mockedUseClientContext.mockImplementation(
    () => app as ReturnType<typeof useClientContext>,
  )
}

function mockTransitionModalContext() {
  const mockedUseTransitionModal = useTransitionModal as jest.MockedFunction<
    typeof useTransitionModal
  >

  const mockShow = jest.fn()

  mockedUseTransitionModal.mockImplementation(() => ({
    show: mockShow,
  }))

  return mockShow
}
