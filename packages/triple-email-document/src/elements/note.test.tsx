import '@testing-library/jest-dom'
import { render } from '@testing-library/react'

import { ELEMENTS } from '../index'

test('노트 Element를 렌더링합니다.', () => {
  const mockeNoteValue = {
    title: '잠깐! 스탑오버(Stopover)란?',
    body: '목적지로 바로 가지 않고, 중간 지점에서 잠시 머무는 단기 체류를 뜻한다. 보통 경유 시간인 3-4시간 정도가 아니라 24시간 이상을 뜻하기 때문에 관광과 숙박이 가능한 것이 특징. 일부 항공사는 스탑오버시 무료 관광을 제공하니 참고할것!',
  }

  const Note = ELEMENTS.note

  const { getByText } = render(<Note value={mockeNoteValue} />)

  const noteTitleElement = getByText(mockeNoteValue.title)
  const noteBodyElement = getByText(mockeNoteValue.body)

  expect(noteTitleElement).toBeInTheDocument()
  expect(noteBodyElement).toBeInTheDocument()
})
