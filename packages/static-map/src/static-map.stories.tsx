import { ComponentMeta, ComponentStoryObj } from '@storybook/react'

import StaticMap from '.'

export default {
  title: 'static-map / StaticMap',
  component: StaticMap,
} as ComponentMeta<typeof StaticMap>

export const Basic: ComponentStoryObj<typeof StaticMap> = {
  args: {
    type: 'attraction',
    lat: 35.6328964,
    lon: 139.8803943,
  },
}
