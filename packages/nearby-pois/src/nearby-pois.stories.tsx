import { ComponentMeta, ComponentStoryObj } from '@storybook/react'

import NearbyPois from './nearby-pois'

export default {
  title: 'Nearby-Pois / NearbyPois',
  component: NearbyPois,
} as ComponentMeta<typeof NearbyPois>

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

// Basic과 동일한데 히스토리를 모르겠음
// export const WithRecommended: ComponentStoryObj<typeof NearbyPois> = {
//   args: {
//     poiId: 'a86a3f55-9f89-4540-a124-f8c4db07ab34',
//     geolocation: {
//       type: 'Point',
//       coordinates: [125.50129726256557, 34.668727308992935],
//     },
//     regionId: '71476976-cf9a-4ae8-a60f-76e6fb26900d',
//   },
// }
