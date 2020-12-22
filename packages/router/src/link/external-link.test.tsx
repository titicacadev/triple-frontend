import React from 'react'
import { render } from '@testing-library/react'
import {
  useEnv,
  useSessionContext,
  useUserAgentContext,
} from '@titicaca/react-contexts'
import { useLoginCTAModal, useTransitionModal } from '@titicaca/modals'

import { ExternalLink } from './external-link'
import { useAppBridge } from './use-app-bridge'

jest.mock('@titicaca/react-contexts')
jest.mock('./use-app-bridge')
jest.mock('@titicaca/modals')

describe('ExternalLink', () => {
  it('should raise error and disable link with external URL in app with current target.', () => {
    useUserAgentContext.mockImplementation(() => ({ isPublic: false }))
    useEnv.mockImplementation(() => ({ webUrlBase: '' }))
    useAppBridge.mockImplementation(() => ({
      openInlink: jest.fn(),
      openOutlink: jest.fn(),
    }))
    useSessionContext.mockImplementation(() => ({ hasSessionId: true }))
    useTransitionModal.mockImplementation(() => ({ show: jest.fn() }))
    useLoginCTAModal.mockImplementation(() => ({ show: jest.fn() }))

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
