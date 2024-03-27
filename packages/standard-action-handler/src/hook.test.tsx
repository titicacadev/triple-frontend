import { renderHook } from '@testing-library/react'
import { ClientAppName, TestWrapper } from '@titicaca/triple-web'

import Handler from './handler'
import { useStandardActionHandler } from './hook'

jest.mock('@titicaca/router', () => ({
  useNavigate: jest.fn().mockImplementation(() => jest.fn()),
  useOpenInlink: jest.fn(),
  useOpenOutlink: jest.fn(),
}))
jest.mock('./handler')

test('useStandardAction hook 실행 시 Handler가 호출됩니다.', () => {
  const handlerSpy = jest.spyOn(Handler.prototype, 'toFunction')

  renderHook(() => useStandardActionHandler(), {
    wrapper: TestWrapper({
      clientAppProvider: {
        device: { autoplay: 'always', networkType: 'unknown' },
        metadata: { name: ClientAppName.iOS, version: '6.5.0' },
      },
      userAgentProvider: {
        ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;Triple-iOS/6.5.0',
        browser: { name: 'WebKit', version: '605.1.15', major: '605' },
        engine: { name: 'WebKit', version: '605.1.15' },
        os: { name: 'iOS', version: '13.3.1' },
        device: { vendor: 'Apple', model: 'iPhone', type: 'mobile' },
        cpu: { architecture: undefined },
        isMobile: true,
      },
    }),
  })

  expect(Handler).toHaveBeenCalled()
  expect(handlerSpy).toHaveBeenCalled()
})
