import React, { useCallback } from 'react'
import { Meta } from '@storybook/react'
import { ELEMENTS, Slot } from '@titicaca/triple-document'

import SLOTS from '../__mocks__/slots.sample.json'

const { tnaProducts: TNAProducts } = ELEMENTS

export default {
  title: 'triple-document / T&A Slot',
  component: TNAProducts,
} as Meta

export function InTripleDocument() {
  return (
    <TNAProducts
      value={{
        slotId: 1546,
      }}
    />
  )
}
InTripleDocument.storyName = 'Triple-document에 포함된 Slot'

export function Slots() {
  const handleClick = useCallback(() => {
    // TODO
  }, [])

  const handleIntersect = useCallback(() => {
    // TODO
  }, [])

  return SLOTS.map((slot, i) => (
    <Slot
      key={i}
      id={slot.id}
      title={slot.title}
      products={slot.products}
      onClick={handleClick}
      onIntersect={handleIntersect}
    />
  ))
}

Slots.storyName = 'Slots'
