import React from 'react'
import { useRouter } from 'next/router'
import { render } from '@testing-library/react'
import {
  useEnv,
  useSessionContext,
  useUserAgentContext,
} from '@titicaca/react-contexts'
import { useLoginCTAModal, useTransitionModal } from '@titicaca/modals'

import { LocalLink } from './local-link'
import { useAppBridge } from './use-app-bridge'

jest.mock('next/router')
const mockedUseRouter = (useRouter as unknown) as jest.MockedFunction<
  () => Pick<ReturnType<typeof useRouter>, 'basePath'>
>

jest.mock('@titicaca/react-contexts')
const mockedUseUserAgentContext = (useUserAgentContext as unknown) as jest.MockedFunction<
  () => Pick<ReturnType<typeof useUserAgentContext>, 'isPublic'>
>
const mockedUseEnv = (useEnv as unknown) as jest.MockedFunction<
  () => Pick<ReturnType<typeof useEnv>, 'webUrlBase'>
>
const mockedUseSessionContext = (useSessionContext as unknown) as jest.MockedFunction<
  () => Pick<ReturnType<typeof useSessionContext>, 'hasSessionId'>
>

jest.mock('@titicaca/modals')
const mockedUseTransitionModal = (useTransitionModal as unknown) as jest.MockedFunction<
  () => ReturnType<typeof useTransitionModal>
>
const mockedUseLoginCTAModal = (useLoginCTAModal as unknown) as jest.MockedFunction<
  () => ReturnType<typeof useLoginCTAModal>
>

jest.mock('./use-app-bridge')
const mockedUseAppBridge = (useAppBridge as unknown) as jest.MockedFunction<
  typeof useAppBridge
>

describe('LocalLink', () => {
  mockedUseAppBridge.mockImplementation(() => ({
    openInlink: jest.fn(),
    openOutlink: jest.fn(),
  }))
  const webUrlBase = 'https://triple.guide'
  mockedUseEnv.mockImplementation(() => ({ webUrlBase }))

  const basePath = '/hotels'
  mockedUseRouter.mockImplementation(() => ({ basePath }))

  mockedUseUserAgentContext.mockImplementation(() => ({ isPublic: true }))
  mockedUseSessionContext.mockImplementation(() => ({ hasSessionId: true }))
  mockedUseTransitionModal.mockImplementation(() => ({ show: jest.fn() }))
  mockedUseLoginCTAModal.mockImplementation(() => ({ show: jest.fn() }))

  it('should add basePath to href and give it to anchor', () => {
    const { getByRole } = render(
      <LocalLink
        href="/5b700a4e-4b0f-4266-81db-eb42f834bdd9?regionId=71476976-cf9a-4ae8-a60f-76e6fb26900d"
        target="current"
      >
        <a>테스트링크</a>
      </LocalLink>,
    )

    expect(getByRole('link').getAttribute('href')).toBe(
      '/hotels/5b700a4e-4b0f-4266-81db-eb42f834bdd9?regionId=71476976-cf9a-4ae8-a60f-76e6fb26900d',
    )
  })
})
