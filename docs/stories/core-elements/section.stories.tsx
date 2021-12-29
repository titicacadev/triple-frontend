import { Section, SectionProps } from '@titicaca/core-elements'
import { Meta, StoryObj } from '@storybook/react'

export default {
  title: 'Core-Elements / Section',
  component: Section,
} as Meta

export const Basic: StoryObj<SectionProps> = {
  storyName: '일반',
  args: {
    children:
      '기타노 이진칸 거리에 위치한 풍향계의 집은 1900년대에 독일인이 살았던 저택이다. 기타노 지역에서 유일하게 벽돌로 만들어진 건물로, 지붕 꼭대기에 있는 닭 모양의 풍향계가 유명하다. 풍향계의 집 내관은 독일의 전통 양식과 20세기 전후의 아르누보 디자인으로 꾸며져 있다. 실내에는 각종 서양 가구 및 생활용품들과 원래 주인의 가족 사진들이 전시되어 있다.',
    divider: 'none',
  },
}
