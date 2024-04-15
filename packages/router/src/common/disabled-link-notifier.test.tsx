/* eslint-disable jest/no-conditional-expect */
/* TODO: jest/no-conditional-expect 해결하기 */
import { act, renderHook, screen } from '@testing-library/react'
import { ClientAppName } from '@titicaca/triple-web'
import { createTestWrapper } from '@titicaca/triple-web-test-utils'

import { useDisabledLinkNotifierCreator } from './disabled-link-notifier'

function createWrapper({
  isPublic,
  sessionAvailable,
}: {
  isPublic: boolean
  sessionAvailable: boolean
}) {
  return createTestWrapper({
    clientAppProvider: isPublic
      ? null
      : {
          device: { autoplay: 'always', networkType: 'unknown' },
          metadata: { name: ClientAppName.iOS, version: '5.13.0' },
        },
    sessionProvider: {
      user: sessionAvailable
        ? {
            name: 'TripleTester',
            provider: 'TRIPLE',
            country: 'ko',
            lang: 'ko',
            unregister: null,
            photo: 'images.source',
            mileage: {
              badges: [{ icon: { imageUrl: '' } }],
              level: 1,
              point: 0,
            },
            uid: 'test',
          }
        : null,
    },
  })
}

describe('allowSource가 "all"일 때 앱 여부, 세션 여부에 상관없이 아무 처리를 하지 않습니다.', () => {
  test.each([
    [true, true],
    [true, false],
    [false, true],
    [false, false],
  ])('isPublic: %s, sessionAvailable: %s', (isPublic, sessionAvailable) => {
    const {
      result: { current: createDisabledLinkNotifier },
    } = renderHook(useDisabledLinkNotifierCreator, {
      wrapper: createWrapper({ isPublic, sessionAvailable }),
    })

    const notifier = createDisabledLinkNotifier({ allowSource: 'all' })

    expect(notifier).toBeUndefined()
  })
})

describe('allowSource가 "app"일 때 앱이 아니면 앱 설치 유도 모달 표시 함수를 호출합니다.', () => {
  test.each([
    [true, true, true],
    [true, false, true],
    // [false, true, false],
    // [false, false, false],
  ])(
    'isPublic: %s, sessionAvailable: %s, 호출 여부: %s',
    (isPublic, sessionAvailable, transitionModalFunctionCalled) => {
      const {
        result: { current: createDisabledLinkNotifier },
      } = renderHook(useDisabledLinkNotifierCreator, {
        wrapper: createWrapper({ isPublic, sessionAvailable }),
      })

      const notifier = createDisabledLinkNotifier({ allowSource: 'app' })

      if (transitionModalFunctionCalled) {
        expect(notifier).toEqual(expect.any(Function))
      } else {
        expect(notifier).toBeUndefined()
      }

      if (notifier) {
        act(() => {
          notifier()
        })
        expect(transitionModalFunctionCalled).toBe(true)
        expect(screen.getByText('여기는 트리플 앱이 필요해요')).toBeVisible()
      } else {
        expect(transitionModalFunctionCalled).toBe(false)

        expect(
          screen.getByText('여기는 트리플 앱이 필요해요'),
        ).not.toBeVisible()
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
  ])(
    'isPublic: %s, sessionAvailable: %s, 호출 함수: %s',
    (isPublic, sessionAvailable, functionType) => {
      const {
        result: { current: createDisabledLinkNotifier },
      } = renderHook(useDisabledLinkNotifierCreator, {
        wrapper: createWrapper({ isPublic, sessionAvailable }),
      })

      const notifier = createDisabledLinkNotifier({
        allowSource: 'app-with-session',
      })

      expect(notifier).toEqual(
        functionType === undefined ? undefined : expect.any(Function),
      )

      if (notifier) {
        act(() => {
          notifier()
        })

        if (functionType === 'showLoginCtaModal') {
          expect(screen.getByText('로그인이 필요합니다.')).toBeVisible()
        } else if (functionType === 'showTransitionModal') {
          expect(screen.getByText('여기는 트리플 앱이 필요해요')).toBeVisible()
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
    const alert = jest.fn()
    const {
      result: { current: createDisabledLinkNotifier },
    } = renderHook(useDisabledLinkNotifierCreator, {
      wrapper: createWrapper({ isPublic, sessionAvailable }),
      initialProps: { alert },
    })

    const notifier = createDisabledLinkNotifier({
      allowSource: 'none',
    })

    expect(notifier).toBeDefined()

    if (notifier) {
      notifier()

      expect(alert).toHaveBeenCalled()
    }
  })
})
