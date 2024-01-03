import { ClientAppName } from '@titicaca/triple-web'

import newWindow from './new-window'

describe('인앱 환경에서', () => {
  test('host가 있을 때 클릭할 경우, 외부 페이지로 엽니다.', () => {
    const href = 'https://triple.guide/'
    const openInlinkMockFn = jest.fn()
    const openOutlinkMockFn = jest.fn()

    newWindow({
      url: {
        path: '/web-action/new-window',
        query: `href=${encodeURIComponent(href)}`,
      },
      options: {
        openInlink: openInlinkMockFn,
        openOutlink: openOutlinkMockFn,
        app: {
          device: { autoplay: 'always', networkType: 'unknown' },
          metadata: { name: ClientAppName.iOS, version: '6.5.0' },
        },
      },
    })

    expect(openOutlinkMockFn).toHaveBeenCalled()
  })

  test('host가 없을 때 클릭할 경우, 내부 페이지로 엽니다.', () => {
    const href = '/articles'
    const openInlinkMockFn = jest.fn()
    const openOutlinkMockFn = jest.fn()

    newWindow({
      url: {
        path: '/web-action/new-window',
        query: `href=${encodeURIComponent(href)}`,
      },
      options: {
        openInlink: openInlinkMockFn,
        openOutlink: openOutlinkMockFn,
        app: {
          device: { autoplay: 'always', networkType: 'unknown' },
          metadata: { name: ClientAppName.iOS, version: '6.5.0' },
        },
      },
    })

    expect(openInlinkMockFn).toHaveBeenCalled()
  })
})

describe('브라우저 환경에서', () => {
  test('클릭할 경우, 새 창을 엽니다.', () => {
    const href = 'https://triple.guide/'
    const openInlinkMockFn = jest.fn()
    const openOutlinkMockFn = jest.fn()

    window.open = jest.fn()

    newWindow({
      url: {
        path: '/web-action/new-window',
        query: `href=${encodeURIComponent(href)}`,
      },
      options: {
        openInlink: openInlinkMockFn,
        openOutlink: openOutlinkMockFn,
        app: null,
      },
    })

    expect(window.open).toHaveBeenCalledWith(href, '_blank')
  })
})
