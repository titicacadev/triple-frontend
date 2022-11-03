import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ImageBubble } from '../image'

import { MEDIA_ARGS, SAMPLE_IMAGES } from './constants'

export default {
  title: 'chat / ImageBubble',
  argTypes: {
    onClick: { action: 'clicked' },
  },
} as ComponentMeta<typeof ImageBubble>

export const Primary: ComponentStory<typeof ImageBubble> = (args) => {
  return <ImageBubble {...args} />
}

// https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/70c9db60-cd42-49c3-b6a8-274318695cc2

Primary.storyName = '기본'
Primary.args = {
  ...MEDIA_ARGS,
  imageInfos: SAMPLE_IMAGES,
  isRichBubble: false,
}
