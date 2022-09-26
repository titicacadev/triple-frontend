import { fireEvent, render, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { renderToStaticMarkup } from 'react-dom/server'
import { ReactElement } from 'react'

import {
  TripleFallbackActionRemover,
  TripleFallbackActionScript,
  TRIPLE_FALLBACK_ACTION_CLASS_NAME,
} from '.'

const back = jest.spyOn(history, 'back')

afterEach(() => {
  back.mockClear()
})

test('Fallback Action 클래스를 가진 요소를 클릭하면 페이지를 닫습니다.', () => {
  renderScriptTag(<TripleFallbackActionScript />)

  const { getByText } = render(
    <button className={TRIPLE_FALLBACK_ACTION_CLASS_NAME}>클릭</button>,
  )

  const button = getByText('클릭')

  fireEvent.click(button)

  expect(back).toBeCalled()
})

test('핸들러를 제거하는 컴포넌트를 함께 렌더링하면 페이지를 닫지 않습니다.', async () => {
  renderScriptTag(<TripleFallbackActionScript />)

  const { getByText } = render(
    <>
      <button className={TRIPLE_FALLBACK_ACTION_CLASS_NAME}>클릭</button>
      <TripleFallbackActionRemover />
    </>,
  )

  const button = getByText('클릭')

  await waitFor(() => expect(window.__DISASTER_FALLBACK_HANDLER__).toBe(null))

  fireEvent.click(button)

  expect(back).not.toBeCalled()
})

function renderScriptTag(el: ReactElement) {
  const scriptContainer = document.createElement('div')
  scriptContainer.innerHTML = renderToStaticMarkup(el)
  const script = document.createElement('script')
  script.innerHTML = scriptContainer.getElementsByTagName('script')[0].innerHTML
  document.body.appendChild(script)
}
