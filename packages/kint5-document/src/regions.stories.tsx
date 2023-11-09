import type { Meta } from '@storybook/react'

import ELEMENTS from './elements'
import MOCK_REGIONS_DATA from './mocks/regions.sample.json'

const { regions: Regions } = ELEMENTS

export default { title: 'kint5-document / 지역' } as Meta

export function RegionsExample() {
  return (
    <Regions
      value={{
        regions: MOCK_REGIONS_DATA,
      }}
    />
  )
}
RegionsExample.storyName = '기본'
