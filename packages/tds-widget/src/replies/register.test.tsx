import { fireEvent, render, screen } from '@testing-library/react'
import { TripleWeb } from '@titicaca/triple-web'
import { PropsWithChildren } from 'react'

import { RepliesProvider } from './context'
import Register from './register'

describe('Reply 등록 버튼을 테스트합니다.', () => {
  test('입력 창에 입력된 값이 없으면 버튼의 글자 색상은 blue500 입니다.', () => {
    const mockedOnReplyAdd = jest.fn()
    const mockedOnReplyEdit = jest.fn()

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
    const mockedOnReplyAdd = jest.fn()
    const mockedOnReplyEdit = jest.fn()

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
      envProvider={{
        appUrlScheme: '',
        webUrlBase: '',
        facebookAppId: '',
        defaultPageTitle: '',
        defaultPageDescription: '',
        googleMapsApiKey: '',
        afOnelinkId: '',
        afOnelinkPid: '',
        afOnelinkSubdomain: '',
      }}
      sessionProvider={{
        user: null,
      }}
    >
      <RepliesProvider>{children}</RepliesProvider>
    </TripleWeb>
  )
}
