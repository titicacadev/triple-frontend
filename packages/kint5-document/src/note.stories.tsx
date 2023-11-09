import type { Meta } from '@storybook/react'

import ELEMENTS from './elements'

const { note: Note } = ELEMENTS

export default { title: 'kint5-document / 노트' } as Meta

export function NoteExample() {
  return (
    <Note
      value={{
        title: '추천 포인트',
        body: `・ 한적한 분위기의 생태 공원
        ・ 일 년 내내 새로운 분위기를 연출하는 계절 꽃`,
      }}
    />
  )
}
