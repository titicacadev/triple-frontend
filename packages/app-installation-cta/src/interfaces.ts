import { InventoryMeta } from '@titicaca/type-definitions'

export interface CTAProps {
  onShow?: (item?: InventoryMeta) => void
  onClick?: (item?: InventoryMeta) => void
  onDismiss?: (item?: InventoryMeta) => void
}
