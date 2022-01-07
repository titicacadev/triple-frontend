import '@testing-library/jest-dom'
import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import {
  useSessionAvailability,
  useUserAgentContext,
} from '@titicaca/react-contexts'

import { useAppBridge } from '../common/app-bridge'
import { useWebUrlBaseAdder } from '../common/add-web-url-base'
import { useOnClientRequired } from '../common/on-client-required'
import { useOnSessionRequired } from '../common/on-session-required'

import { ExternalLink } from './link'

jest.mock('@titicaca/react-contexts')
jest.mock('../common/app-bridge')
jest.mock('../common/add-web-url-base')
jest.mock('../common/on-client-required')
jest.mock('../common/on-session-required')

const ABSOLUTE_URL = 'https://www.google.com'
const TRIPLE_URL = '/articles'

test('주어진 href를 가진 anchor 태그를 렌더링합니다.', () => {
  prepareTest()
  const href = 'https://www.google.com'

  const { queryByRole } = render(
    <ExternalLink href={href} target="current">
      <a>테스트링크</a>
    </ExternalLink>,
  )

  const anchor = queryByRole('link')
  expect(anchor).not.toBe(null)
  expect(anchor).toHaveAttribute('href', href)
})

test('절대 경로를 사용할 때는 anchor의 rel 속성에 "external"을 추가합니다.', () => {
  prepareTest()
  const href = 'https://www.google.com'

  const { queryByRole } = render(
    <ExternalLink href={href} target="current">
      <a>테스트링크</a>
    </ExternalLink>,
  )

  const anchor = queryByRole('link')
  expect(anchor).toHaveAttribute('rel', expect.stringContaining('external'))
})

describe('앱에서 절대 경로를 현재 창에서 열도록 설정했을 때', () => {
  test('onError prop을 호출합니다.', () => {
    prepareTest({ isPublic: false })
    const handleError = jest.fn()

    render(
      <ExternalLink href={ABSOLUTE_URL} target="current" onError={handleError}>
        <a>테스트링크</a>
      </ExternalLink>,
    )

    expect(handleError).toBeCalled()
  })

  test('링크를 렌더링하지 않습니다.', () => {
    prepareTest({ isPublic: false })

    const { queryByRole } = render(
      <ExternalLink href={ABSOLUTE_URL} target="current">
        <a>테스트링크</a>
      </ExternalLink>,
    )

    expect(queryByRole('link')).toBe(null)
  })
})

test('앱에서 절대 경로 URL을 새 창으로 열면 outlink를 사용합니다.', () => {
  const { openOutlink } = prepareTest({ isPublic: false })

  const { queryByRole } = render(
    <ExternalLink href={ABSOLUTE_URL} target="new">
      <a>테스트링크</a>
    </ExternalLink>,
  )

  const link = queryByRole('link')

  if (link === null) {
    throw new Error('링크가 없습니다.')
  }

  fireEvent.click(link)

  expect(openOutlink).toBeCalledWith(ABSOLUTE_URL, expect.any(Object))
})

test('앱에서 트리플 URL을 새 창으로 열면 inlink를 사용합니다.', () => {
  const { openInlink } = prepareTest({ isPublic: false })

  const { queryByRole } = render(
    <ExternalLink href={TRIPLE_URL} target="new">
      <a>테스트링크</a>
    </ExternalLink>,
  )

  const link = queryByRole('link')

  if (link === null) {
    throw new Error('링크가 없습니다.')
  }

  fireEvent.click(link)

  expect(openInlink).toBeCalledWith(TRIPLE_URL, expect.any(Object))
})

describe('앱에서 브라우저로 열면 outlink를 사용합니다.', () => {
  test('절대 경로 URL은 그대로 사용합니다.', () => {
    const { openOutlink } = prepareTest({ isPublic: false })

    const { queryByRole } = render(
      <ExternalLink href={ABSOLUTE_URL} target="browser">
        <a>테스트링크</a>
      </ExternalLink>,
    )

    const link = queryByRole('link')

    if (link === null) {
      throw new Error('링크가 없습니다.')
    }

    fireEvent.click(link)

    expect(openOutlink).toBeCalledWith(
      ABSOLUTE_URL,
      expect.objectContaining({ target: 'browser' }),
    )
  })

  test('트리플 URL은 앞에 트리플 URL base를 붙여줍니다.', () => {
    const { openOutlink, webUrlBase } = prepareTest({ isPublic: false })

    const { queryByRole } = render(
      <ExternalLink href={TRIPLE_URL} target="browser">
        <a>테스트링크</a>
      </ExternalLink>,
    )

    const link = queryByRole('link')

    if (link === null) {
      throw new Error('링크가 없습니다.')
    }

    fireEvent.click(link)

    expect(openOutlink).toBeCalledWith(
      `${webUrlBase}${TRIPLE_URL}`,
      expect.objectContaining({ target: 'browser' }),
    )
  })
})

function prepareTest({
  isPublic = true,
  sessionAvailability = false,
}: { isPublic?: boolean; sessionAvailability?: boolean } = {}) {
  const openInlink = jest.fn()
  const openOutlink = jest.fn()
  const onClientRequired = jest.fn()
  const onSessionRequired = jest.fn()
  const webUrlBase = 'https://triple.guide'

  ;(
    useUserAgentContext as unknown as jest.MockedFunction<
      () => Pick<ReturnType<typeof useUserAgentContext>, 'isPublic'>
    >
  ).mockImplementation(() => ({ isPublic }))
  ;(
    useAppBridge as jest.MockedFunction<typeof useAppBridge>
  ).mockImplementation(() => ({
    openInlink,
    openOutlink,
    openNativeLink: jest.fn(),
  }))
  ;(
    useSessionAvailability as jest.MockedFunction<typeof useSessionAvailability>
  ).mockImplementation(() => sessionAvailability)
  ;(
    useOnClientRequired as jest.MockedFunction<typeof useOnClientRequired>
  ).mockReturnValue(onClientRequired)
  ;(
    useOnSessionRequired as jest.MockedFunction<typeof useOnSessionRequired>
  ).mockReturnValue(onSessionRequired)
  ;(
    useWebUrlBaseAdder as unknown as jest.MockedFunction<
      typeof useWebUrlBaseAdder
    >
  ).mockImplementation(() => (href) => `${webUrlBase}${href}`)

  return {
    openInlink,
    openOutlink,
    onClientRequired,
    onSessionRequired,
    webUrlBase,
  }
}
