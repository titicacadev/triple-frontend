import { Meta } from '@storybook/react'
import { ELEMENTS, Slot } from '@titicaca/triple-document'

import SLOTS from '../__mocks__/slots.sample.json'
import {
  eventMetadataDecorator,
  eventTrackingProviderDecorator,
  historyProviderDecorator,
  tripleClientMetadataDecorator,
  userAgentProviderDecorator,
} from '../../decorators'

const { tnaProducts: TnaProducts } = ELEMENTS

export default {
  title: 'triple-document / T&A Slot',
  component: TnaProducts,
  decorators: [
    historyProviderDecorator,
    tripleClientMetadataDecorator,
    userAgentProviderDecorator,
    eventMetadataDecorator,
    eventTrackingProviderDecorator,
  ],
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
