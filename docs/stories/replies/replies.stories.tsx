import React from 'react'
import { action } from '@storybook/addon-actions'

import Replies from '../../../packages/replies'
import { reply as repliesData } from '../__mocks__/replies.sample.json'

export default {
  title: 'Replies',
}

export function RepliesStory() {
  return (
    <Replies
      replies={repliesData}
      customOnClick={action('onClick 적용된 아이콘, 버튼 클릭')}
    />
  )
}

RepliesStory.storyName = '기본 댓글'
