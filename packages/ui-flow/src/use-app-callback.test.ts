import { renderHook, act } from '@testing-library/react-hooks'
import { useUserAgentContext } from '@titicaca/react-contexts'
import { TransitionType, useTransitionModal } from '@titicaca/modals'

import { useAppCallback } from './use-app-callback'

jest.mock('@titicaca/react-contexts')
jest.mock('@titicaca/modals')

test('일반 브라우저에서 앱 전환 모달 표시 함수를 호출합니다.', () => {
  mockUserAgentContext({ isPublic: true })
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
  mockUserAgentContext({ isPublic: false })
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

function mockUserAgentContext({ isPublic }: { isPublic: boolean }) {
  const mockedUseUserAgentContext = useUserAgentContext as jest.MockedFunction<
    typeof useUserAgentContext
  >

  mockedUseUserAgentContext.mockImplementation(
    () =>
      ({
        isPublic,
      } as ReturnType<typeof useUserAgentContext>),
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
