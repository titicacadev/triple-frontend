import '@testing-library/jest-dom'
import React from 'react'
import { useRouter } from 'next/router'
import { fireEvent, render } from '@testing-library/react'
import {
  useSessionAvailability,
  useUserAgentContext,
} from '@titicaca/react-contexts'
import { useLoginCTAModal, useTransitionModal } from '@titicaca/modals'

import { useAppBridge } from '../common/app-bridge'
import { useWebUrlBaseAdder } from '../common/add-web-url-base'

import { LocalLink } from './link'

jest.mock('next/router')
jest.mock('@titicaca/react-contexts')
jest.mock('@titicaca/modals')
jest.mock('../common/app-bridge')
jest.mock('../common/add-web-url-base')

test('주어진 href에 basePath를 더해서 anchor에 제공합니다.', () => {
  const { basePath } = prepareTest()
  const href =
    '/5b700a4e-4b0f-4266-81db-eb42f834bdd9?regionId=71476976-cf9a-4ae8-a60f-76e6fb26900d'

  const { getByRole } = render(
    <LocalLink href={href} target="current">
      <a>테스트링크</a>
    </LocalLink>,
  )

  expect(getByRole('link')).toHaveAttribute('href', `${basePath}${href}`)
})

test('href에 트리플 앱 전용 쿼리를 추가합니다.', () => {
  prepareTest({ isPublic: false })

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

  expect(getByRole('link')).toHaveAttribute(
    'href',
    expect.stringContaining(
      '?_triple_lnb_region_id=71476976-cf9a-4ae8-a60f-76e6fb26900d',
    ),
  )
})

test('키를 누르고 클릭할 때는 next/router를 사용하지 않습니다.', () => {
  const { nextPush } = prepareTest()

  const { getByRole } = render(
    <LocalLink
      href="/5b700a4e-4b0f-4266-81db-eb42f834bdd9?regionId=71476976-cf9a-4ae8-a60f-76e6fb26900d"
      target="current"
    >
      <a>테스트링크</a>
    </LocalLink>,
  )
  const link = getByRole('link')

  fireEvent.click(link, { metaKey: true })
  expect(nextPush).toBeCalledTimes(0)

  fireEvent.click(link, { shiftKey: true })
  expect(nextPush).toBeCalledTimes(0)

  fireEvent.click(link, { altKey: true })
  expect(nextPush).toBeCalledTimes(0)

  fireEvent.click(link, { ctrlKey: true })
  expect(nextPush).toBeCalledTimes(0)
})

test('앱 전용 쿼리를 추가할 때 기존 쿼리를 보존합니다.', () => {
  prepareTest()

  const { getByRole } = render(
    <LocalLink
      href="/5b700a4e-4b0f-4266-81db-eb42f834bdd9?regionId=71476976-cf9a-4ae8-a60f-76e6fb26900d"
      target="current"
      noNavbar
    >
      <a>테스트링크</a>
    </LocalLink>,
  )

  expect(getByRole('link')).toHaveAttribute(
    'href',
    expect.stringContaining('regionId=71476976-cf9a-4ae8-a60f-76e6fb26900d'),
  )
})

test('현재 창에서 이동할 때 next/router를 사용합니다.', () => {
  const { nextPush } = prepareTest()
  const href =
    '/5b700a4e-4b0f-4266-81db-eb42f834bdd9?regionId=71476976-cf9a-4ae8-a60f-76e6fb26900d'

  const { getByRole } = render(
    <LocalLink href={href} target="current">
      <a>테스트링크</a>
    </LocalLink>,
  )
  const link = getByRole('link')

  fireEvent.click(link)

  expect(nextPush).toBeCalledWith(href, undefined, expect.any(Object))
})

test('앱에서 새창으로 이동할 때 inlink를 사용합니다.', () => {
  const { basePath, openInlink } = prepareTest({ isPublic: false })
  const href =
    '/5b700a4e-4b0f-4266-81db-eb42f834bdd9?regionId=71476976-cf9a-4ae8-a60f-76e6fb26900d'

  const { getByRole } = render(
    <LocalLink href={href} target="new">
      <a>테스트링크</a>
    </LocalLink>,
  )
  const link = getByRole('link')

  fireEvent.click(link)

  expect(openInlink).toBeCalledWith(`${basePath}${href}`)
})

test('앱에서 브라우저로 이동할 때 outlink를 사용합니다.', () => {
  const { basePath, webUrlBase, openOutlink } = prepareTest({ isPublic: false })
  const href =
    '/5b700a4e-4b0f-4266-81db-eb42f834bdd9?regionId=71476976-cf9a-4ae8-a60f-76e6fb26900d'

  const { getByRole } = render(
    <LocalLink href={href} target="browser">
      <a>테스트링크</a>
    </LocalLink>,
  )
  const link = getByRole('link')

  fireEvent.click(link)

  expect(openOutlink).toBeCalledWith(
    `${webUrlBase}${basePath}${href}`,
    expect.any(Object),
  )
})

function prepareTest({
  isPublic = true,
  sessionAvailability = false,
}: { isPublic?: boolean; sessionAvailability?: boolean } = {}) {
  const basePath = '/test-env'
  const nextPush = jest.fn()
  const openInlink = jest.fn()
  const openOutlink = jest.fn()
  const showTransitionModal = jest.fn()
  const showLoginCtaModal = jest.fn()
  const webUrlBase = 'https://triple.guide'

  ;(
    useRouter as unknown as jest.MockedFunction<
      () => Pick<ReturnType<typeof useRouter>, 'basePath'>
    >
  ).mockImplementation(() => ({ basePath, push: nextPush }))
  ;(
    useUserAgentContext as unknown as jest.MockedFunction<
      () => Pick<ReturnType<typeof useUserAgentContext>, 'isPublic'>
    >
  ).mockImplementation(() => ({ isPublic }))
  ;(
    useSessionAvailability as jest.MockedFunction<typeof useSessionAvailability>
  ).mockImplementation(() => sessionAvailability)
  ;(
    useTransitionModal as jest.MockedFunction<typeof useTransitionModal>
  ).mockImplementation(() => ({ show: showTransitionModal }))
  ;(
    useLoginCTAModal as jest.MockedFunction<typeof useLoginCTAModal>
  ).mockImplementation(() => ({ show: showLoginCtaModal }))
  ;(
    useAppBridge as jest.MockedFunction<typeof useAppBridge>
  ).mockImplementation(() => ({ openInlink, openOutlink }))
  ;(
    useWebUrlBaseAdder as unknown as jest.MockedFunction<
      typeof useWebUrlBaseAdder
    >
  ).mockImplementation(() => (href) => `${webUrlBase}${href}`)

  return {
    basePath,
    nextPush,
    openInlink,
    openOutlink,
    showTransitionModal,
    showLoginCtaModal,
    webUrlBase,
  }
}
