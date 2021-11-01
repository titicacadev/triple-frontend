import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { useTransitionModal, useLoginCTAModal } from '@titicaca/modals'
import {
  useUserAgentContext,
  useSessionContext,
} from '@titicaca/react-contexts'

import { RouterGuardedLink } from './router-guarded-link'

jest.mock('@titicaca/react-contexts')
const mockedUseUserAgentContext = (useUserAgentContext as unknown) as jest.MockedFunction<
  () => Pick<ReturnType<typeof useUserAgentContext>, 'isPublic'>
>
const mockedUseSessionContext = (useSessionContext as unknown) as jest.MockedFunction<
  typeof useSessionContext
>

jest.mock('@titicaca/modals')
const mockedUseTransitionModal = (useTransitionModal as unknown) as jest.MockedFunction<
  () => ReturnType<typeof useTransitionModal>
>
const mockedUseLoginCTAModal = (useLoginCTAModal as unknown) as jest.MockedFunction<
  () => ReturnType<typeof useLoginCTAModal>
>

describe('RouterGuardedLink', () => {
  mockedUseUserAgentContext.mockImplementation(() => ({
    isPublic: false,
    isMobile: false,
    os: {},
    app: null,
  }))
  mockedUseSessionContext.mockImplementation(() => ({
    hasWebSession: true,
    hasSessionId: true,
    user: { uid: 'MOCK_USER' },
    login: () => {},
    logout: () => {},
  }))
  mockedUseTransitionModal.mockImplementation(() => ({ show: jest.fn() }))
  mockedUseLoginCTAModal.mockImplementation(() => ({ show: jest.fn() }))

  test('자식 태그가 덮어쓰일 속성을 가지고 있으면 경고를 보냅니다.', () => {
    /* eslint-disable no-console */
    console.warn = jest.fn()

    render(
      <RouterGuardedLink href="https://triple.guide" className="asdf">
        <a
          href="https://triple.guide/hotels"
          onClick={jest.fn()}
          className="test-link"
        >
          테스트링크
        </a>
      </RouterGuardedLink>,
    )

    expect(console.warn).toBeCalledWith(expect.stringContaining('href'))
    expect(console.warn).toBeCalledWith(expect.stringContaining('onClick'))
    expect(console.warn).toBeCalledWith(expect.stringContaining('className'))
    /* eslint-enable no-console */
  })
})
