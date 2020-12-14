import React from 'react'
import { number, text } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import { ELEMENTS } from '@titicaca/triple-document'

const { tnaProducts: TnaProductList } = ELEMENTS

export default {
  title: 'TripleDocument | TNAProductList',
}

export function Primary() {
  return (
    <TnaProductList
      value={{ slotId: number('slotId', 1530) }}
      onTNAProductsFetch={(slotId: number) =>
        fetch(
          `/api/tna-v2/slots/${slotId}/pois/${text(
            'poiId',
            '6ddcd9ad-741d-42db-b61d-7914cc2e374b',
          )}`,
        )
      }
      onTNAProductClick={action('onTNAProductClick')}
    />
  )
}
Primary.story = { name: '기본' }
