import { renderHook } from '@testing-library/react-hooks'
import { useLoginCtaModal, useTransitionModal } from '@titicaca/modals'
import { useSessionAvailability } from '@titicaca/react-contexts'
import { useTripleClientMetadata } from '@titicaca/react-triple-client-interfaces'

import { useDisabledLinkNotifierCreator } from './disabled-link-notifier'

jest.mock('@titicaca/modals')
jest.mock('@titicaca/react-contexts')
jest.mock('@titicaca/react-triple-client-interfaces')

describe('allowSource가 "all"일 때 앱 여부, 세션 여부에 상관없이 아무 처리를 하지 않습니다.', () => {
  test.each([
    [true, true],
    [true, false],
    [false, true],
    [false, false],
  ])('isPublic: %s, sessionAvailable: %s', (isPublic, sessionAvailable) => {
    prepareTest({ isPublic, sessionAvailable })

    const {
      result: { current: createDisabledLinkNotifier },
    } = renderHook(useDisabledLinkNotifierCreator)

    const notifier = createDisabledLinkNotifier({ allowSource: 'all' })

    expect(notifier).toBe(undefined)
  })
})

describe('allowSource가 "app"일 때 앱이 아니면 앱 설치 유도 모달 표시 함수를 호출합니다.', () => {
  test.each([
    [true, true, true],
    [true, false, true],
    [false, true, false],
    [false, false, false],
  ])(
    'isPublic: %s, sessionAvailable: %s, 호출 여부: %s',
    (isPublic, sessionAvailable, transitionModalFunctionCalled) => {
      const { showTransitionModal } = prepareTest({
        isPublic,
        sessionAvailable,
      })

      const {
        result: { current: createDisabledLinkNotifier },
      } = renderHook(useDisabledLinkNotifierCreator)

      const notifier = createDisabledLinkNotifier({ allowSource: 'app' })

      expect(notifier).toEqual(
        transitionModalFunctionCalled ? expect.any(Function) : undefined,
      )

      if (notifier) {
        notifier()

        expect(transitionModalFunctionCalled).toBe(true)
        expect(showTransitionModal).toBeCalled()
      }
    },
  )
})

describe('allowSource가 "app-with-session"일 때 앱이 아니면 앱 설치 유도 모달을, 인증 정보가 없으면 로그인 유도 모달을 표시함수를 호출합니다.', () => {
  test.each([
    [true, true, 'showTransitionModal'],
    [true, false, 'showTransitionModal'],
    [false, true, undefined],
    [false, false, 'showLoginCtaModal'],
  ] as const)(
    'isPublic: %s, sessionAvailable: %s, 호출 함수: %s',
    (
      isPublic,
      sessionAvailable,
      functionType: 'showTransitionModal' | 'showLoginCtaModal' | undefined,
    ) => {
      const fns = prepareTest({ isPublic, sessionAvailable })

      const {
        result: { current: createDisabledLinkNotifier },
      } = renderHook(useDisabledLinkNotifierCreator)

      const notifier = createDisabledLinkNotifier({
        allowSource: 'app-with-session',
      })

      expect(notifier).toEqual(
        functionType === undefined ? undefined : expect.any(Function),
      )

      if (notifier) {
        expect(functionType).not.toBe(undefined)

        notifier()

        if (functionType) {
          expect(fns[functionType]).toBeCalled()
        }
      }
    },
  )
})

describe('allowSource가 "none"이면 항상 알림을 표시합니다.', () => {
  test.each([
    [true, true],
    [true, false],
    [false, true],
    [false, false],
  ])('isPublic: %s, sessionAvailable: %s', (isPublic, sessionAvailable) => {
    prepareTest({ isPublic, sessionAvailable })

    const alert = jest.fn()
    const {
      result: { current: createDisabledLinkNotifier },
    } = renderHook(useDisabledLinkNotifierCreator, {
      initialProps: { alert },
    })

    const notifier = createDisabledLinkNotifier({
      allowSource: 'none',
    })

    expect(notifier).not.toBe(undefined)

    if (notifier) {
      notifier()

      expect(alert).toBeCalled()
    }
  })
})

function prepareTest({
  isPublic,
  sessionAvailable,
}: {
  isPublic: boolean
  sessionAvailable: boolean
}) {
  ;(
    useTripleClientMetadata as unknown as jest.MockedFunction<
      () => ReturnType<typeof useTripleClientMetadata>
    >
  ).mockImplementation(() =>
    isPublic ? null : { appName: 'Triple-iOS', appVersion: '5.13.0' },
  )
  ;(
    useSessionAvailability as jest.MockedFunction<typeof useSessionAvailability>
  ).mockImplementation(() => sessionAvailable)

  const showTransitionModal = jest.fn()
  const showLoginCtaModal = jest.fn()

  ;(
    useTransitionModal as jest.MockedFunction<typeof useTransitionModal>
  ).mockImplementation(() => ({ show: showTransitionModal }))
  ;(
    useLoginCtaModal as jest.MockedFunction<typeof useLoginCtaModal>
  ).mockImplementation(() => ({ show: showLoginCtaModal }))

  return { showTransitionModal, showLoginCtaModal }
}
