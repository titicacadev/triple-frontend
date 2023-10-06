import { InventoryItemMeta } from '@titicaca/type-definitions'

export async function fetchInventoryItems({
  inventoryId,
}: {
  inventoryId?: string
}): Promise<InventoryItemMeta[] | null> {
  const response = await fetch(`/api/inventories/v1/${inventoryId}/items`, {
    credentials: 'same-origin',
  })

  if (response.ok) {
    const { items = [] }: { items: InventoryItemMeta[] } = await response.json()
    return items
  } else {
    return null
  }
}
