import { ComponentMeta, ComponentStoryObj } from '@storybook/react'

import DirectionsFinder from '.'

export default {
  title: 'directions-finder / DirectionsFinder',
  component: DirectionsFinder,
} as ComponentMeta<typeof DirectionsFinder>

export const Basic: ComponentStoryObj<typeof DirectionsFinder> = {
  args: {
    primaryName: '도쿄 디즈니 랜드',
    localName: '東京ディズニーランド',
    localAddress: '〒279-0031 東京都千葉県浦安市舞浜11',
    phoneNumber: '+81453305211',
  },
}
