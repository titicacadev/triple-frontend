import { ComponentMeta } from '@storybook/react'
import { ELEMENTS } from '@titicaca/triple-email-document'

const { note: Note } = ELEMENTS

export default {
  title: 'Document / triple-email-document / elements',
  component: Note,
  argTypes: {
    value: {
      title: {
        type: 'string',
        require: true,
      },
      body: {
        type: 'string',
        require: true,
      },
    },
  },
} as ComponentMeta<typeof Note>

export const NoteElement = {
  storyName: '노트',
  args: {
    value: {
      title: '잠깐! 스탑오버(Stopover)란?',
      body: '목적지로 바로 가지 않고, 중간 지점에서 잠시 머무는 단기 체류를 뜻한다. 보통 경유 시간인 3-4시간 정도가 아니라 24시간 이상을 뜻하기 때문에 관광과 숙박이 가능한 것이 특징. 일부 항공사는 스탑오버시 무료 관광을 제공하니 참고할것!',
    },
  },
}

NoteElement.storyName = '노트'
