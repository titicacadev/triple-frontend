import type { Meta, StoryObj } from '@storybook/react'

import { MapMarkerIcon } from './map-marker-icon'

export default {
  title: 'kint5-core-elements / Icons / Map Marker icon',
  component: MapMarkerIcon,
} as Meta<typeof MapMarkerIcon>

export const Default: StoryObj<typeof MapMarkerIcon> = {
  render: (args) => <MapMarkerIcon {...args} css={{ width: 24, height: 24 }} />,
  args: {
    color: '#000',
  },
}
