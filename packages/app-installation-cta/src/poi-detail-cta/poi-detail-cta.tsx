import React, { useState, useEffect } from 'react'
import fetch from 'isomorphic-fetch'

import { InventoryItem } from '../interfaces'

import PoiDetailInstall from './poi-detail-install'

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

export default function PoiDetailCTA({
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

  return <PoiDetailInstall inventory={inventories[0]} installURL={installURL} />
}
