import DirectionsFinder from '@titicaca/directions-finder'
import { Meta, StoryObj } from '@storybook/react'

import {
  eventTrackingProviderDecorator,
  historyProviderDecorator,
  tripleClientMetadataDecorator,
} from '../../decorators'

export default {
  title: 'directions-finder / DirectionsFinder',
  component: DirectionsFinder,
} as Meta

export const Basic: StoryObj = {
  name: 'direction-finder',
  args: {
    primaryName: '도쿄 디즈니 랜드',
    localName: '東京ディズニーランド',
    localAddress: '〒279-0031 東京都千葉県浦安市舞浜11',
    phoneNumber: '+81453305211',
    isDomestic: 'isDomestic',
  },
  decorators: [
    historyProviderDecorator,
    tripleClientMetadataDecorator,
    eventTrackingProviderDecorator,
  ],
}
