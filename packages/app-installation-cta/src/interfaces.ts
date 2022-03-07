import { InventoryItemMeta } from '@titicaca/type-definitions'

export interface CtaProps {
  onShow?: (item?: InventoryItemMeta) => void
  onClick?: (item?: InventoryItemMeta) => void
  onDismiss?: (item?: InventoryItemMeta) => void
}
