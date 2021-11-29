import React from 'react'
import Router, { useRouter } from 'next/router'
import { fireEvent, render } from '@testing-library/react'
import {
  useEnv,
  useSessionAvailability,
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
  beforeEach(() => {
    ;((useSessionAvailability as unknown) as jest.MockedFunction<
      () => boolean
    >).mockImplementation(() => false)
  })

  mockedUseAppBridge.mockImplementation(() => ({
    openInlink: jest.fn(),
    openOutlink: jest.fn(),
  }))
  const webUrlBase = 'https://triple.guide'
  mockedUseEnv.mockImplementation(() => ({ webUrlBase }))

  const basePath = '/hotels'
  mockedUseRouter.mockImplementation(() => ({ basePath }))

  mockedUseUserAgentContext.mockImplementation(() => ({ isPublic: false }))
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

  it('shoud add tripleQuery to href', () => {
    const { getByRole } = render(
      <LocalLink
        href="/5b700a4e-4b0f-4266-81db-eb42f834bdd9"
        target="current"
        lnbTarget={{
          type: 'region',
          id: '71476976-cf9a-4ae8-a60f-76e6fb26900d',
        }}
      >
        <a>테스트 링크</a>
      </LocalLink>,
    )

    expect(getByRole('link').getAttribute('href')).toBe(
      '/hotels/5b700a4e-4b0f-4266-81db-eb42f834bdd9?_triple_lnb_region_id=71476976-cf9a-4ae8-a60f-76e6fb26900d',
    )
  })

  it('should not use next/router when click with key pressing.', () => {
    const handleClick = jest.fn()

    const { getByRole } = render(
      <LocalLink
        href="/5b700a4e-4b0f-4266-81db-eb42f834bdd9?regionId=71476976-cf9a-4ae8-a60f-76e6fb26900d"
        target="current"
        onClick={handleClick}
      >
        <a>테스트링크</a>
      </LocalLink>,
    )

    fireEvent.click(getByRole('link'), { metaKey: true })
    expect(handleClick).toBeCalled()
    expect(Router.push).toBeCalledTimes(0)
    handleClick.mockClear()

    fireEvent.click(getByRole('link'), { shiftKey: true })
    expect(handleClick).toBeCalled()
    expect(Router.push).toBeCalledTimes(0)
    handleClick.mockClear()

    fireEvent.click(getByRole('link'), { altKey: true })
    expect(handleClick).toBeCalled()
    expect(Router.push).toBeCalledTimes(0)
    handleClick.mockClear()

    fireEvent.click(getByRole('link'), { ctrlKey: true })
    expect(handleClick).toBeCalled()
    expect(Router.push).toBeCalledTimes(0)
    handleClick.mockClear()
  })

  test('앱 전용 쿼리를 추가할 때 기존 쿼리를 보존합니다.', () => {
    const { getByRole } = render(
      <LocalLink
        href="/5b700a4e-4b0f-4266-81db-eb42f834bdd9?regionId=71476976-cf9a-4ae8-a60f-76e6fb26900d"
        target="current"
        noNavbar
      >
        <a>테스트링크</a>
      </LocalLink>,
    )

    expect(getByRole('link').getAttribute('href')).toBe(
      '/hotels/5b700a4e-4b0f-4266-81db-eb42f834bdd9?regionId=71476976-cf9a-4ae8-a60f-76e6fb26900d&_triple_no_navbar=true',
    )
  })
})
