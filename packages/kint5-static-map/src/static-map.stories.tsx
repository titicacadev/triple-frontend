import type { Meta, StoryObj } from '@storybook/react'

import StaticMap from './static-map'

export default {
  title: 'kint5-static-map / StaticMap',
  component: StaticMap,
} as Meta<typeof StaticMap>

export const Basic: StoryObj<typeof StaticMap> = {
  args: {
    markerType: 'attraction',
    lat: 35.6328964,
    lon: 139.8803943,
  },
}
