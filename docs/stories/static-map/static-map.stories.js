import React from 'react'
import StaticMap from '@titicaca/static-map'
import { number, select, text } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

export default {
  title: 'static-map / StaticMap',
  component: StaticMap,
}

export const Basic = () => {
  return (
    <StaticMap
      type={select(
        'Marker type',
        ['attraction', 'restaurant', 'hotel', undefined],
        'attraction',
      )}
      lat={number('Latitude', 35.6328964)}
      lon={number('Longitude', 139.8803943)}
      onClick={action('onClick')}
      markerImage={text('Custom marker image')}
    />
  )
}
Basic.storyName = '기본'
