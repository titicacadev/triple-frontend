import React from 'react'
import { Image } from '@titicaca/core-elements'

import { InventoryItem } from '../interfaces'

export default function PoiDetailInstall({
  inventory,
  installURL,
}: {
  inventory?: InventoryItem
  installURL?: string
}) {
  return (
    <a href={installURL}>
      <Image borderRadius={6}>
        <Image.FixedRatioFrame frame="huge" onClick={() => null}>
          <Image.Img src={inventory && inventory.image} />
        </Image.FixedRatioFrame>
      </Image>
    </a>
  )
}
