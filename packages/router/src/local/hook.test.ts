import { renderHook } from '@testing-library/react-hooks'
import { useClientContext } from '@titicaca/react-client-interfaces'

import { useAppBridge } from '../common/app-bridge'
import useDefaultRouter from '../common/default-router'
import { useDisabledLinkNotifierCreator } from '../common/disabled-link-notifier'

import { useLocalHrefHandler } from './href-handler'
import { mockNextRouter } from './base-path.test'
import useLocalRouter from './hook'

jest.mock('@titicaca/react-client-interfaces')
jest.mock('../common/app-bridge')
jest.mock('../common/disabled-link-notifier')
jest.mock('../common/default-router')
jest.mock('./href-handler')

beforeEach(() => {
  mockClientHook()
  mockAppBridgeHook()
  mockDisabledLinkNotifierCreatorHook({ shouldRaiseAlert: false })
  mockNextRouter()
})

test('allowSource 파라미터로 허용한 라우팅환경이 아니면 알림을 표시합니다.', async () => {
  const raiseAlert = mockDisabledLinkNotifierCreatorHook({
    shouldRaiseAlert: true,
  })

  const {
    result: { current: routeLocally },
  } = renderHook(useLocalRouter)

  await routeLocally({ href: '', target: 'new', allowSource: 'app' })

  expect(raiseAlert).toBeCalled()
})

test('customRouter가 작동하지 않으면 default Router를 사용합니다.', async () => {
  const defaultRouter = mockDefaultRouterHook()
  const customRouter = mockLocalHrefHandlerHook({
    stopingDefaultHandler: false,
  })

  const {
    result: { current: routeLocally },
  } = renderHook(useLocalRouter)

  await routeLocally({ href: '', target: 'new' })

  expect(customRouter).not.toBeCalled()
  expect(defaultRouter).toBeCalled()
})

test('customRouter가 작동하면 default 라우터가 작동하지 않습니다.', async () => {
  const customRouter = mockLocalHrefHandlerHook({
    stopingDefaultHandler: true,
  })
  const defaultRouter = mockDefaultRouterHook()

  const {
    result: { current: routeLocally },
  } = renderHook(useLocalRouter)

  await routeLocally({ href: '', target: 'new' })

  expect(customRouter).toBeCalled()
  expect(defaultRouter).not.toBeCalled()
})

function mockClientHook({ isPublic = false }: { isPublic?: boolean } = {}) {
  ;(
    useClientContext as unknown as jest.MockedFunction<
      () => ReturnType<typeof useClientContext>
    >
  ).mockImplementation(() =>
    isPublic ? null : { appName: 'Triple-iOS', appVersion: '5.11.0' },
  )
}

function mockAppBridgeHook() {
  const openInlink = jest.fn()
  const openOutlink = jest.fn()

  ;(
    useAppBridge as jest.MockedFunction<typeof useAppBridge>
  ).mockImplementation(() => ({
    openInlink,
    openOutlink,
    openNativeLink: jest.fn(),
  }))
}

function mockDisabledLinkNotifierCreatorHook({
  shouldRaiseAlert,
}: {
  shouldRaiseAlert: boolean
}) {
  const raiseAlert = jest.fn()
  ;(
    useDisabledLinkNotifierCreator as jest.MockedFunction<
      typeof useDisabledLinkNotifierCreator
    >
  ).mockReturnValue(({ allowSource }) => {
    if (allowSource === 'all') {
      return undefined
    }
    return shouldRaiseAlert ? raiseAlert : undefined
  })

  return raiseAlert
}

function mockLocalHrefHandlerHook({
  stopingDefaultHandler = false,
}: { stopingDefaultHandler?: boolean } = {}) {
  const customRouter = jest.fn()

  ;(
    useLocalHrefHandler as jest.MockedFunction<typeof useLocalHrefHandler>
  ).mockReturnValue(({ stopDefaultHandler, ...rest }) => {
    if (stopingDefaultHandler === true) {
      stopDefaultHandler()
      customRouter({ stopDefaultHandler, ...rest })
    }

    return Promise.resolve()
  })

  return customRouter
}

function mockDefaultRouterHook() {
  const defaultRouter = jest.fn()

  ;(
    useDefaultRouter as jest.MockedFunction<typeof useDefaultRouter>
  ).mockReturnValue(defaultRouter)

  return defaultRouter
}
