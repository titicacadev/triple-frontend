import React from 'react'
import { storiesOf } from '@storybook/react'
import StaticMap from '@titicaca/static-map'
import { number, select, text } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

storiesOf('static-map | StaticMap', module).add('기본', () => {
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
})
