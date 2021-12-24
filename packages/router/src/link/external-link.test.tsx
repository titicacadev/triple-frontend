import React from 'react'
import { render } from '@testing-library/react'
import {
  useEnv,
  useSessionAvailability,
  useUserAgentContext,
} from '@titicaca/react-contexts'
import { useLoginCTAModal, useTransitionModal } from '@titicaca/modals'

import { ExternalLink } from './external-link'
import { useAppBridge } from './use-app-bridge'

jest.mock('@titicaca/react-contexts')
jest.mock('./use-app-bridge')
jest.mock('@titicaca/modals')

const mockedUseUserAgentContext = useUserAgentContext as jest.MockedFunction<
  typeof useUserAgentContext
>
const mockedUseEnv = useEnv as jest.MockedFunction<typeof useEnv>
const mockedUseAppBridge = useAppBridge as jest.MockedFunction<
  typeof useAppBridge
>
const mockedUseTransitionModal = useTransitionModal as jest.MockedFunction<
  typeof useTransitionModal
>
const mockedUseLoginCTAModal = useLoginCTAModal as jest.MockedFunction<
  typeof useLoginCTAModal
>

describe('ExternalLink', () => {
  beforeEach(() => {
    ;((useSessionAvailability as unknown) as jest.MockedFunction<
      () => boolean
    >).mockImplementation(() => false)
  })

  it('should raise error and disable link with external URL in app with current target.', () => {
    mockedUseUserAgentContext.mockImplementation(() => ({
      isPublic: false,
      isMobile: false,
      os: {},
      app: null,
    }))
    mockedUseEnv.mockImplementation(() => ({
      webUrlBase: '',
      appUrlScheme: '',
      authBasePath: '/',
      facebookAppId: '',
      defaultPageTitle: '',
      defaultPageDescription: '',
      afOnelinkId: '',
      afOnelinkPid: '',
      afOnelinkSubdomain: '',
    }))
    mockedUseAppBridge.mockImplementation(() => ({
      openInlink: jest.fn(),
      openOutlink: jest.fn(),
      openNativeLink: jest.fn(),
    }))
    mockedUseTransitionModal.mockImplementation(() => ({ show: jest.fn() }))
    mockedUseLoginCTAModal.mockImplementation(() => ({ show: jest.fn() }))

    const handleError = jest.fn()

    const { queryByRole } = render(
      <ExternalLink
        href="https://www.google.com"
        target="current"
        onError={handleError}
      >
        <a>테스트링크</a>
      </ExternalLink>,
    )

    expect(handleError).toBeCalled()
    expect(queryByRole('link')).toBe(null)
  })
})
