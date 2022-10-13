import { ComponentMeta, ComponentStoryObj } from '@storybook/react'

import NearbyPois from './nearby-pois'

export default {
  title: 'Nearby-Pois / NearbyPois',
  component: NearbyPois,
} as ComponentMeta<typeof NearbyPois>

// TODO: 서버에 데이터가 없어서 mocking 해야 할 듯
export const Basic: ComponentStoryObj<typeof NearbyPois> = {
  args: {
    poiId: 'a86a3f55-9f89-4540-a124-f8c4db07ab34',
    geolocation: {
      type: 'Point',
      coordinates: [125.50129726256557, 34.668727308992935],
    },
    regionId: '71476976-cf9a-4ae8-a60f-76e6fb26900d',
  },
}

export const InitialTab: ComponentStoryObj<typeof NearbyPois> = {
  args: {
    ...Basic.args,
    initialTab: 'restaurant',
  },
}
