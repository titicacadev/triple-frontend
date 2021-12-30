import { CsFooter } from '@titicaca/footer'
import { Meta, StoryObj } from '@storybook/react'

import { sessionContextProviderDecorator } from '../../decorators'

export default {
  title: 'footer / Footer',
  component: CsFooter,
  decorators: [sessionContextProviderDecorator],
} as Meta

export const Basic: StoryObj = {
  storyName: 'CS 푸터',
  args: {
    service: 'AIR',
    csTime: '오전 9시 - 오후 6시 (한국시간 기준, 연중무휴)',
    csMessage:
      '현지사용 긴급문의 카카오톡 @트리플서비스\n(오전 9시 - 오후 10시)',
    showCSButton: true,
  },
}
