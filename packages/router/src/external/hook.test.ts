import { renderHook } from '@testing-library/react-hooks'
import { useUserAgentContext } from '@titicaca/react-contexts'
import { useAppBridge } from '@titicaca/react-triple-client-interfaces'

import { useDisabledLinkNotifierCreator } from '../common/disabled-link-notifier'
import useDefaultRouter from '../common/default-router'

import useExternalRouter from './hook'
import { useExternalHrefHandler } from './href-handler'

jest.mock('@titicaca/react-contexts')
jest.mock('../common/app-specific-link-options')
jest.mock('@titicaca/react-triple-client-interfaces')
jest.mock('../common/add-web-url-base')
jest.mock('../common/disabled-link-notifier')
jest.mock('../common/default-router')
jest.mock('./href-handler')

beforeEach(() => {
  mockUserAgentHook()
  mockAppBridgeHook()
  mockDisabledLinkNotifierCreatorHook({
    shouldRaiseAlert: false,
  })
})

test('allowSource 파라미터로 허용한 라우팅 환경이 아니면 알림을 표시합니다.', () => {
  const raiseAlert = mockDisabledLinkNotifierCreatorHook({
    shouldRaiseAlert: true,
  })

  const {
    result: { current: routeExternally },
  } = renderHook(useExternalRouter)

  routeExternally({ href: '', target: 'new', allowSource: 'app' })

  expect(raiseAlert).toBeCalled()
})

test('customRouter가 작동하지 않으면 default Router를 사용합니다.', () => {
  const customRouter = mockExternalHrefHandlerHook({
    stopingDefaultHandler: false,
  })
  const defaultRouter = mockDefaultRouterHook()

  const {
    result: { current: routeExternally },
  } = renderHook(useExternalRouter)

  routeExternally({ href: '', target: 'new' })

  expect(customRouter).not.toBeCalled()
  expect(defaultRouter).toBeCalled()
})

test('customRouter가 작동하면 default 라우터가 작동하지 않습니다.', () => {
  const customRouter = mockExternalHrefHandlerHook({
    stopingDefaultHandler: true,
  })
  const defaultRouter = mockDefaultRouterHook()

  const {
    result: { current: routeExternally },
  } = renderHook(useExternalRouter)

  routeExternally({ href: '', target: 'new' })

  expect(customRouter).toBeCalled()
  expect(defaultRouter).not.toBeCalled()
})

function mockUserAgentHook({ isPublic = false }: { isPublic?: boolean } = {}) {
  ;(
    useUserAgentContext as unknown as jest.MockedFunction<
      () => Pick<ReturnType<typeof useUserAgentContext>, 'isPublic'>
    >
  ).mockImplementation(() => ({ isPublic }))
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

function mockExternalHrefHandlerHook({
  stopingDefaultHandler = false,
}: { stopingDefaultHandler?: boolean } = {}) {
  const customRouter = jest.fn()

  ;(
    useExternalHrefHandler as jest.MockedFunction<typeof useExternalHrefHandler>
  ).mockReturnValue(({ stopDefaultHandler, ...rest }) => {
    if (stopingDefaultHandler === true) {
      stopDefaultHandler()
      customRouter({ stopDefaultHandler, ...rest })
    }
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
