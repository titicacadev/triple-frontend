import type { Meta } from '@storybook/react'

import ELEMENTS from './elements'

const { text: Text } = ELEMENTS

export default { title: 'kint5-document / 텍스트' } as Meta

const exampleTextPlain = `농수산물부터 지역 특산물까지, 속초를 제대로 즐길 수
있는 대형 전통 시장으로 캐노피 시설을 설치하고 깨끗
하게 새단장 하였으며, 쇼핑카트도 제공해 비가 와도 
걱정 없이 즐겁게 쇼핑할 수 있습니다.
`

const exampleTextRawHtml = `<strong>볼드 텍스트</strong>일반 텍스트<a href="https://triple.guide">링크 라벨</a>`

export function PlainTextExample() {
  return (
    <Text
      value={{
        text: exampleTextPlain,
      }}
    />
  )
}
PlainTextExample.storyName = 'text - plain'

export function RawHtmlTextExample() {
  return (
    <Text
      value={{
        rawHTML: exampleTextRawHtml,
      }}
    />
  )
}
RawHtmlTextExample.storyName = 'text - raw HTML'
