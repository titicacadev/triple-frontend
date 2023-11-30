import type { Meta, StoryObj } from '@storybook/react'

import { FoldableComment } from './index'

export default {
  title: 'kint5-review / FoldableComment',
  component: FoldableComment,
} as Meta<typeof FoldableComment>

export const Default: StoryObj<typeof FoldableComment> = {
  args: {
    comment:
      '은은한 조명들로 인해 운치 있는 분위기 가득했고 입장 후 제일 먼저 보이는건 경복궁 근정전입니다. 낮에 방문했을 때와는 또다른 매력의 야간개장! 강추에용~!! 포토존이 많아서 한복 입고 오시는 분들도 많고 커플끼리 데이트 온 사람들도 많아 보였어요. 은은한 조명들로 인해 운치 있는 분위기 가득했고 입장 후 제일 먼저 보이는건 경복궁 근정전입니다. 낮에 방문했을 때와는 또다른 매력의 야간개장! 강추에용~!! 포토존이 많아서 한복 입고 오시는 분들도 많고 커플끼리 데이트 온 사람들도 많아 보였어요. 은은한 조명들로 인해 운치 있는 분위기 가득했고 입장 후 제일 먼저 보이는건 경복궁 근정전입니다. 낮에 방문했을 때와는 또다른 매력의 야간개장! 강추에용~!! 포토존이 많아서 한복 입고 오시는 분들도 많고 커플끼리 데이트 온 사람들도 많아 보였어요.',
    hasImage: false,
    maxCommentLines: 1,
    unfoldTextCss: { color: 'var(--color-kint5-gray60)' },
  },
}
