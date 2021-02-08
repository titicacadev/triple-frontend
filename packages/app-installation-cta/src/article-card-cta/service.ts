import { InventoryItem } from '../interfaces'

export default async function fetchArticleCardCTA({
  inventoryId,
}: {
  inventoryId?: string
}): Promise<InventoryItem[]> {
  const response = await fetch(`/api/inventories/v1/${inventoryId}/items`, {
    credentials: 'same-origin',
  })
  const { items = [] } = await response.json()
  return items
}
