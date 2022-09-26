import { fireEvent, render } from '@testing-library/react'
import '@testing-library/jest-dom'

import { RouterGuardedLink } from './router-guarded-link'
import { useDisabledLinkNotifierCreator } from './disabled-link-notifier'

jest.mock('../common/disabled-link-notifier')

afterEach(() => {
  ;(
    useDisabledLinkNotifierCreator as jest.MockedFunction<
      typeof useDisabledLinkNotifierCreator
    >
  ).mockClear()
})

describe('라우팅할 수 없는 환경일 때', () => {
  let notifier: (() => void) | undefined

  beforeEach(() => {
    notifier = mockDisabledLinkNotifierCreatorHook(true)
  })

  test('버튼을 렌더링합니다.', () => {
    const { getByRole } = render(
      <RouterGuardedLink href="">테스트링크</RouterGuardedLink>,
    )

    expect(getByRole('button')).toBeTruthy()
  })

  test('클릭하면 disabled link notifier를 호출합니다.', () => {
    const { getByRole } = render(
      <RouterGuardedLink href="">테스트링크</RouterGuardedLink>,
    )

    const button = getByRole('button')

    fireEvent.click(button)

    expect(notifier).toBeCalled()
  })

  test('className prop을 전달합니다.', () => {
    const className = 'TEST_CLASS_NAME'
    const { getByRole } = render(
      <RouterGuardedLink href="" className={className}>
        테스트링크
      </RouterGuardedLink>,
    )

    const button = getByRole('button')

    expect(button).toHaveAttribute('class', expect.stringContaining(className))
  })
})

describe('라우팅할 수 있는 환경일 때', () => {
  beforeEach(() => {
    mockDisabledLinkNotifierCreatorHook(false)
  })

  test('앵커 태그를 렌더링합니다.', () => {
    const { getByRole } = render(
      <RouterGuardedLink href="/foo">테스트링크</RouterGuardedLink>,
    )

    const link = getByRole('link')

    expect(link).toBeTruthy()
  })

  test('className prop을 클래스로 전달합니다.', () => {
    const className = 'TEST_CLASS_NAME'
    const { getByRole } = render(
      <RouterGuardedLink href="/foo" className={className}>
        테스트링크
      </RouterGuardedLink>,
    )

    const link = getByRole('link')

    expect(link).toHaveAttribute('class', expect.stringContaining(className))
  })

  test('relList prop을 rel로 전달합니다.', () => {
    const relList: Parameters<typeof RouterGuardedLink>[0]['relList'] = [
      'external',
    ]

    const { getByRole } = render(
      <RouterGuardedLink href="/foo" relList={relList}>
        테스트링크
      </RouterGuardedLink>,
    )

    const link = getByRole('link')

    expect(link).toHaveAttribute('rel', expect.stringContaining('external'))
  })
})

function mockDisabledLinkNotifierCreatorHook(disabled: boolean) {
  if (disabled) {
    const notifier = jest.fn()

    ;(
      useDisabledLinkNotifierCreator as jest.MockedFunction<
        typeof useDisabledLinkNotifierCreator
      >
    ).mockReturnValue(() => notifier)

    return notifier
  }

  ;(
    useDisabledLinkNotifierCreator as jest.MockedFunction<
      typeof useDisabledLinkNotifierCreator
    >
  ).mockReturnValue(() => undefined)
}
