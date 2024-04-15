import { fireEvent, render, screen } from '@testing-library/react'
import { ClientAppName } from '@titicaca/triple-web'
import { createTestWrapper } from '@titicaca/triple-web-test-utils'

import { RepliesProvider } from './context'
import { Register } from './register'

const mockedOnReplyAdd = jest.fn()
const mockedOnReplyEdit = jest.fn()

describe('Reply 등록 버튼을 테스트합니다.', () => {
  test('입력 창에 입력된 값이 없으면 버튼의 글자 색상은 blue500 입니다.', () => {
    render(
      <RepliesProvider>
        <Register
          resourceId=""
          resourceType="article"
          onReplyAdd={mockedOnReplyAdd}
          onReplyEdit={mockedOnReplyEdit}
        />
      </RepliesProvider>,
      {
        wrapper: createTestWrapper({
          clientAppProvider: {
            metadata: { name: ClientAppName.iOS, version: '6.5.0' },
            device: { autoplay: 'always', networkType: 'wifi' },
          },
        }),
      },
    )

    const registerButtonElement = screen.getByRole('button', { name: /등록/ })

    expect(registerButtonElement).toHaveStyleRule(
      'color',
      'var(--color-blue500)',
    )
  })

  test('입력 창에 입력된 값이 있으면 버튼의 글자 색상은 blue 입니다.', async () => {
    render(
      <RepliesProvider>
        <Register
          resourceId=""
          resourceType="article"
          onReplyAdd={mockedOnReplyAdd}
          onReplyEdit={mockedOnReplyEdit}
        />
      </RepliesProvider>,
      {
        wrapper: createTestWrapper({
          clientAppProvider: {
            metadata: { name: ClientAppName.iOS, version: '6.5.0' },
            device: { autoplay: 'always', networkType: 'wifi' },
          },
        }),
      },
    )

    const textareaElement = screen.getByRole('textbox')

    fireEvent.change(textareaElement, { target: { value: 'Hi' } })

    const registerButtonElement = screen.getByRole('button', { name: /등록/ })

    expect(registerButtonElement).toHaveStyleRule('color', 'var(--color-blue)')
  })
})
