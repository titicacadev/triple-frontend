import StaticMap from '@titicaca/static-map'
import { Meta, StoryObj } from '@storybook/react'

export default {
  title: 'static-map / StaticMap',
  component: StaticMap,
} as Meta

export const Basic: StoryObj = {
  name: '기본',
  args: {
    type: 'attraction',
    lat: 35.6328964,
    lon: 139.8803943,
    markerImage: 'Custom marker image',
  },
}
