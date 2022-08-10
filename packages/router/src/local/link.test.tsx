import '@testing-library/jest-dom'
import 'jest-styled-components'
import { fireEvent, render } from '@testing-library/react'
import { useSessionAvailability } from '@titicaca/react-contexts'
import { useLoginCtaModal, useTransitionModal } from '@titicaca/modals'
import {
  useTripleClientMetadata,
  useTripleClientNavigate,
} from '@titicaca/react-triple-client-interfaces'
import renderer from 'react-test-renderer'
import styled from 'styled-components'

import { useWebUrlBaseAdder } from '../common/add-web-url-base'

import { LocalLink } from './link'

jest.mock('@titicaca/react-contexts')
jest.mock('@titicaca/modals')
jest.mock('@titicaca/react-triple-client-interfaces')
jest.mock('../common/add-web-url-base')

const useRouter = jest.spyOn(require('next/router'), 'useRouter')

test('주어진 href에 basePath를 더해서 anchor에 제공합니다.', () => {
  const { basePath } = prepareTest()
  const href =
    '/5b700a4e-4b0f-4266-81db-eb42f834bdd9?regionId=71476976-cf9a-4ae8-a60f-76e6fb26900d'

  const { getByRole } = render(
    <LocalLink href={href} target="current">
      테스트링크
    </LocalLink>,
  )

  expect(getByRole('link')).toHaveAttribute('href', `${basePath}${href}`)
})

test('키를 누르고 클릭할 때는 next/router를 사용하지 않습니다.', () => {
  const { nextPush } = prepareTest()

  const { getByRole } = render(
    <LocalLink
      href="/5b700a4e-4b0f-4266-81db-eb42f834bdd9?regionId=71476976-cf9a-4ae8-a60f-76e6fb26900d"
      target="current"
    >
      테스트링크
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

test('현재 창에서 이동할 때 next/router를 사용합니다.', () => {
  const { nextPush } = prepareTest()
  const href =
    '/5b700a4e-4b0f-4266-81db-eb42f834bdd9?regionId=71476976-cf9a-4ae8-a60f-76e6fb26900d'

  const { getByRole } = render(
    <LocalLink href={href} target="current">
      테스트링크
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
      테스트링크
    </LocalLink>,
  )
  const link = getByRole('link')

  fireEvent.click(link)

  expect(openInlink).toBeCalledWith(`${basePath}${href}`, expect.any(Object))
})

test('앱에서 브라우저로 이동할 때 outlink를 사용합니다.', () => {
  const { basePath, webUrlBase, openOutlink } = prepareTest({ isPublic: false })
  const href =
    '/5b700a4e-4b0f-4266-81db-eb42f834bdd9?regionId=71476976-cf9a-4ae8-a60f-76e6fb26900d'

  const { getByRole } = render(
    <LocalLink href={href} target="browser">
      테스트링크
    </LocalLink>,
  )
  const link = getByRole('link')

  fireEvent.click(link)

  expect(openOutlink).toBeCalledWith(
    `${webUrlBase}${basePath}${href}`,
    expect.any(Object),
  )
})

test('styled-components로 스타일을 확장할 수 있습니다.', () => {
  prepareTest({ isPublic: true })

  const StyledLocalLink = styled(LocalLink)`
    color: red;
    background-color: green;
    border-radius: 4px;
  `

  const tree = renderer
    .create(<StyledLocalLink href="/foo" target="browser" />)
    .toJSON()

  expect(tree).toHaveStyleRule('color', 'red')
  expect(tree).toHaveStyleRule('background-color', 'green')
  expect(tree).toHaveStyleRule('border-radius', '4px')
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

  useRouter.mockImplementation(() => ({ basePath, push: nextPush }))
  ;(
    useTripleClientMetadata as unknown as jest.MockedFunction<
      () => ReturnType<typeof useTripleClientMetadata>
    >
  ).mockImplementation(() =>
    isPublic ? null : { appName: 'Triple-iOS', appVersion: '5.13.0' },
  )
  ;(
    useSessionAvailability as jest.MockedFunction<typeof useSessionAvailability>
  ).mockImplementation(() => sessionAvailability)
  ;(
    useTransitionModal as jest.MockedFunction<typeof useTransitionModal>
  ).mockImplementation(() => ({ show: showTransitionModal }))
  ;(
    useLoginCtaModal as jest.MockedFunction<typeof useLoginCtaModal>
  ).mockImplementation(() => ({ show: showLoginCtaModal }))
  ;(
    useTripleClientNavigate as jest.MockedFunction<
      typeof useTripleClientNavigate
    >
  ).mockImplementation(() => ({
    openInlink,
    openOutlink,
    openNativeLink: jest.fn(),
  }))
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
