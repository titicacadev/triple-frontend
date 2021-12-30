import '@testing-library/jest-dom'
import React from 'react'
import { render } from '@testing-library/react'
import { renderHook, act } from '@testing-library/react-hooks'
import {
  useEventTrackingContext,
  useHistoryFunctions,
  useURIHash,
  useUserAgentContext,
} from '@titicaca/react-contexts'

import {
  LoginCTAModalProvider,
  LOGIN_CTA_MODAL_HASH,
  useLoginCTAModal,
} from './login-cta-modal'

jest.mock('@titicaca/react-contexts')

beforeEach(() => {
  mockHistoryFunctions()
  mockEventTrackingContext()
  mockUserAgentContext()
})

test('children을 렌더링합니다.', () => {
  const { getByTestId } = render(
    <LoginCTAModalProvider>
      <div data-testid="child-element-1">42</div>

      <LoginCTAModalProvider>
        <div data-testid="child-element-2">4242</div>
      </LoginCTAModalProvider>
    </LoginCTAModalProvider>,
  )

  expect(getByTestId('child-element-1')).toHaveTextContent('42')
  expect(getByTestId('child-element-2')).toHaveTextContent('4242')
})

test('useLoginCtaModal 훅은 history context에 해시 값을 push합니다.', () => {
  const { push } = mockHistoryFunctions()

  const { result } = renderHook(useLoginCTAModal)

  act(() => {
    result.current.show()
  })

  expect(push).toBeCalledWith(LOGIN_CTA_MODAL_HASH)
})

test('history context가 LOGIN_CTA_MODAL_HASH를 반환할 때 로그인 dialog를 렌더링합니다.', () => {
  mockUseUriHash(LOGIN_CTA_MODAL_HASH)

  const { getByRole } = render(<LoginCTAModalProvider />)

  expect(getByRole('dialog')).toHaveTextContent('로그인이 필요합니다.')
})

test('여러 개의 provider가 있어도 하나의 dialog를 렌더링합니다.', () => {
  mockUseUriHash(LOGIN_CTA_MODAL_HASH)

  const { getAllByRole } = render(
    <LoginCTAModalProvider>
      <LoginCTAModalProvider />
    </LoginCTAModalProvider>,
  )

  expect(getAllByRole('dialog')).toHaveLength(1)
})

function mockUseUriHash(hash: string) {
  const mockedUseUriHash = useURIHash as jest.MockedFunction<typeof useURIHash>
  mockedUseUriHash.mockImplementation(() => {
    return hash
  })
}

function mockHistoryFunctions() {
  const mockedUseHistoryFunction = useHistoryFunctions as jest.MockedFunction<
    typeof useHistoryFunctions
  >

  const functions = {
    push: jest.fn(),
    back: jest.fn(),
    navigate: jest.fn(),
    replace: jest.fn(),
    openWindow: jest.fn(),
    showTransitionModal: jest.fn(),
  }

  mockedUseHistoryFunction.mockImplementation(() => functions)

  return functions
}

function mockEventTrackingContext() {
  const mockedUseEventTrackingContext =
    useEventTrackingContext as jest.MockedFunction<
      typeof useEventTrackingContext
    >

  mockedUseEventTrackingContext.mockImplementation(() => ({
    trackEvent: jest.fn(),
    trackScreen: jest.fn(),
    trackSimpleEvent: jest.fn(),
    setFirebaseUserId: jest.fn(),
    viewItem: jest.fn(),
  }))
}

function mockUserAgentContext() {
  const mockedUseUserAgentContext = useUserAgentContext as jest.MockedFunction<
    typeof useUserAgentContext
  >

  mockedUseUserAgentContext.mockImplementation(() => ({
    isPublic: true,
    isMobile: false,
    os: {},
    app: null,
  }))
}
