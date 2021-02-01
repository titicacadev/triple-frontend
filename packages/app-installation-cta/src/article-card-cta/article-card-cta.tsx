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
  href,
  onClick,
  onIntersect,
}: {
  inventoryId?: string
  href?: string
  onClick: (e: React.SyntheticEvent, inventory: any) => void
  onIntersect: (cta: any) => void
}) {
  const [inventories, setInventories] = useState<InventoryItem[]>([])

  useEffect(() => {
    async function fetchAndSetInventories() {
      setInventories(await fetchInstallAppInventory({ inventoryId }))
    }

    fetchAndSetInventories()
  }, [inventoryId, setInventories])

  const handleClick = (e: React.SyntheticEvent) => onClick(e, inventories[0])
  const handleIntersectionChange = ({
    isIntersecting,
  }: {
    isIntersecting: boolean
  }) => isIntersecting && onIntersect(inventories[0])

  return (
    <StaticIntersectionObserver
      threshold={0.7}
      onChange={handleIntersectionChange}
    >
      <a href={href}>
        <Image borderRadius={6}>
          <Image.FixedRatioFrame frame="huge" onClick={handleClick}>
            <Image.Img src={inventories[0] && inventories[0].image} />
          </Image.FixedRatioFrame>
        </Image>
      </a>
    </StaticIntersectionObserver>
  )
}
