import type { Meta, StoryObj } from '@storybook/react'

import AskToTheLocal from './ask-to-the-local'

export default {
  title: 'kint5-directions-finder / AskToTheLocal',
  component: AskToTheLocal,
} as Meta<typeof AskToTheLocal>

export const Basic: StoryObj<typeof AskToTheLocal> = {
  args: {
    open: true,
    primaryName: '도쿄 디즈니 랜드',
    localName: '東京ディズニーランド',
    localAddress: '〒279-0031 東京都千葉県浦安市舞浜11',
    phoneNumber: '+81453305211',
  },
}
