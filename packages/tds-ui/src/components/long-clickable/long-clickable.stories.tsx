import { StoryObj } from '@storybook/react'

import { Container } from '../container'
import { HR1 } from '../hr'

import { longClickable } from './long-clickable'

const meta = {
  title: 'tds-ui / longClickable',
  component: longClickable,
  parameters: {
    docs: {
      description: {
        component:
          '특정 컴포넌트에 롱탭 이벤트를 적용해야할 경우 사용하는 HOC입니다.\n * 터치 기능을 갖춘 모바일 기기에서 사용가능합니다. \n * 관련 PR: [TF #597](https://github.com/titicacadev/triple-frontend/pull/597)\n * 관련 이슈: [LongClick을 지원하는 HoC를 추가합니다.](https://github.com/titicacadev/triple-frontend/issues/596)',
      },
    },
  },
}

export default meta

export const LongClickable: StoryObj<typeof longClickable> = {
  render: () => {
    const LongClickableContainer = longClickable(Container)

    const handleLongClick = () => {}

    return (
      <>
        <LongClickableContainer onLongClick={handleLongClick}>
          롱탭이 적용된 텍스트
        </LongClickableContainer>

        <HR1 />

        <LongClickableContainer>
          롱탭이 적용되지 않은 텍스트
        </LongClickableContainer>
      </>
    )
  },
}
