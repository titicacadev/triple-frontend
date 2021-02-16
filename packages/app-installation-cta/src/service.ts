import { InventoryMeta } from '@titicaca/type-definitions'
export async function fetchInventoryCTA({
  inventoryId,
}: {
  inventoryId?: string
}): Promise<InventoryMeta[] | null> {
  const response = await fetch(`/api/inventories/v1/${inventoryId}/items`, {
    credentials: 'same-origin',
  })

  if (response.ok) {
    const { items = [] }: { items: InventoryMeta[] } = await response.json()
    return items
  } else {
    return null
  }
}
