import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { ReactElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

import {
  TRIPLE_FALLBACK_ACTION_CLASS_NAME,
  TripleFallbackActionRemover,
  TripleFallbackActionScript,
} from '.'

const back = jest.spyOn(history, 'back')

afterEach(() => {
  back.mockClear()
})

test('Fallback Action 클래스를 가진 요소를 클릭하면 페이지를 닫습니다.', () => {
  renderScriptTag(<TripleFallbackActionScript />)

  render(<button className={TRIPLE_FALLBACK_ACTION_CLASS_NAME}>클릭</button>)

  const button = screen.getByText('클릭')

  fireEvent.click(button)

  expect(back).toHaveBeenCalled()
})

test('핸들러를 제거하는 컴포넌트를 함께 렌더링하면 페이지를 닫지 않습니다.', async () => {
  renderScriptTag(<TripleFallbackActionScript />)

  render(
    <>
      <button className={TRIPLE_FALLBACK_ACTION_CLASS_NAME}>클릭</button>
      <TripleFallbackActionRemover />
    </>,
  )

  const button = screen.getByText('클릭')

  await waitFor(() => expect(window.__DISASTER_FALLBACK_HANDLER__).toBeNull())

  fireEvent.click(button)

  expect(back).not.toHaveBeenCalled()
})

function renderScriptTag(el: ReactElement) {
  const scriptContainer = document.createElement('div')
  scriptContainer.innerHTML = renderToStaticMarkup(el)
  const script = document.createElement('script')
  // eslint-disable-next-line testing-library/no-node-access
  script.innerHTML = scriptContainer.getElementsByTagName('script')[0].innerHTML
  document.body.appendChild(script)
}
