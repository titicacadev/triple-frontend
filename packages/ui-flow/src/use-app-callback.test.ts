import { renderHook, act } from '@testing-library/react-hooks'
import { useTripleClientMetadata } from '@titicaca/react-triple-client-interfaces'
import { TransitionType, useTransitionModal } from '@titicaca/modals'

import { useAppCallback } from './use-app-callback'

jest.mock('@titicaca/react-triple-client-interfaces')
jest.mock('@titicaca/modals')

test('일반 브라우저에서 앱 전환 모달 표시 함수를 호출합니다.', () => {
  mockTripleClientMetadata(null)
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
  mockTripleClientMetadata({ appName: 'Triple-iOS', appVersion: '5.13.0' })
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

function mockTripleClientMetadata(
  app: ReturnType<typeof useTripleClientMetadata>,
) {
  const mockedTripleClientMetadataContext =
    useTripleClientMetadata as jest.MockedFunction<
      typeof useTripleClientMetadata
    >

  mockedTripleClientMetadataContext.mockImplementation(
    () => app as ReturnType<typeof useTripleClientMetadata>,
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
