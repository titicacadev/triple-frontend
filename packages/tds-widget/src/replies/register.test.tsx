import { PropsWithChildren } from 'react'
import i18n from 'i18next'
import { fireEvent, render, screen } from '@testing-library/react'
import {
  ClientAppName,
  TripleWeb,
  EventTrackingProvider,
} from '@titicaca/triple-web'

import { RepliesProvider } from './context'
import { Register } from './register'

const mockedOnReplyAdd = jest.fn()
const mockedOnReplyEdit = jest.fn()

describe('Reply 등록 버튼을 테스트합니다.', () => {
  test('입력 창에 입력된 값이 없으면 버튼의 글자 색상은 blue500 입니다.', () => {
    render(
      <Register
        resourceId=""
        resourceType="article"
        onReplyAdd={mockedOnReplyAdd}
        onReplyEdit={mockedOnReplyEdit}
      />,
      { wrapper: ReplyWithLoginWrapper },
    )

    const registerButtonElement = screen.getByRole('button', { name: /등록/ })

    expect(registerButtonElement).toHaveStyleRule(
      'color',
      'var(--color-blue500)',
    )
  })

  test('입력 창에 입력된 값이 있으면 버튼의 글자 색상은 blue 입니다.', async () => {
    render(
      <Register
        resourceId=""
        resourceType="article"
        onReplyAdd={mockedOnReplyAdd}
        onReplyEdit={mockedOnReplyEdit}
      />,
      { wrapper: ReplyWithLoginWrapper },
    )

    const textareaElement = screen.getByRole('textbox')

    fireEvent.change(textareaElement, { target: { value: 'Hi' } })

    const registerButtonElement = screen.getByRole('button', { name: /등록/ })

    expect(registerButtonElement).toHaveStyleRule('color', 'var(--color-blue)')
  })
})

function ReplyWithLoginWrapper({ children }: PropsWithChildren<unknown>) {
  return (
    <TripleWeb
      clientAppProvider={{
        metadata: {
          name: ClientAppName.iOS,
          version: '6.5.0',
        },
        device: {
          autoplay: 'always',
          networkType: 'wifi',
        },
      }}
      envProvider={{
        appUrlScheme: 'dev-soto',
        webUrlBase: 'https://triple-dev.titicaca-corp.com',
        facebookAppId: '',
        defaultPageTitle: '',
        defaultPageDescription: '',
        googleMapsApiKey: 'AIzaSyDuSWU_yBwuQzeyRFcTqhyifqNX_8oaXI4',
        afOnelinkId: '',
        afOnelinkPid: '',
        afOnelinkSubdomain: '',
      }}
      sessionProvider={{
        user: null,
      }}
      i18nProvider={{
        i18n,
        lang: 'ko',
      }}
      userAgentProvider={{
        ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;Triple-iOS/6.5.0',
        browser: { name: 'WebKit', version: '605.1.15', major: '605' },
        engine: { name: 'WebKit', version: '605.1.15' },
        os: { name: 'iOS', version: '13.3.1' },
        device: { vendor: 'Apple', model: 'iPhone', type: 'mobile' },
        cpu: { architecture: undefined },
        isMobile: true,
      }}
    >
      <EventTrackingProvider page={{ label: 'test', path: '/test' }} utm={{}}>
        <RepliesProvider>{children}</RepliesProvider>
      </EventTrackingProvider>
    </TripleWeb>
  )
}
