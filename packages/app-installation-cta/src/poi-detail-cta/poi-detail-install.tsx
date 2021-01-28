import React from 'react'
import { Image } from '@titicaca/core-elements'

import { InventoryItem } from '../interfaces'

export default function PoiDetailInstall({
  inventory,
}: {
  inventory: InventoryItem
}) {
  return (
    <div>
      <Image borderRadius={6}>
        <Image.FixedRatioFrame frame="huge" onClick={() => null}>
          <Image.Img src={inventory && inventory.image} />
        </Image.FixedRatioFrame>
      </Image>
    </div>
  )
}
