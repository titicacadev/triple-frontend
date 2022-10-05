import { Meta } from '@storybook/react'

import SLOTS from './mocks/slots.sample.json'
import ELEMENTS from './elements'
import { Slot } from './elements/tna/slot'

const { tnaProducts: TnaProducts } = ELEMENTS

export default {
  title: 'triple-document / T&A Slot',
  component: TnaProducts,
} as Meta

export function InTripleDocument() {
  return (
    <TnaProducts
      value={{
        slotId: 1546,
      }}
    />
  )
}
InTripleDocument.storyName = 'Triple-document에 포함된 Slot'

export function Slots() {
  return SLOTS.map((slot, i) => (
    <Slot key={i} id={slot.id} title={slot.title} products={slot.products} />
  ))
}

Slots.storyName = 'Slots'
