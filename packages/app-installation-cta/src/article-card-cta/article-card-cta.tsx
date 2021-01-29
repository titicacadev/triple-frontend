import React, { useState, useEffect } from 'react'
import fetch from 'isomorphic-fetch'
import { Image } from '@titicaca/core-elements'
import { StaticIntersectionObserver } from '@titicaca/intersection-observer'

import { InventoryItem } from '../interfaces'

async function fetchInstallAppInventory({
  inventoryId,
}: {
  inventoryId?: string
}): Promise<any> {
  const response = await fetch(`/api/inventories/v1/${inventoryId}/items`, {
    credentials: 'same-origin',
  })
  const { items = [] } = await response.json()
  return items
}

export default function ArticleCardCTA({
  inventoryId,
  installURL,
}: {
  inventoryId?: string
  installURL?: string
}) {
  const [inventories, setInventories] = useState<InventoryItem[]>([])

  useEffect(() => {
    async function fetchAndSetInventories() {
      setInventories(await fetchInstallAppInventory({ inventoryId }))
    }

    fetchAndSetInventories()
  }, [inventoryId, setInventories])

  return (
    <StaticIntersectionObserver threshold={0.7} onChange={() => null}>
      <a href={installURL}>
        <Image borderRadius={6}>
          <Image.FixedRatioFrame frame="huge" onClick={() => null}>
            <Image.Img src={inventories[0] && inventories[0].image} />
          </Image.FixedRatioFrame>
        </Image>
      </a>
    </StaticIntersectionObserver>
  )
}
